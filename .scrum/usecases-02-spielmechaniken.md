# Use Cases: 02 — Spielmechaniken

## Uebersicht

Kerndomäne mit allen regelbasierten Systemen. Komplett designed, bildet die Grundlage
fuer Charakter-Sheet und GM-Dashboard.

---

## Traits System

### UC-MEC-01: Trait-Spektrum (-5 bis +5) visualisieren
- **Akteur:** Spieler, GM
- **Beschreibung:** Spider-Chart-Darstellung aller Trait-Werte eines Charakters.

### UC-MEC-02: Trait-Evolution durch Entscheidungen triggern
- **Akteur:** System, GM
- **Beschreibung:** Traits verschieben sich basierend auf Spielerentscheidungen (automatisch oder GM-gesteuert).

### UC-MEC-03: Exclusion-Rules durchsetzen (Hard, Soft, Tension)
- **Akteur:** System
- **Beschreibung:** Bestimmte Trait-Kombinationen sind ausgeschlossen oder erzeugen Spannungen.

### UC-MEC-04: Blender-System anwenden
- **Akteur:** GM, System
- **Beschreibung:** Widerspruch zwischen oeffentlichem Bild und wahrem Charakter erkennen und in NPC-Reaktionen einbeziehen.

---

## Items & Inventar

### UC-MEC-05: Rarity x Quality Matrix (35 Power-Level) nutzen
- **Akteur:** GM, System
- **Beschreibung:** Items haben eine kombinierte Seltenheit x Qualitaet, die den Power-Level bestimmt.

### UC-MEC-06: Durability-Zustaende verwalten
- **Akteur:** Spieler, GM
- **Beschreibung:** 6 Zustaende (Makellos, Gut, Abgenutzt, Beschaedigt, Kaputt, Zerstoert) mit mechanischen Auswirkungen.

### UC-MEC-07: Ausruestung pflegen und reparieren
- **Akteur:** Spieler
- **Beschreibung:** Downtime-Aktivitaet zur Item-Reparatur mit Professions-Check.

### UC-MEC-08: Container-basiertes realistisches Inventar verwenden
- **Akteur:** Spieler
- **Beschreibung:** Inventar mit physischen Containern (Rucksack, Beutel, Truhe) statt abstraktem Slot-System.

### UC-MEC-09: Kleidung → NPC-Reaktion koppeln
- **Akteur:** System
- **Beschreibung:** Getragene Kleidung beeinflusst direkt NPC-Disposition und DC-Modifikatoren.

### UC-MEC-10: Ueberlastung und Tragkapazitaet beachten
- **Akteur:** System, Spieler
- **Beschreibung:** Gewichtsbasiertes System mit Penalties bei Ueberlastung.

---

## Beziehungen & Renown

### UC-MEC-11: Individuelle NPC-Disposition (-100 bis +100) tracken
- **Akteur:** GM, System
- **Beschreibung:** Jeder NPC hat eine individuelle Disposition gegenueber jedem Charakter.

### UC-MEC-12: Gruppen-Disposition zwischen Rassen/Organisationen verwalten
- **Akteur:** GM, System
- **Beschreibung:** Rassische und organisatorische Vorurteile beeinflussen Basis-Disposition.

### UC-MEC-13: Renown-System mit Kaskaden-Effekt nutzen
- **Akteur:** System
- **Beschreibung:** Bekanntheit breitet sich kaskadierend aus (lokal → regional → global).

### UC-MEC-14: Renown-Typ (Hero/Villain/Celebrity) einstellen
- **Akteur:** GM, System
- **Beschreibung:** Art der Bekanntheit beeinflusst NPC-Reaktionen unterschiedlich.

### UC-MEC-15: Trait-Interaktionen waehrend Dialog anwenden
- **Akteur:** System
- **Beschreibung:** Matching/Clashing Traits zwischen Spieler und NPC modifizieren Dialog-Optionen.

---

## NPC-Reaktion & DC-Berechnung

