# Flammenreiter — Google Stitch Design Prompts

Prompts fuer https://stitch.withgoogle.com/ zum Generieren der UI-Designs.

> **Tipp:** Stitch generiert am besten wenn man einen klaren visuellen Stil + konkretes Layout + echte Daten beschreibt. Jeder Prompt beginnt mit dem gleichen Style-Prefix.

---

## Style-Prefix (vor jeden Prompt kopieren)

```
Dark medieval fantasy RPG web application. Color scheme: deep navy (#0A0E1A) background with warm gold (#FFD700) accents, parchment-toned (#F5E6C8) text areas, and glowing magical highlights. Typography: serif headings (like Cinzel), readable serif body text (like EB Garamond), monospace for stats/numbers (like JetBrains Mono). UI feels like an enchanted grimoire — subtle paper textures, ornate but minimal borders, soft glow effects on interactive elements. Clean modern layout with fantasy theming. No cartoonish elements — refined, atmospheric, immersive.
```

---

## SESSION-PLAYER (Spieler-App)

### 1. Character Sheet — Combat Mode

```
[STYLE-PREFIX]

A full-screen character sheet for a tabletop RPG, currently in COMBAT MODE (red accent highlights on active elements).

TOP STICKY HEADER:
- Character portrait (circular, ornate gold frame), Name "Kael Sturmklinge", Race "Halbelf", Class "Fighter Lvl 5", House badge (red shield icon for "Drachenfeste")
- XP progress bar (thin gold bar, "2,400 / 6,500 XP")
- Proficiency bonus badge "+3"

LEFT COLUMN (60%):

ABILITY SCORES — 6 hexagonal badges in 2 rows of 3:
- STR 16 (+3), DEX 14 (+2), CON 15 (+2), INT 10 (+0), WIS 12 (+1), CHA 8 (-1)
- Large modifier number in center, small score below
- Gold border on STR and CON (saving throw proficient)

HP BAR — Wide horizontal bar:
- "42 / 52 HP" with green-to-yellow gradient
- Small light-blue overlay section for "5 Temp HP"
- Heal (+) and Damage (-) buttons on sides

COMBAT STATS ROW:
- Shield icon "AC 18" with expandable breakdown hint
- Sword icon "Initiative +2"
- Boot icon "Speed 30ft"
- Eye icon "Darkvision 60ft"

SKILLS LIST — 18 skills grouped under ability headers:
- Each: skill name, modifier "+5", filled/empty circle for proficiency
- Athletics +6 (proficient, highlighted), Perception +4, Stealth +2, etc.

WEAPONS & ATTACKS — Card-style:
- "Longsword" — +6 to hit, 1d8+3 slashing
- "Longbow" — +5 to hit, 1d8+2 piercing, range 150/600

RIGHT COLUMN (40%):

SAVING THROWS — 6 rows:
- STR +6 (gold, proficient), DEX +2, CON +5 (gold, proficient), INT +0, WIS +1, CHA -1

CONDITIONS — Badge strip:
- One active red badge "Poisoned" with timer "3 rounds"
- Rest empty/dimmed slots

SPELL SLOTS — Pip tracker:
- "1st: ●●●○" (3/4 used), "2nd: ●●○" (2/3 used)
- Fighter has few, shown as compact row

CLASS FEATURES — Collapsible cards:
- "Action Surge (1/rest)", "Second Wind (1d10+5, 1/rest)", "Extra Attack"

BOTTOM FIXED BAR:
- Large "Roll d20" button (glowing gold)
- Dice selector: d4, d6, d8, d10, d12, d20 (small icons)
- "End Turn" button (red outline)
```

### 2. Character Sheet — Social Mode

```
[STYLE-PREFIX]

Same character sheet layout, now in SOCIAL MODE (pink #FF1493 accent highlights). Social domain is expanded, combat is minimized.

TOP: Same sticky header as combat mode but accent color is pink.

MAIN CONTENT:

TRAIT SPIDER CHART — Large D3-style radar chart:
- 6 axes: Mutig/Feige, Ehrlich/Verschlagen, Mitfuehlend/Kalt, Gesellig/Einzelgaenger, Diszipliniert/Chaotisch, Neugierig/Vorsichtig
- Filled purple polygon showing current values
- Dotted outline showing "public perception" (Blender-System)
- Values: Mutig +3, Ehrlich +1, Mitfuehlend +2, Gesellig -1, Diszipliniert +4, Neugierig +2
- Small red warning icon on "Ehrlich" (true value differs from public)

NPC DISPOSITION CARDS — 3 cards in a row:
- "Meisterin Valdra" — Portrait, "Freundlich" (green badge), disposition bar at 72/100, last interaction: "Quest abgeschlossen"
- "Haendler Korbin" — Portrait, "Neutral" (yellow badge), disposition bar at 45/100
- "Wache Brennan" — Portrait, "Misstrauisch" (orange badge), disposition bar at 25/100

RENOWN BADGES — Horizontal strip:
- "Altheim: Bekannt" (silver badge), "Nordmark: Unbekannt" (grey), "Handelsgilde: Respektiert" (gold)

ORGANIZATION MEMBERSHIPS — Card:
- "Drachenfeste" — Rank: "Kadett", Benefits: "+1 Einschuechterung", red house color border

LANGUAGES — Tag list:
- "Gemeinsprache", "Elfisch", "Zwergisch" (each as small rounded tag)

COMBAT SECTION (minimized at bottom):
- Compact single row: "HP 42/52 | AC 18 | Init +2" — just summary, not full display
```

