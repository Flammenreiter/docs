# Use Cases: 07 — GM Dashboard

## Uebersicht

Kern-UI fuer den Game Master. Voll spezifiziert mit 40+ Use Cases.
Steuert Kampagnen, Sessions, NPCs, Quests und alle GM-Workflows.

---

## Party Management

### UC-PTY-01: Party anlegen
- **Akteur:** GM
- **Beschreibung:** Neue Party fuer eine Kampagne erstellen.

### UC-PTY-02: Mitglied hinzufuegen
- **Akteur:** GM
- **Beschreibung:** Spieler-Charakter der Party hinzufuegen.

### UC-PTY-03: Mitglied entfernen
- **Akteur:** GM
- **Beschreibung:** Spieler-Charakter aus Party entfernen (mit Archivierung).

### UC-PTY-04: Auto-Behandlung bei Charakter-Tod
- **Akteur:** System, GM
- **Beschreibung:** Automatischer Workflow bei Charakter-Tod (Archivierung, Neuerstellung).

---

## Story & XP

### UC-STY-01: Story anlegen mit Party-Zuordnung
- **Akteur:** GM
- **Beschreibung:** Story-Arc erstellen und Party zuordnen.

### UC-XP-01: XP nach Session verteilen
- **Akteur:** GM
- **Beschreibung:** XP-Verteilung an Party-Mitglieder nach Session.

---

## Calendar & Events

### UC-CAL-01: Event manuell anlegen
- **Akteur:** GM
- **Beschreibung:** Kalender-Event mit Datum, Beschreibung und Kategorie erstellen.

### UC-CAL-01B: Kalender vorspulen (Time Skip)
- **Akteur:** GM
- **Beschreibung:** Mehrere Tage/Wochen ueberspringen mit automatischer Downtime-Abwicklung.

### UC-CAL-02: Auto-Event bei Crafting
- **Akteur:** System
- **Beschreibung:** Crafting-Schritte erzeugen automatisch Kalender-Events fuer Fertigstellung.

### UC-CAL-03: Kalender-Erinnerung
- **Akteur:** System
- **Beschreibung:** Benachrichtigung fuer bevorstehende Events.

---

## Random Tables

### UC-RND-01: Random Table erstellen
- **Akteur:** GM
- **Beschreibung:** Custom Random Tables mit gewichteten Eintraegen anlegen.

### UC-RND-02: Auf Random Table wuerfeln
- **Akteur:** GM
- **Beschreibung:** Wuerfelergebnis von Random Table mit automatischer Auswertung.

---

## Fog of War

### UC-FOW-01: Auto-Entdeckung beim Reisen
- **Akteur:** System
- **Beschreibung:** POIs werden automatisch aufgedeckt, wenn die Party in Sichtweite kommt.

### UC-FOW-02: GM deckt Ort manuell auf
- **Akteur:** GM
- **Beschreibung:** GM kann beliebige Kartenbereich fuer einzelne Spieler oder die Party aufdecken.

---

## Loot

### UC-LOT-01: Loot nach Kampf verteilen
- **Akteur:** GM
- **Beschreibung:** Loot-Pool anzeigen und Items an Spieler oder Party-Truhe zuweisen.

---

## Session Recording

### UC-REC-01: Craig-Transkript verarbeiten
- **Akteur:** System, GM
- **Beschreibung:** Audio-Transkript von Craig Bot importieren und verarbeiten.

### UC-REC-02: Summary reviewen & veroeffentlichen
- **Akteur:** GM
- **Beschreibung:** AI-generierte Session-Summary pruefen, editieren und freigeben.

---

## Dialog & NPC

### UC-DLG-01: NPC-Dialog starten und fuehren
- **Akteur:** GM
- **Beschreibung:** Dialog-Interface mit NPC-Emotion, Disposition und automatischen Trait-Checks.

### UC-NPC-01: NPC-Emotion/Disposition ueber Quick Menu aendern
- **Akteur:** GM
- **Beschreibung:** Schnellzugriff zum Anpassen der NPC-Stimmung waehrend der Session.

---

## Scene Management

### UC-SCN-01: Szene vorbereiten
- **Akteur:** GM
- **Beschreibung:** Szene mit Typ, Beschreibung, NPCs, Loot und reveal_elements erstellen.

### UC-SCN-02: Szene ansehen (Preview)
- **Akteur:** GM
- **Beschreibung:** Vorschau der vorbereiteten Szene ohne Spieler-Sichtbarkeit.

### UC-SCN-03: Szene aktivieren + schrittweise einblenden
- **Akteur:** GM
- **Beschreibung:** Szene live schalten und Elemente nacheinander fuer Spieler enthüllen.