### UC-MEC-16: 8-Schritte-NPC-Reaktion-Pipeline durchfuehren
- **Akteur:** System, GM
- **Beschreibung:** Pipeline: Kontext → Wer → Bekannt → Basis-Disposition → Trait-Match → Kleidung → Override → Emotion.

### UC-MEC-17: 10-Schritte-DC-Berechnung mit dynamischen Modifikatoren
- **Akteur:** System
- **Beschreibung:** Vollstaendige DC-Berechnung mit allen Modifikatoren (Trait, Renown, Kleidung, Situation etc.).

### UC-MEC-18: GM-Overrides setzen
- **Akteur:** GM
- **Beschreibung:** GM kann jede automatische Berechnung manuell ueberschreiben.

---

## Wuerfel-System

### UC-MEC-19: Roll-Log mit 3-facher Verlinkung fuehren
- **Akteur:** System
- **Beschreibung:** Jeder Wurf ist verlinkt mit Charakter-Statistik, Session und Gruppe.

### UC-MEC-20: Modifier-Chain vollstaendig aufschluesseln
- **Akteur:** System, Spieler
- **Beschreibung:** Transparente Darstellung aller Modifier, die in einen Wurf einfliessen.

### UC-MEC-21: 4 Roll-Kategorien nutzen
- **Akteur:** Spieler, GM
- **Beschreibung:** Standard, Save, Hidden, Contested Rolls mit unterschiedlicher Sichtbarkeit.

### UC-MEC-22: Batch Rolls durchfuehren
- **Akteur:** GM
- **Beschreibung:** Mehrere Wuerfe gleichzeitig (z.B. fuer mehrere NPCs).

### UC-MEC-23: NPC Auto-Roll verwenden
- **Akteur:** System, GM
- **Beschreibung:** Automatische Wuerfe fuer NPCs basierend auf deren Stats.

---

## Oekonomie & Handel

### UC-MEC-24: Dynamische Preise durch 6 Multiplikatoren berechnen
- **Akteur:** System
- **Beschreibung:** Preise variieren nach Region, Angebot, Nachfrage, Renown, Disposition, Feilsch-Ergebnis.

### UC-MEC-25: Tauschhandel durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Tauschhandel als normale Handelsform (nicht Muenzbasiert).

### UC-MEC-26: Feilschen mit Contested Rolls
- **Akteur:** Spieler
- **Beschreibung:** Charisma/Persuasion vs. NPC-Insight als Contested Roll.

### UC-MEC-27: Schwarzmarkt-Zugang verwalten
- **Akteur:** GM, System
- **Beschreibung:** Zugang zu illegalen Waren basierend auf Renown und Kontakten.

### UC-MEC-28: Party-Lager mit Truhe verwenden
- **Akteur:** Spieler
- **Beschreibung:** Gemeinsames Party-Lager mit geteiltem Storage.

---

## Professionen & Crafting

### UC-MEC-29: 5 Professions-Level nutzen
- **Akteur:** Spieler
- **Beschreibung:** Lehrling → Geselle → Meister → Grossmeister → Legendaer mit steigenden Boni.

### UC-MEC-30: Multi-Step Crafting durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Crafting in mehreren Schritten, jeder Schritt mit eigenem Check.

### UC-MEC-31: Bonus-/Nachteil-Eigenschaften pro Schritt generieren
- **Akteur:** System
- **Beschreibung:** Jeder Crafting-Schritt kann Bonus- oder Nachteil-Eigenschaften auf das Endprodukt bringen.

### UC-MEC-32: Trait-Interaktionen im Crafting anwenden
- **Akteur:** System
- **Beschreibung:** Charakter-Traits beeinflussen Crafting-Ergebnisse.

---

## Dragon Bond

### UC-MEC-33: 5 Bindungs-Phasen durchlaufen
- **Akteur:** Spieler
- **Beschreibung:** Imprinting → Trust Building → Emotional Bond → Deep Bond → Soul Bond.