### 3. Dragon Bond Page

```
[STYLE-PREFIX]

A dedicated dragon companion management page. Warm, intimate atmosphere with subtle fire particle effects.

TOP SECTION — Dragon Profile:
- Large dragon portrait (fire dragon, red-gold scales, intelligent amber eyes) in ornate circular frame with flame border
- Name: "Pyrax", Species: "Feuerdrache", Age: "2 Jahre"
- Status badge: "Gesund" (green pulse dot)
- Bond Phase: "Phase 3: Training" (3/5 milestone dots filled, golden glow on active)

BOND STATS ROW:
- "Bond-XP: 1,240 / 2,000" (golden progress bar with flame particles at fill edge)
- "Care Score: 78/100" (green circular gauge, heart icon center)

DAILY CARE TASKS — 4 task cards in a row:
- "Fuettern" — Meat icon, status: "Erledigt ★★★★☆" (4/5 stars, green check)
- "Pflegen" — Brush icon, status: "Erledigt ★★★☆☆" (3/5 stars, green check)
- "Ruestung pruefen" — Shield icon, status: "Ausstehend" (grey, clickable button "Jetzt erledigen")
- "Stall kontrollieren" — Stable icon, status: "Ausstehend" (grey)

CARE LOG — Timeline list (recent 5 entries):
- "Heute 14:30 — Gefuettert ★★★★☆ (+4 Care Score)"
- "Heute 09:15 — Gepflegt ★★★☆☆ (+3 Care Score)"
- "Gestern 18:00 — Ruestung geprueft ★★★★★ (+5 Care Score)"

DUAL SPIDER CHART — Side by side:
- LEFT: "Kael (Reiter)" — Same trait spider as character sheet
- RIGHT: "Pyrax (Drache)" — Dragon trait spider (Aggressiv +3, Loyal +4, Neugierig +2, Mutig +4, Territorial +1, Beschuetzerisch +3)
- GREEN RESONANCE LINES connecting matching high traits (Mutig ↔ Mutig = green glow)
- YELLOW LINE on neutral pairs
- RED LINE on conflicting pairs

RESONANCE EFFECTS — Cards below chart:
- "Mutig+3 × Mutig+4 = +2 Initiative, +1 Nahkampfschaden bei Charge" (green border)
- "Diszipliniert+4 × Territorial+1 = Neutral (kein Effekt)" (yellow border)

DRAGON EQUIPMENT — 4 slot icons (saddle-shaped layout):
- "Sattel: Kampfsattel (+2 Reitprobe)" — Filled, blue rarity frame
- "Ruestung: Schuppenplatte (AC 16)" — Filled, purple rarity frame
- "Klauen: Leer" — Empty slot, dashed border
- "Schmuck: Leer" — Empty slot, dashed border
```

### 4. Inventory & Equipment (Paper-Doll)

```
[STYLE-PREFIX]

Equipment management page with a BG3-inspired paper-doll system. Downtime mode (orange #FF8C00 accents).

LEFT SIDE — Paper-Doll (40%):
- Humanoid silhouette (translucent, glowing outline) centered
- 15 equipment slots arranged around the silhouette:
  - Head: "Helm der Wachsamkeit" (blue rarity frame, glowing)
  - Chest: "Kettenhemd +1" (green rarity frame)
  - Hands: "Lederhandschuhe" (white rarity frame)
  - Feet: "Stiefel der Geschwindigkeit" (purple rarity frame, glowing)
  - Main Hand: "Langschwert +1" (green rarity frame)
  - Off Hand: "Holzschild" (white rarity frame)
  - Ring 1: "Ring des Schutzes" (rare blue frame, glowing)
  - Ring 2: Empty slot (dashed border)
  - Neck: Empty slot
  - Back/Cloak: "Reiseumhang" (white frame)
  - Belt: "Guertel der Riesenkraft" (purple frame, ATTUNED badge)
  - Shoulders: Empty slot
- Attunement indicator: "2/3 Einstimmungen belegt" (2 of 3 dots filled)

RIGHT SIDE — Inventory Grid (60%):

FILTER BAR:
- Tabs: Alle | Waffen | Ruestung | Traenke | Materialien | Sonstiges
- Search field, Sort dropdown (Name, Raritaet, Gewicht, Wert)

ITEM GRID — 4 columns, card-style:
- "Heiltrank" — Red potion icon, white frame, "×3", "0.5 kg"
- "Seil (15m)" — Rope icon, white frame, "×1", "5 kg"
- "Fackeln" — Torch icon, white frame, "×8", "4 kg"
- "Diebeswerkzeug" — Lockpick icon, green frame, "×1", "0.5 kg"
- "Drachenschuppen (Feuer)" — Red scale icon, gold frame, "×4", "0.2 kg", crafting material tag
- More items in scrollable grid...

BOTTOM BAR:
- Weight: "32.5 / 240 kg" (thin progress bar, green = under limit)
- Gold display: Coin icon "127 Gold, 45 Silber, 12 Kupfer"
- "Camp-Truhe" button (shared party storage)
```