### UC-SCN-04: Unbespielte Szene nachtraeglich aktivieren
- **Akteur:** GM
- **Beschreibung:** Vorbereitete aber uebersprungene Szene spaeter reaktivieren.

---

## Travel & Weather

### UC-TRV-01: Reise planen und starten
- **Akteur:** GM
- **Beschreibung:** Route, Pacing und Provisions festlegen.

### UC-TRV-02: Reisetag abwickeln
- **Akteur:** GM, System
- **Beschreibung:** Tagesablauf mit Encounter-Roll, Proviant-Verbrauch, Wetter.

### UC-WTR-01: Tageswetter bestimmen
- **Akteur:** System, GM
- **Beschreibung:** Wetter fuer den aktuellen Tag wuerfeln oder manuell setzen.

---

## Rest

### UC-RAS-01: Rast-Abstimmung durchfuehren
- **Akteur:** GM, Spieler
- **Beschreibung:** Party stimmt ueber Short/Long Rest ab, GM genehmigt.

---

## Character Management

### UC-CHR-02: Charakter-Tod → Neuerstellung
- **Akteur:** GM, Spieler
- **Beschreibung:** Workflow fuer Charakter-Tod: Archivierung, optionale Neuerstellung.

---

## Organizations

### UC-ORG-01: Organisation beitreten
- **Akteur:** GM, Spieler
- **Beschreibung:** Beitritts-Workflow mit Anforderungs-Pruefung und Rang-Zuweisung.

### UC-ORG-02: Organisation verlassen
- **Akteur:** Spieler, GM
- **Beschreibung:** Austritt mit Reputations-Konsequenzen.

---

## Bounties & Crime

### UC-BNT-01: Bounty erstellen
- **Akteur:** GM
- **Beschreibung:** Kopfgeld mit Ziel, Belohnung und Bedingungen anlegen.

### UC-BNT-03: Bounty einloesen
- **Akteur:** GM, Spieler
- **Beschreibung:** Abgeschlossenes Kopfgeld einloesen und Belohnung erhalten.

### UC-CRM-01: Straftat registrieren
- **Akteur:** GM
- **Beschreibung:** Straftat mit Detection-Level, Region und Konsequenzen erfassen.

---

## Inventory & Durability

### UC-PRV-01: Proviant aus Truhe
- **Akteur:** Spieler, System
- **Beschreibung:** Automatischer Proviant-Verbrauch aus Party-Truhe waehrend Reise.

### UC-DUR-01: Durability verwalten
- **Akteur:** System, GM
- **Beschreibung:** Durability-Tracking mit automatischem Abbau und GM-Override.

---

## Decision Logging

### UC-DEC-01: Entscheidung manuell loggen
- **Akteur:** GM
- **Beschreibung:** Wichtige Spieler-Entscheidung mit Kontext und Konsequenzen erfassen.

---

## Plattform & Onboarding

### UC-AUTH-01: Registrierung & Login
- **Akteur:** Spieler, GM
- **Beschreibung:** Supabase Auth mit Email/Password und OAuth.

### UC-CMP-01: Kampagne anlegen
- **Akteur:** GM
- **Beschreibung:** Neue Kampagne mit Settings, Regelsystem und Welt erstellen.

### UC-CMP-02: Spieler einladen & Kampagne beitreten
- **Akteur:** GM, Spieler
- **Beschreibung:** Einladungslink generieren und Spieler-Beitritt verwalten.

### UC-SES-01: Session anlegen, starten & beenden
- **Akteur:** GM
- **Beschreibung:** Session-Lifecycle mit Start, Pause, Fortsetzen, Beenden und Post-Session Pipeline.

---

## Concentration & Saving Throws

### UC-CNC-02: Concentration nach Foundry-Sync
- **Akteur:** System
- **Beschreibung:** Konzentrations-Status nach Foundry-Sync aktualisieren.

### UC-SAV-02: Saving-Throw-Modifier fuer Foundry Pre-Sync
- **Akteur:** System
- **Beschreibung:** Saving-Throw-Modifier vor Foundry-Session synchronisieren.

---

## Content Pipeline — GM-Seite (NEU — UC-NEW-01)

### UC-GM-CPL-01: Content Import/Export ueber GM Dashboard
- **Akteur:** GM, Admin
- **Prioritaet:** P1
- **Beschreibung:** GM kann Content (Lore, NPCs, Locations, Creatures, Items, Spells) als JSON exportieren und importieren. Validierung vor Import, Fortschritts-Tracking, create/upsert-Strategien.
- **Siehe auch:** UC-ARC-09 (technische Architektur-Seite)

---

## Story-Hierarchie — GM-Seite (NEU — UC-NEW-05, UC-NEW-08, UC-NEW-09)

