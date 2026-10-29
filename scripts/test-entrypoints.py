"""Offline regression tests for navigation-only source links."""
from copy import deepcopy
from pathlib import Path
import importlib.util
import json
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("validate_entrypoints", ROOT / "scripts/validate-entrypoints.py")
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)
DATA = json.loads((ROOT / "data/official-entrypoints.json").read_text(encoding="utf-8"))

class EntryPointsTest(unittest.TestCase):
    def test_contract(self):
        self.assertEqual(checker.validate(DATA), [])

    def test_prefixes_and_destinations(self):
        expected = {
            "03440": ("Alicante", "/puntos-de-donacion-alicante"),
            "12001": ("Castellón", "/puntos-de-donacion-castellon"),
            "46001": ("Valencia", "/puntos-de-donacion-valencia"),
            "08001": ("Barcelona", "/calendario/"),
            "17001": ("Girona", "/calendario/"),
            "25001": ("Lleida", "/calendario/"),
            "43001": ("Tarragona", "/calendario/"),
            "28007": ("Madrid", "/moviles.aspx"),
        }
        for cp, (province, ending) in expected.items():
            with self.subTest(cp=cp):
                entry = checker.resolve(cp, DATA)
                self.assertEqual(entry["province"], province)
                self.assertTrue(entry["url"].endswith(ending))

    def test_other_provinces_keep_existing_fallback(self):
        for cp in ("51001", "52001", "13001", "45001", "00000", "99001", "abcde", ""):
            self.assertIsNone(checker.resolve(cp, DATA))

    def test_no_unlicensed_data_import(self):
        self.assertTrue(all(item["event_data_imported"] is False for item in DATA["links"]))
        self.assertTrue(all(item["reuse_permission"] == "not_verified" for item in DATA["links"]))

    def test_host_spoofing_rejected(self):
        bad = deepcopy(DATA)
        bad["links"][0]["url"] = "https://centro-transfusion.san.gva.es.example.invalid/fake"
        self.assertTrue(checker.validate(bad))

    def test_duplicate_prefix_rejected(self):
        bad = deepcopy(DATA)
        bad["links"].append(deepcopy(bad["links"][0]))
        self.assertTrue(checker.validate(bad))

    def test_fabricated_event_data_rejected(self):
        bad = deepcopy(DATA)
        bad["links"][0]["events"] = [{"date": "2099-01-01"}]
        self.assertTrue(checker.validate(bad))

    def test_non_ascii_digits_rejected(self):
        self.assertIsNone(checker.resolve("٠٣٤٤٠", DATA))

if __name__ == "__main__":
    unittest.main()