### 5. Spell Casting Page

```
[STYLE-PREFIX]

Spell management page for a Wizard character. Magical purple (#7B2D8B) accents, arcane glow effects.

TOP — Spell Slot Tracker:
- Horizontal pip rows per level:
  - "1st: ●●●●○" (4/5 available)
  - "2nd: ●●○○" (2/4 available)
  - "3rd: ●○○" (1/3 available)
  - Filled = gold, Empty = dark grey, Pips are circular
- "Cantrips: ∞" (infinity symbol, always available)

FILTER BAR:
- Tabs: Vorbereitet | Alle Bekannten | Rituale
- Filter: Level (0-9 dropdown), Schule (Abjuration, Beschwörung, etc.), Konzentration toggle, Suche

SPELL LIST — Cards in a scrollable grid:

PREPARED SPELLS (highlighted section):
- "Feuerball" — Level 3, Evocation, orange fire icon
  - "8d6 Feuer, 6m Radius, DEX Save"
  - Tags: "V, S, M" (components), "Reichweite: 45m"
  - "Wirken" button (gold, glowing)

- "Schild" — Level 1, Abjuration, blue shield icon
  - "+5 AC bis naechste Runde, Reaktion"
  - Tags: "V, S"
  - "Wirken" button

- "Magiererkennung" — Level 1, Divination, eye icon
  - "30 Minuten, Konzentration" — Yellow "K" badge for Konzentration
  - Tags: "V, S", "Ritual" (green badge)
  - "Wirken" + "Ritual wirken (10 min, kein Slot)" buttons

- "Gegenzauber" — Level 3, Abjuration, crossed-swords icon
  - "Reaktion, 18m, Zauber negieren"
  - "Wirken" button

CANTRIPS (always available section):
- "Feuerstoß" — Evocation, "1d10 Feuer, 36m"
- "Magierhhand" — Transmutation, "Geisterhand, 9m"
- "Licht" — Evocation, "Helles Licht, 6m Radius, 1 Std"

CASTING DIALOG (overlay when "Wirken" clicked):
- Spell name large at top
- "Slot waehlen:" — Buttons for each available level (highlighted = minimum, higher = upcast)
- "Upcast Bonus: +1d6 Schaden pro Stufe" (if applicable)
- Concentration warning: "⚠ Beendet aktive Konzentration auf 'Magiererkennung'" (if conflict)
- "Zauber wirken" confirm button (large, gold)
- "Abbrechen" cancel button (subtle)
```

### 6. Player Session View (Live-Sitzung)

