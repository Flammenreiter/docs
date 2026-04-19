# Use Cases: 06 — Rassen, Klassen & Origin

## Uebersicht

Charakter-Erstellungs-Domäne. Definiert alle Optionen fuer Rasse, Abstammung,
Kindheitserlebnis, Klasse und Akademie-Zuordnung.

---

## Rassen-Wahl

### UC-RK-01: Kern-Rasse waehlen (5 Optionen)
- **Akteur:** Spieler
- **Beschreibung:** Auswahl aus den 5 Kern-Rassen mit biologischen Traits und Faehigkeiten.

### UC-RK-02: Erweiterte Rasse waehlen (5 Optionen)
- **Akteur:** Spieler
- **Beschreibung:** Auswahl aus den 5 erweiterten Rassen (nach GM-Freigabe).

---

## 3-Stufen-Herkunft

### UC-RK-03: Abstammung waehlen (19 Optionen in 5 Kategorien)
- **Akteur:** Spieler
- **Beschreibung:** Familiaerer/kultureller Hintergrund, beeinflusst Start-Traits, Proficiencies und Sprachen.

### UC-RK-04: Kindheitserlebnis durch AI-Interview generieren
- **Akteur:** Spieler
- **Beschreibung:** AI-gefuehrtes Interview generiert ein praegendes Kindheitserlebnis, das Start-Traits beeinflusst.

---

## Klassen-Wahl

### UC-RK-05: Klasse waehlen (12 Optionen)
- **Akteur:** Spieler
- **Beschreibung:** Auswahl aus 12 D&D 5e Klassen.

### UC-RK-06: Subclass waehlen
- **Akteur:** Spieler
- **Beschreibung:** Subclass aus Pool (PHB, Xanathar's, Tasha's) beim entsprechenden Level.

---

## Dragon Bond

### UC-RK-07: Dragon Bond Archetype auswaehlen
- **Akteur:** Spieler
- **Beschreibung:** Kampfdrache, Taschendrache oder Schattendrache — bestimmt Bond-Mechaniken.

---

## Akademie

### UC-RK-08: Akademie-Haus zuweisen
- **Akteur:** System, Spieler
- **Beschreibung:** Zuweisung zu einem der 4 Haeuser (Drachenfeste, Turm der Ketten, Tiefe Esse, Liebe & Leben).

### UC-RK-09: Akademie-Lehrplan durchlaufen
- **Akteur:** Spieler
- **Beschreibung:** 7 Faecher ueber 3 Jahre mit Pruefungen und Fortschritt.

---

## Vollstaendige Charakter-Erstellung

### UC-RK-10: End-to-End Charakter-Erstellung
- **Akteur:** Spieler
- **Beschreibung:** Kompletter Wizard: Rasse → Abstammung → Kindheit → Klasse → Ability Scores → Equipment → Drache → Akademie-Haus.

### UC-RK-11: Charakter-Validierung
- **Akteur:** System
- **Beschreibung:** Pruefung aller Regeln (Exclusion-Rules, Voraussetzungen, Trait-Konsistenz).

### UC-RK-12: Charakter-Portrait generieren
- **Akteur:** System (FLUX-Pipeline)
- **Beschreibung:** AI-generiertes Portrait basierend auf Rasse, Klasse, Traits.

---

## World Ancestries (NEU — UC-NEW-10)

### UC-RK-13: World Ancestries — 19 Herkunfts-Optionen
- **Akteur:** GM, Spieler
- **Prioritaet:** P1
- **Beschreibung:** Separates Herkunftssystem unabhaengig von D&D-Rassen. 19 Optionen in 5 Kategorien (Adlig, Staedtisch, Laendlich, Nomadisch, Exotisch). Jede Ancestry hat Ability-Boni (JSONB), Trait-Bonusse, Sprachen und Faehigkeiten. Fuer NPCs und optionale Spieler-Charaktere.
- **API:**
  - `GET /world/ancestries` — Alle Ancestries (optional nach Kategorie filtern)
  - `POST /world/ancestries` — Erstellen (Admin)
  - `PATCH /world/ancestries/:id` — Bearbeiten (Admin)
  - `DELETE /world/ancestries/:id` — Loeschen (Admin)
- **Datenstruktur:** `WorldAncestry`: name, displayName, description, category, abilityBonuses (JSONB), traits, languages, features. NPCs haben `ancestry_id` FK.
- **Erweitert:** UC-RK-03 (Abstammung waehlen) — jetzt 19 konkrete Optionen mit API

---

## Trait-Onboarding (NEU — UC-NEW-16)

### UC-RK-14: Trait-Vorschau beim Onboarding
- **Akteur:** Spieler, System
- **Prioritaet:** P1
- **Beschreibung:** Waehrend des Onboardings Trait-Startwerte basierend auf Rassenwahl anzeigen, bevor ein Character existiert. Rassen-Traits werden bei Character-Erstellung automatisch zugewiesen.
- **API:** `POST /traits/preview` — Trait-Vorschau ohne Character (akzeptiert raceId)
- **Siehe auch:** UC-MEC-79 (Mechanik-Seite)

---

## Onboarding KI-Interview (NEU — UC-NEW-04)

### UC-RK-15: KI-Interview fuer Kindheitserlebnis und Haus-Zuweisung
- **Akteur:** Spieler
- **Prioritaet:** P0
- **Beschreibung:** KI-Kroete "Ilja" fuehrt 5-7 Fragen-Interview das Akademie-Haus, Persoenlichkeits-Traits und Kindheitserlebnis ableitet. Bezieht Rasse, Subrasse, Hintergrund, Aussehen, Geschlecht ein. Edge Function mit Anthropic Claude.
- **Ersetzt/erweitert:** UC-RK-04 (Kindheitserlebnis durch AI-Interview)
- **Siehe auch:** UC-ONB-01 (Voll-Definition in 05-Charakter-Sheet)

---

## Status

| UC | Status | Anmerkung |
|----|--------|-----------|
| UC-RK-01 bis UC-RK-12 | Designed | In 06-rassen-klassen/ dokumentiert |
| UC-RK-13 | **NEU — Implementiert** | UC-NEW-10, World Ancestries |
| UC-RK-14 | **NEU — Implementiert** | UC-NEW-16, Trait-Vorschau |
| UC-RK-15 | **NEU — Implementiert (P0)** | UC-NEW-04, KI-Interview |