### UC-MEC-34: Taegliche Drachen-Pflege durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Fuettern, Striegeln als Pflicht-Aktivitaeten mit Bond-Auswirkung.

### UC-MEC-35: Optional Care durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Jagen, Training, Geschichten als optionale Pflege mit Bond-Bonus.

### UC-MEC-36: Penalty-System bei Vernachlaessigung
- **Akteur:** System
- **Beschreibung:** Versaeumte Pflege fuehrt zu Bond-Abbau und Verhaltensaenderungen.

### UC-MEC-37: Trait-Resonanz zwischen Rider und Dragon anwenden
- **Akteur:** System
- **Beschreibung:** Matching Traits zwischen Reiter und Drache erzeugen Synergien oder Konflikte.

### UC-MEC-38: Dragon Equipment verwalten
- **Akteur:** Spieler
- **Beschreibung:** Drachenruestung, Sattel, Taschen mit eigener Durability.

---

## Reise & Wetter

### UC-MEC-39: Reise-Routen mit Pacing-Optionen planen
- **Akteur:** GM, Spieler
- **Beschreibung:** Careful/Normal/Forced March mit unterschiedlichen Geschwindigkeiten und Risiken.

### UC-MEC-40: Taegliche Encounters wuerfeln
- **Akteur:** GM, System
- **Beschreibung:** Zufalls-Encounters basierend auf Region und Reise-Pacing.

### UC-MEC-41: Proviant-Verbrauch tracken
- **Akteur:** System, Spieler
- **Beschreibung:** Automatischer Proviant-Abzug pro Reisetag.

### UC-MEC-42: Monatliches dynamisches Wetter wuerfeln
- **Akteur:** GM, System
- **Beschreibung:** Wettersystem mit saisonalen Tabellen und mechanischen Auswirkungen.

### UC-MEC-43: Fog of War pro Charakter verwalten
- **Akteur:** System, GM
- **Beschreibung:** Jeder Charakter hat eigene entdeckte/unentdeckte Bereiche auf der Karte.

---

## Rechtssystem & Dialog

### UC-MEC-44: Straftat registrieren
- **Akteur:** GM, System
- **Beschreibung:** Detection → Konflikt → Konsequenzen Pipeline.

### UC-MEC-45: Wanted Level tracken (0-5)
- **Akteur:** System
- **Beschreibung:** Eskalierendes Wanted-Level mit steigenden Konsequenzen.

### UC-MEC-46: Bounty-System verwalten
- **Akteur:** GM
- **Beschreibung:** Kopfgelder erstellen, entdecken und einloesen.

### UC-MEC-47: Regionale Gesetzestexte implementieren
- **Akteur:** GM
- **Beschreibung:** Unterschiedliche Gesetze pro Region mit eigenen Strafen.

### UC-MEC-48: Dialog-Templates mit Emotions-Ausloesern verwenden
- **Akteur:** GM
- **Beschreibung:** NPC-Dialog-Vorlagen mit automatischen Emotions-Triggern basierend auf Traits/Disposition.

### UC-MEC-49: Geruechte-System mit Netzwerk-Propagation nutzen
- **Akteur:** System, GM
- **Beschreibung:** Geruechte breiten sich ueber NPC-Netzwerke aus und veraendern sich dabei.

---

## Quest & Szenen

### UC-MEC-50: 8 Quest-Typen nutzen
- **Akteur:** GM
- **Beschreibung:** Verschiedene Quest-Typen mit eigenen Story-Hooks und Strukturen.

### UC-MEC-51: Quest-Objectives strukturieren
- **Akteur:** GM
- **Beschreibung:** Quests mit Haupt- und Nebenzielen, Tracker im Journal.

### UC-MEC-52: Quest-Rewards verteilen
- **Akteur:** GM
- **Beschreibung:** XP, Gold, Items, Renown als Quest-Belohnungen.

### UC-MEC-53: 6 Szenen-Typen implementieren
- **Akteur:** GM
- **Beschreibung:** Social, Combat, Discovery, Chase, Moral, Environmental mit eigener Mechanik.

