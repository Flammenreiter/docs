---
name: setup-quality-gates
description: 'Die zwei Gates verdrahten, die in den Vorlagen fail-open sind: die jscpd-Duplikationsschranke (ohne Pfadargument prueft sie NULL Dateien und ist gruen bei Exit 0) und das FSD-Boundary-Gate (ohne settings["import/resolver"].typescript verwirft eslint-plugin-boundaries jeden aliased Import still — ein 100-%-No-op bei Severity error). Liefert die korrekte Script-Form, den Resolver-Block und einen Kanarienvogel, der das GATE mutiert statt der Fixture, jeweils woertlich zum Abtippen. Nutze, wenn ein Projekt cpd:ci oder FSD-Boundaries einrichtet, wenn ein Gate verdaechtig schnell gruen ist, oder wenn ein Lint-/Duplikations-Gate nie etwas gefunden hat.'
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Setup Quality Gates

Dieses Skill verdrahtet die zwei Gates, die `30-quality` und `31-quality-web` **fordern** und die in
den bestehenden Vorlagen **grün sind, ohne irgendetwas geprüft zu haben**: die jscpd-Schranke und das
FSD-Boundary-Gate. Beide fallen in dieselbe Klasse — sie melden nicht „nichts gefunden", sondern
„nichts geprüft", und das sieht identisch aus.

> **agent-core liefert hier keine Datei aus, nur das Rezept** (F3 = b). Jeder Block unten ist
> vollständig und abtippfähig; die Datei entsteht im Zielprojekt. Das ist kein Verzicht: ein
> ausgeliefertes Gate-Script wäre eine zweite Kopie, die genau so still von diesem Text wegdriftet,
> wie die fünf gemessenen cpd-Kopien voneinander weggedriftet sind.

> **Prosa deutsch, Code/Identifier/Kommandos englisch** (Repo-Konvention).

## Wann invoken

- Ein Projekt richtet `cpd:ci` oder FSD-Boundaries **neu** ein — oder erbt sie aus einer Vorlage.
- Ein Gate ist **verdächtig schnell** grün (`Detection time: 0.088ms` für ein Monorepo).
- Ein Lint-/Duplikations-Gate hat **noch nie** etwas gefunden, und niemand weiß, ob das ein Lob ist.
- Ein Review fragt „ist das Gate eigentlich verdrahtet?" — die Antwort ist ein Kanarienvogel, kein Ja.

## Die zwei Fail-opens, mit Messung

Beide Befunde stammen aus dem Einzelgutachten zu Issue #9
(`docs/issue-triage-2026-08-03/issue-09.md:24-29`, gemessen 2026-08-03) — hier zitiert, nicht neu
gefahren. Die Fundstellen sind Consumer-Repos, nicht agent-core.

### Fail-open 1 — `jscpd` ohne Pfadargument prüft null Dateien

`"cpd:ci": "jscpd --reporters console --threshold 5"` sieht vollständig aus und ist es nicht: ohne
Pfadargument bekommt jscpd **nichts zu tun**. Gemessen an zwei Dateien mit 50 % Duplikat:

```
$ jscpd --reporters console --threshold 5      # ohne Pfad
Detection time:: 0.088ms
EXIT=0                                          # und KEINE "Files analyzed"-Zeile

$ jscpd . --reporters console --threshold 5    # mit Pfad
typescript | 2 | 18 | 330 | 1 | 9 (50%)
Found 1 clones.
ERROR: jscpd found too many duplicates (50%) over threshold (5%)
EXIT=1
```

**Warum die naive Form fail-open ist:** die Schranke wird nie unterschritten, weil nie gemessen wird.
Exit 0 heißt hier nicht „sauber", sondern „nicht gelaufen" — und die beiden sind an der Ausgabe **nur**
daran zu unterscheiden, dass die Zeile mit der Dateizahl **fehlt**. Eine Assertion auf „Zahl == 0"
greift also zu kurz; das Fehlen der Zeile muss genauso hart rot sein (`30-quality`: Exit-Codes lügen,
prüfe was ein Gate **emittiert**).

### Fail-open 2 — das Boundary-Gate ohne TS-Resolver

`eslint-plugin-boundaries` verwirft **still** jeden Import, den es nicht zu einer Datei auflösen kann:
die Vorprüfung `checkAllOrigins`/`checkUnknownLocals` (beide Default `false`) läuft **vor** der
Regelauswertung. In einem TS-Projekt mit Pfad-Aliassen ist das Gate damit ein **100-%-No-op — grün bei
Severity `error`**.

