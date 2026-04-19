# Use Cases: 00 — Plattform & Querschnitt

## Uebersicht

Uebergreifende Use Cases, die mehrere Domänen betreffen.
Authentifizierung, Session-Lifecycle, Echtzeit-Sync und Informationsasymmetrie.

---

## Authentifizierung & Zugriff

### UC-PLT-01: Registrierung & Login
- **Akteur:** Spieler, GM
- **Beschreibung:** Supabase Auth mit Email/Password und OAuth-Providern.

### UC-PLT-02: Rollenbasiertes Routing
- **Akteur:** System
- **Beschreibung:** GM, Spieler und Viewer sehen unterschiedliche Routen und UI-Elemente.

---

## Session-Lifecycle

### UC-PLT-03: Kampagne anlegen
- **Akteur:** GM
- **Beschreibung:** Neue Kampagne mit Welt, Regelsystem und Settings erstellen.

### UC-PLT-04: Spieler einladen & Kampagne beitreten
- **Akteur:** GM, Spieler
- **Beschreibung:** Einladungs-Workflow mit Link-Generierung und Beitritts-Bestaetigung.

### UC-PLT-05: Session anlegen, starten & beenden
- **Akteur:** GM
- **Beschreibung:** Vollstaendiger Session-Lifecycle inkl. 7-Schritte Post-Session Pipeline.

---

## Echtzeit-Synchronisation

### UC-PLT-06: Supabase Realtime in Sessions
- **Akteur:** System
- **Beschreibung:** WebSocket-basierte Echtzeit-Updates waehrend aktiver Sessions.

### UC-PLT-07: Async-Sync zwischen Sessions
- **Akteur:** System
- **Beschreibung:** Polling/Pull-basierte Synchronisation ausserhalb aktiver Sessions.

### UC-PLT-08: Foundry Pre/Post-Sync
- **Akteur:** System
- **Beschreibung:** Bidirektionaler Daten-Sync mit Foundry VTT vor und nach Kampf-Sessions.

---

## Data Visibility & Secrets

### UC-PLT-09: GM-Toggle fuer versteckte Info
- **Akteur:** GM
- **Beschreibung:** GM kann Informationen selektiv fuer Spieler ein-/ausblenden.

### UC-PLT-10: Player-Filter auf Fog of War
- **Akteur:** System
- **Beschreibung:** Jeder Spieler sieht nur seine eigenen entdeckten Bereiche.

### UC-PLT-11: Informationsasymmetrie durchsetzen
- **Akteur:** System
- **Beschreibung:** Verschiedene Spieler sehen unterschiedliche Informationen basierend auf ihrem Charakter-Wissen.

---

## Status

| UC | Status | Anmerkung |
|----|--------|-----------|
| UC-PLT-01 bis UC-PLT-11 | Designed | Querschnitt ueber alle Domaenen |