### UC-MEC-54: Szenen-Uebergaenge mit reveal_elements durchfuehren
- **Akteur:** GM
- **Beschreibung:** Schrittweises Einblenden von Szenen-Elementen fuer dramatische Enthuellung.

### UC-MEC-55: Loot-Verteilung nach Kampf
- **Akteur:** GM
- **Beschreibung:** Loot-Tabellen mit automatischer Verteilung oder GM-Zuweisung.

---

## Organisationen

### UC-MEC-56: Organisations-Typen verwalten
- **Akteur:** GM
- **Beschreibung:** Akademie, Gilde, Militaer, Adel, Kult, Informal mit eigenen Mechaniken.

### UC-MEC-57: Rang-Systeme mit mechanischen Boni nutzen
- **Akteur:** System, Spieler
- **Beschreibung:** Aufstieg in Organisationen bringt mechanische Boni und Zugang.

### UC-MEC-58: Mitgliedschafts-Anforderungen durchsetzen
- **Akteur:** System
- **Beschreibung:** Trait-Mindestwerte und Level-Anforderungen fuer Beitritt.

### UC-MEC-59: Auto-Reputations-Vererbung tracken
- **Akteur:** System
- **Beschreibung:** Mitgliedschaft beeinflusst automatisch Reputation bei verwandten Organisationen.

---

## Kampf-System

### UC-MEC-60: Initiative und Turn Order
- **Akteur:** System
- **Beschreibung:** D&D 5e + BG3 Initiative mit automatischer Sortierung.

### UC-MEC-61: Attack Rolls durchfuehren
- **Akteur:** Spieler
- **Beschreibung:** Angriffswuerfe mit vollstaendiger Modifier-Chain.

### UC-MEC-62: Spell Casting aktivieren
- **Akteur:** Spieler
- **Beschreibung:** Zauber wirken mit Slot-Verbrauch und Komponenten-Check.

### UC-MEC-63: Surfaces & Environmental Hazards nutzen
- **Akteur:** GM, System
- **Beschreibung:** BG3-inspirierte Oberflaechen (Feuer, Eis, Gift) mit mechanischen Effekten.

### UC-MEC-64: Gravity & Verticality-Mechaniken
- **Akteur:** System
- **Beschreibung:** Hoehe und Schwerkraft als taktische Elemente im Kampf.

### UC-MEC-65: Cover & Concealment berechnen
- **Akteur:** System
- **Beschreibung:** Deckung und Tarnung modifizieren AC und Trefferchance.

### UC-MEC-66: Conditions tracken
- **Akteur:** System, GM
- **Beschreibung:** Alle D&D 5e Conditions plus Custom Conditions.

### UC-MEC-67: Encounter-Generierung nach Difficulty Rating
- **Akteur:** GM, System
- **Beschreibung:** Automatische Encounter-Zusammenstellung basierend auf Party-Level.

---

## Kalender & Zeit

### UC-MEC-68: Harptos-Kalender verwenden
- **Akteur:** System
- **Beschreibung:** 12 Monate x 30 Tage mit Schaltfeiertagen.

### UC-MEC-69: Akademie-Phasen einbinden
- **Akteur:** System
- **Beschreibung:** Schuljahr-Phasen mit Unterricht, Pruefungen, Ferien.

### UC-MEC-70: Jahreszeiten-Effekte anwenden
- **Akteur:** System
- **Beschreibung:** Saisonale Effekte auf Reise, Wetter, Verfuegbarkeit.

### UC-MEC-71: Feiertage tracken
- **Akteur:** System, GM
- **Beschreibung:** In-Game Feiertage mit Events und besonderen NPCs.

### UC-MEC-72: Downtime-Aktivitaeten pro Charakter assignen
- **Akteur:** Spieler, GM
- **Beschreibung:** Zuweisung von Downtime-Aktivitaeten waehrend Zeitsprüngen.