- Es braucht `settings["import/resolver"].typescript` (`eslint-import-resolver-typescript`; er liest
  die tsconfig-`paths` selbst, ein `baseUrl` beim Konsumenten ist nicht nötig).
- Der `node`-Resolver genügt **nicht** — er kann `paths` nicht lesen, also bleiben aliased Imports
  stumm, während relative Imports fehlerfrei erkannt werden. Wer den Fix an einer **relativen**
  Fixture prüft, feiert einen falschen Sieg.
- Unter pnpm muss der Resolver **direkte devDependency jeder App** sein: `eslint-module-utils` löst
  ihn relativ zur **gelinteten Quelldatei** auf, geerbt aus einem geteilten Preset findet er sich nicht.
- Eine gate-tragende Regel fällt außerdem per **Deprecation** offen: `eslint-plugin-boundaries@6`
  deprecated `no-private`/`entry-point`, v7 entfernt sie — Major pinnen und jede deprecated Regel,
  die eine Grenze bewacht, ticketen.

## Die korrekte Form, wörtlich

Drei Blöcke, jeder vollständig. Anlegen heißt: Block in die genannte Datei schreiben, die benannten
Stellen anpassen, dann **rot verifizieren** — vorher ist nichts davon ein Gate.

### `cpd-gate.mjs` → `scripts/cpd-gate.mjs`

Anzupassen: `PATHS` (die Verzeichnisse, die es wirklich gibt), `THRESHOLD`, `EXTENSIONS`. Verdrahten
als `"cpd:ci": "node scripts/cpd-gate.mjs"`. Das Skript zählt seine **eigene** Reichweite, bevor es
jscpd startet, und weigert sich bei null — damit ist die pfadlose Form konstruktiv unerreichbar.

<!-- BEGIN file cpd-gate.mjs -->

```js
#!/usr/bin/env node
// @ts-check
/**
 * cpd-gate.mjs — jscpd with a REACH NUMBER, so "nothing found" cannot pass as "nothing scanned".
 *
 * THE BUG THIS EXISTS FOR
 *   `jscpd --reporters console --threshold 5` (no path argument) analyses NOTHING and exits 0. Its
 *   whole output is one `Detection time::` line: the files-analyzed row is not printed at all. A CI
 *   job wired that way is green forever and the duplication limit does not exist.
 *
 * WHAT THIS ADDS
 *   1. The paths are explicit AND counted here, before jscpd runs. Zero files is a hard RED — that is
 *      the missing-path bug, made unreachable.
 *   2. jscpd's OWN file count is read back out of its output. If it cannot be found, that is RED too,
 *      never "assume fine": jscpd's console table is version-dependent, and an unparsable output is
 *      exactly the state this gate exists to distinguish from a clean run.
 *   3. jscpd's exit code is passed through, so the threshold still fails the build on its own.
 *
 * USAGE   node scripts/cpd-gate.mjs
 */
import { spawnSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

/** Directories jscpd must scan. Every one of them has to exist — a typo here is a silent hole. */
const PATHS = ['apps', 'packages'];
/** Duplication threshold in percent, same value the rule states. */
const THRESHOLD = '5';
/** Extensions counted as reach. Keep in sync with what jscpd is configured to read. */
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];
/** Directories never worth scanning — they would inflate the reach number without being reviewed. */
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', 'coverage', '.git', '.turbo', '.next']);

/**
 * Count the files this gate is about to hand to jscpd.
 *
 * @param {string} dir Directory to descend into.
 * @returns {number} Number of matching files below `dir`.
 */
function countFiles(dir) {
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      n += countFiles(join(dir, entry.name));
    } else if (entry.isFile() && EXTENSIONS.includes(extname(entry.name))) {
      n += 1;
    }
  }
  return n;
}

let reach = 0;
for (const p of PATHS) {
  try {
    if (!statSync(p).isDirectory()) throw new Error('not a directory');
  } catch {
    console.error(`cpd-gate: RED — configured path "${p}" does not exist. Fix PATHS; do not drop it.`);
    process.exit(1);
  }
  reach += countFiles(p);
}

if (reach === 0) {
  console.error(`cpd-gate: RED — 0 files under [${PATHS.join(', ')}]. A duplication gate that scans`);
  console.error('  nothing is green forever. Check PATHS and EXTENSIONS before touching the threshold.');
  process.exit(1);
}
console.log(`cpd-gate: reach ${reach} file(s) under [${PATHS.join(', ')}], threshold ${THRESHOLD}%`);

const res = spawnSync(
  'npx',
  ['jscpd', ...PATHS, '--reporters', 'console', '--threshold', THRESHOLD],
  { encoding: 'utf8', shell: process.platform === 'win32' },
);
const out = `${res.stdout ?? ''}${res.stderr ?? ''}`;
process.stdout.write(out);

if (res.error) {
  console.error(`cpd-gate: RED — could not run jscpd: ${res.error.message}`);
  process.exit(1);
}

// jscpd prints one row per format: `<format> | <files> | <lines> | <tokens> | <clones> | <dup> (<pct>)`.
// Sum the SECOND column across those rows — that is jscpd's own answer to "how many files did I read".
const analysed = [...out.matchAll(/^\s*(\w[\w+#-]*)\s*\|\s*(\d+)\s*\|/gm)].reduce(
  (sum, m) => sum + Number.parseInt(m[2], 10),
  0,
);
if (analysed === 0) {
  console.error('cpd-gate: RED — jscpd reported no analysed files (or its output could not be read).');
  console.error(`  This gate refuses to translate that into "clean". Reach counted here: ${reach}.`);
  console.error('  If jscpd changed its console table, fix the parser — do NOT delete this branch.');
  process.exit(1);
}
console.log(`cpd-gate: jscpd analysed ${analysed} file(s) · exit ${res.status ?? 'null'}`);
process.exit(res.status ?? 1);
```

