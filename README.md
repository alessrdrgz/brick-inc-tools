# Brick Inc Tools

Guides and tools for **Brick Inc (Idle Breaker)** v2.3.9.

A modern remake of [Deathfisaro's Brick Inc Tools](https://deathfisaro.github.io/brickinc/), rebuilt as an Astro-shelled React SPA. Same guides and calculators, refreshed UI, mobile-friendly layout, and the original game icons.

> Not affiliated with Seasoning Games. Fan project only.

## What’s inside

| Section                      | What it does                                           |
| ---------------------------- | ------------------------------------------------------ |
| **Guides → Walkthrough**     | Main progression guide (9 steps)                       |
| **Guides → Resources**       | What to buy / where to get / what to do with key items |
| **Guides → Rank Unlocks**    | Features unlocked by rank (Common → Super God)         |
| **Resource Conversions**     | Filterable table + icon graph of conversion paths      |
| **Science / Quantum Points** | Dual calculators (when to spend / upgrade / rank up)   |
| **Presets**                  | Tree of Truth preset planner + export                  |
| **App**                      | Todo list, version history, credits                    |

## Credits

- **[Deathfisaro](https://deathfisaro.github.io/brickinc/)** — original tools and guide content this project is based on
- **Glare** — Tree of Truth board JSON
- **Seasoning Games** — Brick Inc / Idle Breaker

## Open source & contributions

Pull requests from anyone are welcome, as long as they pass a quality review (lint/check, clear intent, no drive-by noise).

## Stack

- Astro 5 (static shell) + React SPA (`react-router-dom`)
- Tailwind CSS 4
- Biome
- pnpm + Node ≥ 26

## Development

```bash
nvm use
pnpm install
pnpm dev
```

## Scripts

| Script         | Description           |
| -------------- | --------------------- |
| `pnpm dev`     | Dev server            |
| `pnpm build`   | Static build          |
| `pnpm preview` | Preview the build     |
| `pnpm check`   | `astro check` + Biome |
| `pnpm lint`    | Biome only            |
| `pnpm format`  | Biome autofix         |