### UC-MEC-73: Time-Skip-Mechanik durchfuehren
- **Akteur:** GM
- **Beschreibung:** Kalender vorspulen mit automatischer Abwicklung von Downtime.

---

---

## Story-Hierarchie (NEU — UC-NEW-05)

### UC-MEC-74: Story-Hierarchie — GlobalArc bis Chapter
- **Akteur:** GM
- **Prioritaet:** P1
- **Beschreibung:** 4-stufige Story-Hierarchie: GlobalArc (uebergreifender Handlungsbogen) → StoryArc (Handlungsstrang) → Act (Akt mit Meilenstein-Entscheidungen) → Chapter (Kapitel mit Zeitraum und Voraussetzungen). Sessions und Quests sind ueber `chapter_id` angebunden.
- **Datenstruktur:**
  - GlobalArc: title, description, status, sort_order
  - StoryArc: title, description, globalArcId, sort_order
  - Act: title, description, storyArcId, block_decision, milestone_reward, sort_order
  - Chapter: title, description, actId, start_month, end_month, prerequisites (JSON), consequences (JSON), sort_order
- **API:** Volle CRUD fuer alle 4 Ebenen + `GET /story/chapters/:id/quests` und `/sessions`
- **Ref:** STORY-DOCS-002 (Story-Arc-System dokumentieren), erweitert UC-MEC-50 bis UC-MEC-55

### UC-MEC-75: Campaign Chapter State — Variablen pro Kampagne+Kapitel
- **Akteur:** GM, System
- **Prioritaet:** P1
- **Beschreibung:** Persistente Variablen pro Kampagne und Kapitel fuer Story-Tracking. Erlaubt dem GM, Entscheidungen und Zustaende festzuhalten, die spaetere Kapitel beeinflussen (z.B. `pfad_wahl: "drachen"`, `lehrer_vertrauen: 3`). Upsert-Semantik: existiert die Variable, wird sie aktualisiert. Optional `decision_id` verlinkbar.
- **API:**
  - `GET /campaigns/:id/chapters/:chapterId/state` — Alle Variablen eines Kapitels
  - `PUT /campaigns/:id/chapters/:chapterId/state/:variable` — Variable setzen (Upsert)
  - `GET /campaigns/:id/state-summary` — Aggregation ueber alle Kapitel
- **Datenstruktur:** `CampaignChapterState`: campaign_id, chapter_id, variable, value, set_by_decision_id

### UC-MEC-76: World State — Kampagnen-uebergreifende Variablen
- **Akteur:** GM
- **Prioritaet:** P2
- **Beschreibung:** Persistente Welt-Variablen die kampagnen-uebergreifend gelten (z.B. `krieg_status: "aktiv"`, `akademie_ruf: 75`). Trackt optional Quell-Kampagne und Quell-Entscheidung. GMs koennen Entscheidungen aus einer Kampagne in den World State propagieren.
- **API:**
  - `GET /world/state` — Alle Welt-Variablen
  - `PUT /world/state/:variable` — Variable setzen (Upsert)
- **Datenstruktur:** `WorldState`: variable (UNIQUE), value, source_campaign_id, source_decision_id

---

## Companion-Bond-System (NEU — UC-NEW-07)

### UC-MEC-77: Companion-Bond als Alternative zu Dragon Bond
- **Akteur:** Spieler
- **Prioritaet:** P1
- **Beschreibung:** Magischer Begleiter fuer Characters auf dem Sigillen-Pfad. Mutual exclusive mit Dragon Bond. Der Companion durchlaeuft 5 Phasen (Erwachen → Verbindung → Harmonie → Symbiose → Transzendenz) mit steigender bond_strength und phase-spezifischen Faehigkeiten (JSONB). Benoetigt care_level-Pflege analog zum Dragon Bond. Der Companion ist ein NPC mit Rolle "companion".
- **Voraussetzungen:** Character muss Trait "spirituell" haben ODER Rasse Aasimar sein. Darf keinen aktiven DragonBond haben.
- **API:**
  - `POST /companion-bonds` — Bond erstellen (prueft Mutual Exclusion)
  - `GET /companion-bonds/:characterId` — Bond abrufen
  - `PATCH /companion-bonds/:id` — Bond aktualisieren
  - `DELETE /companion-bonds/:id` — Bond loesen
