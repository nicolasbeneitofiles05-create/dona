"""DONA RADAR: validate a manually reviewed editorial snapshot; no HTTP, no live availability."""
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urlsplit
import json
import re
import sys

SOURCE_URLS = {
    "urda-112-familias": "https://112.castillalamancha.es/112/emergencias-e-incidencias/platecam-activado-en-la-provincia-de-toledo",
    "urda-guardia-familiares": "https://web.guardiacivil.es/eu/destacados/eventos/La-Guardia-Civil-ha-habilitado-diferentes-oficinas-para-que-acudan-los-familiares-de-primer-grado-de-las-victimas-del-accidente-ferroviario/",
    "urda-renfe-atencion": "https://grupo.renfe.com/es/es/sala-de-prensa/noticias/2026/10/comunicado-renfe-accidente-urda",
    "urda-iryo-atencion": "https://iryo.eu/en/new/comunicado-de-prensa-accidente-ferroviario-en-urda",
    "urda-adif-estaciones": "https://www.adif.es/viajeros/estado-de-la-red",
}
CATEGORIES = {"familias", "viajes"}
STATES = {"confirmed", "unknown", "outdated", "withdrawn"}
ITEM_FIELDS = {
    "id", "incident_id", "incident_date", "region", "category", "title", "claim",
    "source_org", "source_url", "published_at", "last_checked_at",
    "editorial_status", "expires_at", "review_basis", "scope",
}

def as_date(value):
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return None
    try:
        return date.fromisoformat(value)
    except ValueError:
        return None

def as_instant(value):
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}", value):
        return None
    try:
        dt = datetime.fromisoformat(value)
        return dt if dt.utcoffset() is not None else None
    except ValueError:
        return None

def effective_state(item, now):
    """For presentation only; confirmed = sourced publication, not live activity."""
    status = item.get("editorial_status")
    if status not in STATES:
        return "unknown"
    if status != "confirmed":
        return status
    checked = as_date(item.get("last_checked_at"))
    expiration = as_instant(item.get("expires_at"))
    if not checked or not expiration or now.tzinfo is None:
        return "unknown"
    if now.date() < checked:
        return "unknown"
    return "outdated" if now >= expiration else "confirmed"

def validate(data):
    errors = []
    if not isinstance(data, dict):
        return ["root: expected object"]
    if set(data) != {"schema_version", "kind", "incident", "items"}:
        errors.append("root: unexpected/missing keys")
    if data.get("schema_version") != 1 or data.get("kind") != "manually_reviewed_editorial_index":
        errors.append("wrong contract version/kind")
    incident = data.get("incident")
    if not isinstance(incident, dict):
        return errors + ["incident: expected object"]
    if set(incident) != {"id", "title", "date", "last_editorial_review", "source_count", "disclaimer"}:
        errors.append("incident: unexpected/missing keys")
    if incident.get("id") != "urda-2026-10-28" or as_date(incident.get("date")) != date(2026, 10, 28):
        errors.append("incident: unsupported id/date")
    review = as_date(incident.get("last_editorial_review"))
    if not review:
        errors.append("incident: invalid review date")
    if not isinstance(incident.get("disclaimer"), str) or "no es un servicio en directo" not in incident["disclaimer"]:
        errors.append("incident: missing no-live disclaimer")
    items = data.get("items")
    if not isinstance(items, list) or not 1 <= len(items) <= 12:
        return errors + ["items: expected 1..12 entries"]
    seen = set()
    for i, item in enumerate(items):
        ref = f"items[{i}]"
        if not isinstance(item, dict):
            errors.append(ref + ": expected object")
            continue
        if set(item) != ITEM_FIELDS:
            errors.append(ref + ": unexpected/missing fields")
        key = item.get("id")
        if key not in SOURCE_URLS or key in seen:
            errors.append(ref + ": unknown/duplicate id")
        seen.add(key)
        if item.get("source_url") != SOURCE_URLS.get(key):
            errors.append(ref + ": source not in exact official allowlist")
        try:
            u = urlsplit(item.get("source_url", ""))
            if u.scheme != "https" or not u.hostname or u.username or u.password or u.fragment or u.port not in (None, 443):
                errors.append(ref + ": unsafe URL")
        except (ValueError, TypeError):
            errors.append(ref + ": invalid URL")
        if item.get("incident_id") != incident.get("id") or item.get("incident_date") != incident.get("date"):
            errors.append(ref + ": incident mismatch")
        if item.get("category") not in CATEGORIES or item.get("editorial_status") not in STATES:
            errors.append(ref + ": unknown category/status")
        published = as_date(item.get("published_at"))
        checked = as_date(item.get("last_checked_at"))
        expires = as_instant(item.get("expires_at"))
        if not published or not checked or not expires:
            errors.append(ref + ": invalid date/time")
        else:
            if not as_date(incident.get("date")) or published < as_date(incident.get("date")) or published > checked:
                errors.append(ref + ": publication/verification order invalid")
            if review and checked > review:
                errors.append(ref + ": item checked after editorial review")
            if expires.date() <= checked or expires.date() > checked + timedelta(days=5):
                errors.append(ref + ": expiration must be shortly after check")
        for name in ("region", "title", "claim", "source_org", "review_basis", "scope"):
            val = item.get(name)
            if not isinstance(val, str) or len(val.strip()) < 8 or len(val) > 500 or "<" in val or ">" in val:
                errors.append(ref + ": invalid editorial text " + name)
        forbidden = ("hospital saturado", "sangre cubierta", "necesidad urgente", "tiempo real", "confirmado ahora")
        claim = item.get("claim", "")
        if isinstance(claim, str) and any(x in claim.lower() for x in forbidden):
            errors.append(ref + ": unsupported high-stakes claim")
    if incident.get("source_count") != len(items):
        errors.append("incorrect editorial source count")
    return errors

if __name__ == "__main__":
    path = Path(__file__).resolve().parents[1] / "data/incidents.json"
    problems = validate(json.loads(path.read_text(encoding="utf-8")))
    print(json.dumps({"status": "PASS" if not problems else "FAIL", "errors": problems,
                      "remote_sources_rechecked": False, "type": "editorial snapshot, not real-time"}, ensure_ascii=False))
    sys.exit(bool(problems))