<!-- END file cpd-gate.mjs -->

### Der Resolver-Block → `eslint.config.mjs` **jeder** App

Anzupassen: der tsconfig-Pfad. Dazu `eslint-import-resolver-typescript` als **direkte** devDependency
**dieser App** — nicht im geteilten Preset, nicht in der Wurzel.

<!-- BEGIN file eslint-resolver.mjs -->

```js
// apps/<app>/eslint.config.mjs — the settings block WITHOUT which `boundaries` is a no-op.
//
// Reference that is verified to work: global-login/apps/login/eslint.config.mjs:46-48 plus
// apps/login/package.json:43 `"eslint-import-resolver-typescript": "^4.4.5"` — the resolver is a
// DIRECT devDependency of the app, because eslint-module-utils resolves it relative to the linted
// source file. Inheriting it transitively from a shared preset does not resolve under pnpm.
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default [
  // … your other config objects …
  {
    files: ['src/**/*.{ts,tsx}'],
    settings: {
      // WITHOUT this block every aliased import is silently DROPPED before the rule runs.
      'import/resolver': {
        typescript: { project: join(rootDir, 'tsconfig.app.json') },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/*' },
        { type: 'routes', pattern: 'src/routes/*' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
    },
    rules: {
      // Pin the plugin's MAJOR: v6 deprecates no-private/entry-point, v7 drops them, and a
      // deprecation is not a lint finding — a gate rule can vanish at a routine major upgrade.
      'boundaries/element-types': ['error', { default: 'disallow', rules: [/* your FSD rules */] }],
    },
  },
];
```

<!-- END file eslint-resolver.mjs -->

### Der Kanarienvogel → zwei Dateien in der App

Anzupassen: die Slice-Pfade und der Alias im Import. **Der Import muss ein ALIAS sein** — ein
relativer Import wird auch von einem toten Resolver erkannt und macht den Kanarienvogel wertlos.
Die Fixture liegt im **Slice-Root**, nicht unter `__tests__/`: Test-Globs schalten `boundaries`
üblicherweise ab, dort wäre sie stumm.

<!-- BEGIN file boundary-canary.ts -->

```ts
// apps/<app>/src/features/canary/boundary-canary.ts
//
// GATE CANARY — this file is SUPPOSED to be a lint error. It is not dead code and not a mistake:
// it is the only proof that `boundaries/element-types` is wired at all.
//
// The import is ALIASED on purpose. A relative `../../app/router` errors even with a dead resolver,
// so a canary built from one reports a green gate that does not exist.
// It lives in the slice root, NOT under `__tests__/`: those paths usually switch `boundaries` off.
//
// features -> app is an UPWARD import and therefore illegal under FSD (`10-fsd`).
// eslint-disable-next-line -- intentionally NOT disabled: the error is the assertion.
import { router } from '@app/router';

export const canary = router;
```

