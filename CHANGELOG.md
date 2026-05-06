# Changelog

Alle Aenderungen an der Flammenreiter-Dokumentation.

## [Unreleased]

### Sprint 2026-05-06 — User-Manuals (GM + Player + Setup-Guide)

- _Neue Sektion `manuals/`_ mit drei eigenstaendigen User-Handbuechern, parallel zu `spieler-handbuch.adoc` (Spielregeln) gepflegt.
- _`manuals/gm-manual.adoc`_ — Game-Master Handbuch: Login, Group/Campaign-Hierarchie, Active-Campaign-Switcher (STORY-ARCH-ACTIVE-CAMPAIGN), Session-Planer (Quick + Graph), Random-Tables, Encounter-Generator, Soundboard (3 Tabs + Mixer), Live-Session (Activity-Log + Filter + CSV-Export), NPC-Reaction-Radar (Trait-Spectrum), Crafting + Calendar mit Party-Status, Decision-Logger + Konsequenz-Vorschau, Story-Arc-Flowchart, Foundry-Status (per Audit nicht funktionsfaehig — TM kommt), Post-Session-Wizard. Bekannte Bugs Stand 2026-05-06 als eigene Sektion am Ende.
- _`manuals/player-manual.adoc`_ — Player Handbuch: Login, Group-Auswahl, Charakter-Picker (Workflow-Default #4: "+Neu erstellen" immer sichtbar), Onboarding-Wizard inkl. neuer Felder (Aussehen, Hintergrund, Weg-zur-Akademie), Char-Profil-Tabs, Pending-Actions Modal (Konzept), Inventar + Crafting (Status), Live-Session-Player-View, Skill-Checks, Sound-Settings, Changelog-Modal in Sidebar.
- _`manuals/setup-guide.adoc`_ — Setup-Guide: 8-Repo-Layout, Voraussetzungen (Node 20, pnpm 10.32.1, gh, PAT), env-Distribution via `scripts/distribute-secrets.sh`, NODE_AUTH_TOKEN aus workspace `.env`, Per-Commit Version-Bump (Workflow §11), Cross-Repo Lockfile-Sync (Phase-4-Convention), Supabase Setup (Pooler + SUPABASE_PW) und Migration-Pattern (`migrate deploy` mit handgeschriebenem SQL — `migrate dev` geht nicht auf Pooler), Railway DATABASE_URL Update bei Token-Rotation, GitNexus-Setup. Verlinkt `workspace-docs/guides/setup.md` und `LAPTOP-SETUP.md`.
- _`README.md`_: neue Sektion "User Manuals" mit Tabelle + Zielgruppe + Inhalt.
- _`index.adoc`_: Manuals als zusaetzliche Ressource in der Hauptseite verlinkt (kein `include::` da standalone, analog `spieler-handbuch.adoc`).
- _`Makefile`_: Build-Targets `gm-manual`, `player-manual`, `setup-guide` als HTML + PDF, mit `imagesdir=../images` weil unter `manuals/`.

### Sprint 2026-05-05 — Lore-Korrekturen + Jahr-1-Blueprint + NPC-Katalog (DOCS-003 / 004 / 005)

- _DOCS-005 (Lore-Korrekturen)_:
  - Akademie-Name umbenannt: _Sturmfels-Akademie_ -> _Akademie von Altheim_ (alle Vorkommen in `01-welt-lore/`, `04-architektur/`, `08-design-system/`).
  - Fuenf Gruender konkret dokumentiert: _Hesidia_ (Mensch / Wizard-Conjuration), _Morla_ (Mensch / Druid-Moon), _Leomar_ (Mensch / Paladin-Crown), _Romoschoch_ (Bergzwerg / Artificer), _Anground_ (Geheimnis - Rasse/Klasse unbekannt). Klassen/Rassen sind Erstvorschlag - bitte Lore-Owner reviewen.
  - Zeitleiste in `geschichte.adoc` ergaenzt: ~200 v.h. _Das Grosse Erdbeben_, ~100 v.h. _Drachen-Rueckkehr_ konkretisiert.
  - Drachen-Taxonomie in `dragon-bond.adoc` neu strukturiert: 3 _Spezies_ (Kampf-, Taschen-, Schattendrache) x 7 _Rassen_ (Feuer, Frost, Gruen, Gold, Schwarz, Silber, Stein) = 21 dokumentierte Varianten. Legacy-Tabelle als Referenz erhalten.
  - Kontinent-Platzhalter `[Kontinent-Name, beginnt mit C]` in `geographie.adoc` eingefuegt.
- _DOCS-003 (Jahr-1-Blueprint)_: Neue Datei `02-spielmechaniken/jahr-1-blueprint.adoc` mit Harptos-Mapping (12 Monate -> 4 Akademie-Phasen), Q1-Q6 Quest-Uebersicht, 9 Konsequenz-Variablen, Belohnungen pro Quest. Loest CL-02.
- _DOCS-004 (NPC-Katalog)_: Neue Datei `06-rassen-klassen/npc-katalog.adoc` mit 46 NPCs (2 Leitung + 7 Dozenten + 4 weitere + 14 J1-Schueler + 10 J2-Schueler + 10 J3-Schueler inkl. Dragon Bond Status + 3 Siedlungs-NPCs). Konsistent mit `akademie-schueler.adoc` (DOCS-001 = Quelle der Wahrheit).

### Sprint 2026-04-22 bis 2026-04-24 — Live-Session-Stabilisierung

Dokumentiert die groesste Feature-/Bugfix-Welle seit Projektstart. Drei
Entwicklungstage, ueber 90 Commits ueber `api`, `session-gm`,
`session-player` und `shared`.

#### Neue Dokumentationskapitel (02-spielmechaniken)

- `social-interaction.adoc` — Dreistufiges NPC-Reaktionssystem (Trait-Reactions,
  Alignment-Delta-Matrix, Personality-Fit, neue `race_affinities`-Tabelle,
  `social_events`-Historie mit Zeit-Decay). Dokumentiert die vollstaendige
  Reaktions-Formel sowie die Breakdown-Darstellung im Player-UI.
- `szenen-reveal-toggles.adoc` — Szenen-Metadaten-Schema (`readAloud`,
  `rollTables`, `suggestedChecks`, `npcs`, `specialFeatures`) mit individuellen
  Reveal-Toggles pro Element, GM-Steuerung und Spieler-Sichtbarkeit.

#### Aktualisierte Kapitel

- `07-gm-dashboard/index.adoc` — Neue Abschnitte zu:
  - NextSceneDialog (Wegentscheidungen / Story-Path) und
    `scene_connections`-Graph.
  - Travel-Routes — individuelle Wege pro Charakter auf der Party-Map,
    inklusive Zeitraffer-Wiedergabe.
  - Right-Sidebar-Redesign (Accordion-Layout) im Live-Session-Modus.
  - NPC-Auto-Wurf mit Vor-Filterung auf szenen-anwesende NPCs.
- `02-spielmechaniken/INDEX.adoc` — neue Querverweise auf
  Social-Interaction und Szenen-Reveal.

#### Zusammengefasste Aenderungen am System

- _Skill-Check-Flow_: SkillCheckModal im Player nutzt jetzt den echten
  `skillModifier` aus dem computed Sheet (Fallback: Ability-Modifier, dann 0).
  Aliasse wie "motiv erkennen" -> `insight` resilient normalisiert.
- _Scene-Activation_: Szenenwechsel propagiert zuverlaessig zum Player; der
  hartkodierte `mode='social'`-Fallback wurde durch ein
  `mapSceneTypeToMode()`-Mapping ersetzt.
- _Notes_: Persistenz korrigiert (API-Envelope `{ data }` vs. Raw-Shape).
- _Polls_: Option-IDs werden jetzt serverseitig als UUIDs vergeben.
- _Dead Code_: `MOCK_PLAYERS`, `MOCK_SCENES`, `MOCK_TIMER` entfernt —
  consumerseitig wird jetzt der echte Backend-Zustand verwendet.
- _HP-Bar_: Freischwebende HP-Anzeige im Player entfernt (doppelt zur
  Charakter-Karte).
- _Dialog-Accessibility_: `aria-describedby` in 7 Player- und 1 GM-Dialog
  ergaenzt.
- _Layout-Overlap_: Grid-Cap fuer GM und fixer Header-Abstand im Player
  beseitigen Ueberlappungen in der Live-Ansicht.

#### ADRs (workspace-docs)

- ADR-002 Enum-Normalisierung (UPPERCASE -> lowercase_snake_case,
  Migration-Plan fuer `skill_check.skill`, `scene.type`, `npc.disposition`).
- ADR-003 Cross-Repo-Drift-Scan (`shared` -> api + 3 Frontends).

### Convention

- _Ein Commit pro Problem_ — ab diesem Sprint strikt: pro behobener Regression
  oder fachlichem Inkrement ein eigener Commit, kein Bundle-Commit.
