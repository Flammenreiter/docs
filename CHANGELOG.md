# Changelog

Alle Aenderungen an der Flammenreiter-Dokumentation.

## [Unreleased]

### Sprint 2026-05-11 — Welle-4 AsciiDoc-Cleanup (STORY-WELLE-4-DOCS)

Basierend auf dem Cross-LLM-Audit `workspace-docs/audits/2026-05-10/docs-claude.md` (303 Z. Hauptaudit + Gemini-Diff). 12 Akzeptanzkriterien, 18 atomare Commits in `refactor/welle-4-2026-05-11`.

**Quick-Wins:**
- _AC-4-A_ — `02-spielmechaniken/INDEX.adoc` (UPPERCASE, md5-Dublette mit `index.adoc`) konsolidiert auf lowercase. Root `index.adoc:223` Include-Pfad angepasst.
- _AC-4-E_ — 24 Markdown-Style-Links `[Title](./file.adoc)` in 01-welt-lore + 02-spielmechaniken auf `link:./file.adoc[Title]` konvertiert. Inhaltsverzeichnisse jetzt in PDF/HTML klickbar.
- _AC-4-I_ — Root-Artefakte aufgeraeumt: `feature-workflow.html` (404 Z. Orphan-Mockup) + `flux-image-prompts.md` (redundant) geloescht. `generate-images.mjs` -> `scripts/`, `ANALYSIS-2026-04-19.md` -> `meta/`.

**Strukturelle Entscheidungen:**
- _AC-4-B_ — `flammenreiter.adoc` (parallel Master-Dok mit Stack-Drift) geloescht. `index.adoc` ist alleiniges Master-Dokument (vom Makefile gebaut).
- _AC-4-D_ — 14 orphan Sub-Files via `include::file.adoc[leveloffset=+1]` in jeweilige Chapter-Indizes eingebunden:
  - 02-spielmechaniken: 6 Sprint-04/05-Dateien (social-interaction, szenen-reveal-toggles, cantrips, wegenetz-live-play, story-arc-system, jahr-1-blueprint) + 14 weitere
  - 04-architektur: ai-prompt-system (ADR-017), flux-pipeline, backend, repo-struktur, shared-types
  - 05-charakter-sheet: journey-narrative (EPIC-24), architektur, domains, use-cases
  - 06-rassen-klassen: akademie-schueler (DOCS-001), npc-katalog (DOCS-004), rassen, klassen, herkunft
  - 07-gm-dashboard: session-abschluss, story-tagebuch
  - 03-datenbank: schema-uebersicht, schema-details
  - 10-infrastruktur: deployment
  - Resultat: ~3.300 Zeilen Spec-Inhalt jetzt im Haupt-PDF sichtbar
- _AC-4-H_ — `10-infrastruktur/index.adoc` von PLACEHOLDER auf Live-Stand (Railway+Cloudflare Pages+GitHub Packages) umgeschrieben. Orphan `deployment.adoc` als Live-Doku integriert. Veraltete Vercel/Edge-Functions/EAS-Pfade entfernt.
- _AC-4-G_ — `AUDIT.adoc` (6 Wochen veraltet) als `meta/AUDIT-2026-03-25.adoc` archiviert. Neue `AUDIT.adoc` als high-level Stub mit Verweisen auf `workspace-docs/audits/` als kanonische Quelle.

**Live-Stack-Sync (AC-4-C):**
- `04-architektur/index.adoc`, `backend.adoc`, `repo-struktur.adoc` komplett neu geschrieben:
  - _Raus:_ Supabase PostgREST (~70%), Edge Functions (~5%) als Primaer-Layer, Vercel, EAS Build (Expo), fiktive `flammenreiter-framework/{shared-types,-ui,-api}` und `flammenreiter-supabase/` Repos.
  - _Rein:_ Hono 4.6 + Prisma 6 + PostgreSQL (Supabase) auf Railway, Cloudflare Pages fuer 3 React-19-FSD-Frontends, GitHub Packages fuer `@flammenreiter/api-types`, UE5 (kein Expo/React-Native), korrektes 8-Repo-Layout (workspace + shared + api + 3 Frontends + docs + ue5).
- `shared-types.adoc`: `supabase gen types`-Pipeline durch Prisma + zod-to-openapi + openapi-typescript ersetzt. `npm publish` -> `pnpm changeset`-Workflow.

**Image-Assets (AC-4-J):**
- 10 Chapter-Banner-Images als Section-Cover in Chapter-Indizes eingebunden (`image::chapter-*.png[width=100%]`).
- `images/FLUX-PROMPTS.md` (redundant mit `scripts/generate-images.mjs`) geloescht.
- Diagram-Bilder + `login-academy-gates.png` bleiben fuer spaetere Embeddings.

**UC-Strategie (AC-4-F):**
- `05-charakter-sheet/use-cases.adoc`: Titel von "Alle 50+ Workflows" auf "44 Domain-UCs" korrigiert (tatsaechlicher Stand). Verweis auf `.scrum/usecases/` als kanonische 340-UC-Quelle ergaenzt.

**Polish (AC-4-K + AC-4-L):**
- _AC-4-K_: 8 `[[anchor]]`-Definitionen + `<<anchor,Label>>`-xrefs im Root-`index.adoc` fuer Kern-Konzepte (Traits, Dragon Bond, Cantrips, Wegenetz, Social Interaction, Story Arc, EffectProcessor, Unified Prompts ADR-017). Enables in-PDF concept jumping.
- _AC-4-L_: Status-Spalte im Root-`index.adoc` von Emoji ✅/📝 auf Text-Labels (Live/Spec/WIP/Placeholder) + NOTE/WARNING-Admonitions umgestellt. Stale "Letztes Update: 25.03.2026" durch `{revdate}` (build-date) ersetzt.

**Build-Verify:**
- Alle 5 PDF-Build-Targets gruen: `index.pdf` (14 MB, +280% vs vorher dank inklusiver orphans), `spieler-handbuch.pdf`, `gm-manual.pdf`, `player-manual.pdf`, `setup-guide.pdf`.
- HTML-Build von `index.html` ebenso erfolgreich.

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