```
[STYLE-PREFIX]

The active session view for a player during a live game session. This is the primary screen players see while playing. Dynamic layout that adapts to the current scene context pushed by the GM via realtime.

TOP BAR — Session Header:
- Campaign: "Die Sigillen-Erwachung" (small text)
- Session: "#12 — Der Markt der Schatten" (session title)
- Scene badge: "Social" (pink pulsing dot + label), or "Combat" (red), "Explore" (green), "Downtime" (orange)
- Location: "Marktplatz von Altheim" (pin icon)
- In-game time: "14. Flammentag, Nachmittag" (sun icon)
- Weather: "Bewoelkt, leichter Wind" (cloud icon, subtle blue tint on background)
- Connection status: Green dot "Live"

LEFT COLUMN — Character Quick Panel (25%):
- Mini character portrait + name "Kael Sturmklinge"
- HP Bar: "42/52" (green gradient, compact)
- AC badge: "18"
- Active Conditions: "Poisoned" (red badge, "2 Runden")
- Spell Slots (compact pips): "1st ●●●○ | 2nd ●●○ | 3rd ●○"
- Quick Actions:
  - "Wuerfeln" button (d20 icon, gold)
  - "Inventar" button (backpack icon)
  - "Zauber" button (sparkle icon)
  - "Charakter" button (opens full sheet as overlay)

CENTER — Main Content Area (50%):

SOCIAL MODE (current):
- Scene description box (parchment-styled card):
  "Der Marktplatz ist heute belebt. Haendler Korbin winkt euch zu seinem Stand. Neben ihm steht eine Stadtwache, die euch misstrauisch beaeugt."
- Active NPCs present:
  - "Korbin" — Portrait thumbnail, "Haendler", Disposition emoji 😐 (Neutral)
  - "Wache Brennan" — Portrait thumbnail, "Stadtwache", Disposition emoji 😠 (Misstrauisch)
- Interaction buttons below NPCs:
  - "Ansprechen" (speech bubble icon)
  - "Beobachten (Insight)" (eye icon, triggers skill check)
  - "Einschuechtern" (fist icon, triggers skill check)

COMBAT MODE (when GM switches to combat):
- Initiative tracker (horizontal, same as GM but read-only):
  - "Kael ►" (YOUR TURN, golden glow, pulsing) — Init 18
  - "Goblin Hauptmann" (red, enemy) — Init 16
  - "Lyra" (ally, blue) — Init 14
  - etc.
- Your turn action panel (only visible on your turn):
  - "Bewegung: 30ft verbleibend" (movement tracker)
  - Action buttons: "Angriff", "Zauber wirken", "Dash", "Ausweichen", "Hilfe", "Verstecken", "Bereithalten"
  - "Bonusaktion:" — Available bonus actions listed
  - "Reaktion: Verfuegbar ✓" (or "Verbraucht ✗")
  - "Zug beenden" button (red outline)
- Not your turn: "Warte auf deinen Zug... (Lyra ist dran)" with greyed-out actions
- Target selector (when attacking): Grid of enemy tokens with HP bars

EXPLORE MODE (when GM switches to explore):
- Map view (Leaflet mini-map with party position marker)
- "Umgebung untersuchen (Perception)" button
- "Schleichen (Stealth)" button
- Discovery feed: "Du entdeckst frische Wolfsspuren am Wegrand..."

DOWNTIME MODE:
- Crafting progress cards
- Dragon care tasks
- Training options
- Rest buttons: "Kurze Rast (1 Std)" / "Lange Rast (8 Std)"

RIGHT COLUMN — Activity Feed & Chat (25%):

SESSION LOG (scrollable, auto-updating via realtime):
- "14:35 — Kael wuerfelt Ueberreden: d20(14) + 5 = 19 vs DC 15 → Erfolg! ✓" (green highlight)
- "14:33 — Lyra wirkt Magiererkennung (Ritual)" (purple text)
- "14:32 — GM: Szene gewechselt → Marktplatz" (grey, system message)
- "14:30 — Theron: Heiltrank benutzt → +2d4+2 HP → 8 HP geheilt" (green text)
- "14:28 — Mira wuerfelt Heimlichkeit: d20(18) + 7 = 25 → Erfolg! ✓"
- Each log entry shows: timestamp, actor, action, roll details, result
- Dice rolls show the animated dice icon + breakdown

PARTY CHAT:
- Chat input field at bottom: "Nachricht an Gruppe..."
- Chat bubbles:
  - "Lyra: Lasst mich erst den Laden scannen." (blue bubble, ally)
  - "Kael: Ich rede mit dem Haendler." (your bubble, gold tint)
  - "Theron: Ich halte Ausschau." (blue bubble, ally)
- "Fluestern an..." dropdown (whisper to specific player, GM-only visible)

GM POP-UP OVERLAY (appears when GM sends):
- Semi-transparent dark overlay over main content
- Centered card with ornate border:
  - GM message: "Korbin fluester dir zu: 'Ich weiss wo die Karawane verschwunden ist. Aber es wird euch etwas kosten...'"
  - Optional NPC portrait beside text
  - "Verstanden" dismiss button
- Special Pop-up variant — REST VOTE:
  - "Der GM fragt: Kurze Rast einlegen?"
  - "Ja" / "Nein" vote buttons
  - "Abstimmung: 2/4 dafuer" (live counter)

SKILL CHECK OVERLAY (appears when rolling):
- Animated d20 rolling in center
- Result: "14" (large number with particle effect)
- Breakdown: "d20(14) + STR(+3) + Proficiency(+3) + Trait Mutig(+1) = 21"
- Color-coded sources (same as Modifier Chain component)
- "vs DC 15 → Erfolg!" (green badge) or "Fehlschlag" (red badge)
- Auto-dismisses after 3 seconds or on click

BOTTOM FIXED BAR:
- Quick dice: d4, d6, d8, d10, d12, d20 (always accessible)
- "Vorteil" / "Normal" / "Nachteil" toggle
- Modifier input: "+5"
- "Wuerfeln!" button (large, gold, glowing)
```

---

## SESSION-GM (Spielleiter-App)

### 7. GM Dashboard

