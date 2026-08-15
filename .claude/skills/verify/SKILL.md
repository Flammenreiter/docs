---
name: verify
description: 'Den GEÄNDERTEN Flow real fahren und das Ergebnis mit einer Belegzahl protokollieren — nicht nur Tests grün melden. Liest zuerst den Projekt-Kontext (package.json-Scripts, README, Projektstandards), startet App/Service unter der ECHTEN Laufzeit, löst genau den geänderten Pfad aus und trennt hart: visuelle Verifikation ist mit Vermerk verschiebbar, der Daten-Round-Trip nie. Beantwortet vier Fragen an jedes Grün — Laufzeit, Richtung (auch der Positivfall), Läufer (CI-Ergebnis SHA-gebunden nach dem Push) und Umgebung. Nutze vor jedem Commit an Produktcode und nach jedem Push.'
allowed-tools: Read, Glob, Grep, Bash, Write, Edit
---

# Verify

Dieses Skill ist der **Mechanismus hinter der Pflichtregel** aus `30-quality`
(„Drive the changed flow end-to-end via the `verify` skill"). Es beantwortet **eine** Frage mit
Beleg: *Läuft der Pfad, den ich gerade geändert habe, in Wirklichkeit?*

> **Grüne Tests sind kein Verify.** Tests prüfen, was jemand aufgeschrieben hat. Verify prüft, was
> die Software tut. Beides ist Pflicht, keins ersetzt das andere.

> **Prosa deutsch, Code/Identifier/Kommandos englisch** (Repo-Konvention).

## Wann invoken

- **Vor jedem Commit**, dessen Diff Produktcode berührt (`30-quality`: Definition of Done).
- Nach jedem Fix, für den behauptet wird „ist behoben" — bevor das jemand glaubt.
- Wenn ein Agent-Report „verified" sagt, aber keine Zahl liefert (dann fährst du es nach).
- **Nach dem Push** für das CI-Bein (Frage 3) — der lokale Gate-Lauf beantwortet es nicht.
- **Nicht nötig** bei Diffs ohne Runtime-Fläche: tests-only, docs-/markdown-only.

## Die harte Trennung (ADR-0022) — vorab, nicht am Ende

„Verify" ist **kein** Monolith. Es gibt zwei Flächen mit völlig verschiedenen Kosten:

| Fläche | Braucht | Verschiebbar? |
| --- | --- | --- |
| **Visuell** (UI ansehen, Screenshots, UX) | Browser, Live-Session, Auth, Window-Management | **Ja — mit Vermerk** |
| **Daten-Round-Trip** (Contract/Schema/Serialization) | nichts davon — reine Datenfunktion | **Nein. Nie.** |

- **Visuell verschiebbar heißt: mit Namen und Termin.** Ein blankes „browser-verify deferred" ist
  **kein** Aufschub, sondern ein stiller Skip und zählt als *nicht verifiziert*. Der Vermerk gehört
  in den Report (Vorlage unten): **wer** fährt es, **wann**.
- **Der Round-Trip wandert nie mit.** Er ist browserfrei, also kann kein Browser-Blocker ihn
  entschuldigen. Kernsatz aus `30-quality`: *a schema/contract/serialization change ALWAYS has an
  automatable round-trip surface — a golden test is required even when the visual surface defers to
  manual QA.* Muster, Template und Begründung stehen an **genau einer** Stelle:
  Skill `contract-golden-test` (Web-Overlay `31-quality-web` verweist ebenfalls dorthin).

**Belegter Vorfall (2026-07-18):** Jeder UI-Build-Agent meldete „Browser-Verify deferred (braucht
Live-Session/Auth/window-management)" — und damit wurde die **komplette Speicher-/Lade-Runde nie
gefahren**. Ein reiner Daten-Round-Trip (`build → serialize → validate → read`, ohne Browser) hätte
die v1/v2-Slot-Divergenz (HTTP 400, v2-Profile lautlos übersprungen) sofort gefangen.

## Ablauf

### 1. Projekt-Kontext lesen — Kommandos NICHT raten

agent-core kennt die Startbefehle deines Projekts nicht. Lies sie, statt sie zu erfinden:

- `package.json` → `scripts` (`dev`, `start`, `preview`, `test`, `build`, `seed`, `db:*`) und
  Workspace-Layout (`apps/*`, `packages/*`); bei Monorepos: welches Paket ist betroffen?
- `README.md` / `docs/` → Setup-Schritte, benötigte Services (DB, Supabase, Emulator).
- `project-standards.md` / `CLAUDE.md` / `AGENTS.md` → projektspezifische Run-Konventionen.
- `.env.example` → welche Variablen der Flow braucht. **Fehlt eine Variable, ist der Lauf ungültig**
  — nicht „läuft halt nicht ganz". Erst beschaffen, dann fahren.
- Nicht-JS-Stacks analog: `build.gradle.kts`/`Makefile`/`*.csproj`/`pyproject.toml`.

> Existiert im Projekt bereits ein Start-Skill/Runbook, nimm **das** — dieses Skill ersetzt es nicht,
> es hängt die Nachweis-Pflicht daran.

### 2. Den geänderten Pfad bestimmen — aus dem Diff, nicht aus dem Bauch

„Die App startet" ist **kein** Verify. Leite aus `git diff`/`git status` ab:

- Welche Funktion/Route/Query/Migration hat sich geändert?
- Welcher **Einstiegspunkt** löst genau sie aus (Button, URL, CLI-Kommando, API-Call, Cron)?
- Welche **beobachtbare Wirkung** beweist, dass sie lief (Response-Body, DB-Zeile, Log, Datei,
  UI-Zustand)? Diese Wirkung ist später deine Belegzahl.
- Berührt der Diff einen Contract (Schema, Wire-Format, Persistenz)? → Round-Trip ist **Pflicht**.
  Zum Erkennen den **Review check** aus `25-orchestration` bzw. Setup-Schritt 1 des Skills
  `contract-golden-test` fahren (grep die Typ-/Schema-Definition über alle Pakete), nicht dem
  Gedächtnis vertrauen.

### 3. App/Service starten — unter der echten Laufzeit

Mit den in Schritt 1 **gelesenen** Kommandos. Backgroundfähig starten, Port/URL notieren, auf
Bereitschaft warten (Health-Endpoint/Log-Zeile), Startfehler nicht wegignorieren. Der Start zählt
nur unter der Laufzeit, die auch in Produktion lädt: `tsx`, `vite-node` und der Testrunner bringen
Bundler-Auflösung mit und starten Quellen, die der Dienst selbst nicht laden kann (Frage 1 unten,
mit Messung).

### 4. Den Pfad auslösen und beobachten

- Bevorzugt **automatisiert und headless**: HTTP-Call, CLI-Aufruf, Skript, DB-Query. Das ist der
  billige Teil und läuft überall.
- **Fehlerpfad mitnehmen**, nicht nur den Happy Path — der Vorfall oben war ein *lautloser* Skip,
  kein Crash. Prüfe deshalb aktiv, ob etwas **still übersprungen** wurde (Anzahl vorher/nachher!).
  Und **beide Richtungen**: eine Ablehnung allein beweist nichts, solange der Positivfall gegen die
  echte Konfiguration fehlt (Frage 2 unten).
- UI-Anteil: im Browser öffnen und **hinsehen** (`31-quality-web`) — oder sauber verschieben (s. o.).

### 5. Mit Belegzahl protokollieren

`30-quality`, Gate-Evidenz: **„lief grün" ist keine Evidenz.** Belegt ist nur, was ohne den
Durchlauf nicht existieren könnte:

- gut: `POST /api/profiles → 201, 3 rows in profiles (vorher 0)`, `12 slots serialized, 12 read back`,
  `47 tests passed`, `HTTP 400 reproduced on the v1 payload, 200 after the fix`
- wertlos: „funktioniert", „verified", „sieht gut aus", „Tests grün"

## Der Daten-Round-Trip (nie verschiebbar)

Vier Schritte, alle ohne Browser: **build → serialize → validate → read** — der Producer baut, die
**Wire-Grenze** (`JSON.parse(JSON.stringify(x))`) serialisiert, das Save-Schema validiert die
**serialisierte** Form (nicht das In-Memory-Objekt — an dieser Reihenfolge hing der belegte HTTP 400),
der Read-/Migrations-Pfad liest sie zurück und muss dasselbe Objekt liefern.

Dazu **RED-Verify**: ein Round-Trip-Test, der gegen die **alte, kaputte** Implementierung nicht rot
wird, beweist gar nichts (`30-quality`, „Regression tests — verified RED, not assumed") — also die
alte (v1-)Migration einsetzen, fallen sehen, zurücktauschen.

Kanonischer Code-Schnipsel, lauffähiges Template und Varianten leben an **genau einer** Stelle:
Skill `contract-golden-test`. Hier absichtlich **nicht** wiederholt — eine zweite Kopie des Musters
driftet genauso wie eine zweite Kopie eines Contracts.

## Vier Fragen an jedes Grün

Vier Belege, ein Satz: **„grün" ohne benannte Instanz ist kein Beleg.** Zu jeder der vier Fragen
gibt es einen Vorfall, in dem genau ihr Fehlen einen Defekt durchgelassen hat, und jede hat ihre
Stelle in der Report-Vorlage. Eine Frage mit `n/a` zu beantworten ist erlaubt — ohne den Grund
dahinter nicht.

### Frage 1 — unter welcher Laufzeit lief es?

`lint`, `typecheck`, Vitest und Vite lösen Module über **Bundler-Semantik** auf, der Node-ESM-Resolver
nicht. Ein Workspace-Paket, dessen `main` auf `src/*.ts` zeigt und das keinen Build-Schritt hat, wird
zur Laufzeit von einem **anderen Auflöser** gelesen als von jedem Gate. Vier grüne Gates über einem
Dienst, der nie gestartet ist, sind deshalb kein Ausrutscher, sondern die Bauart.

Der **Smoke-Import unter blankem `node` ist Pflicht, nicht Rückfall** — er ist die einzige Messung,
die grün-und-kaputt von grün-und-lauffähig trennt. Dieselbe Quelle, vier Läufe, hier gemessen:

| Start | `export * from './common'` | `export * from './common.ts'` |
| --- | --- | --- |
| `npx tsx <entry>` | `EXPORTS=4` — **startet** | `EXPORTS=4` |
| blankes `node` | `FAIL=ERR_MODULE_NOT_FOUND` | `EXPORTS=4` |

- **Ein Werkzeug mit Bundler-Auflösung beweist nur sich selbst.** Die Zelle oben links ist der ganze
  Grund für diese Frage: `tsx` und Verwandte starten dieselbe Quelle erfolgreich, an der die
  Produktionslaufzeit scheitert — der grüne Lauf ist dann die Fehlerklasse, nicht ihr Ausschluss.
- **Der Smoke-Import gehört in eine `.mjs`-Datei, nicht in ein `node -e`.** Mehrzeiliges `-e` ist
  unter Git-Bash ein leeres Programm mit Exit 0, und jede Transportschicht frisst ein
  Backslash-Paar: aus `replace(/\\/g,'/')` in doppelten Anführungszeichen wird `/\/g` →
  `SyntaxError: missing ) after argument list`. Zweimal gemessen, an genau dieser Zeile.
- **`file:///$PWD` ist unter Git-Bash kaputt.** `$PWD` ist der MSYS-Pfad, das ergibt vier Slashes
  (`file:////tmp/...`) → `ERR_INVALID_FILE_URL_PATH`. Die Basis baut deshalb der Prozess selbst:

```js
// scripts/smoke.mjs — ein Argument: der Entrypoint, relativ zur Repo-Wurzel
const base = "file:///" + process.cwd().replace(/\\/g, "/") + "/";
const m = await import(new URL(process.argv[2], base));
console.log("EXPORTS=" + Object.keys(m).length);
```

`node scripts/smoke.mjs packages/shared-types/src/index.ts` → `EXPORTS=<n>` (in der Messung oben
`EXPORTS=4`). Die Zahl kann ohne den echten Ladevorgang nicht entstehen; `ERR_MODULE_NOT_FOUND` an
derselben Stelle ist der Defekt, den kein Bundler-Gate sehen kann.

### Frage 2 — in welche Richtung wurde geprüft?

Fail-closed wird fast immer nur gegen **Ablehnung** verifiziert. Eine Allowlist, die nie befüllt
wurde, lehnt alles ab und ist von einer korrekten nicht zu unterscheiden: Tests grün (sie injizieren
ihre eigene Registry — genau die Zeile, die in Produktion fehlt), Typecheck grün (`entities: []` ist
typkorrekt), kein Fehler im Log, denn die Ablehnung **ist** die dokumentierte Antwort. „Immer rot"
sieht dann aus wie bestandene Sicherheit.

- **Beide Nachweise, nicht einer.** Jede Allowlist, Registry und Berechtigungstabelle muss zeigen,
  dass sie das Verbotene ablehnt **und** dass sie das Erlaubte durchlässt.
- **Die Positivkontrolle läuft gegen die ECHTE Konfiguration**, nie gegen eine im Test injizierte —
  sonst prüft sie die Testvorrichtung statt den Dienst. Hausbeispiel, selbst gefahren:
  `[emergency-marker golden] impls: 3/3 (sh+ps1+ts-plugin) · scenarios: 7 · decisions: 21`, davon
  vier Szenarien mit `allowed=true`, gefahren gegen die **ausgelieferten** Hook-Kopien.
- **Wer `default deny` einführt, zeigt den Schreibpfad.** Ein leerer Default ohne Aufrufer mit echten
  Daten ist unfertig, nicht sicher. Ist er absichtlich leer, steht der Grund als Kommentar am Ort —
  Muster im Haus: `shared/editors.json:7` und `:32` sagen, warum `sinks` leer ist und leer bleibt.
- **Als Erkennungshilfe, nicht als Gate:** `: []`, `?? []`, `new Map()` in Konstruktoren und
  Options-Defaults von Registry-/Gate-Typen greppen. Die rohe Signatur trifft in agent-cores eigenem
  `src/` **68**-mal (25 außerhalb der Tests), fast nur Akkumulatoren — als Automat wäre sie ein
  Ermüdungsgenerator und damit selbst ein Fail-open-Kandidat.

### Frage 3 — auf welchem Läufer lief es?

Der lokale Gate-Lauf und CI sind nicht dieselbe Prüfung: anderes Betriebssystem, kalter Cache,
andere Zone und Sprache. Ein Push, dessen Ergebnis niemand gelesen hat, ist kein abgeschlossener
Schritt — und ein CI-Ergebnis ohne SHA-Bindung antwortet für einen fremden Commit.

- **Primär, PR-gebunden:** `gh pr checks <nr> --json name,bucket,state`. Es sieht auch
  Nicht-Actions-Checks — hier gemessen: drei Checks, darunter ein `Cloudflare Pages`, für das
  `gh run list` strukturell blind ist. `bucket` ist `pass|fail|pending|skipping|cancel`,
  **Exit 8 = pending**, und `--watch` (mit `--fail-fast`, `-i <sek>`) wartet gebunden statt endlos.
- **Rückfall ohne PR:** `gh run list --commit <sha>`, nie `--limit 1`. Gemessen: `--limit 1` meldete
  `success` für einen fremden Merge-Commit auf `main`, während `--commit <HEAD>` für denselben Stand
  leer blieb — **beide mit Exit 0.**
- **Leere Ausgabe bei Exit 0 vereint drei Zustände** — kein CI konfiguriert / Lauf noch nicht
  eingereiht / `gh` nicht angemeldet bzw. falsches Repo. Das ist eine fehlende Prämisse, kein
  Bestanden: benenne, welcher der drei es ist.
- **Ein N-mal in Folge rotes Gate ist ein eigener Defekt**, unabhängig von seiner Ursache — ab dem
  dritten roten Lauf trägt „CI ist rot" keine Information mehr. Zählbar:
  `gh run list --branch <b> --limit N --json conclusion`.

### Frage 4 — in welcher Umgebung lief es?

Was in der Umgebung nicht festgenagelt ist, prüft die Umgebung statt den Code: Zeitzone, Locale,
Pfad-Trennzeichen, Zeilenenden, ICU-Umfang. Die Achsen, von denen der geänderte Pfad liest, werden
**gemessen und gepinnt**, nicht geerbt — und das Messergebnis gehört in die Ausgabe, sonst ist der
nächste Lauf wieder eine Selbstauskunft.

- **Die Leiter, in dieser Reihenfolge:** (a) den Wert zur **Laufzeit** setzen (`test.env` in der
  Vitest-Config) — nur das wirkt auf beiden Plattformen; ein `TZ` in `.env.test` erreicht
  `process.env` nie, weil der einzige Pfad dorthin über Vites **prefix-gefilterte** `env`-Menge
  läuft und `envPrefix` ungesetzt bleibt (nachgesehen in der installierten Quelle, vitest 4.1.10) —
  ein stiller No-op, der wie ein Fix aussieht; (b) die Suite ein **zweites Mal** mit gekippter Achse
  fahren; (c) Docker mit dem CI-Image als schwerste Stufe, nicht als Vorschrift.
- **Ein Fix gegen Umgebungsabhängigkeit ist erst belegt, wenn er in der ABWEICHENDEN Umgebung
  gemessen wurde.** „Lokal weiterhin grün" belegt nichts — lokal war es das schon vorher.
- **Eine Achse zu kippen genügt nicht, und der Name ist keine Messung.** Wer nur nach UTC kippt,
  verfehlt die Fälle, die erst unter einer dritten Zone auffallen; und derselbe Locale-Name kann
  verschiedene ctype-Regime tragen, also zählt das gemessene Verhalten, nie die Bezeichnung.
- **Das Messgerät selbst ist eine Fehlerquelle.** Unter Git-Bash verschwindet `TZ` aus der Umgebung
  eines nativen Windows-Kindes, sobald der Wert eines von `/ _ . , :` oder ein Leerzeichen enthält:
  gemessen kommen `TZ=UTC` und `TZ=JST-9` an, `TZ=Asia/Tokyo` dagegen als `seen=undefined`
  (`resolved=Europe/Berlin`), während `FOO=Asia/Tokyo` unbeschadet durchkommt. Dieselbe Zuweisung
  unter PowerShell liefert `seen="Asia/Tokyo" resolved=Asia/Tokyo`. Das ist eine gemessene
  **Zeichenklasse**, keine TZ-Validität — und eine Beobachtung, keine Ursache.

## Gotchas (belegtes Repo-Wissen)

- **`file://` ist im Browser-Tool blockiert** (fetch/Module). Offline-Single-File-Builds über
  `python -m http.server` ausliefern, Vite `base: './'`.
- **TanStack Query in Automations-/Headless-Browsern**: `navigator` meldet offline, Queries bleiben
  ewig in `fetchStatus: 'paused'` → `networkMode: 'always'` setzen, sonst verifizierst du einen
  Ladespinner.
- **Vor dem Re-Test neu bauen.** Sonst prüfst du das alte Bundle und bestätigst dir den Fix, den du
  nie geladen hast. Dev-Server liest `.env` beim Start — nach Änderung neu starten; `preview`/`prod`
  **backen** `VITE_*` zur Build-Zeit ein.
- **rAF friert in versteckten Tabs** — Animationen/Polling im Hintergrundtab wirken „hängend".
- **Demo-/Seed-Daten laden**, sonst verifizierst du leere Zustände und siehst die reichen nie.
- **PostgREST nach direktem Postgres-DDL**: neue Tabellen sind erst nach
  `NOTIFY pgrst, 'reload schema'` über die REST-API sichtbar (Symptom: 404 auf existierende Tabelle).

## Report-Vorlage

Acht Belegzeilen: drei tragen einen `n/a`-Zweig (Umgebung, Positivfall, Round-Trip), zwei einen
Aufschub-Zweig mit Wer/Wann (CI, Visuell). Die vier Fragen von oben sitzen in Zeile 1 (Umgebung),
2 (Laufzeit), 5 (Richtung) und 7 (Läufer):

```md
## Verify — <kurzer Name des geänderten Flows>
- Kontext: <gelesene Quelle für die Kommandos, z. B. package.json:scripts.dev> · Umgebung: <gemessene Achse + wo gepinnt> | n/a (Pfad liest keine)
- Start: <Kommando> unter <echter Laufzeit> → <URL/Port>, ready nach <n>s, <BELEGZAHL aus dem echten Start>
- Ausgelöst: <konkreter Einstiegspunkt>
- Beobachtet: <BELEGZAHL — Status/Zeilen/Anzahl/Testzahl>
- Beide Richtungen: Ablehnung <BELEGZAHL> · Positivfall gegen die echte Konfiguration <BELEGZAHL> | Positivfall n/a (kein fail-closed-Mechanismus berührt)
- Round-Trip: <Golden Test: n passed, RED gegen alte Impl bestätigt> | n/a (kein Contract berührt)
- CI: <Lauf für <sha>: <conclusion>, gelesen mit <Kommando>> | kein Lauf für <sha>, weil <welcher der drei Leerfälle> → <wer> liest es <wann>
- Visuell: verifiziert (Screenshot <pfad>) | DEFERRED → <wer> fährt es <wann>
```

**Nicht verifiziert** ist jeder Report, dessen Start-Zeile die Laufzeit nicht nennt, dessen einzige
Belegzahl eine Ablehnung ist, oder dessen `CI:`- bzw. `Visuell:`-Zeile aufschiebt, ohne **wer** und
**wann** zu nennen.
