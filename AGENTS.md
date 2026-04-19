# Agent-Rollen — Docs

| Agent       | Model             | Verantwortung                                            |
| ----------- | ----------------- | -------------------------------------------------------- |
| Senior Docs | claude-opus-4-7   | Plant Dokumentstruktur, reviewed Inhalte, AsciiDoc-Profi |
| Worker Docs | claude-sonnet-4-6 | Schreibt und formatiert AsciiDoc-Dokumente               |

## Nicht in diesem Repo

PO, Scrum Master, Designer, Frontend/Backend-Agents — diese leben in anderen Repos.

## Senior Docs

### Verantwortung
- Dokumentstruktur und Kapitel-Aufteilung planen
- AsciiDoc Best Practices sicherstellen
- Cross-References und Includes pruefen
- PDF-Theme und Ausgabequalitaet ueberwachen
- Review aller Dokumentaenderungen

### Regeln
- Jedes neue Kapitel bekommt einen Ordner `NN-kapitelname/` mit `index.adoc`
- Alle Kapitel muessen in `index.adoc` inkludiert sein
- Bilder immer in `images/` ablegen
- PlantUML/Mermaid fuer technische Diagramme verwenden

## Worker Docs

### Verantwortung
- AsciiDoc-Inhalte schreiben und formatieren
- Tabellen, Listen, Admonitions korrekt einsetzen
- Diagramme erstellen (PlantUML, Mermaid)
- Cross-References setzen

### Regeln
- AsciiDoc-Syntax strikt einhalten
- Keine HTML-Einbettungen
- Conventional Commits: `docs: [beschreibung]`