```
[STYLE-PREFIX]

Game Master command center dashboard. Dark, professional layout with warm gold accents. Feels like a war-room command table.

TOP BAR:
- "Flammenreiter" logo (stylized flame + dragon silhouette), Campaign name: "Die Sigillen-Erwachung"
- Session status: "Session #12 — Aktiv" (green pulse), Duration: "2:34:15"
- Quick buttons: "Neue Szene", "Wuerfel", "Pause", "Session beenden"

LEFT PANEL — Party Overview (25%):
4 character cards stacked vertically:
- "Kael Sturmklinge" — Fighter 5, HP bar 42/52 (green), AC 18, Conditions: "Poisoned" (red badge)
- "Lyra Mondschein" — Wizard 5, HP bar 28/28 (full green), AC 13, Spell Slots: ●●●○ / ●●○ / ●○
- "Theron Eisenbart" — Cleric 5, HP bar 35/44 (yellow-green), AC 20, Conditions: none
- "Mira Schattenwind" — Rogue 5, HP bar 33/38 (green), AC 16, Conditions: none
Each card: Mini portrait, name, class/level, HP bar, AC badge, condition badges, spell slot pips

CENTER — Active Scene (50%):
- Scene type badge: "Social" (pink), Location: "Marktplatz von Altheim"
- Scene description: "Die Gruppe trifft den Haendler Korbin am Marktstand..."
- Active NPCs cards:
  - "Korbin" — Portrait, "Neutral (45)" disposition bar, "Haendler" role
  - "Wache Brennan" — Portrait, "Misstrauisch (25)" disposition bar, "Stadtwache" role
- Action log (scrollable):
  - "14:35 — Kael: Ueberreden-Probe → 18 vs DC 15 → Erfolg"
  - "14:33 — Lyra: Magiererkennung (Ritual) gewirkt"
  - "14:30 — Szene gestartet: Marktplatz"

RIGHT PANEL — Quick Tools (25%):
- "Wuerfel" — d20 roller with modifier input
- "Effekt anwenden" — Dropdown: Condition, Damage, Heal, Temp HP
- "Pop-up senden" — Text field + target selector (Alle, Einzeln)
- "NPC Disposition" — Quick +/- buttons for active NPCs
- "Notizen" — Freeform text area for session notes
```

### 8. GM Combat Encounter

```
[STYLE-PREFIX]

Active combat encounter view for Game Master. Red combat mode accents (#FF0000). Tense, focused layout.

TOP — Initiative Tracker (horizontal bar):
- Ordered tokens in a horizontal strip:
  - "Kael ►" (ACTIVE, glowing gold border, portrait) — Init 18
  - "Goblin Hauptmann" (red border, skull icon) — Init 16
  - "Lyra" (blue border, portrait) — Init 14
  - "Goblin 1" (red border) — Init 12
  - "Goblin 2" (red border) — Init 12
  - "Theron" (gold border, portrait) — Init 10
  - "Mira" (purple border, portrait) — Init 8
  - "Goblin 3" (red border, skull with X = dead, greyed out) — Init 6
- Current turn highlighted with arrow, "Runde 3" badge

LEFT — Party Status (30%):
- Same character cards as dashboard but expanded:
  - "Kael" — HP 42/52, AC 18, "Poisoned (2 Runden)", Action Surge ●○
  - "Lyra" — HP 28/28, AC 13, Concentration: "Haste auf Kael", Slots: ●●○/●○/○
  - "Theron" — HP 22/44, AC 20, Channel Divinity ●, Spell Slots: ●●●/●●/●
  - "Mira" — HP 33/38, AC 16, Sneak Attack: verfuegbar

CENTER — Combat Log & Actions (40%):
- Scrollable action log:
  - "Kael greift Goblin Hauptmann an → 19 vs AC 16 → Treffer! → 11 Schaden"
  - "Goblin Hauptmann: HP 24 → 13"
  - "Goblin 1 greift Theron an → 8 vs AC 20 → Verfehlt"
- Current turn action panel:
  - "Kaels Zug" (large header)
  - Quick action buttons: "Angriff", "Zauber", "Dash", "Ausweichen", "Bereit"
  - "Angriff ausloesen" → Target dropdown, Roll button

RIGHT — Enemy Panel (30%):
- "Goblin Hauptmann" — HP 13/35 (red bar), AC 16, Actions: "Multiattack, Scimitar"
- "Goblin 1" — HP 7/7 (green), AC 13
- "Goblin 2" — HP 5/7 (yellow), AC 13
- "Goblin 3" — HP 0/7 (dead, greyed out, skull icon)
- "+ Monster hinzufuegen" button

BOTTOM BAR:
- "Naechster Zug" button (large, red glow)
- "Encounter beenden" button (outline)
- Round counter: "Runde 3"
- Timer: "Kampf laeuft seit 12:45"
```

### 9. Session Planner (Graph Mode)

