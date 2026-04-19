# Use Cases: 01 — Welt & Lore

## Uebersicht

Domäne mit Content-Fokus (Worldbuilding). Keine expliziten funktionalen Use Cases,
sondern inhaltliche Bausteine, die von anderen Domänen referenziert werden.

---

## Use Cases

### UC-WLT-01: Weltgeschichte ueber vier Epochen verstehen
- **Akteur:** Spieler, GM
- **Beschreibung:** Die vier Epochen (Schoepfung, Kriege, Stille, Akademie) sind abrufbar und bilden den narrativen Rahmen fuer Quests und NPCs.

### UC-WLT-02: Pantheon der 7 Urschoepfer erforschen
- **Akteur:** Spieler, GM
- **Beschreibung:** Jeder Urschoepfer hat Domaenen, Sigillen und Einfluss auf Spielmechaniken (z.B. Cleric Domains, NPC-Fraktionen).

### UC-WLT-03: 21 Sigillen katalogisieren und Mechaniken verstehen
- **Akteur:** Spieler, GM
- **Beschreibung:** Sigillen sind an Urschoepfer gebunden und haben direkte mechanische Auswirkungen (Buffs, Story-Hooks, Dragon Bond).

### UC-WLT-04: Geographie mit 28 POI-Typen erkunden
- **Akteur:** Spieler, GM
- **Beschreibung:** Points of Interest auf der Weltkarte (Staedte, Dungeons, Ruinen etc.) mit Fog-of-War-Anbindung.

### UC-WLT-05: Kreaturentaxonomie mit 14 Kreaturtypen nutzen
- **Akteur:** GM
- **Beschreibung:** Klassifikation aller Kreaturen fuer Encounter-Generierung und Bestiary.

### UC-WLT-06: Flammenreiter-Originalkreaturen einsetzen
- **Akteur:** GM
- **Beschreibung:** Eigene Kreaturen (Schattenwolf, Sturmgreif, Erdenwächter, Nebelstalker, Aschegeist, Sigillen-Verderber) mit eigenen Stat-Blocks und Lore.

---

## Drachen-Taxonomie (NEU — UC-NEW-06)

### UC-WLT-07: Drachen-Taxonomie — 3x7 Artensystem
- **Akteur:** GM, System
- **Prioritaet:** P1
- **Beschreibung:** Systematische Drachen-Klassifikation mit 3 Spezies (Feuerdrachen, Eisdrachen, Sturmdrachen) und 7 Rassen (z.B. Scharlachschuppe, Frostfang, Gewitterfluegel). Jede Kombination ergibt eine von 21 Varianten mit eigenen mechanischen Effekten (JSONB). DragonBonds referenzieren eine spezifische Variante.
- **Datenstruktur:**
  - `DragonTaxonomySpecies`: name, description, element, breath_type (3 geseedet)
  - `DragonTaxonomyRace`: name, description, size_category, temperament (7 geseedet)
  - `DragonVariant`: species_id x race_id (UNIQUE), mechanical_effects (JSONB)
- **API:** `GET /dragons/variants` — Alle 21 Varianten mit Spezies + Rasse
- **Ref:** STORY-DOCS-005 (Lore-Korrekturen: Drachen-Taxonomie dokumentieren)

---

## Lore Library (NEU — UC-NEW-14)

### UC-WLT-08: Lore Library — Spieler-seitige Artikel
- **Akteur:** Spieler
- **Prioritaet:** P1
- **Beschreibung:** Spieler-seitige Lore-Bibliothek mit Discovery-Mechanismus. Spieler sehen nur Artikel die fuer sie "entdeckt" (discovered) sind. Admin kann Artikel fuer bestimmte Spieler oder die gesamte Party freigeben. Unterstuetzt Kategorie-Filter, Volltextsuche und Featured-Artikel (Top 5 neueste).
- **API-Endpoints:**
  - `GET /lore/articles` — Entdeckte Artikel mit Filter + Suche
  - `GET /lore/articles/featured` — Top 5 neueste entdeckte
  - `GET /lore/articles/:id` — Einzelartikel mit vollem Content + EntityImages
  - `POST /lore/:id/discover` — Artikel fuer Spieler freigeben (Admin)
- **Technisch:** LoreEntry Model mit `isPublished`, `contentFormat`, Kategorie-Zuordnung

---

## NPC-Katalog (STORY-DOCS-004)

### UC-WLT-09: NPC-Katalog — 46 NPCs
- **Akteur:** GM
- **Prioritaet:** P1
- **Beschreibung:** Vollstaendiger NPC-Katalog mit allen 46 NPCs: Akademie-Leitung (2), Dozenten (7), Weitere NPCs (4), J1-Schueler (14), J2-Schueler (10), J3-Schueler (10), Nachbarsiedlung (2-3). Dozenten mit Fach, Haus, Disposition, Trait-Reaktionen. J3-Schueler mit Dragon Bond Status und Drachen-Namen.
- **Ref:** STORY-DOCS-004, haengt ab von STORY-DOCS-001 (Haus-Zuweisungen)

---

## Lore-Korrekturen (STORY-DOCS-005)

### UC-WLT-10: Lore-Korrekturen durchfuehren
- **Akteur:** Admin
- **Prioritaet:** P0
- **Beschreibung:** Sofortige Korrekturen: (1) "Sturmfels-Akademie" → "Akademie von Altheim", (2) Fuenf Gruender korrekt dokumentieren (Hesidia, Morla, Leomar, Romoschoch, Anground), (3) Zeitleiste: ~200 v.h. Grosses Erdbeben, ~100 v.h. Drachen-Rueckkehr, (4) Kontinent-Platzhalter "[Kontinent-Name, beginnt mit C]".
- **Ref:** STORY-DOCS-005

---

## Haus-Zuweisungen (STORY-DOCS-001)

### UC-WLT-11: Haus-Zuweisung konsistent machen
- **Akteur:** Admin
- **Prioritaet:** P0
- **Beschreibung:** Alle NPC-Schueler-Listen konsistent machen. Drachenfeste (Rot): Kael, Tara, Draven. Turm der Ketten (Blau): Mira, Yuna, Sera. Tiefe Esse (Bronze): Brokk, Elwin, Jorik. Liebe und Leben (Gruen): Aldis, Pip, Lena, Nyx, Renn. Flammen-Zuordnung (Obsidian, Granit, Esche, Bernstein) und J2/J3-Schueler korrekt zuordnen.
- **Ref:** STORY-DOCS-001

---

## Status

| UC | Status | Anmerkung |
|----|--------|-----------|
| UC-WLT-01 | Dokumentiert | Content in 01-welt-lore/ |
| UC-WLT-02 | Dokumentiert | Content in 01-welt-lore/ |
| UC-WLT-03 | Dokumentiert | Content in 01-welt-lore/ |
| UC-WLT-04 | Dokumentiert | Content in 01-welt-lore/ |
| UC-WLT-05 | Dokumentiert | Content in 01-welt-lore/ |
| UC-WLT-06 | Dokumentiert | Content in 01-welt-lore/ |
| UC-WLT-07 | **NEU — Implementiert** | UC-NEW-06, API vorhanden |
| UC-WLT-08 | **NEU — Implementiert** | UC-NEW-14, API vorhanden |
| UC-WLT-09 | **NEU — Ticket** | STORY-DOCS-004 |
| UC-WLT-10 | **NEU — Ticket P0** | STORY-DOCS-005 |
| UC-WLT-11 | **NEU — Ticket P0** | STORY-DOCS-001 |
