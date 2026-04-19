# Use Cases: 04 — Systemarchitektur

## Uebersicht

Technisch-architektonische Domäne. Use Cases beschreiben System-Anforderungen
und Architektur-Entscheidungen.

---

## Use Cases

### UC-ARC-01: Backend-Architektur mit 2 Schichten implementieren
- **Akteur:** System
- **Beschreibung:** Hono (Haupt-API, Routes + Business Logic + Validation) und Supabase Edge Functions (fuer Character-Interview-KI). Kein PostgREST im Einsatz.

### UC-ARC-02: Multi-Repo-Struktur mit shared npm packages verwenden
- **Akteur:** Entwickler
- **Beschreibung:** Separate Repos fuer Web, Mobile, Docs mit geteilten TypeScript-Packages.

### UC-ARC-03: Type Safety durch PostgreSQL → TypeScript → Zod durchsetzen
- **Akteur:** System, Entwickler
- **Beschreibung:** Automatische Typ-Generierung von DB-Schema bis Frontend-Validierung.

### UC-ARC-04: EffectProcessor Service fuer Modifier-Berechnungen nutzen
- **Akteur:** System
- **Beschreibung:** Zentraler Service, der alle Modifier (Traits, Items, Buffs, Conditions) aggregiert und berechnet.

### UC-ARC-05: Supabase Auth mit JWKS (asymmetric) implementieren
- **Akteur:** System
- **Beschreibung:** Authentifizierung ueber Supabase (JWT mit JWKS-basierter Verifikation, asymmetrisch). Autorisierung erfolgt in der Hono-API als Gatekeeper (Campaign-GM / Character-Owner Middleware). Row Level Security ist NICHT aktiv (UC-DB-05 OFFEN).

### UC-ARC-06: FLUX-Pipeline fuer KI-generierte Bilder verwenden
- **Akteur:** System, GM
- **Beschreibung:** AI-Bildgenerierung fuer Charakterportraits, NPCs, Szenen-Illustrationen.

### UC-ARC-07: Foundry VTT Integration (Pre/Post-Sync)
- **Akteur:** System
- **Beschreibung:** Bidirektionaler Sync zwischen Flammenreiter-App und Foundry VTT fuer Kampf-Sessions.

### UC-ARC-08: Echtzeit-Kommunikation waehrend Sessions
- **Akteur:** System
- **Beschreibung:** WebSocket-basierte Realtime-Updates fuer alle verbundenen Clients waehrend einer Session.

---

## Content Pipeline (NEU — UC-NEW-01, UC-NEW-13)

### UC-ARC-09: Content Pipeline — JSON Import/Export mit Validierung
- **Akteur:** GM, Admin
- **Prioritaet:** P1
- **Beschreibung:** Vollstaendiger Content-Import/Export fuer 6 Entity-Typen (Lore, NPCs, Locations, Creatures, Items, Spells). Export liefert JSON, Import mit zwei Strategien: `create` (nur neue) und `upsert` (anlegen oder aktualisieren). Trockenlauf-Validierung moeglich.
- **API:**
  - `GET /content/export?entities=lore,npcs,items` — Export als JSON
  - `POST /content/import/validate` — Trockenlauf mit Fehler-Report
  - `POST /content/import` — Tatsaechlicher Import mit Strategie-Wahl
  - `GET /content/import/:jobId` — Fortschritts-Tracking
- **Technisch:** ImportJob Model (pending, processing, completed, failed)

### UC-ARC-10: CSV-Import fuer Masseninhalt
- **Akteur:** Admin
- **Prioritaet:** P2
- **Beschreibung:** Import von Content-Daten aus CSV-Dateien mit automatischem Header-Mapping. Streaming-Parser fuer grosse Dateien. Alle Entity-Typen unterstuetzt. Fortschritt via ImportJob.
- **API:** Integriert in Content Pipeline (`POST /content/import` mit Format-Parameter)
- **Status:** Teilweise implementiert, Background-Job-Queue fehlt noch

---

## Batch-Bildgenerierung (NEU — UC-NEW-02)

### UC-ARC-11: Batch-Bildgenerierung fuer alle Entitaeten
- **Akteur:** Admin
- **Prioritaet:** P2
- **Beschreibung:** Automatisierte Bildgenerierung fuer alle Entitaeten eines Typs (Race, Class, Item, Location, NPC) ueber FLUX-Pipeline (fal.ai). Dry-Run-Modus und `missingImageOnly`-Filter. Batch-Job mit Fortschritts-Tracking.
- **API:**
  - `POST /images/generate/batch` — Batch-Job starten
  - `GET /images/generate/batch/:jobId/status` — Fortschritt abfragen
- **Details:** 5 Bildtypen pro Entitaet, Image-Matrix, handgeschriebene Prompts in `scripts/prompts/`, 1000+ Bilder generiert

---

## Unified EntityImages (NEU — UC-NEW-03)

### UC-ARC-12: Unified EntityImages Architektur
- **Akteur:** System
- **Prioritaet:** P1
- **Beschreibung:** Architektur-Pattern: `EntityImages`-Objekt mit 5 Bildtypen als Standard fuer alle Entitaeten. In Listen-Endpoints nur `imageUrl` (aktives Bild), in Detail-Endpoints vollstaendiges `images`-Objekt. EntityImage-Tabelle als Single Source of Truth.
- **Technisch:** `EntityImagesSchema` aus `@flammenreiter/api-types`, `buildEntityImages`/`buildEntityImagesBatch` Utilities, 10 Services nutzen das System
- **Siehe auch:** UC-DB-16 (Datenbank-Seite)

---

## Status

| UC | Status | Anmerkung |
|----|--------|-----------|
| UC-ARC-01 bis UC-ARC-08 | Designed | In 04-architektur/ dokumentiert |
| UC-ARC-09 | **NEU — Implementiert** | UC-NEW-01, Content Pipeline |
| UC-ARC-10 | **NEU — Teilweise** | UC-NEW-13, CSV-Import |
| UC-ARC-11 | **NEU — Implementiert** | UC-NEW-02, Batch-Bilder |
| UC-ARC-12 | **NEU — Implementiert** | UC-NEW-03, EntityImages |
