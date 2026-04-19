# Use Cases: 10 — Infrastruktur & DevOps

## Uebersicht

Technische Infrastruktur-Domäne. Geplant fuer den Implementierungs-Start.
Deckt CI/CD, Testing, Deployment und Monitoring ab.

---

## CI/CD

### UC-INF-01: CI/CD-Pipeline mit GitHub Actions implementieren
- **Akteur:** System, Entwickler
- **Beschreibung:** Automatisierte Build-, Test- und Deploy-Pipeline bei Push/PR.

### UC-INF-02: Typ-Generierung (Supabase → Zod → npm publish)
- **Akteur:** System
- **Beschreibung:** Automatische TypeScript-Typ-Generierung aus DB-Schema und Veroeffentlichung als npm Package.

---

## Testing

### UC-INF-03: Unit Tests ausfuehren
- **Akteur:** System, Entwickler
- **Beschreibung:** Isolierte Tests fuer Services, Hooks und Utilities.

### UC-INF-04: Integration Tests ausfuehren
- **Akteur:** System, Entwickler
- **Beschreibung:** Tests mit realer Datenbank fuer API-Endpunkte und Daten-Flows.

### UC-INF-05: E2E Tests ausfuehren
- **Akteur:** System, Entwickler
- **Beschreibung:** End-to-End Tests fuer kritische User-Flows (Login, Charakter-Erstellung, Kampf).

---

## Security

### UC-INF-06: Supabase RLS Policies definieren
- **Akteur:** Entwickler
- **Beschreibung:** Row Level Security fuer alle Tabellen basierend auf User-Rolle und Kampagnen-Zugehoerigkeit.

---

## Deployment

### UC-INF-07: Staging-Environment betreiben
- **Akteur:** System, Entwickler
- **Beschreibung:** Separate Staging-Umgebung fuer Pre-Production-Testing.

### UC-INF-08: Production-Deployment durchfuehren
- **Akteur:** System, Entwickler
- **Beschreibung:** Kontrolliertes Deployment mit Rollback-Moeglichkeit.

---

## Monitoring

### UC-INF-09: Monitoring & Alerting aufbauen
- **Akteur:** System
- **Beschreibung:** Ueberwachung von Uptime, Performance und Fehlerrate.

---

## Caching

### UC-INF-10: Caching-Strategien umsetzen
- **Akteur:** System
- **Beschreibung:** Redis fuer Server-Side, LocalStorage/IndexedDB fuer Client-Side Caching.

---

## Audit-Log-System (NEU — UC-NEW-11)

### UC-INF-11: Vollstaendiges Audit-Log-System
- **Akteur:** System, Admin
- **Prioritaet:** P1
- **Beschreibung:** Audit-Log fuer alle administrativen Aenderungen. Speichert userId, entityType, entityId, action (create/update/delete), before/after (JSON), reason, metadata. Paginierter Admin-Endpoint mit Filtern.
- **API:**
  - `GET /audit-logs` — Paginiert mit Filtern (entityType, userId, action, dateRange)
  - `GET /audit-logs/:id` — Einzelner Eintrag
- **Siehe auch:** UC-DB-17 (Datenbank-Seite)

---

## Status

| UC | Status | Anmerkung |
|----|--------|-----------|
| UC-INF-01 bis UC-INF-10 | Placeholder | Bei Implementierungs-Start |
| UC-INF-11 | **NEU — Implementiert** | UC-NEW-11, Audit-Log |