```
[STYLE-PREFIX]

A session planning tool with a visual node-graph editor. Dark canvas background with soft grid lines. Nodes connected by directional arrows.

TOP TOOLBAR:
- Mode toggle: "Quick Mode" (text) / "Graph Mode" (active, highlighted)
- Node palette: 6 draggable node types with colored icons:
  - 🟢 Location (green hexagon)
  - 🔴 Encounter (red diamond)
  - 🩷 Social (pink circle)
  - 🟡 Decision Point (yellow triangle)
  - 🔵 Event (blue square)
  - ⚪ Freeform (grey rounded rectangle)
- Buttons: "Speichern", "Vorlage laden", "Zoom", "Minimap"

CANVAS — Node Graph (80% of screen):
- Starting node: "Taverne 'Zum goldenen Drachen'" (green hexagon, "Location")
  - Arrow → "Geruecht ueber verschwundene Karawane" (pink circle, "Social")
    - Arrow → Decision Point "Karawane suchen oder ignorieren?" (yellow triangle)
      - Left arrow "Suchen →" → "Wald-Encounter: Wolfsrudel" (red diamond, "CR 3")
        - Arrow → "Karawanen-Wrack gefunden" (green hexagon)
          - Arrow → "Ueberlebende befragen" (pink circle)
      - Right arrow "Ignorieren →" → "Weiterreise nach Nordmark" (green hexagon)
- Each node shows: Title, Type icon, brief description on hover
- Active path highlighted (thicker gold line)
- Visited nodes have green checkmark overlay
- Locked/unavailable nodes are greyed out

RIGHT PANEL — Node Details (20%):
- Selected node: "Wald-Encounter: Wolfsrudel"
- Type: Encounter (red badge)
- Description: Rich text editor area
- Conditions: "Erst verfuegbar wenn 'Karawane suchen' gewaehlt"
- CR Budget: "CR 3 (4x Wolf + 1x Dire Wolf)"
- Loot: "50 Gold, Heiltrank x2"
- Connected to: "Karawanen-Wrack gefunden" (arrow button)
```

### 10. NPC Management Panel

```
[STYLE-PREFIX]

NPC library and detail panel for Game Master. Warm, scholarly atmosphere.

LEFT — NPC List (35%):
- Search bar with filter dropdown (Beruf, Fraktion, Ort)
- NPC cards in scrollable list:
  - "Meisterin Valdra" — Portrait, "Magierin", "Akademie von Altheim", Disposition: 72 (green dot)
  - "Haendler Korbin" — Portrait, "Haendler", "Marktplatz", Disposition: 45 (yellow dot)
  - "Wache Brennan" — Portrait, "Stadtwache", "Altheim Tor", Disposition: 25 (orange dot)
  - "Der Graue Fuchs" — Portrait (shadowed), "Unbekannt", "Unterwelt", Disposition: 15 (red dot)
  - "Schmied Durgan" — Portrait, "Schmied", "Tiefe Esse", Disposition: 60 (green dot)
- "+ Neuer NPC" button at bottom

RIGHT — NPC Detail (65%):
- Selected: "Haendler Korbin"
- Large portrait (round frame), Race: "Mensch", Profession: "Haendler", Age: "42"

DISPOSITION SECTION:
- Large disposition bar: 45/100 (yellow gradient, emoji: 😐 Neutral)
- Disposition history sparkline (tiny line chart showing change over time)
- Quick buttons: "+5", "+10", "-5", "-10" with reason input
- Last 3 changes:
  - "Session 12: +10 (Quest abgeliefert)"
  - "Session 11: -5 (Preis verhandelt, aggressiv)"
  - "Session 9: +15 (Diebesgut zurueckgebracht)"

TRAITS:
- "Gierig +3, Vorsichtig +2, Hoeflich +1, Neugierig -1"
- Each as colored tag

KNOWLEDGE (what Korbin knows):
- "Karawanen-Route nach Nordmark" — Willingness: "Teilt bei Disposition >50" (locked icon)
- "Geruechtl: Sigillen-Sichtung im Norden" — Willingness: "Teilt frei" (unlocked icon)
- "Schwarzmarkt-Kontakt" — Willingness: "Nur bei Disposition >80" (locked icon)

RELATIONSHIPS:
- "Wache Brennan — Feindlich (Schulden)"
- "Schmied Durgan — Freundlich (Geschaeftspartner)"
- "Der Graue Fuchs — Geheim (Informant)"

LOCATIONS:
- "Marktplatz von Altheim" (primary)
- "Handelskontor" (sometimes)
```

---

## LORE-ADMIN (Admin-App)

### 11. Location Editor

