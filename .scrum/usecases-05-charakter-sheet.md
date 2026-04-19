# Use Cases: 05 — Charakter Sheet

## Uebersicht

Kern-UI fuer Spieler. Explizite Use Cases mit UC-IDs, MVP-ready.
Kontextbasiertes UI mit automatischem Modus-Wechsel.

---

## Social Domain

### UC-SOC-01: Trait-Spektrum anzeigen
- **Akteur:** Spieler
- **Beschreibung:** Spider-Chart mit -5 bis +5 Anzeige aller Traits.

### UC-SOC-02: NPC-Disposition pruefen
- **Akteur:** Spieler
- **Beschreibung:** Live-Emoji-Anzeige der NPC-Stimmung gegenueber dem Charakter.

### UC-SOC-03: Renown & Bekanntheit pruefen
- **Akteur:** Spieler
- **Beschreibung:** Aktuelle Bekanntheit mit Typ und Reichweite einsehen.

### UC-SOC-04: Organisations-Mitgliedschaften anzeigen
- **Akteur:** Spieler
- **Beschreibung:** Alle aktiven Mitgliedschaften mit Rang und Boni.

### UC-SOC-05: Blender-System anzeigen
- **Akteur:** Spieler
- **Beschreibung:** Wahres vs. oeffentliches Selbst nebeneinander darstellen.

---

## Combat Domain

### UC-CMB-01: Ability Score + Modifier anzeigen
- **Akteur:** Spieler
- **Beschreibung:** Werte mit vollstaendiger Modifier-Chain ueber EffectProcessor.

### UC-CMB-02: Spell casten und Slot verbrauchen
- **Akteur:** Spieler
- **Beschreibung:** Zauber auswaehlen, Slot-Verbrauch, Konzentrations-Tracking.

### UC-CMB-03: HP-Management
- **Akteur:** Spieler
- **Beschreibung:** Damage, Healing, Temp HP mit visueller Anzeige.

### UC-CMB-04: Waffe/Angriff wuerfeln
- **Akteur:** Spieler
- **Beschreibung:** Angriffswurf mit automatischer Modifier-Berechnung.

### UC-CMB-05: Skill-Check durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Skill-Check mit Proficiency und situativen Modifiern.

### UC-CMB-06: Conditions & Exhaustion tracken
- **Akteur:** Spieler, GM
- **Beschreibung:** Aktive Conditions und Exhaustion-Level anzeigen und verwalten.

---

## Equipment Domain

### UC-EQP-01: Gear-Page (BG3-Style Paper-Doll)
- **Akteur:** Spieler
- **Beschreibung:** Visuelles Ausruestungs-UI im Baldur's Gate 3 Stil.

### UC-EQP-02: Item ausruesten via Slot-Click
- **Akteur:** Spieler
- **Beschreibung:** Drag & Drop oder Click zum Ausruesten in Equipment-Slots.

### UC-EQP-03: Inventar durchsuchen
- **Akteur:** Spieler
- **Beschreibung:** Suchfunktion ueber alle Items im Inventar.

### UC-EQP-04: Camp-Truhe (Party Storage)
- **Akteur:** Spieler
- **Beschreibung:** Gemeinsamer Party-Storage, nur im Camp zugaenglich.

---

## Downtime Domain

### UC-DWN-01: Crafting-Schritt ausfuehren
- **Akteur:** Spieler
- **Beschreibung:** Einzelnen Crafting-Schritt mit Check und Ergebnis durchfuehren.

### UC-DWN-02: Profession trainieren
- **Akteur:** Spieler
- **Beschreibung:** XP in Profession investieren, Level-Up bei Schwelle.

### UC-DWN-03: Item reparieren
- **Akteur:** Spieler
- **Beschreibung:** Durability eines Items durch Reparatur wiederherstellen.

---

## Dragon Bond Domain

### UC-DRG-01: Drachen-Sheet anzeigen
- **Akteur:** Spieler
- **Beschreibung:** Eigenes Sheet fuer den gebundenen Drachen mit Stats und Bond-Phase.

### UC-DRG-02: Taegliche Drachen-Pflege durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Fuettern, Striegeln als Pflicht-Aktivitaeten.

### UC-DRG-03: Drachen-Equipment verwalten
- **Akteur:** Spieler
- **Beschreibung:** Sattel, Ruestung, Taschen am Drachen verwalten.

### UC-DRG-04: Trait-Resonanz anzeigen
- **Akteur:** Spieler
- **Beschreibung:** Dual Spider-Chart fuer Rider/Dragon Trait-Vergleich.

---

## Identity & Level-Up

### UC-IDN-01: Character Identity Header anzeigen
- **Akteur:** Spieler
- **Beschreibung:** Name, Portrait, Klasse, Level, Rasse im Header-Bereich.

### UC-IDN-02: Level-Up durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Gefuehrter Level-Up mit Drachen-Dialog statt Listenwahl.

---

## System & Plattform

### UC-SYS-01: Automatischer Kontext-Modus Wechsel
- **Akteur:** System
- **Beschreibung:** UI wechselt automatisch zwischen Social, Combat, Explore, Downtime Modus.

### UC-SYS-02: GM-Pop-up an Spieler senden
- **Akteur:** GM
- **Beschreibung:** GM kann direkte Nachrichten/Hinweise an einzelne Spieler senden.

### UC-SYS-03: Party-View
- **Akteur:** Spieler
- **Beschreibung:** Mitspieler-Sheets mit eingeschraenkter Sicht anzeigen.

### UC-FND-01: Foundry Pre/Post-Sync
- **Akteur:** System
- **Beschreibung:** Daten vor/nach Foundry-Session synchronisieren.

