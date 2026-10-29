"""Check structural safety of official link catalogue. Does not contact remote websites."""
from pathlib import Path
from urllib.parse import urlparse
import json
import sys

ALLOWED_HOSTS = {"centro-transfusion.san.gva.es", "www.bancsang.net", "donarsangre.sanidadmadrid.org"}
EXPECTED_PREFIXES = {"03", "12", "46", "08", "17", "25", "43", "28"}

def validate(data):
    errors = []
    if not isinstance(data, dict) or data.get("schema_version") != 1:
        return ["schema_version debe ser 1"]
    if data.get("status") != "research_only_not_connected_to_production":
        errors.append("estado de publicación inseguro")
    links = data.get("links")
    if not isinstance(links, list):
        return errors + ["links debe ser lista"]
    seen = set()
    for item in links:
        if not isinstance(item, dict):
            errors.append("entrada no es objeto")
            continue
        prefix = item.get("province_prefix")
        if not isinstance(prefix, str) or len(prefix) != 2 or not prefix.isascii() or not prefix.isdigit() or not 1 <= int(prefix) <= 52:
            errors.append(f"prefijo inválido: {prefix}")
        elif prefix in seen:
            errors.append(f"prefijo duplicado: {prefix}")
        else:
            seen.add(prefix)
        try:
            p = urlparse(item.get("url"))
            valid_url = p.scheme == "https" and p.hostname in ALLOWED_HOSTS and not p.username and not p.password and not p.fragment and p.port in (None, 443)
        except (ValueError, TypeError, AttributeError):
            valid_url = False
        if not valid_url:
            errors.append(f"URL inválida/no permitida: {prefix}")
        if item.get("kind") != "official_navigation" or item.get("event_data_imported") is not False:
            errors.append(f"no es un enlace de navegación: {prefix}")
        if item.get("reuse_permission") != "not_verified":
            errors.append(f"permiso de reutilización sin verificar: {prefix}")
        if item.get("last_link_reviewed_at") != "2026-10-29":
            errors.append(f"fecha de investigación incorrecta: {prefix}")
        for field in ("province", "region", "agency"):
            if not isinstance(item.get(field), str) or not item[field].strip():
                errors.append(f"campo obligatorio {field}: {prefix}")
        for forbidden in ("sessions", "events", "hours", "stock", "coordinates", "distances", "appointments"):
            if forbidden in item:
                errors.append(f"dato sanitario/geográfico fuera de alcance {forbidden}: {prefix}")
    if seen != EXPECTED_PREFIXES:
        errors.append("prefijos de navegación no coinciden con el catálogo investigado")
    return errors

def resolve(postal, data):
    """Select official regional link by provincial prefix; does not validate a real postal address."""
    if not isinstance(postal, str) or len(postal) != 5 or not postal.isascii() or not postal.isdecimal():
        return None
    return next((entry for entry in data["links"] if entry["province_prefix"] == postal[:2]), None)

if __name__ == "__main__":
    path = Path(__file__).resolve().parents[1] / "data/official-entrypoints.json"
    errors = validate(json.loads(path.read_text(encoding="utf-8")))
    print(json.dumps({"status": "pass" if not errors else "fail", "errors": errors, "remote_links_checked": False}, ensure_ascii=False))
    sys.exit(bool(errors))