<!-- END file boundary-canary.ts -->

<!-- BEGIN file boundary-canary.test.ts -->

```ts
// apps/<app>/src/features/canary/__tests__/boundary-canary.test.ts
//
// Runs the project's OWN shipped ESLint config over the canary and asserts the exact rule id and
// severity — `30-quality`: a canary mutates the GATE, not the fixture. Rebuilding a config inside the
// test would only prove that the rebuilt config works.
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(HERE, '../../../..'); // __tests__ -> canary -> features -> src -> app root
const CANARY = join(HERE, '..', 'boundary-canary.ts');
const LEGAL = join(HERE, '..', 'legal-import.ts'); // any file with a legal, aliased import

const RULE = 'boundaries/element-types';

/**
 * Lint one file with the app's own flat config.
 *
 * @param file Absolute path of the file to lint.
 * @returns The rule's messages plus everything ESLint said about the file.
 */
async function lint(file: string): Promise<{ ruleMessages: ESLint.LintResult['messages']; all: ESLint.LintResult }> {
  const eslint = new ESLint({ cwd: APP_ROOT });
  const [result] = await eslint.lintFiles([file]);
  return { ruleMessages: result.messages.filter((m) => m.ruleId === RULE), all: result };
}

describe('FSD boundary gate is wired (not a 100% no-op)', () => {
  it('flags the ALIASED illegal import with the exact rule id at severity error', async () => {
    const { ruleMessages, all } = await lint(CANARY);
    // An ignored file yields zero messages, which reads exactly like a clean file. Rule it out first.
    expect(all.messages.map((m) => m.message).join(' ')).not.toMatch(/ignored/i);
    expect(ruleMessages.length, `${RULE} did not fire — the resolver is probably missing`).toBeGreaterThan(0);
    expect(ruleMessages[0].severity, `${RULE} is not at error severity`).toBe(2);
  });

  it('POSITIVE CONTROL: a legal aliased import produces no boundary error', async () => {
    // Without this a rule that rejects EVERYTHING would pass the assertion above.
    const { ruleMessages, all } = await lint(LEGAL);
    expect(all.messages.map((m) => m.message).join(' ')).not.toMatch(/ignored/i);
    expect(ruleMessages).toEqual([]);
  });
});
```

<!-- END file boundary-canary.test.ts -->

## RED verifizieren, sonst ist es nur eine Behauptung

1. **cpd:** `PATHS` testweise auf ein leeres Verzeichnis zeigen lassen → `cpd-gate: RED — 0 files`,
   Exit 1. Zurückstellen → die Reichweitenzahl steht wieder da. Danach zwei Dateien mit echtem
   Duplikat anlegen → Exit 1 mit `ERROR: jscpd found too many duplicates`.
2. **Boundaries:** den Resolver-Block auskommentieren und den Kanarienvogel-Test fahren. Er **muss**
   fallen (`boundaries/element-types did not fire`). Wieder einkommentieren → grün. **Nur diese
   Mutation zählt** — die Fixture zu ändern beweist nichts über das Gate.
3. Beide Ausgaben in den PR schreiben, nicht „lief rot".

## Ehrliche Grenzen

- **Das cpd-Gate zählt Dateien, nicht Qualität.** Reichweite > 0 heißt nur, dass gemessen wurde.
- **Die Reichweitenzahl des Skripts und jscpds eigene Zahl sind zwei verschiedene Messungen**, und das
  ist Absicht: die erste kann die pfadlose Form nicht haben, die zweite kann eine falsch konfigurierte
  Erweiterungsliste aufdecken. Weichen sie stark ab, ist die Konfiguration schief — kein Grund, eine
  der beiden abzuschalten.
- **Der Kanarienvogel deckt eine Regel ab, nicht alle.** `no-private`/`entry-point` brauchen je eigene
  Fixtures; ohne die bleibt ihr Verschwinden bei einem Major unsichtbar.
- **agent-core kann das nicht für dich einbauen.** Es hat keine `package.json`-Scaffold-Fläche
  (`55-templates`: neue Projekte starten aus dem Claude-Template); der Rollout ist ein PR pro Repo,
  und er färbt CI beim ersten Lauf rot — das ist der Sinn, aber es gehört bewusst geplant.
