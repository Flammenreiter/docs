# Flammenreiter — Docs

AsciiDoc-basierte Projektdokumentation mit automatischer PDF-Generierung.

## HARD RULES

- Dieses Repo enthaelt NUR Dokumentation
- KEIN Anwendungscode, KEINE Konfiguration fuer andere Repos
- Alle Dokumente in AsciiDoc (.adoc) Format
- Jedes Kapitel hat einen eigenen Ordner mit index.adoc
- Kapitel-Ordner folgen dem Schema: `NN-kapitelname/`
- Bilder in `images/`, referenziert mit `:imagesdir:`
- PDF-Theme in `theme/flammenreiter-theme.yml`

## Struktur

```
docs/
├── index.adoc              — Hauptdokument (inkludiert alle Kapitel)
├── flammenreiter.adoc      — Projekt-Uebersicht
├── AUDIT.adoc              — Projekt-Audit
├── ROADMAP.adoc            — Roadmap
├── 01-welt-lore/           — Welt & Lore
├── 02-spielmechaniken/     — Spielmechaniken
├── 03-datenbank/           — Datenbankschema
├── 04-architektur/         — Systemarchitektur
├── 05-charakter-sheet/     — Charakter Sheet
├── 06-rassen-klassen/      — Rassen & Klassen
├── 07-gm-dashboard/        — GM Dashboard
├── 08-design-system/       — Design System
├── 09-mobile/              — Mobile (UE5)
├── 10-infrastruktur/       — Infrastruktur
├── images/                 — Bilder und Diagramme
├── theme/                  — PDF-Theme (Farben, Fonts, Layout)
└── build/                  — Generierte PDFs und HTML (gitignored)
```

## CI/CD Pipeline

Bei jedem Push auf `main`:
1. Alle .adoc Dateien werden zu HTML konvertiert
2. Alle .adoc Dateien werden zu PDF konvertiert (mit Flammenreiter-Theme)
3. PDFs werden als GitHub Artifacts gespeichert
4. PDFs werden in den Branch `build/pdf` committed

## Agents

| Agent         | Model             | Rolle                                          |
| ------------- | ----------------- | ---------------------------------------------- |
| Senior Docs   | claude-opus-4-7   | Plant Dokumentstruktur, reviewed Inhalte       |
| Worker Docs   | claude-sonnet-4-6 | Schreibt und formatiert AsciiDoc-Dokumente     |

## Lokales Bauen

```bash
# Voraussetzungen
gem install asciidoctor asciidoctor-pdf asciidoctor-diagram rouge

# Alles bauen
make all

# Nur PDF
make pdf

# Nur HTML
make html

# Einzelne Kapitel als PDF
make chapters

# Aufraeumen
make clean
```

## AsciiDoc-Konventionen

- Ueberschriften: `=` fuer Titel, `==` fuer Kapitel, `===` fuer Abschnitte
- Includes: `include::kapitel/datei.adoc[leveloffset=+1]`
- Tabellen: AsciiDoc Table Syntax mit Header-Row
- Diagramme: PlantUML oder Mermaid via asciidoctor-diagram
- Admonitions: `NOTE:`, `TIP:`, `IMPORTANT:`, `WARNING:`, `CAUTION:`
- Cross-References: `<<anchor-id,Anzeigename>>`

## Conventional Commits

Pflicht: `docs:` fuer alle Aenderungen in diesem Repo.
