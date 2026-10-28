"""Valida estructura y elegibilidad editorial; no verifica fuentes por sí solo."""
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import urlparse
import json
import math
import sys


def instant(value):
    try:
        parsed = datetime.fromisoformat(value.replace('Z', '+00:00'))
        return parsed if parsed.tzinfo else None
    except (ValueError, AttributeError, TypeError):
        return None


def https(value):
    try:
        u = urlparse(value)
        return u.scheme == 'https' and bool(u.hostname) and not u.username and not u.password
    except (ValueError, TypeError, AttributeError):
        return False


def validate(data, now=None):
    now = now or datetime.now(timezone.utc)
    errors = []
    if not isinstance(data, dict) or data.get('schema_version') != 1 or not isinstance(data.get('locations'), list):
        return ['Inventario: schema_version=1 y locations obligatorios']
    ids = set()
    for item in data['locations']:
        if not isinstance(item, dict):
            errors.append('Registro no válido'); continue
        identity = item.get('id')
        def fail(message):
            errors.append(f'{identity or "sin id"}: {message}')
        if not isinstance(identity, str) or not identity or identity in ids:
            fail('id vacío o duplicado')
        else:
            ids.add(identity)
        if not item.get('name') or not https(item.get('source_url')):
            fail('nombre y fuente HTTPS obligatorios')
        jurisdiction = item.get('jurisdiction') or {}
        prefix = jurisdiction.get('province_prefix', '')
        if not isinstance(prefix, str) or len(prefix) != 2 or not prefix.isdigit() or not 1 <= int(prefix) <= 52:
            fail('prefijo provincial inválido')
        checked, due = instant(item.get('checked_at')), instant(item.get('review_due_at'))
        if not checked or not due or checked > now or due <= checked:
            fail('fechas de revisión inválidas')
        coordinates = item.get('coordinates') or {}
        lat, lon = coordinates.get('latitude'), coordinates.get('longitude')
        present = lat is not None or lon is not None
        numeric = lambda n: isinstance(n, (int, float)) and not isinstance(n, bool) and math.isfinite(n)
        valid = numeric(lat) and numeric(lon) and -90 <= lat <= 90 and -180 <= lon <= 180
        if present and (not valid or coordinates.get('crs') != 'EPSG:4326'):
            fail('coordenadas incompletas, fuera de rango o CRS inválido')
        if coordinates.get('accuracy_metres') is not None and (not numeric(coordinates['accuracy_metres']) or coordinates['accuracy_metres'] < 0):
            fail('precisión métrica inválida')
        for flag in ['distance_eligible', 'public_listing_eligible']:
            if not isinstance(item.get(flag), bool):
                fail(f'{flag} debe ser booleano')
        if item.get('distance_eligible'):
            if not valid or coordinates.get('precision') in [None, '', 'unverified'] or not https(coordinates.get('evidence_url')):
                fail('distancia exige coordenadas, precisión y evidencia')
            if coordinates.get('review_status') != 'corroborated' or not coordinates.get('review_basis') or not instant(coordinates.get('checked_at')):
                fail('distancia exige revisión manual documentada de coordenadas')
            elif not checked or not (checked <= instant(coordinates['checked_at']) <= now):
                fail('fecha de comprobación de coordenadas incoherente')
        if item.get('public_listing_eligible'):
            if item.get('opening_hours_status') != 'corroborated' or not item.get('opening_hours'):
                fail('listado exige horarios contrastados sin discrepancias')
            if item.get('identity_review_status') != 'corroborated' or not item.get('identity_review_basis'):
                fail('listado exige identidad revisada manualmente')
        if (item.get('distance_eligible') or item.get('public_listing_eligible')) and (not due or due <= now):
            fail('revisión caducada: desactivar elegibilidad')
    return errors


if __name__ == '__main__':
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1] / 'data/geographic-inventory.json'
    data = json.loads(path.read_text(encoding='utf-8'))
    problems = validate(data)
    print(json.dumps({'structural_validation': 'fail' if problems else 'pass', 'errors': problems,
                      'locations': len(data.get('locations', [])),
                      'distance_eligible': sum(x.get('distance_eligible') is True for x in data.get('locations', []) if isinstance(x, dict)),
                      'sources_verified_by_this_script': False}, ensure_ascii=True))
    sys.exit(bool(problems))