### UC-GM-STY-01: Story-Hierarchie verwalten (GlobalArc → Chapter)
- **Akteur:** GM
- **Prioritaet:** P1
- **Beschreibung:** 4-stufige Story-Hierarchie im GM Dashboard verwalten. CRUD fuer GlobalArc, StoryArc, Act, Chapter. Quests und Sessions ueber chapter_id zuordnen.
- **Ref:** STORY-DOCS-002 (Story-Arc-System dokumentieren)

### UC-GM-STY-02: Campaign Chapter State verwalten
- **Akteur:** GM
- **Prioritaet:** P1
- **Beschreibung:** Story-Variablen pro Kapitel setzen und einsehen. Upsert-Semantik. State-Summary ueber alle Kapitel einer Kampagne.

### UC-GM-STY-03: World State verwalten
- **Akteur:** GM
- **Prioritaet:** P2
- **Beschreibung:** Kampagnen-uebergreifende Welt-Variablen setzen und einsehen. Entscheidungen aus Kampagnen in World State propagieren.

### UC-GM-STY-04: Jahr-1-Blueprint als Planungsvorlage
- **Akteur:** GM
- **Prioritaet:** P1
- **Beschreibung:** Vorgefertigter Blueprint fuer "Erstes Schuljahr" mit 12 Monaten, 6 Quests (Q1-Q6), Decision Points, 9 Konsequenz-Variablen, Harptos-Mapping und Trait-First-Belohnungssystem.
- **Ref:** STORY-DOCS-003

---

## PlayGroup-System (NEU — UC-NEW-12)

### UC-GM-PG-01: PlayGroup-System (Party-Management)
- **Akteur:** GM
- **Prioritaet:** P1
- **Beschreibung:** Verwaltung von Spielergruppen innerhalb einer Kampagne. PlayGroup = Party von Charakteren. Members hinzufuegen/entfernen. Ersetzt/erweitert UC-PTY-01 bis UC-PTY-03 mit dediziertem System.
- **API:**
  - `POST /play-groups` — Erstellen
  - `GET /play-groups` — Listen einer Kampagne
  - `GET /play-groups/:id` — Details mit Members
  - `PATCH /play-groups/:id` — Bearbeiten
  - `DELETE /play-groups/:id` — Loeschen
  - `POST /play-groups/:id/members` — Mitglied hinzufuegen
  - `DELETE /play-groups/:id/members/:memberId` — Mitglied entfernen

---

## Decision-Logging erweitert (NEU — UC-NEW-15)

### UC-GM-DEC-01: Geplante und ungeplante Entscheidungen loggen
- **Akteur:** GM
- **Prioritaet:** P1
- **Beschreibung:** Erweitertes Entscheidungs-Logging: geplante Entscheidungen (aus Quest-/Chapter-Struktur mit vordefinierten Optionen) und ungeplante (Ad-hoc waehrend Session mit Freitext). Beide koennen Trait-Shifts und Story-Konsequenzen ausloesen. Kann World State propagieren.
- **API:**
  - `POST /campaigns/:id/decisions` — Geplante Entscheidung
  - `POST /campaigns/:id/decisions/unplanned` — Ungeplante Entscheidung
- **Erweitert:** UC-DEC-01 (einfaches manuelles Decision-Logging)

---

## Status

| Bereich | Anzahl UCs | Status |
|---------|-----------|--------|
| Party Management | 4 | Voll spezifiziert |
| Story & XP | 2 | Voll spezifiziert |
| Calendar & Events | 4 | Voll spezifiziert |
| Random Tables | 2 | Voll spezifiziert |
| Fog of War | 2 | Voll spezifiziert |
| Loot | 1 | Voll spezifiziert |
| Session Recording | 2 | Voll spezifiziert |
| Dialog & NPC | 2 | Voll spezifiziert |
| Scene Management | 4 | Voll spezifiziert |
| Travel & Weather | 3 | Voll spezifiziert |
| Rest | 1 | Voll spezifiziert |
| Character Management | 1 | Voll spezifiziert |
| Organizations | 2 | Voll spezifiziert |
| Bounties & Crime | 3 | Voll spezifiziert |
| Inventory & Durability | 2 | Voll spezifiziert |
| Decision Logging | 1 | Voll spezifiziert |
| Plattform & Onboarding | 4 | Voll spezifiziert |
| Concentration & Saves | 2 | Voll spezifiziert |
| Content Pipeline | 1 | **NEU — Implementiert** |
| Story-Hierarchie (GM-Seite) | 4 | **NEU — Implementiert** |
| PlayGroup-System | 1 | **NEU — Implementiert** |
| Decision-Logging (erweitert) | 1 | **NEU — Implementiert** |
| **Gesamt** | **49** | |
