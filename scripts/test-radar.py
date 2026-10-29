"""Offline negative tests of source authorization and editorial expiration."""
from copy import deepcopy
from datetime import datetime
from pathlib import Path
import json
import runpy
import unittest

ROOT = Path(__file__).resolve().parents[1]
module = runpy.run_path(str(ROOT / "scripts/validate-radar.py"))
validate, state = module["validate"], module["effective_state"]
DATA = json.loads((ROOT / "data/incidents.json").read_text(encoding="utf-8"))

class RadarTest(unittest.TestCase):
    def test_all_documented_sources(self):
        self.assertEqual(validate(DATA), [])
        self.assertEqual(len(DATA["items"]), 5)
    def test_expiration_without_claiming_active_emergency(self):
        notice = DATA["items"][0]
        self.assertEqual(state(notice, datetime.fromisoformat("2026-10-29T18:00:00+01:00")), "confirmed")
        self.assertEqual(state(notice, datetime.fromisoformat("2026-10-31T00:00:00+01:00")), "outdated")
        self.assertEqual(state(notice, datetime.fromisoformat("2026-10-28T18:00:00+01:00")), "unknown")
    def test_withdrawn_unknown_and_outdated_stay_nonconfirmed(self):
        for marker in ("withdrawn", "unknown", "outdated"):
            changed = deepcopy(DATA["items"][0]); changed["editorial_status"] = marker
            self.assertEqual(state(changed, datetime.fromisoformat("2026-10-29T18:00:00+01:00")), marker)
    def test_cannot_inject_unverified_source(self):
        changed = deepcopy(DATA)
        changed["items"][0]["source_url"] = "https://112.castillalamancha.es.attacker.test"
        self.assertTrue(validate(changed))
    def test_cannot_inject_fictitious_urgency(self):
        changed = deepcopy(DATA)
        changed["items"][0]["claim"] = "El hospital saturado necesita sangre urgente."
        self.assertTrue(validate(changed))
    def test_cannot_silently_append_live_fields(self):
        changed = deepcopy(DATA)
        changed["items"][0]["stock"] = {"O-": "low"}
        self.assertTrue(validate(changed))
    def test_expiration_must_be_near_review(self):
        changed = deepcopy(DATA)
        changed["items"][0]["expires_at"] = "2027-01-01T00:00:00+01:00"
        self.assertTrue(validate(changed))
    def test_invalid_calendar_day_rejected(self):
        changed = deepcopy(DATA)
        changed["items"][0]["last_checked_at"] = "2026-02-30"
        self.assertTrue(validate(changed))
    def test_no_unapproved_extra_record(self):
        changed = deepcopy(DATA)
        extra = deepcopy(changed["items"][0])
        extra["id"] = "unverified-social-message"
        changed["items"].append(extra)
        changed["incident"]["source_count"] += 1
        self.assertTrue(validate(changed))
    def test_no_claim_of_current_hospital_status(self):
        for item in DATA["items"]:
            self.assertFalse(any(k in item for k in ("hospital_capacity","blood_levels","victims","personal_data")))
            self.assertTrue(item["scope"].startswith(("No ", "La ", "Las ")))

if __name__ == "__main__":
    unittest.main()
