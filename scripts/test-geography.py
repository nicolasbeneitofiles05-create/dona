"""Casos sintéticos separados del inventario publicable; sin llamadas de red."""
import copy
import importlib.util
from pathlib import Path
import json
import unittest
from datetime import datetime, timezone

root = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('geography', root / 'scripts/validate-geography.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class InventoryChecks(unittest.TestCase):
    def setUp(self):
        self.data = json.loads((root / 'data/geographic-inventory.json').read_text(encoding='utf-8'))
        self.now = datetime(2026, 10, 29, tzinfo=timezone.utc)

    def test_pending_inventory_does_not_claim_distances(self):
        self.assertEqual(module.validate(self.data, self.now), [])
        self.assertFalse(any(x['distance_eligible'] for x in self.data['locations']))

    def test_duplicate_identity_rejected(self):
        self.data['locations'].append(copy.deepcopy(self.data['locations'][0]))
        self.assertTrue(module.validate(self.data, self.now))

    def test_distance_without_evidence_rejected(self):
        item = self.data['locations'][0]
        item['distance_eligible'] = True
        self.assertTrue(module.validate(self.data, self.now))

    def test_conflicting_hours_cannot_be_listed(self):
        self.data['locations'][0]['public_listing_eligible'] = True
        self.assertTrue(module.validate(self.data, self.now))

    def test_partial_and_out_of_range_coordinates_rejected(self):
        for latitude, longitude in [(40, None), (91, 0), (0, 181), (True, 1)]:
            with self.subTest(latitude=latitude, longitude=longitude):
                self.data['locations'][0]['coordinates'].update(latitude=latitude, longitude=longitude)
                self.assertTrue(module.validate(self.data, self.now))

    def test_invalid_review_date_rejected(self):
        self.data['locations'][0]['checked_at'] = '2026-02-30T10:00:00Z'
        self.assertTrue(module.validate(self.data, self.now))


if __name__ == '__main__':
    unittest.main()
