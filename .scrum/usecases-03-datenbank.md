# Use Cases: 03 — Datenbank

## Uebersicht

Technische Domäne. Use Cases beschreiben Daten-Operationen und Schema-Anforderungen,
die sich aus den Spielmechaniken ergeben.

---

## Use Cases

### UC-DB-01: ~200 Tabellen mit 5NF-Normalisierung verwalten
- **Akteur:** System
- **Beschreibung:** Vollstaendig normalisiertes Datenbankschema mit referentieller Integritaet.

### UC-DB-02: Trait-Spektren-System persistieren
- **Akteur:** System
- **Beschreibung:** Trait-Werte (-5 bis +5) mit Levels und History pro Charakter speichern.

### UC-DB-03: Items-System mit 10 Tabellen abbilden
- **Akteur:** System
- **Beschreibung:** Varianten, Weapon Stats, Armor Stats, Container, Durability etc. in separaten Tabellen.

### UC-DB-04: Dragon-Bond-System mit 9 Tabellen verwalten
- **Akteur:** System
- **Beschreibung:** Bond-Phasen, Pflege-Log, Equipment, Trait-Resonanz in dediziertem Tabellencluster.

### UC-DB-05: RLS (Row Level Security) auf Kampagnen/Charakter-Daten durchsetzen
- **Akteur:** System
- **Beschreibung:** Spieler sehen nur eigene Charakter-Daten und freigegebene Party-Daten.

### UC-DB-06: PostGIS fuer geografische Datenabfragen nutzen
- **Akteur:** System
- **Beschreibung:** Raeumliche Abfragen fuer Kartenfeatures, Fog of War, Naehe-Berechnungen.

### UC-DB-07: Supabase Realtime fuer Live-Sync aktivieren
- **Akteur:** System
- **Beschreibung:** Echtzeit-Synchronisation waehrend aktiver Sessions.

### UC-DB-08: Session-Daten persistieren
- **Akteur:** System
- **Beschreibung:** Roll-Logs, Entscheidungen, Notizen, Chat pro Session speichern.

### UC-DB-09: NPC-Dispositions-Matrix speichern
- **Akteur:** System
- **Beschreibung:** N:M Beziehung zwischen NPCs und Charakteren mit Dispositions-Wert.

### UC-DB-10: Quest-Tracking-Daten verwalten
- **Akteur:** System
- **Beschreibung:** Quest-Status, Objectives, Rewards, Zuweisungen persistieren.

### UC-DB-11: Organisations-Mitgliedschaften und Raenge speichern
- **Akteur:** System
- **Beschreibung:** Mitgliedschaften mit Rang, Rechten und Historie.

### UC-DB-12: Crafting-Rezepte und -Fortschritt persistieren
- **Akteur:** System
- **Beschreibung:** Multi-Step-Crafting mit Zwischen-Ergebnissen und finalem Output.

### UC-DB-13: Kalender-Events und Zeitstempel verwalten
- **Akteur:** System
- **Beschreibung:** In-Game-Kalender mit Events, Erinnerungen, Downtime-Zuweisungen.

### UC-DB-14: Renown-Daten pro Region/Organisation tracken
- **Akteur:** System
- **Beschreibung:** Bekanntheit mit Typ, Level und regionaler Zuordnung.

### UC-DB-15: Audit-Trail fuer GM-Overrides fuehren
- **Akteur:** System
- **Beschreibung:** Alle manuellen GM-Eingriffe werden protokolliert.

---

## Unified EntityImages (NEU — UC-NEW-03)

### UC-DB-16: Unified EntityImages System
- **Akteur:** System
- **Prioritaet:** P1
- **Beschreibung:** Standardisiertes Bild-Objekt fuer alle Entitaeten. Jede Entitaet liefert ein einheitliches `EntityImages`-Objekt mit 5 Bildtypen (portrait 768x1024, banner 1024x576, illustration 1024x1024, icon 512x512, emotionPortrait 768x1024). EntityImage-Tabelle ist Single Source of Truth — `imageUrl` Felder werden beim Aktivieren synchronisiert.
- **Image-Matrix:**
  - NPC, Character, Dragon, Creature: alle 5 Typen
  - Race, Subrace, Class, Deity: portrait, banner, illustration, icon
  - Location: banner, illustration, icon
  - Background: banner
  - Item: illustration, icon
