---
name: contract-golden-test
description: 'Golden-Test gegen EINEN geteilten Fixture-Satz aufsetzen, sobald ein Contract/Schema in mehr als einem Paket gespiegelt oder geshimmt wird (Shim, Mirror, lokale Re-Deklaration, Versions-Skew zwischen installiertem und lokalem shared). Liefert das Round-Trip-Muster build→serialize→validate→read, ein lauffähiges Vitest-Template und die RED-Verify-Pflicht. Nutze, wenn du eine zweite Kopie eines Contracts anlegst oder vorfindest, wenn Agenten parallel an derselben Form arbeiten, oder wenn ein Layout/Payload zwischen zwei Paketen still divergiert (HTTP 400, ZodError beim Save, lautlos übersprungene Datensätze).'
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Contract Golden Test

Dieses Skill setzt den **Golden-Test** auf, der eine über mehrere Pakete **gespiegelte** Contract-Form
zusammenhält. Es ist die **Untergrenze** aus `25-orchestration` („Consolidate shared semantics") —
nicht die beste Option, sondern der Boden, auf den man fällt, wenn Serialize/Generate nicht erreichbar
sind. Grundlage: **ADR-0021**.

> **Prosa deutsch, Code/Identifier/Dateinamen englisch** (Repo-Konvention).

## Wann invoken

- Du legst eine **zweite Kopie** eines Contracts an (Shim, Mirror, lokale Re-Deklaration eines
  Zod-Schemas / Typs / Wire-Formats) — oder findest eine vor.
- Zwischen **installiertem** `shared`-Paket und **lokaler** Quelle besteht ein **Versions-Skew**
  (das ist eine Kopie, auch wenn sie nicht so heißt).
- Mehrere Agenten arbeiten **parallel** an derselben Form/Protokoll/Migration.
- Symptome, die Shim-Drift verraten: **HTTP 400** auf ein neues Layout, **ZodError beim Save** bei
  grünem Editor, **lautlos** übersprungene Datensätze in einer Lese-Query.

**Trigger ist die Kopie, nicht die Agentenzahl.** Vier Kopien divergieren auch, wenn ein einzelner
Mensch sie über drei Sessions pflegt.

## Warum ein Renderer-/Unit-Test es NICHT fängt

Jeder Konsument testet gegen **seine eigene** Kopie — und ist darin **in sich konsistent**. Der Test
ist grün, weil Producer und Assertion aus derselben Kopie stammen. Was niemand testet, ist der
**Übergang** zwischen zwei Kopien.

Belegter Vorfall (Flammenreiter, 2026-07-18): dieselbe v2-Slot-Form (`slot.panels[]`/`activePanelId`)
lag in **4 Kopien** (shared-Quelle + 3 Shims) und divergierte in **einem** Lauf **dreimal** —
api-Shim behielt v1 `panelId` → **HTTP 400** auf jedes v2-Layout; die Lese-Query migrierte über das
installierte v1-`shared` → übersprang v2-Profile **lautlos**; der Editor baute v1, das Save validierte
v2 → **ZodError**. **Alle** Agenten meldeten grüne Gates.

## Das Muster: build → serialize → validate → read

**Dieses SKILL.md ist die kanonische Quelle des Musters.** `25-orchestration`, `30-quality`,
`31-quality-web` und das `verify`-Skill nennen nur die vier Schritte und zeigen hierher — Code steht
genau an dieser einen Stelle, damit die Kopien nicht auseinanderlaufen.

Vier Schritte, jeder kreuzt eine echte Paketgrenze. Ein Test, der einen davon auslässt, ist kein
Golden-Test:

| Schritt | Was er ausführt | Welche Divergenz er fängt |
|---|---|---|
| **build** | der **Producer** (Editor/Builder) erzeugt aus dem Fixture die Form | Producer baut noch v1 |
| **serialize** | `JSON.parse(JSON.stringify(x))` — die **API-Grenze** | alles, was die JSON-Grenze nicht überlebt (`Date`, `undefined`, `Map`, Klassen-Instanzen) |
| **validate** | das **Save-Schema** parst die **serialisierte** Form | Save-Schema kennt die Wire-Form nicht (HTTP 400 / ZodError) |
| **read** | der **Reader/Migrator** liest die serialisierte Form zurück | Reader migriert über eine alte Version → lautloses Überspringen |

```ts
const built = editorBuild(tabGroupLayout);                  // producer
const wire = JSON.parse(JSON.stringify(built));             // api boundary (serialize)
expect(SaveSchema.safeParse(wire).success).toBe(true);      // save path validates the WIRE form
expect(migrateOnRead(wire)).toEqual(built);                 // read path
// RED-verify: swap in the OLD (v1) migrate → must fail.
```

**Die Reihenfolge ist tragend: erst serialisieren, dann validieren.** Die API sieht nie das Objekt,
sie sieht den Payload — genau daran hing der belegte HTTP 400. Validiert man vor `JSON.stringify`,
prüft das Save-Schema eine Form, die nie über die Leitung geht, und die Divergenzen, die der
serialize-Schritt fangen soll (`Date`, `undefined`, `Map`, Klassen-Instanzen), rutschen durch.

> **Zusätzlich `safeParse(built)` vor dem Serialisieren?** Nur als optionale Diagnose, nie als
> zweite Pflicht-Assertion: ein Save-Schema, das korrekt die *Wire*-Form modelliert (z. B.
> `z.iso.datetime()` für ein producer-seitiges `Date`), lehnt das In-Memory-Objekt **zu Recht** ab —
> die Assertion würde ausgerechnet die Drift-Klasse rot machen, für die es den serialize-Schritt
> gibt. Ist die gebaute Form per Contract JSON-identisch, kann die Zeile den Fehler früher
> lokalisieren (Producer vs. Serialisierung); tragend bleibt die Wire-Validierung.

Vollständiges, lauffähiges Template: Anhangsblock `contract.golden.test.ts` — wörtlich unten, zum
Abtippen. agent-core liefert dafür **keine Datei** aus (F3 = b); der Konsument legt sie selbst an.

## EIN Fixture-Satz, N Konsumenten

Das **Serialize-Prinzip**, auf den Test angewandt: Der Fixture-Satz lebt in **genau einem** Paket und
wird von **jedem** Konsumenten **importiert**.

```
packages/contract-fixtures/src/fixtures.ts   ← der EINE Satz (Anhangsblock fixtures.ts)
   ↑            ↑              ↑
apps/api    apps/web-gm    apps/web-player   ← jeder importiert, keiner kopiert
```

- **Nie** kopieren, **nie** pro Paket „leicht anpassen". Eine kopierte Fixture driftet mit der Kopie
  mit — dann bestätigt der Test nur noch die lokale Wahrheit und ist wertlos.
- Der **Test** läuft dagegen in **jedem** Konsumenten-Gate (N-mal). Ein einzelner zentraler Lauf würde
  genau die lokale Kopie nicht sehen — das ist der Sinn der Übung, nicht ein Versehen.
- Der Fixture-Satz deckt **je eine** Fixture pro relevanter Contract-Variante ab (v1-Legacy, v2,
  Randfälle wie leere Collections und optionale Felder) — siehe Anhangsblock `fixtures.ts`.

## Zellen über Schlüssel adressieren, nie über Positionen

Eine Fixture-Zelle wird über einen **stabilen Namen** verglichen, nie über ihren Index. Stammt die
**Reihenfolge** der Erwartung aus derselben Quelle wie die Reihenfolge der Ist-Werte, prüft der Test
nur noch, dass die Quelle mit sich selbst übereinstimmt — und das ist immer wahr.

```ts
// blind: ROLE_NAMES ist selbst nach Sprosse sortiert, ein Tausch permutiert BEIDE Seiten gleich
for (let rung = 0; rung < ROLE_NAMES.length; rung += 1)
  expect(derive(ROLE_NAMES[rung])).toBe(goldenRow[rung]);

// dicht: der Schlüssel steht als Literal im Test, die Reihenfolge trägt nichts mehr
expect(derive('designer')).toBe(GOLDEN['designer']);
expect(ROLE_RUNGS).toEqual({ project: 0, /* … */ designer: 5, content: 6, qa: 8 });
```

Belegter Vorfall (agent-core, 2026-08-03): ein Golden-Test verglich 99 veröffentlichte Werte Zelle
für Zelle und adressierte die Spalten über `ROLE_NAMES[rung]` gegen `row[rung]` — `ROLE_NAMES` wird
selbst **nach Sprosse sortiert** abgeleitet. Zwei Sprossen getauscht (`designer: 6, content: 5`)
änderte jede veröffentlichte Farbe zweier Rollen, und **22 von 22 Tests blieben grün**:
Eindeutigkeit, Lückenlosigkeit, Wertebereich, Kontrast über 99 Kombinationen und 99 nachgerechnete
Zellen — keine dieser Zusicherungen war an einen **Namen** gebunden. Die zweite Achse derselben
Tabelle war nie betroffen, weil sie namentlich adressiert wurde; genau diese Asymmetrie war die
Lücke. Nachgestellt mit zwei Läufen desselben Programms, einmal mit getauschten Einträgen:

```
positional: 2 cells compared · 0 deviation(s) · SWAP=false → pass 2 · fail 0
keyed:      2 cells compared · 0 deviation(s) · SWAP=false

positional: 2 cells compared · 0 deviation(s) · SWAP=true  → pass 1 · fail 1
keyed:      2 cells compared · 2 deviation(s) · SWAP=true
```

- **Die Erwartung ist eine Map mit Schlüsseln**, kein Array „in derselben Reihenfolge wie …".
- **Braucht die Serialisierung wirklich Positionen** (Wire-Arrays, CSV-Zeilen), dann nagle die
  Reihenfolgen-Quelle **zusätzlich namentlich** fest — `expect(ORDER_TABLE).toEqual({ … })`. Dann
  trägt der Test den Schlüssel, und die Ordnung bleibt eine abgeleitete Größe.
- **Nicht auf Farben beschränkt:** Spaltenlisten gegen CSV-Zeilen, Enum-Reihenfolge gegen
  serialisierte Arrays, Slot-Nummern gegen Positionen einer Fixture-Zeile — jede geordnete Tabelle,
  deren Reihenfolge aus derselben Quelle stammt wie die Erwartung, trägt diese Blindstelle.

Kandidaten im eigenen Repo aufzählen (eine **Liste**, kein Gate — sie findet die Schreibweise, nicht
die Blindheit):

```bash
rg -n --glob '**/*.{test,spec}.{ts,tsx,js,mjs,cjs}' --glob '!**/node_modules/**' \
   '(toBe|toEqual|toStrictEqual)\(\s*[A-Za-z_$][\w$.]*\[\s*[a-z]{1,5}\s*\]'
# agent-core am 2026-08-05: 1 Treffer — src/colorRegistry.test.ts:393
```

## RED-Verify ist Pflicht

Ein Golden-Test, der nie gegen die **kaputte** Implementierung lief, ist unbewiesen
(`30-quality`: „Regression tests — verified RED, not assumed"). **Zwei** Mutationen sind Pflicht, nicht
eine: die Wertänderung **und** die Vertauschung. Eine Wertänderung deckt die Permutationsklasse oben
nicht ab — die RED-Verifikation kann lehrbuchmäßig durchgeführt sein und der Test trotzdem gegen jede
Vertauschung blind bleiben.

1. **Wertmutation:** die **alte** (v1-)Variante einsetzen — `migrateOnRead` durch die v1-Migration
   ersetzen **oder** den Producer auf die v1-Form zurückdrehen.
2. **Vertauschungsmutation:** zwei Einträge der geordneten Tabelle **tauschen** (zwei Enum-Glieder,
   zwei Spalten, zwei Slots) und sonst nichts ändern.
3. `vitest run` — der Test **muss** in **beiden** Fällen fallen. Die Fehlermeldung notieren (die
   Zahl/Diff, die das Gate selbst emittiert — nicht „lief rot").
4. Zurücktauschen, erneut laufen lassen — grün.

Fällt der Test bei der **Wert**mutation nicht, testet er nicht das, was du glaubst (typischer Grund:
Producer und Assertion stammen aus derselben Kopie, oder der Fixture-Satz wurde mitmigriert). Fällt
er bei der **Vertauschung** nicht, adressiert er seine Zellen über Positionen — siehe den Abschnitt
darüber.

**Gotcha:** Ein reiner Typ-Test ist hier wertlos — `import type` wird wegtranspiliert, der Test
behauptet dann nur seine eigenen Literale und bleibt grün, nachdem das Feld gelöscht wurde. Der
Golden-Test muss zur **Laufzeit** gegen die echten Module laufen.

## Setup-Schritte

1. **Kopien finden.** `grep` die Typ-/Schema-Definition über alle Pakete:
   `rg -n "activePanelId|panelId" --glob '!**/node_modules/**'` (bzw. den Namen deines Contracts).
   Jede Fundstelle außerhalb der Quelle ist eine Kopie.
2. **Fixture-Paket anlegen** (oder ein bestehendes wählen) und den Anhangsblock `fixtures.ts` als
   Startpunkt hineinschreiben. Er lebt ab jetzt an **genau einer** Stelle.
3. **Template ausrollen:** den Anhangsblock `contract.golden.test.ts`
   in **jeden** Konsumenten schreiben — unter genau diesem Namen (`src/**/contract.golden.test.ts`,
   erst dann sammelt es das Test-Glob ein) — und die drei Platzhalter-Imports auf die lokalen Module
   zeigen lassen — **den Fixture-Import NICHT umbiegen**.
4. **RED verifizieren** (siehe oben) — einmal pro Konsument, nicht nur im ersten.
5. **Ins Gate hängen:** der Test läuft in `npm test` / `turbo test` jedes Konsumenten mit; keine
   Sonderbehandlung, kein eigener CI-Job.
6. **Review-Zeile befolgen** (`25-orchestration`): *grep the same type/schema definition across
   packages; every copy needs the SAME golden-fixture import.*

## Ehrliche Grenzen

- **Form-Gleichheit ≠ fachliche Richtigkeit.** Der Test zeigt, dass alle Kopien **dieselbe** Form
  sprechen — nicht, dass die Form die richtige ist. Ein gemeinsam falsches Schema bleibt grün.
- **Die N-te Kopie, die den Fixture-Import vergisst, bleibt unsichtbar.** Ein neuer Shim ohne den
  geteilten Fixture-Satz wird von keinem Golden-Test berührt und ist trotzdem grün — dieselbe
  fail-open-Klasse wie ein Lint-Gate ohne Resolver. **Einzige** Abdeckung: die grep-Checklist aus
  Schritt 1/6.
- **Kosten:** N Konsumenten = N Testläufe für dieselbe Zusicherung. Bewusst in Kauf genommen.
- **Serialize und Generate bleiben besser.** Wenn du die Kopie ganz vermeiden (eine Quelle, N
  Konsumenten) oder mechanisch ableiten kannst (Codegen), tu das — und behalte den Golden-Test
  **zusätzlich**.

## Anhang — die zwei Dateien, wörtlich

Beide Blöcke stehen **vollständig** hier, keiner gekürzt. agent-core liefert sie **nicht als Datei**
aus (F3 = b) — der Konsument legt sie selbst an. Jeder Block steht zwischen zwei HTML-Markern, damit
ein Test ihn maschinell herausschneiden kann.

> **Die Namensfalle, die dadurch verschwindet — und die niemand zurückbauen soll.** Solange die
> Vorlagen **Dateien** waren, mussten sie `*.example.ts` heißen: Vitests Default-`include`
> (`**/*.{test,spec}.?(c|m)[jt]s?(x)`) hätte sie im **Zielprojekt** eingesammelt, und der
> Default-`exclude` deckt `.claude/**` nicht ab — der Adoptierende hätte einen still grünen Test für
> einen Contract bekommen, den sein Code gar nicht hat. Als Prosa kann das nicht mehr passieren, ein
> Block liegt in keinem Glob. **Wer je wieder eine Vorlagen-Datei ausliefert, erbt die Falle sofort
> zurück** — dann heißt sie wieder `*.example.ts` plus Umbenennungsanweisung.

Der englische Spiegel wiederholt die Blöcke **nicht**: eine zweite Kopie derselben Contract-Form im
selben Repo ist genau der Defekt, gegen den dieses Skill geschrieben ist.

### `contract.golden.test.ts` → `src/**/contract.golden.test.ts` in JEDEM Konsumenten

Anzupassen: die drei Imports im Block `REAL IMPORTS` auf die eigenen Module zeigen lassen, dann den
Block zwischen `STAND-IN START` und `STAND-IN END` **löschen**. Den Fixture-Import **nicht** umbiegen.

<!-- BEGIN file contract.golden.test.ts -->

```ts
/**
 * Golden test template — ONE shared fixture set, run in EVERY consumer's gate.
 *
 * agent-core ships this as PROSE, never as a file (F3 = b): write it into the consumer yourself, at
 * `src/**\/contract.golden.test.ts`. While it was a shipped file it had to be called `*.example.ts`,
 * because a consumer's default test glob would otherwise have collected it out of
 * `.claude/skills/…/assets/` and run a green test for a contract that repo does not have.
 *
 * It exercises the only path that catches shim drift:
 *
 *     build → serialize → validate → read
 *
 * The order is load-bearing: the save schema validates the **serialized wire form**, not the
 * in-memory object. Validating before `JSON.stringify` is what let the shipped bug through — the
 * API never sees the object, it sees the payload, and `Date` / `undefined` / `Map` / class
 * instances differ between the two.
 *
 * A renderer/unit test does NOT catch shim drift: producer and assertion come from the SAME local
 * copy, so the test is internally consistent and stays green while the copies diverge from each
 * other. Only the round-trip crosses a real package boundary.
 *
 * Canonical pattern + rationale: `skill:contract-golden-test` (SKILL.md).
 * Rule: `25-orchestration` ("Consolidate shared semantics"). Decision: ADR-0021.
 *
 * HOW TO ADOPT (three edits):
 *   1. Create it as `contract.golden.test.ts` in the consumer (`src/**\/contract.golden.test.ts`).
 *   2. Uncomment the REAL IMPORTS block and point it at your modules.
 *      Do NOT re-point the fixture import at a local copy — the fixture set lives in exactly ONE
 *      package and every consumer imports THAT one (see the `fixtures.ts` block).
 *   3. Delete everything between the STAND-IN markers.
 *
 * Then RED-verify (mandatory, per `30-quality` "verified RED, not assumed"): swap the OLD (v1)
 * migrate/producer back in, run `vitest run`, watch this file FAIL, note the emitted diff, swap back.
 */
import { describe, expect, it } from 'vitest';

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// 1. REAL IMPORTS — uncomment and re-point at your own modules.
// ─────────────────────────────────────────────────────────────────────────────────────────────────
// import { editorBuild } from '@repo/editor';                              // the producer
// import { SaveSchema, migrateOnRead } from '@repo/shared-contract';       // save path + read path
// import { tabGroupLayout, legacyV1Slot } from '@repo/contract-fixtures';  // the ONE fixture set

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// 2. STAND-IN START — delete this whole block once (2) is wired.
//    It exists only so the template runs green out of the box and shows the exact shapes the four
//    round-trip steps expect. It is a v2 "slot" contract: `panels[]` + `activePanelId` (the v1 form
//    it replaced carried a single `panelId`).
// ─────────────────────────────────────────────────────────────────────────────────────────────────

/** One panel inside a slot. Replace with your contract's own child node type. */
export interface Panel {
  readonly id: string;
  readonly kind: string;
}

/** v2 wire form: an ordered `panels[]` plus the focused `activePanelId`. */
export interface SlotV2 {
  readonly version: 2;
  readonly panels: readonly Panel[];
  readonly activePanelId: string | null;
}

/** v1 wire form — kept ONLY so the RED-verify canary below has something old to swap in. */
export interface SlotV1 {
  readonly version: 1;
  readonly panelId: string | null;
}

/** What the producer consumes. Replace with your editor's/builder's own input type. */
export interface LayoutInput {
  readonly panels: readonly Panel[];
  readonly focused: string | null;
}

/** Zod-compatible result shape, so a real `z.ZodType` drops in unchanged. */
export interface SafeParseResult<T> {
  readonly success: boolean;
  readonly data?: T;
}

/** Minimal `safeParse` surface — a real Zod schema satisfies this structurally. */
export interface Validator<T> {
  safeParse(value: unknown): SafeParseResult<T>;
}

/**
 * Producer stand-in: builds the v2 form from a layout input.
 * Replace with your editor/builder entry point.
 *
 * @param input - the layout the editor is holding
 * @returns the v2 slot the editor would hand to the save path
 */
export function editorBuild(input: LayoutInput): SlotV2 {
  return { version: 2, panels: [...input.panels], activePanelId: input.focused };
}

/**
 * Save-path stand-in: the schema the API validates the WIRE payload against. Replace with your real
 * `SaveSchema` (a Zod schema satisfies `Validator<T>` as-is).
 */
export const SaveSchema: Validator<SlotV2> = {
  safeParse(value: unknown): SafeParseResult<SlotV2> {
    if (typeof value !== 'object' || value === null) return { success: false };
    const v = value as Record<string, unknown>;
    const ok =
      v.version === 2 &&
      Array.isArray(v.panels) &&
      v.panels.every((p) => typeof p === 'object' && p !== null && typeof (p as Panel).id === 'string') &&
      (typeof v.activePanelId === 'string' || v.activePanelId === null);
    return ok ? { success: true, data: v as unknown as SlotV2 } : { success: false };
  },
};

/**
 * Read-path stand-in: normalizes any accepted wire form (v1 or v2) to the CURRENT form.
 * Replace with your real `migrateOnRead`.
 *
 * @param wire - the JSON-decoded payload as it arrives from the API
 * @returns the current (v2) form
 */
export function migrateOnRead(wire: unknown): SlotV2 {
  const v = wire as Partial<SlotV2> & Partial<SlotV1>;
  if (v.version === 2) {
    return { version: 2, panels: [...(v.panels ?? [])], activePanelId: v.activePanelId ?? null };
  }
  const id = v.panelId ?? null;
  return { version: 2, panels: id ? [{ id, kind: 'unknown' }] : [], activePanelId: id };
}

/**
 * The OLD (v1) read path — the exact drift that shipped: it only understands `panelId`, so every v2
 * payload degrades to an empty slot SILENTLY (no throw, no log). Used by the canary below.
 *
 * @param wire - the JSON-decoded payload as it arrives from the API
 * @returns the v1 form the stale shim produced
 */
export function migrateOnReadV1(wire: unknown): SlotV1 {
  const v = wire as Partial<SlotV1>;
  return { version: 1, panelId: v.panelId ?? null };
}

/** The ONE shared fixture set — in a real adoption this comes from the fixture package. */
const tabGroupLayout: LayoutInput = {
  panels: [
    { id: 'p1', kind: 'map' },
    { id: 'p2', kind: 'sheet' },
  ],
  focused: 'p2',
};

/** Legacy payload still sitting in the database — the read path must lift it to the current form. */
const legacyV1Slot: SlotV1 = { version: 1, panelId: 'p1' };

// ─────────────────────────────────────────────────────────────────────────────────────────────────
// STAND-IN END
// ─────────────────────────────────────────────────────────────────────────────────────────────────

describe('contract golden test — slot form', () => {
  it('round-trips build → serialize → validate → read', () => {
    const built = editorBuild(tabGroupLayout); // producer
    const wire: unknown = JSON.parse(JSON.stringify(built)); // api boundary (serialize)
    expect(SaveSchema.safeParse(wire).success).toBe(true); // save path validates the WIRE form
    expect(migrateOnRead(wire)).toEqual(built); // read path
    // RED-verify: swap in the OLD (v1) migrate → must fail.
  });

  it('lifts the legacy payload to the SAME form the producer builds', () => {
    // Without this case a consumer can keep reading v1 forever and still look green: the
    // round-trip above only ever shows it payloads its own producer just made.
    const legacyWire: unknown = JSON.parse(JSON.stringify(legacyV1Slot));
    const migrated = migrateOnRead(legacyWire);
    // Serialize again before validating: what gets saved back is the payload, not the object.
    expect(SaveSchema.safeParse(JSON.parse(JSON.stringify(migrated))).success).toBe(true);
    expect(migrated.version).toBe(2);
  });

  // ── RED-verify canary ──────────────────────────────────────────────────────────────────────────
  // Mutates the GATE, not the fixture (`30-quality`): it pins that the OLD read path really does
  // fail the assertion above, so `toEqual` is load-bearing and not vacuously true.
  // It does NOT replace the manual swap in your own consumer — your old implementation differs from
  // this stand-in. Do the swap once per consumer and watch the real test fall.
  it('RED-verify: the OLD (v1) read path must NOT satisfy the round-trip', () => {
    const built = editorBuild(tabGroupLayout);
    const wire: unknown = JSON.parse(JSON.stringify(built));
    expect(migrateOnReadV1(wire)).not.toEqual(built);
  });
});
```

<!-- END file contract.golden.test.ts -->

### `fixtures.ts` → `packages/contract-fixtures/src/fixtures.ts`, genau EINMAL

Anzupassen: die Typen und Fixtures durch den eigenen Contract ersetzen. Die Deckungsregel bleibt: je
eine Fixture pro Variante, die es wirklich gibt — aktuelle Form, jede noch lesbare Legacy-Form, die
entarteten Randfälle.

<!-- BEGIN file fixtures.ts -->

```ts
/**
 * The ONE shared fixture set — example.
 *
 * THIS FILE LIVES IN EXACTLY ONE PACKAGE (e.g. `packages/contract-fixtures/src/fixtures.ts`) AND IS
 * IMPORTED BY EVERY CONSUMER. Never copy it into a consumer, never "adjust it slightly" per package:
 * a copied fixture drifts along with the copy it lives next to, and the golden test then only
 * confirms the local truth — exactly the failure it exists to catch.
 *
 *     packages/contract-fixtures/src/fixtures.ts   ← the ONE set (this file)
 *        ↑              ↑                 ↑
 *     apps/api     apps/web-gm      apps/web-player   ← each IMPORTS, none copies
 *
 * The test itself does run N times (once per consumer's gate) — that is the point: a single central
 * run would never see the local copy. Rule: `25-orchestration`. Decision: ADR-0021.
 *
 * Coverage rule of thumb — one fixture per contract variant that actually exists in the wild:
 *   - the CURRENT form (the one the producer builds today),
 *   - every LEGACY form still readable from storage,
 *   - the degenerate edge cases (empty collection, all-optional-fields-absent).
 * Anything the read path must accept needs a fixture, or drift hides in the untested variant.
 */

/** One panel inside a slot. */
export interface Panel {
  readonly id: string;
  readonly kind: string;
}

/** v2 wire form: an ordered `panels[]` plus the focused `activePanelId`. */
export interface SlotV2 {
  readonly version: 2;
  readonly panels: readonly Panel[];
  readonly activePanelId: string | null;
}

/** v1 wire form — still present in storage, so the read path must keep lifting it. */
export interface SlotV1 {
  readonly version: 1;
  readonly panelId: string | null;
}

/** What the producer (editor/builder) consumes. */
export interface LayoutInput {
  readonly panels: readonly Panel[];
  readonly focused: string | null;
}

// ── producer inputs ──────────────────────────────────────────────────────────────────────────────

/** The everyday case: a multi-panel tab group with a focused panel. */
export const tabGroupLayout: LayoutInput = {
  panels: [
    { id: 'p1', kind: 'map' },
    { id: 'p2', kind: 'sheet' },
  ],
  focused: 'p2',
};

/** Degenerate case: no panels at all — catches shims that assume `panels[0]` exists. */
export const emptyLayout: LayoutInput = { panels: [], focused: null };

// ── wire payloads (what the read path receives) ──────────────────────────────────────────────────

/** Current form, as the API returns it. */
export const currentSlot: SlotV2 = {
  version: 2,
  panels: [
    { id: 'p1', kind: 'map' },
    { id: 'p2', kind: 'sheet' },
  ],
  activePanelId: 'p2',
};

/** Legacy form still sitting in storage — must be lifted, never skipped. */
export const legacyV1Slot: SlotV1 = { version: 1, panelId: 'p1' };

/** Legacy form with nothing selected — the `null` branch of the migration. */
export const legacyV1EmptySlot: SlotV1 = { version: 1, panelId: null };

/**
 * Every wire payload the read path must accept, for table-driven golden tests.
 * Extend this list when a new variant becomes readable — a variant that is not in here is a variant
 * no consumer's gate covers.
 */
export const allReadableSlots: ReadonlyArray<SlotV1 | SlotV2> = [currentSlot, legacyV1Slot, legacyV1EmptySlot];
```

<!-- END file fixtures.ts -->
