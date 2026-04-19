# Use Cases: 08 — Design System

## Uebersicht

UI-Komponentendomäne. Use Cases beschreiben die Komponentenstruktur
(Atomic Design) und deren Einsatz in den verschiedenen Kontextmodi.

---

## Atoms (14 Basis-Komponenten)

### UC-DS-01: StatBox verwenden
- **Beschreibung:** Einzelner Zahlenwert mit Label und optionalem Modifier.

### UC-DS-02: PipTracker verwenden
- **Beschreibung:** Visuelle Punkt-Anzeige (z.B. Hit Dice, Spell Slots, Bond Level).

### UC-DS-03: Badge verwenden
- **Beschreibung:** Status-Badge fuer Conditions, Rassen-Tags, Organisationen.

### UC-DS-04: ProgressBar verwenden
- **Beschreibung:** Fortschrittsbalken fuer HP, XP, Bond-Phase, Durability.

---

## Molecules (17+ zusammengesetzte Komponenten)

### UC-DS-05: TraitSlider verwenden
- **Beschreibung:** Interaktiver Slider fuer einzelne Trait-Werte (-5 bis +5).

### UC-DS-06: SpiderChart verwenden
- **Beschreibung:** D3.js-basiertes Radar-Chart fuer Trait-Gesamtdarstellung.

### UC-DS-07: ItemCard verwenden
- **Beschreibung:** Kompakte Item-Darstellung mit Rarity, Quality, Durability.

### UC-DS-08: NPCReactionBadge verwenden
- **Beschreibung:** Emoji + Farbe fuer aktuelle NPC-Stimmung.

### UC-DS-09: RollResult verwenden
- **Beschreibung:** Wuerfel-Ergebnis mit aufgeschluesselter Modifier-Chain.

---

## Organisms (15+ komplexe Komponenten)

### UC-DS-10: CharacterHeader verwenden
- **Beschreibung:** Vollstaendiger Header mit Portrait, Name, Level, Klasse, HP-Bar.

### UC-DS-11: SpellList verwenden
- **Beschreibung:** Spell-Verwaltung mit Level-Gruppierung, Slot-Tracking, Vorbereitung.

### UC-DS-12: InventoryGrid verwenden
- **Beschreibung:** Container-basiertes Inventar-Grid mit Drag & Drop.

### UC-DS-13: CombatTracker verwenden
- **Beschreibung:** Initiative-Reihenfolge mit HP, Conditions, Turn-Indicator.

### UC-DS-14: QuestJournal verwenden
- **Beschreibung:** Quest-Liste mit Status, Objectives, Fortschrittsanzeige.

---

## Templates (4 Kontext-Modi)

### UC-DS-15: SocialMode Template
- **Beschreibung:** Layout fuer Social-Kontext (Traits, Disposition, Dialog-Optionen).

### UC-DS-16: CombatMode Template
- **Beschreibung:** Layout fuer Kampf-Kontext (HP, Aktionen, Initiative, Conditions).

### UC-DS-17: ExploreMode Template
- **Beschreibung:** Layout fuer Erkundungs-Kontext (Karte, Inventar, Reise-Optionen).

### UC-DS-18: DowntimeMode Template
- **Beschreibung:** Layout fuer Downtime-Kontext (Crafting, Training, Drachen-Pflege).

---

## Shared UI Patterns (13+)

### UC-DS-19: MechanicalEffect-Renderer nutzen
- **Beschreibung:** Einheitliche Darstellung mechanischer Effekte (Buffs, Debuffs, Modifikatoren).

### UC-DS-20: ModifierChain nutzen
- **Beschreibung:** Aufschluesselung aller Modifier in einer transparenten Kette.

### UC-DS-21: Progress Meter nutzen
- **Beschreibung:** Generischer Fortschrittsbalken fuer verschiedene Systeme.

---

## Design Tokens

### UC-DS-22: Typography-System anwenden
- **Beschreibung:** Einheitliche Schriftgroessen, -gewichte und -stile.

### UC-DS-23: Farb-System anwenden
- **Beschreibung:** Thematische Farbpalette (Feuer-Toene, Dunkel-Modus).

### UC-DS-24: Abstands-System anwenden
- **Beschreibung:** Konsistente Spacing-Skala fuer alle Komponenten.

---

## Externe Libraries

### UC-DS-25: D3.js fuer Spider Charts und Session-Planner
- **Beschreibung:** Datenvisualisierung fuer Traits und Session-Planung.

### UC-DS-26: Leaflet fuer Weltkarten
- **Beschreibung:** Interaktive Karte mit Fog of War, POIs, Reise-Routen.

---

## Status

| Bereich | Anzahl UCs | Status |
|---------|-----------|--------|
| Atoms | 4 | Designed |
| Molecules | 5 | Designed |
| Organisms | 5 | Designed |
| Templates | 4 | Designed |
| Shared Patterns | 3 | Designed |
| Design Tokens | 3 | Designed |
| Externe Libraries | 2 | Designed |
| **Gesamt** | **26** | |