- **Technisch:** `buildEntityImages`, `buildEntityImagesBatch` in `src/utils/entity-images.ts`, 10 Services nutzen das System

---

## Audit-Log-System (NEU — UC-NEW-11)

### UC-DB-17: Vollstaendiges Audit-Log-System
- **Akteur:** System, Admin
- **Prioritaet:** P1
- **Beschreibung:** Audit-Log fuer alle administrativen Aenderungen. Jeder Eintrag: userId, entityType, entityId, action (create/update/delete), before/after (JSON), reason, metadata (JSON). Paginierter Admin-Endpoint mit Filtern (entityType, userId, action, dateRange).
- **API:**
  - `GET /audit-logs` — Paginiert mit Filtern
  - `GET /audit-logs/:id` — Einzelner Log-Eintrag
- **Datenstruktur:** `AuditLog`: userId, entityType, entityId, action, before, after, reason, metadata, createdAt

---

## Drachen-Taxonomie DB (NEU — UC-NEW-06)

### UC-DB-18: Drachen-Taxonomie Tabellen
- **Akteur:** System
- **Prioritaet:** P1
- **Beschreibung:** 3 neue Tabellen: `DragonTaxonomySpecies` (3 Spezies), `DragonTaxonomyRace` (7 Rassen), `DragonVariant` (21 Kombinationen mit UNIQUE auf species_id x race_id und mechanical_effects JSONB). DragonBond.variant_id als FK.

---

## Companion-Bond DB (NEU — UC-NEW-07)

### UC-DB-19: Companion-Bond Tabelle
- **Akteur:** System
- **Prioritaet:** P1
- **Beschreibung:** `CompanionBond`: character_id (UNIQUE), companion_npc_id, phase (1-5), bond_strength, care_level, abilities (JSONB). Mutual exclusive mit DragonBond.

---

## Story-Hierarchie DB (NEU — UC-NEW-05)

### UC-DB-20: Story-Hierarchie Tabellen (4-stufig)
- **Akteur:** System
- **Prioritaet:** P1
- **Beschreibung:** 4 neue Tabellen: GlobalArc, StoryArc, Act, Chapter. Hierarchisch verlinkt. Chapter hat start_month, end_month, prerequisites (JSON), consequences (JSON). Sessions und Quests ueber chapter_id angebunden.

### UC-DB-21: CampaignChapterState Tabelle
- **Akteur:** System
- **Prioritaet:** P1
- **Beschreibung:** `CampaignChapterState`: campaign_id, chapter_id, variable, value, set_by_decision_id. UNIQUE(campaign_id, chapter_id, variable). Persistente Story-Variablen pro Kapitel.

### UC-DB-22: WorldState Tabelle
- **Akteur:** System
- **Prioritaet:** P2
- **Beschreibung:** `WorldState`: variable (UNIQUE), value, source_campaign_id, source_decision_id, updated_at. Kampagnen-uebergreifende Welt-Variablen.

---

## Status

| UC | Status | Anmerkung |
|----|--------|-----------|
| UC-DB-01 bis UC-DB-15 | Schema designed | In 03-datenbank/ dokumentiert |
| UC-DB-16 | **NEU — Implementiert** | UC-NEW-03, EntityImages |
| UC-DB-17 | **NEU — Implementiert** | UC-NEW-11, Audit-Log |
| UC-DB-18 | **NEU — Implementiert** | UC-NEW-06, Drachen-Taxonomie |
| UC-DB-19 | **NEU — Implementiert** | UC-NEW-07, Companion-Bond |
| UC-DB-20 bis UC-DB-22 | **NEU — Implementiert** | UC-NEW-05/08/09, Story+State |