```
[STYLE-PREFIX]

Content administration interface for world locations. Clean, efficient editor layout with map integration.

LEFT — Location Tree (25%):
- Hierarchical tree view:
  - 📍 Altheim (Region)
    - 🏰 Altheim Stadt
      - 🏫 Akademie
      - 🏪 Marktplatz
      - ⛪ Tempel des Solveris
      - 🏠 Wohnviertel
    - 🌲 Sturmwald
      - ⚔️ Wolfshoehle (Dungeon)
      - 🏕 Jaegercamp
  - 📍 Nordmark (Region)
    - 🏰 Eisenstadt
    - ⛰️ Frostgipfel
- Collapse/expand arrows, drag to reorder
- "+ Neuer Ort" button

CENTER — Location Detail Editor (45%):
- Name: "Marktplatz von Altheim" (editable)
- Type dropdown: City | Town | Village | Dungeon | Wilderness | Landmark | Port
- Description: Rich text editor with @Entity mentions
  - "Der zentrale Marktplatz ist das Herz von @Altheim. Hier treiben @Haendler_Korbin und andere Haendler ihre Geschaefte..."
- Tags: "Handel", "Sozial", "Sicher" (editable tag chips)
- Danger Level: 0 (slider, 0-10)
- Laws: Linked to "Altheim Stadtrecht" (clickable reference)

ASSOCIATED ENTITIES:
- NPCs: "Korbin", "Brennan", "Marktschreier" (tag chips with portraits)
- Shops: "Korbins Waren", "Alchemist Zara" (clickable)
- Quest Hooks: "Die verschwundene Karawane" (linked quest)

RIGHT — Map Preview (30%):
- Leaflet mini-map showing Altheim region
- Pin on "Marktplatz" location
- Polygon overlay showing market area bounds
- "Karte bearbeiten" button to open full map editor
```

### 12. Creature / Monster Editor

```
[STYLE-PREFIX]

Monster stat block editor for game content. Clean stat block layout similar to D&D sourcebooks but with dark fantasy styling.

LEFT — Creature Library (30%):
- Search + filters (CR range, Type, Habitat)
- Creature list:
  - "Schattenwolf" — CR 2, Beast, Pack
  - "Sturmgreif" — CR 5, Monstrosity, Mountain
  - "Erdenwächter" — CR 9, Plant, Ancient
  - "Nebelstalker" — CR 7, Aberration, Mist
  - "Aschegeist" — CR 4, Undead, Ruins
  - "Goblin" — CR 1/4, Humanoid, Forest
- "+ Neue Kreatur" button

RIGHT — Stat Block Editor (70%):
- Styled like a traditional D&D stat block but dark-themed:

HEADER: "Schattenwolf" (Cinzel font), "Mittelgrosses Ungeheuer, neutral boese"

STAT BAR (parchment-toned card):
- AC: 14 (natuerliche Ruestung)
- HP: 37 (5d8 + 15) — editable dice formula
- Speed: 40 ft

ABILITY SCORES TABLE:
| STR | DEX | CON | INT | WIS | CHA |
| 16 (+3) | 15 (+2) | 16 (+3) | 4 (-3) | 12 (+1) | 6 (-2) |

PROPERTIES:
- Skills: Wahrnehmung +3, Heimlichkeit +4
- Senses: Darkvision 60 ft, passive Wahrnehmung 13
- Languages: Versteht Schattenwolfisch
- Challenge: CR 2 (450 XP)
- Resistances: "Necrotic" (tag)
- Immunities: "Frightened" (tag)

SPECIAL ABILITIES (rich text sections):
- "Rudeltaktik: Vorteil auf Angriff wenn Verbuendeter in 1.5m"
- "Schattenschritt: Bonus Action, teleportiert 9m durch Schatten"

ACTIONS:
- "Biss: +5 Nahkampf, 1.5m, 2d6+3 Piercing + 1d4 Necrotic"
- "Heulen (Aufladung 5-6): DC 13 WIS Save, 9m, Frightened 1 Minute"

LOOT TABLE (bottom section):
- "50% — 2d6 Gold"
- "25% — Schattenwolfpelz (Crafting Material, Uncommon)"
- "10% — Schattenessenz (Alchemie-Zutat, Rare)"
```

### 13. Item Editor

```
[STYLE-PREFIX]

Magic item editor with rarity-colored preview. Rich detail form.

LEFT — Item Library (30%):
- Category tabs: Waffen | Ruestung | Traenke | Wundersam | Werkzeuge | Materialien
- Item list with rarity-colored left border:
  - "Langschwert +1" (green border = Uncommon)
  - "Helm der Wachsamkeit" (blue border = Rare)
  - "Guertel der Riesenkraft" (purple border = Epic)
  - "Heiltrank" (white border = Common)
  - "Flammenklinge" (gold border = Legendary)
- Search + rarity filter dropdown

RIGHT — Item Detail Editor (70%):

PREVIEW CARD (top, styled like in-game):
- Item icon in rarity-colored frame (purple glow for Epic)
- "Guertel der Riesenkraft" (Cinzel font)
- "Wundersamer Gegenstand, Episch (Einstimmung erforderlich)"
- "Dein Staerkewert ist 21 solange du diesen Guertel traegst."

EDIT FORM:
- Name: "Guertel der Riesenkraft"
- Category: Wundersam (dropdown)
- Subcategory: Guertel (dropdown)
- Rarity: Episch (dropdown with color preview)
- Requires Attunement: ✓ (checkbox)
- Equipment Slot: Belt (dropdown)
- Weight: 1.5 kg
- Value: 8,000 Gold

MECHANICAL EFFECTS (add/remove list):
- Effect 1: Target "STR" | Operation "set" | Value "21" | Condition "none" | Duration "while_equipped"
- "+ Effekt hinzufuegen" button

PROPERTIES:
- Durability: 100 / 100
- Description: Rich text editor for flavor text
- Crafting Recipe Link: "Rezept: Riesenguertel" (optional link)
- Source/Origin: "Drachenhort Nordmark" (lore reference)

PREVIEW at bottom showing the computed effect:
- "Traegt ein Charakter diesen Guertel: STR wird auf 21 gesetzt (Modifier +5)"
- "Einstimmung: Ja (belegt 1 von 3 Slots)"
```

