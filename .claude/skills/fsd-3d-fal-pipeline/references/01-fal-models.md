# fal.ai Model Reference (Mai 2026)

> **Stand:** 2026-05-13 — Modell-Preise und Endpoint-IDs aendern sich oefter. Halbjaehrlich review-en.
>
> **AKTUALISIERT 2026-05-13 (Phase-0-Asset-Generation Befund):**
> - **Hyper3D Rodin** ist **aktuell nicht auf fal.ai gelistet** (404 auf model-page). Skill-Spec hier veraltet.
> - **Hunyuan3D v2 Rapid** ist **aktuell nicht auf fal.ai gelistet** (gleich).
> - Aktueller text-to-3D-Featured-Endpoint: `meshy/v6/multi-image-to-3d` (image-to-3D, nicht text-to-3D).
> - **Praktischer Workaround**: 2D-Sigils + Char-Tokens via FLUX-pro/v1.1 rendern (resin-miniature-aesthetic funktioniert exzellent als 2D-PNG, kein 3D-Asset noetig fuer Hero-Scenes mit R3F-Image-Planes).
> - **Veo 3** ist via Queue (queue.fal.run) **bestaetigt working** an `fal-ai/veo3` (siehe `scripts/generate-design-assets.mjs`).
> - **FLUX-pro/v1.1** ist **Sync-only** (`https://fal.run/`), Queue 405. FLUX-2-Pro endpoint nicht verfuegbar — wenn die DB `model='flux-2/pro'` enthaelt, mappt der Generator auf flux-pro/v1.1.

## 3D Models (GLB output)

| Endpoint | Price | Output | Use |
|---|---|---|---|
| `fal-ai/hyper3d/rodin` | $0.40 | GLB + PBR + separate textures | **HERO / brand-critical**. Clean quad topology, production-ready, no Blender cleanup needed. Gen-2, 10B params. |
| `fal-ai/hunyuan-3d/v3.1/pro/text-to-3d` | $0.375 | GLB, up to 1.5M poly, optional PBR | High-quality Allround. Multi-view input up to 8 angles. |
| `fal-ai/hunyuan-3d/v3.1/rapid/text-to-3d` | $0.225 | GLB, fixed poly | **RUNTIME default**. Best balance of price/quality/latency. |
| `fal-ai/hunyuan3d/v2` | $0.16 (mesh) / $0.48 (with texture) | GLB, configurable octree 1–1024 | Quality-speed tradeoff via inference steps. |
| `fal-ai/trellis` | ~$0.10–0.30 | GLB | Game-asset focus. |
| `fal-ai/stable-point-aware-3d` | $0.07, sub-second | GLB, albedo-only | **PREVIEW only**, no PBR. |

## Image Models

| Endpoint | Price | License | Use |
|---|---|---|---|
| `fal-ai/flux/schnell` | $0.003/MP | Apache 2.0 (commercial OK) | **DEFAULT for iteration & textures**. |
| `fal-ai/flux/dev` | $0.025 | ⚠ NON-COMMERCIAL | Never use in production. |
| `fal-ai/flux-pro` / `flux-pro/v1.1` | ~$0.04–0.05 | Commercial via fal | Brand-critical fallback. |
| `fal-ai/flux-2/pro` | ~$0.03 | Commercial | **DEFAULT for high-quality stills**. Current flagship. |
| `fal-ai/nano-banana-pro` | $0.15 (1K), 4K = 2× | Commercial via fal, SynthID watermark | Premium, multi-image consistency. |

## Video Models

| Endpoint | Price | Use |
|---|---|---|
| `fal-ai/wan/v2.6/text-to-video` | $0.05/s | **DEFAULT for hero loops**. Cheapest viable. |
| `fal-ai/kling-video/v2.5/turbo/pro` | $0.07/s | Better motion quality. |
| `fal-ai/kling-video/v3/pro/*` | $0.112/s (no audio) | Top-tier, optional audio. |
| `fal-ai/veo3.1/*` | $0.20/s (no audio), $0.40 (audio) | Highest quality, native audio. |

## HDRI / Environment Maps

No true HDR generation exists on fal.ai. Workaround:

1. Use FLUX.2 Pro with prompt: `"360 degree equirectangular HDR panorama, seamless, [scene description], no visible horizon line"`
2. Image size: `{ width: 2048, height: 1024 }` (2:1 ratio)
3. Pass to R3F: `<Environment files={url} background={false} />`
4. Accept: this is LDR, not physically correct HDR. Sufficient for web hero scenes.

## Seamless Video Loops

No model generates seamless loops natively. Workarounds:

- **First-frame = last-frame trick** (Kling, Wan support this): pass the same image as both endpoints
- **ffmpeg crossfade polish** in `optimize.ts` (overlay first 0.5 s alpha-faded into last 0.5 s) — see `optimizeVideo({ loop: true })`
- **Boomerang** (video + reversed): only for symmetric motion, often looks artificial

## Texture Tileability

Flux is NOT tileable by default. Three approaches:

1. **Prompt trick**: `"seamless tileable texture, repeating pattern, no borders, top-down view"`
2. **Sharp post-process**: mirror-mode tile in `optimize.ts`
3. **Tile-Texture-LoRA** via `fal-ai/flux-lora` — most precise but more setup