### UC-RST-01: Short Rest durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Short Rest mit Hit Dice Verbrauch und Feature-Recovery.

### UC-RST-02: Long Rest durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Long Rest mit vollstaendiger Recovery und Drachen-Pflege-Check.

---

## Spells & Attunement

### UC-SPL-01: Spells vorbereiten
- **Akteur:** Spieler (Wizard/Cleric/Druid/Paladin)
- **Beschreibung:** Taegliche Spell-Vorbereitung aus bekanntem Spell-Pool.

### UC-SPL-02: Spell aus Scroll ins Spellbook kopieren
- **Akteur:** Spieler (Wizard only)
- **Beschreibung:** Arcana-Check und Gold-Kosten fuer Scroll-to-Spellbook Transfer.

### UC-ATT-01: Item Attunement verwalten
- **Akteur:** Spieler
- **Beschreibung:** Attunement-Slots (max 3) verwalten, Items an-/abschalten.

---

## Notes & Quest

### UC-NTS-01: Session-Notiz erstellen
- **Akteur:** Spieler
- **Beschreibung:** Freie Notizen waehrend der Session erfassen.

### UC-NTS-02: Notiz mit Party teilen
- **Akteur:** Spieler
- **Beschreibung:** Eigene Notizen fuer Mitspieler sichtbar machen.

### UC-NTS-03: Notizen durchsuchen
- **Akteur:** Spieler
- **Beschreibung:** Volltextsuche ueber alle eigenen und geteilten Notizen.

---

## Quest & Trading

### UC-QST-01: Quest-Belohnung verteilen
- **Akteur:** GM
- **Beschreibung:** GM-Workflow fuer XP, Gold, Items als Quest-Reward.

### UC-TRD-01: Item bei Haendler kaufen/verkaufen
- **Akteur:** Spieler
- **Beschreibung:** Handel-UI mit dynamischen Preisen und Inventar-Vergleich.

### UC-TRD-02: Feilschen durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Contested Roll Interface fuer Preis-Verhandlung.

---

## Verbrauchsgueter & Diverses

### UC-CON-01: Standardmunition automatisch auffuellen
- **Akteur:** System
- **Beschreibung:** Standardmunition wird bei Long Rest oder Shop-Besuch aufgefuellt.

### UC-CHR-01: Charakter-Erstellungs-Wizard
- **Akteur:** Spieler
- **Beschreibung:** End-to-End Charakter-Erstellung mit AI-Interview fuer Kindheitserlebnis.

### UC-TRV-01: Reise-Animation auf Karte
- **Akteur:** System
- **Beschreibung:** Animierte Bewegung der Party auf der Weltkarte.

### UC-BNT-02: Bounty entdecken und annehmen
- **Akteur:** Spieler
- **Beschreibung:** Kopfgeld-Angebote finden und als Quest annehmen.

---

## Onboarding-Flow (NEU — UC-NEW-04)

### UC-ONB-01: Onboarding-Flow mit KI-Interview
- **Akteur:** Spieler
- **Prioritaet:** P0
- **Beschreibung:** Mehrstufiger Onboarding-Prozess: 6 Attribut-Kammern (STR, DEX, CON, INT, WIS, CHA) mit narrativen Entscheidungen, die Ability Scores beeinflussen. Danach KI-Kroete "Ilja" Interview (5-7 Fragen), das Akademie-Haus, Persoenlichkeits-Traits und Kindheitserlebnis ableitet. Parallel Portrait-Generierung.
- **API-Endpoints:**
  - `GET /onboarding/chambers` — 6 Attribut-Kammern mit je 3 Optionen
  - `GET /onboarding/random-names` — 5731 Namen fuer 13 Rassen
  - `POST /images/generate-onboarding-portrait` — Portrait (Rate-Limited: 1/h pro User)
  - `POST /onboarding/complete` — Character-Erstellung mit allen Onboarding-Daten
- **Edge Function:** `character-interview/index.ts` — KI-Interview mit Anthropic Claude
- **Datenbank:** OnboardingChamber Model (6 Kammern, 18 Optionen, geseedet), Interview-Result als CharacterLog (Typ: interview)
- **Ersetzt/erweitert:** UC-CHR-01 (Charakter-Erstellungs-Wizard)

---

## Lore Library — Spieler-Seite (NEU — UC-NEW-14)

### UC-LOR-01: Lore-Bibliothek im Charakter-Sheet
- **Akteur:** Spieler
- **Prioritaet:** P1
- **Beschreibung:** Zugang zur Lore Library direkt aus dem Charakter-Sheet. Nur entdeckte Artikel sichtbar. Kategorie-Filter, Volltextsuche, Featured-Artikel.
- **Siehe auch:** UC-WLT-08 (Voll-Definition in 01-Welt-Lore)

---

## Status

| Bereich | Anzahl UCs | Status |
|---------|-----------|--------|
| Social Domain | 5 | MVP-ready |
| Combat Domain | 6 | MVP-ready |
| Equipment Domain | 4 | MVP-ready |
| Downtime Domain | 3 | MVP-ready |
| Dragon Bond Domain | 4 | MVP-ready |
| Identity & Level-Up | 2 | MVP-ready |
| System & Plattform | 6 | MVP-ready |
| Spells & Attunement | 3 | MVP-ready |
| Notes & Quest | 3 | MVP-ready |
| Quest & Trading | 2 | MVP-ready |
| Verbrauchsgueter | 4 | MVP-ready |
| Onboarding-Flow | 1 | **NEU — Implementiert (P0)** |
| Lore Library | 1 | **NEU — Implementiert** |
| **Gesamt** | **44** | |