- **Datenstruktur:** `CompanionBond`: character_id (UNIQUE), companion_npc_id, phase (1-5), bond_strength, care_level, abilities (JSONB)

---

## Drachen-Taxonomie (NEU — UC-NEW-06)

### UC-MEC-78: Drachen-Taxonomie — 3x7 mechanische Effekte
- **Akteur:** System
- **Prioritaet:** P1
- **Beschreibung:** Mechanische Seite der Drachen-Taxonomie. Jede der 21 Varianten (3 Spezies x 7 Rassen) hat eigene `mechanical_effects` (JSONB), die in Kampf, Bond-Mechaniken und Pflege einfliessen. DragonBond.variant_id verweist auf spezifische Variante statt generische Spezies.
- **Siehe auch:** UC-WLT-07 (Lore-Seite in 01-Welt-Lore)

---

## Trait-Onboarding (NEU — UC-NEW-16)

### UC-MEC-79: Trait-Vorschau und Auto-Assign beim Onboarding
- **Akteur:** Spieler, System
- **Prioritaet:** P1
- **Beschreibung:** Trait-Vorschau waehrend des Onboardings bevor ein Character in der DB existiert. Zeigt Spieler, welche Trait-Startwerte seine Rasse mitbringt (z.B. Zwerge: Loyal +2, Gnome: Neugierig +2). Bei Character-Erstellung werden Rassen-Traits automatisch zugewiesen.
- **API:** `POST /traits/preview` — Trait-Vorschau ohne Character (akzeptiert raceId)
- **Technisch:** Auto-Assign in Character-Create-Flow integriert, lore-basierte Defaults pro Rasse

---

## Jahr-1-Blueprint (STORY-DOCS-003)

### UC-MEC-80: Jahr-1-Blueprint mit Harptos-Mapping
- **Akteur:** GM
- **Prioritaet:** P1
- **Beschreibung:** Vollstaendiger Blueprint fuer "Erstes Schuljahr": 12 Monate mit Harptos-Kalender-Mapping (M1=Hammer bis M12=Nightal), Akademie-Phasen als primaeres Zeitraster, Quest-Uebersicht Q1-Q6 mit Objectives und Decision Points, 9 Kapitel-Konsequenz-Variablen, Belohnungen pro Quest (Trait-First: keine Gold/Items in Jahr 1).
- **Ref:** STORY-DOCS-003, haengt ab von STORY-DOCS-002

---

## Status

| Bereich | Anzahl UCs | Status |
|---------|-----------|--------|
| Traits System | 4 | Komplett designed |
| Items & Inventar | 6 | Komplett designed |
| Beziehungen & Renown | 5 | Komplett designed |
| NPC-Reaktion & DC | 3 | Komplett designed |
| Wuerfel-System | 5 | Komplett designed |
| Oekonomie & Handel | 5 | Komplett designed |
| Professionen & Crafting | 4 | Komplett designed |
| Dragon Bond | 6 | Komplett designed |
| Reise & Wetter | 5 | Komplett designed |
| Rechtssystem & Dialog | 6 | Komplett designed |
| Quest & Szenen | 6 | Komplett designed |
| Organisationen | 4 | Komplett designed |
| Kampf-System | 8 | Komplett designed |
| Kalender & Zeit | 6 | Komplett designed |
| Story-Hierarchie | 3 | **NEU — Implementiert** |
| Companion-Bond | 1 | **NEU — Implementiert** |
| Drachen-Taxonomie | 1 | **NEU — Implementiert** |
| Trait-Onboarding | 1 | **NEU — Implementiert** |
| Jahr-1-Blueprint | 1 | **NEU — Ticket** |
| **Gesamt** | **80** | |
