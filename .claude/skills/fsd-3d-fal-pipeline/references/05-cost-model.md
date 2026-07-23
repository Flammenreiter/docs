# Cost Model Reference

> **Stand:** 2026-05-13 — Preise schwanken; vor jeder groesseren Kalkulation aktuelle fal.ai-Pricing-Seite gegenpruefen.

## Build-time Hero (one-shot)

| Asset | Endpoint | Price |
|---|---|---|
| 3D model | hyper3d/rodin | $0.40 |
| Fallback image | flux-2/pro | $0.03 |
| Panorama | flux-2/pro | $0.03 |
| 5 s loop video | wan/v2.6 | $0.25 |
| **Single run** | | **$0.71** |

Design iteration realistic: 10–30 generations until final → **$10–25 hero budget**.

## Runtime (monthly, scaled with traffic)

Base scenario: 10k page views/month, 80 % cache-hit rate.

| Item | Calculation | Cost |
|---|---|---|
| Dynamic 3D (2k unique) | $0.225 × 2000 | $450 |
| Textures (5k unique) | $0.003 × 5000 | $15 |
| Dynamic images (1k) | $0.03 × 1000 | $30 |
| Video loops (100 × 5 s) | $0.25 × 100 | $25 |
| R2 storage (~50 GB) | $0.015/GB | $0.75 |
| Upstash Redis | free tier or | $0–10 |
| Backend hosting (Fly/Railway) | | $5–20 |
| **Total / month** | | **~$530–550** |

## Sensitivity

- Cache-hit 30 % instead of 80 % → costs ×3–4
- Pro instead of Rapid for dynamic 3D → +$350/month
- **No rate-limit + bot at 10 req/s × 24 h × $0.225 = $194 400 in ONE day**

## Optimizations

1. Spending limit in fal dashboard (daily cap)
2. Prompt normalization (lowercase, trim, stopword removal) to improve cache-hit
3. Tiered model selection (preview tier for low-stakes, pro tier only when needed)
4. R2 over S3 (zero egress for asset serving)
5. AVIF over WebP over PNG (60 % smaller typical)
6. Draco compression on GLB (60–90 % size reduction)
