# Flammenreiter — Docs

> AsciiDoc-basierte Projektdokumentation mit automatischer PDF-Generierung.

## Was ist dieses Repo?

Dieses Repo enthaelt die gesamte Projektdokumentation fuer Flammenreiter als AsciiDoc-Dateien. Bei jedem Push auf `main` wird automatisch eine PDF-Version generiert.

## Zugehoerige Repos (GitHub Org: `flammenreiter`)

| Repo             | Beschreibung                        |
| ---------------- | ----------------------------------- |
| `orchestrator`   | Sprint-Management, ADRs, Planung   |
| `session-gm`     | GM Session Web App (React FSD)     |
| `session-player` | Player Session Web App (React FSD) |
| `lore-admin`     | Lore Admin Web App (React FSD)     |
| `api`            | Backend (Hono + Prisma + PostgreSQL)|
| `shared`         | OpenAPI Contracts / Shared Types   |
| `ue5`            | Unreal Engine 5 Mobile Client      |

## Setup

```bash
# Ruby und Asciidoctor installieren
gem install asciidoctor asciidoctor-pdf asciidoctor-diagram rouge

# Oder via Bundler
bundle install

# PDF bauen
make pdf

# HTML bauen
make html

# Alles bauen
make all
```

## Kapitelstruktur

| Nr. | Kapitel             | Beschreibung                         |
| --- | ------------------- | ------------------------------------ |
| 01  | Welt & Lore         | Geographie, Geschichte, Pantheon     |
| 02  | Spielmechaniken     | Wuerfel, Kampf, Crafting, Handel     |
| 03  | Datenbank           | Schema-Uebersicht und Details        |
| 04  | Architektur         | Backend, Repo-Struktur, Shared Types |
| 05  | Charakter Sheet     | Architektur, Domains, Use Cases      |
| 06  | Rassen & Klassen    | Rassen, Klassen, Herkunft            |
| 07  | GM Dashboard        | Game Master Interface                |
| 08  | Design System       | UI-Komponenten, Tokens, Patterns     |
| 09  | Mobile              | UE5 Mobile Client Specs              |
| 10  | Infrastruktur       | Deployment, CI/CD, Monitoring        |

## User Manuals

End-User-Handbuecher unter `manuals/` — fuer GM, Spieler und Entwickler/Admins.

| Manual                                                | Zielgruppe              | Inhalt |
| ----------------------------------------------------- | ----------------------- | ------ |
| [`manuals/gm-manual.adoc`](manuals/gm-manual.adoc)     | Game-Master             | Login, Group/Campaign-Hierarchie, Active-Campaign-Switcher, Session-Planer, Random-Tables, Encounter-Generator, Soundboard, Live-Session, NPC-Reaction-Radar, Crafting + Calendar, Decision-Logger, Story-Arc-Flowchart, Foundry-Status, Post-Session-Wizard |
| [`manuals/player-manual.adoc`](manuals/player-manual.adoc) | Spieler                 | Login, Group-Auswahl, Charakter-Picker mit "+Neu erstellen", Onboarding-Wizard, Char-Profil-Tabs, Pending-Actions Modal, Inventar + Crafting, Live-Session-Player-View, Sound-Settings, Changelog-Modal |
| [`manuals/setup-guide.adoc`](manuals/setup-guide.adoc) | Entwickler / Admins     | 8-Repo-Layout, Local-Dev-Setup, env-Distribution, NODE_AUTH_TOKEN, Per-Commit Version-Bump, Cross-Repo Lockfile-Sync, Supabase-Migration-Pattern (`migrate deploy` + handgeschriebenes SQL), Railway DATABASE_URL bei Token-Rotation |

Spielregeln (Kampf, Rast, Cantrips, Conditions) bleiben im separaten [`spieler-handbuch.adoc`](spieler-handbuch.adoc).

## CI/CD

Die GitHub Actions Pipeline:
1. Konvertiert alle `.adoc` zu HTML und PDF
2. Nutzt das Flammenreiter-Theme (`theme/flammenreiter-theme.yml`)
3. Speichert PDFs als Artifacts und im Branch `build/pdf`