---

## SHARED COMPONENTS (Einzeln generierbar)

### 14. Modifier Chain (EffectProcessor Display)

```
[STYLE-PREFIX]

A compact, expandable modifier breakdown component. Shows how a final stat value is calculated from multiple sources.

COLLAPSED STATE (single line):
- "Athletik: +6" (large gold number)
- Small expand arrow icon

EXPANDED STATE (breakdown list):
- "Athletik +6" (header, large)
- Breakdown rows with colored source indicators:
  - 🟤 Basis (STR): +3 (brown tag)
  - 🟡 Uebung: +3 (gold tag, "Proficiency")
  - 🩷 Trait (Mutig +3): +1 (pink tag)
  - 🩵 Item (Handschuhe der Kraft): +1 (teal tag)
  - 🔴 Condition (Erschoepfung 1): -1 (red tag)
  - 🔵 Wetter (Sturm): -1 (blue tag)
  - ─────────────────
  - **Gesamt: +6** (gold, bold)
- Each row: colored dot, source label, value with +/- sign
- Sources that don't stack show "(nicht gestapelt, hoechster gilt)" note
```

### 15. Dice Roller Component

```
[STYLE-PREFIX]

An animated dice rolling component. Dramatic, magical feel.

RESTING STATE:
- Row of 6 dice icons: d4 (triangle), d6 (cube), d8 (octahedron), d10 (pentagonal), d12 (dodecahedron), d20 (icosahedron)
- Each in a subtle frame, d20 slightly larger and gold-tinted
- "Modifier: +5" input field
- "Advantage" / "Normal" / "Disadvantage" toggle (3 buttons)

ROLL RESULT STATE (after rolling d20):
- Large animated result: "17" (huge number with magical particle burst)
- Below: "d20 (14) + Modifier (+3) = 17"
- If advantage: "Wuerfel: 14, 8 → 14 genommen (Vorteil)"
- "vs DC 15 → Erfolg!" (green success badge) or "→ Fehlschlag" (red badge)
- Roll history (last 5 rolls as small chips below):
  - "d20: 17 ✓", "d20: 8 ✗", "2d6: 9", "d20: 20 ★ KRIT", "d20: 1 💀 PATZER"
- Critical (nat 20): Gold explosion particles, "KRITISCHER TREFFER!"
- Fumble (nat 1): Red flash, "PATZER!"
```

### 16. HP Bar Component

```
[STYLE-PREFIX]

A character HP bar with gradient and temp HP overlay. Multiple states.

HEALTHY (>75%):
- "42 / 52" text centered on bar
- Bar gradient: bright green (#00FF00) filling 80%
- Subtle shine animation

TEMP HP OVERLAY:
- Same bar but with light blue transparent section on top: "+5 Temp HP"
- "42+5 / 52" displayed

INJURED (25-50%):
- "18 / 52" text
- Bar gradient: orange (#FF8C00) filling 35%
- Subtle pulse animation (warning)

CRITICAL (<25%):
- "6 / 52" text
- Bar gradient: deep red (#FF0000) filling 12%
- Pulsing red glow animation (danger)

DEATH SAVES (0 HP):
- Bar completely empty, dark red tint
- "0 / 52 — Todeswuerfe" text
- 3 skull checkboxes (failures): ☐ ☐ ☐
- 3 heart checkboxes (successes): ☐ ☐ ☐
- "Todeswurf (d20)" button centered
```

---

## NUTZUNG

### Reihenfolge fuer Stitch

1. **Shared Components zuerst** (#14-#16) — damit der Stil konsistent wird
2. **Session-Player** (#1-#6) — Hauptapp, meiste Screens (inkl. Live-Session)
3. **Session-GM** (#7-#10) — GM Screens
4. **Lore-Admin** (#11-#13) — Admin Screens

### Pro Prompt:
1. Style-Prefix kopieren
2. Screen-Prompt anhaengen
3. In Stitch einfuegen
4. Ergebnis als Referenz fuer Implementierung speichern

### Anpassungen:
- Fuer **mobile Version**: "Mobile view, single column, bottom navigation tab bar" an den Prompt anhaengen
- Fuer **Dark Mode Variante**: Ist der Default (alle Prompts sind dark)
- Fuer **Light Mode**: Style-Prefix aendern: "Light parchment background (#F5E6C8), dark text (#2C1810)"
- Fuer **House-Theming**: "Full-screen tint with [House Color], accent elements in [House Secondary]" anhaengen
