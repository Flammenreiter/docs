/**
 * Flammenreiter — Flux Image Generator via fal.ai
 * Usage: node generate-images.mjs
 */

import { writeFileSync, existsSync, mkdirSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const FAL_KEY = "9d8ded87-fc6c-4022-8fbd-1744ad07f82a:fe0625317a6c456f839c3f267961d317"
const API_URL = "https://fal.run/fal-ai/flux/schnell"

const images = [
  // Theme
  { path: "theme/bg-parchment.png", w: 2480, h: 3508, prompt: "Seamless aged parchment paper texture, warm golden-brown tones, subtle coffee stains and worn edges visible as faint shadows, very slight darkening at corners and borders, fine paper grain texture throughout, medieval manuscript style, no text no writing no symbols, soft warm ambient lighting, photorealistic texture, high resolution, muted earth tones palette with cream center fading to darker tan edges" },
  { path: "theme/cover-flammenreiter.png", w: 2480, h: 3508, prompt: "Epic fantasy book cover, dark dramatic scene, a massive fire-breathing dragon with scales glowing ember-red and gold perched atop a gothic stone fortress tower, flames and sparks swirling around, medieval fantasy landscape with mountains and a crimson sunset sky in the background, ornate gold filigree border framing the entire image, ancient tome style, rich deep colors of crimson burgundy black and gold, volumetric lighting from dragon fire, highly detailed digital painting, no text no title no letters no words" },
  // Chapter Headers
  { path: "images/chapter-welt-lore.png", w: 2480, h: 600, prompt: "Wide panoramic fantasy landscape banner, ancient mystical continent viewed from above, floating islands connected by glowing bridges, dragon silhouettes soaring through clouds, ancient ruins and magical forests, a massive central citadel emanating golden light, epic fantasy cartography style blended with painterly illustration, warm golden hour lighting, rich colors of emerald green deep blue and burnished gold, cinematic composition, no text no labels no words" },
  { path: "images/chapter-spielmechaniken.png", w: 2480, h: 600, prompt: "Wide fantasy banner illustration, collection of magical game elements arranged on an ancient oak table: glowing polyhedral dice (d20 prominently featured), spell scrolls with arcane symbols, a leather-bound grimoire open showing runic diagrams, potion bottles with swirling liquids, scattered gold coins and gemstones, warm candlelight illumination, rich painterly fantasy art style, deep warm tones of amber burgundy and gold, no text no words no letters" },
  { path: "images/chapter-datenbank.png", w: 2480, h: 600, prompt: "Wide fantasy banner, an ancient magical library vault viewed from inside, massive stone shelves filled with glowing crystalline data orbs and enchanted scrolls, arcane connection lines of golden light linking the orbs forming a network pattern, a central floating crystal hub emanating blue-white light, gothic stone architecture with carved dragon motifs, magical runes etched into stone pillars, fantasy data-vault aesthetic, rich colors of deep blue gold and warm amber, atmospheric fog and volumetric light rays, no text no words" },
  { path: "images/chapter-architektur.png", w: 2480, h: 600, prompt: "Wide fantasy banner, a grand magical blueprint laid out on a stone architect table, glowing arcane architectural diagrams showing a fantasy fortress in cross-section, magical energy flows depicted as golden light streams connecting towers and chambers, enchanted drafting tools (compass dividers protractor) made of ornate brass and crystal, warm candlelight atmosphere, fantasy engineering aesthetic, colors of parchment gold deep blue and burgundy, detailed technical-magical illustration style, no text no labels no words" },
  { path: "images/chapter-charakter.png", w: 2480, h: 600, prompt: "Wide fantasy banner, a heroic character sheet scene: an ornate leather-bound journal open on a carved wooden desk, a detailed portrait sketch of a fantasy warrior visible on one page, ability scores written in elegant calligraphy on the other page, surrounding items include a quill pen with magical ink, a small dragon figurine, armor pieces, a sword hilt, warm fireplace lighting from the side, rich painterly fantasy style, colors of warm leather brown gold crimson and parchment cream, no text no readable words" },
  { path: "images/chapter-rassen-klassen.png", w: 2480, h: 600, prompt: "Wide fantasy banner, diverse group of fantasy race silhouettes standing together in heroic poses on a cliff edge at sunset: an elf with pointed ears, a dwarf with a war hammer, a dragonborn with horns and scales, a human paladin in plate armor, a tiefling with tail and horns, a halfling with a bow, dramatic golden sunset backlighting creating rim light on each figure, epic scale with mountains and a dragon flying in the distant sky, painterly fantasy illustration, warm sunset colors of gold orange crimson and deep purple, no text no words" },
  { path: "images/chapter-gm-dashboard.png", w: 2480, h: 600, prompt: "Wide fantasy banner, a game master command center scene: a grand wooden table with a detailed 3D terrain battle map in the center, miniature figurines positioned for combat, floating magical holographic displays showing character status and map overview hovering above the table, a hooded figure (the GM) sitting at the head with hands gesturing to control the magic displays, warm dramatic lighting from magical sources, fantasy war-room aesthetic, colors of dark wood amber magical blue and gold, atmospheric and cinematic, no text no words" },
  { path: "images/chapter-design-system.png", w: 2480, h: 600, prompt: "Wide fantasy banner, an enchanter workshop with UI design elements: floating translucent magical panels showing ornate button and icon designs, color palette crystals arranged in a spectrum on a stone shelf, a magical loom weaving together golden threads into interface patterns, rune-carved typography stamps on a workbench, warm workshop lighting with magical glow, fantasy artisan aesthetic blending medieval craftsmanship with UI design, colors of gold emerald burgundy and warm amber, no text no readable words" },
  { path: "images/chapter-mobile.png", w: 2480, h: 600, prompt: "Wide fantasy banner, a magical crystal tablet device floating in mid-air showing a 3D dragon rendered in glowing magical light, the crystal device emits holographic projections of a fantasy landscape, arcane circuit patterns etched into the crystal frame glowing with blue energy, surrounding magical particles and energy wisps, a dragon perched nearby watching the device curiously, dark atmospheric background with warm magical lighting, fantasy-tech aesthetic, colors of crystal blue warm gold and deep purple, no text no words" },
  { path: "images/chapter-infrastruktur.png", w: 2480, h: 600, prompt: "Wide fantasy banner, a network of magical tower relay stations across a fantasy landscape, each tower topped with a glowing crystal beacon sending beams of golden light to neighboring towers forming a communication network, central command tower larger than others with multiple beacon crystals, flying messenger birds (ravens) carrying small scrolls between towers, dramatic sky with clouds pierced by the light beams, fantasy infrastructure and logistics aesthetic, colors of stone gray golden light emerald landscape and deep blue sky, no text no words" },
  // Diagrams
  { path: "images/diagram-system-overview.png", w: 2480, h: 1400, prompt: "Fantasy-styled system architecture diagram illustration, a central fortress (the platform) connected by magical golden bridges to three outer towers: a crystal web portal tower, a mechanical mobile tower with gears, and a dark stone discord tower, beneath the fortress a massive underground vault (database) with glowing data crystals, magical energy flows between all components depicted as luminous streams, isometric perspective, clean fantasy illustration style with clear visual hierarchy, colors of stone gray gold blue and crimson on parchment background, no text no labels no words" },
  { path: "images/diagram-data-flow.png", w: 2480, h: 1000, prompt: "Fantasy-styled data flow illustration, magical conveyor system in a dwarven forge: raw ore (input) enters from left, passes through enchanting stations (processing) with glowing runes, quality inspection crystals examine each piece (validation), finished magical items emerge on right side and are sorted into labeled enchanted chests (storage), golden energy streams show the flow direction, isometric cutaway view of the forge interior, warm forge lighting with magical accents, colors of iron gray forge-orange gold and deep red, clean illustration style, no text no labels no words" },
  { path: "images/diagram-dragon-bond.png", w: 2480, h: 1400, prompt: "Fantasy illustration showing the progression of a dragon bond relationship, five stages arranged left to right: (1) a small dragon egg with faint cracks glowing, (2) a baby dragon and a young rider meeting with a tentative magical spark between them, (3) a growing dragon and rider training together with visible magical bond threads, (4) a large dragon and armored rider flying together connected by strong golden bond energy, (5) an ancient majestic dragon and legendary rider merged in perfect harmony radiating powerful golden aura, progression shown on aged parchment style background, warm fantasy colors of gold crimson and deep purple, painterly illustration, no text no words no labels" },
  { path: "images/diagram-session-lifecycle.png", w: 2480, h: 800, prompt: "Fantasy-styled lifecycle diagram, circular arrangement showing a D&D session cycle: a sunrise scene (session preparation with maps and notes), a bright midday scene (active gameplay with dice and miniatures on table), a sunset scene (post-session with a quill writing in a journal), connected by ornate golden arrows forming a clockwise circle, a moon in the center representing downtime between sessions, each phase has distinct warm lighting matching time of day, painterly fantasy illustration on parchment, colors of gold amber crimson and deep blue, no text no labels no words" },
  // Decorative
  { path: "images/divider-dragon.png", w: 2480, h: 120, prompt: "Ornate horizontal divider decoration, symmetrical design centered around a small dragon head facing forward, flowing celtic knotwork and vine patterns extending to both sides, subtle flame wisps at the dragon head, elegant metallic gold on transparent background, heraldic style, clean vector-like illustration, warm gold and bronze tones, decorative border element style, no text" },
  { path: "images/divider-ornament.png", w: 2480, h: 80, prompt: "Elegant horizontal ornamental divider, symmetrical scrollwork design with a central diamond gem motif, flowing acanthus leaf curves extending to both sides, thin line art style with metallic gold coloring on transparent background, classical fantasy manuscript decoration, clean and refined, warm gold tones, no text" },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const generate = async (img, idx) => {
  const outPath = join(__dirname, img.path)
  const outDir = dirname(outPath)
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  if (existsSync(outPath)) { console.log(`  SKIP [${idx + 1}/${images.length}] ${img.path}`); return true }

  console.log(`  GEN  [${idx + 1}/${images.length}] ${img.path} (${img.w}x${img.h})...`)

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Authorization": `Key ${FAL_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: img.prompt, image_size: { width: img.w, height: img.h }, num_images: 1 }),
    })
    const data = await res.json()

    if (!data.images?.[0]?.url) {
      console.log(`  FAIL ${img.path}: ${JSON.stringify(data).slice(0, 200)}`)
      return false
    }

    const imgRes = await fetch(data.images[0].url)
    const buf = Buffer.from(await imgRes.arrayBuffer())
    writeFileSync(outPath, buf)
    console.log(`  OK   ${img.path} (${(buf.length / 1024).toFixed(0)} KB)`)
    return true
  } catch (e) {
    console.log(`  FAIL ${img.path}: ${e.message}`)
    return false
  }
}

console.log(`\n🐉 Flammenreiter Flux Image Generator`)
console.log(`   Bilder: ${images.length}`)
console.log(`   API: fal.ai/flux/schnell\n`)

let ok = 0, fail = 0
for (let i = 0; i < images.length; i++) {
  const success = await generate(images[i], i)
  if (success) ok++; else fail++
  if (i < images.length - 1) await sleep(1500)
}

console.log(`\n✨ Fertig! ${ok} OK, ${fail} fehlgeschlagen.`)
