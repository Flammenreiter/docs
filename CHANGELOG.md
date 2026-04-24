# Changelog

Alle Aenderungen an der Flammenreiter-Dokumentation.

## [Unreleased]

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
