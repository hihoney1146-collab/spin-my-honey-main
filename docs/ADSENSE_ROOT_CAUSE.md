# AdSense root cause — Phase A (forensic, report only)

**Status:** Phase A complete. **STOP — awaiting owner approval before Phases B/C/D.**  
**Scope:** Indexed wheel pages only for the verdict table. Infrastructure / Cloudflare / sitemap plumbing are out of scope (verified clean).  
**Date:** 2026-07-27  
**Metric of success:** AdSense approval (not rankings alone, not word count).

---

## 1. Executive summary — why the second rejection most likely happened

A skeptical human reviewer who opens this site after the mid-to-late July 2026 remediation still sees **dozens of indexed URLs that are the same interactive control with different default slice labels and different surrounding essays**. Unique copy, OG images, SSR, doorway 301s, team pages, and the fairness study raised quality on paper — they did **not** change the inventory shape AdSense scores as “value.”

### Ranked causes

| Rank | Cause | Evidence | Confidence |
|------|--------|----------|------------|
| 1 | **Indexed inventory is mostly one tool × many presets** | `WheelBySlug` default path is plain `SpinWheel` + `presetOptionLabels`. Only **11** slugs mount a dedicated mode component; of those, `prize-wheel` and `random-name-picker-wheel` are still thin wrappers (presets and/or proof link only). **~32** indexed wheels are functionally the homepage spinner with a different starter list. | **High** |
| 2 | **Page count vs substance mismatch** | Current crawlable set is on the order of **forty-plus wheels** plus guides/legal/blog (~**sixty-plus** sitemap URLs). Substance that would stand alone without the widget (fairness study, comparisons, expanded blog, real modes) is a **minority** of that set. Reviewers judge the whole indexed footprint, not the best five pages. | **High** |
| 3 | **“Unique text” remediation treated a structural problem as a copy problem** | Every wheel already has `WHEEL_UNIQUE_CONTENT` entries; second rejection still landed. That falsifies “more differentiated prose clears Low value content” for this site shape. | **High** |
| 4 | **Overlapping intents still indexed side-by-side** | Hat draw vs name picker vs Instagram picker vs winner picker; dinner vs fast food; movie vs horror; prize vs raffle (raffle is real multi-winner; prize is presets marketed as a mode). Cluster consolidation was started (zodiac doorway 301s) but **utility clones remain indexed**. | **Medium** |
| 5 | **Mode marketing ahead of mode reality (trust risk)** | `wheelModeFeatures.ts` describes prize-wheel behavior that `PrizeWheel.tsx` does not implement (plain `SpinWheel` + labels). Inflates perceived differentiation in audits without changing the product a reviewer clicks. | **Medium** |

**Not the cause (per verified facts — do not re-open):** ads.txt, Cloudflare crawler blocks, sitemap fetch failures, missing SSR, missing legal pages, missing unique titles/descriptions.

**Owner conclusion:** Shrink and harden the **indexed tool set** until every remaining wheel either (a) has a **real mode** a reviewer can feel in one click, or (b) has **proven demand** *and* a committed differentiator (ENRICH). Everything else stays live for users but leaves the index (NOINDEX) or consolidates (MERGE).

---

## 2. Method (A.1–A.4)

For each indexed wheel:

- **A.1 Existence:** Without the widget, does remaining content justify an index entry? More important for tools: does the page do anything **functionally** different from `/` beyond presets + prose?
- **A.2 Human:** Would a teacher, streamer, host, or couple **bookmark / share this URL** instead of the homepage?
- **A.3 Demand:** Protected GSC URLs (below) or clear, specific query intent.
- **A.4 Ceiling:** Can we add a **real mode / input / dataset / printable**, or is the ceiling “same spinner, different words”?

**GSC protect list (must stay indexable — KEEP or ENRICH only):**  
`abcd-spin-wheel`, `should-i-text-him-wheel`, `coin-flip-wheel`, `chinese-zodiac-wheel`, `self-care-wheel`, `pokemon-randomizer-wheel`, `outfit-picker-wheel`, `alphabet-spinner-wheel`, `secret-santa-wheel-generator` (+ blog `best-spin-wheel-games-for-students`, out of wheel table).

**Verdict definitions**

| Verdict | Meaning |
|---------|---------|
| **KEEP** | Already justified: real functional mode, and/or GSC protect *with* real mode already shipped. |
| **ENRICH** | Demand (GSC or clear intent) justifies the URL, but today it is still mostly presets — **must** ship the named differentiator before the next AdSense look. |
| **NOINDEX** | No meaningful differentiation ceiling and no demand evidence. Page may stay live; exit index (noindex,follow; drop from sitemaps / llms). |
| **MERGE** | Intent duplicate → 301 into survivor; absorb any unique utility/copy. |

---

## 3. Full verdict table (all 43 indexed wheels)

| Route | Verdict | A.1 / A.2 / A.3 (compressed) | A.4 / exact differentiator or merge target |
|-------|---------|------------------------------|--------------------------------------------|
| `/secret-santa-wheel-generator` | **KEEP** | Real assignment + exclusions + private reveal links. GSC protect. Humans share *this* URL for office/family draws. | Already differentiated. |
| `/team-generator-wheel` | **KEEP** | Balanced multi-team split, not a single spin. Teachers/hosts bookmark it. | Already differentiated. |
| `/random-number-wheel` | **KEEP** | Min/max + no-repeat — functionally not the homepage list spinner. | Already differentiated. |
| `/random-student-picker` | **KEEP** | Remove-after-pick, history, fullscreen classroom. Teachers send this URL. | Already differentiated. |
| `/winner-picker-wheel` | **KEEP** | Multi-winner, dedupe, proof link — giveaway workflow. | Already differentiated. |
| `/raffle-wheel` | **KEEP** | Ticket/name mode, multi-winner without replacement, proof link. | Already differentiated. |
| `/classroom-spinner` | **KEEP** | Hub: student picker + teams + timer in one teacher layout. | Already differentiated. |
| `/coin-flip-wheel` | **KEEP** | Streak/tally UI + GSC protect. Tiebreakers warrant a dedicated URL. | Already differentiated; keep streak honest in copy. |
| `/alphabet-spinner-wheel` | **KEEP** | Exclude-letters panel + GSC protect. Phonics / Scattergories use-case is URL-specific. | Already differentiated. |
| `/abcd-spin-wheel` | **ENRICH** | GSC protect (strong). Today: four-slice preset of generic SpinWheel. | **Build:** classroom “quiz call” mode — lock A–D, optional remove-after-pick, fullscreen projector controls (reuse student-picker patterns). Not more FAQ text. |
| `/should-i-text-him-wheel` | **ENRICH** | GSC protect + high CTR signal. Emotionally specific URL people share; tool is still preset SpinWheel. | **Build:** intensity/context toggles that **swap curated outcome sets** (text / wait / call / delete draft) + optional “cooldown” that disables re-spin for N minutes (real behavior, not copy). |
| `/chinese-zodiac-wheel` | **ENRICH** | GSC protect. Preset animals + prose; absorbed doorway value already lives here. | **Build:** birth-year → animal calculator input that **sets/highlights** the wheel result dataset (real input → real output), plus year-range dataset — not another horoscope essay. |
| `/self-care-wheel` | **ENRICH** | GSC protect. Preset wellness labels only. | **Build:** filter chips that **rebuild the wheel pool** (5-minute / no-spend / evening / movement) from a structured dataset. |
| `/pokemon-randomizer-wheel` | **ENRICH** | GSC protect. Character/challenge presets only. | **Build:** generation filter + challenge-type control that **reloads a fixed dataset** (starters / types / nuzlocke ruleset labels) — licensed-name care: use generation-safe generic labels where needed; utility is the filter UX. |
| `/outfit-picker-wheel` | **ENRICH** | GSC protect. Fashion presets only. | **Build:** occasion + weather toggles that filter a structured outfit dataset onto the wheel. |
| `/random-name-picker-wheel` | **ENRICH** | Flagship “wheel of names” intent; only adds proof slug today (`RandomNamePickerWheel` ≈ SpinWheel). | **Build:** remove-after-pick + session history (parity with student picker) + optional weighted entries — so it is not homepage-with-proof. |
| `/yes-or-no-wheel` | **ENRICH** | Clear binary-decision demand; not on GSC protect list but distinct human use. | **Build:** editable weights for Yes/No/Maybe (real probability control) + optional “best of 3” run — not longer copy. |
| `/dinner-picker-wheel` | **ENRICH** | Strong “what should I eat” intent; still presets. | **Build:** cuisine / leftovers / delivery-vs-cook filters that swap datasets. Absorb fast-food into this. |
| `/movie-picker-wheel` | **ENRICH** | Strong watch-tonight intent; still presets. | **Build:** mood / length / “already on my list” paste mode that drives slices. Absorb horror into this as a mood dataset. |
| `/date-night-wheel` | **ENRICH** | Couples share this URL; still presets. | **Build:** budget + at-home vs out filters rebuilding the pool from a structured plan dataset. |
| `/zodiac-sign-wheel` | **ENRICH** | Western signs distinct from Chinese; thin functionally today. | **Build:** birth-date → sign helper that drives highlight/result (real input). Keep separate from Chinese. |
| `/prize-wheel` | **MERGE** | Marketed as prize mode; code is presets only — overlaps raffle/giveaway. | **301 → `/raffle-wheel`**. Absorb labeled-prize dataset as raffle “prize label” mode if needed. |
| `/pick-out-of-a-hat-generator` | **MERGE** | Same job as name/hat draw. | **301 → `/random-name-picker-wheel`** (after name-picker ENRICH). Absorb hat metaphor into that page’s mode copy. |
| `/instagram-wheel-picker` | **MERGE** | IG giveaway is a skin of winner picker. | **301 → `/winner-picker-wheel`**. Absorb IG paste/dedupe tips into winner page. |
| `/fast-food-wheel` | **MERGE** | Subset of dinner decision. | **301 → `/dinner-picker-wheel`**. Absorb chain/restaurant dataset as a dinner filter. |
| `/horror-movie-picker-wheel` | **MERGE** | Subset of movie picker. | **301 → `/movie-picker-wheel`**. Absorb horror titles as a mood dataset. |
| `/daily-horoscope-wheel` | **MERGE** | Day-theme spinner overlaps zodiac fortune cluster; no GSC protect. | **301 → `/zodiac-sign-wheel`**. Absorb “daily theme” slices into western zodiac enrichment. |
| `/exercise-picker-wheel` | **NOINDEX** | Presets only; no GSC evidence; ceiling = words + list. | Live OK for users; exit index until a real “equipment / time-box filter → pool” ships (then revisit). |
| `/nfl-team-picker-wheel` | **NOINDEX** | Franchise list spinner; no GSC evidence in protect list. | Exit index; optional later: draft-board mode with division filters. |
| `/random-word-generator-wheel` | **NOINDEX** | Vocabulary list on a wheel; homepage can do this. | Exit index. |
| `/random-country-wheel` | **NOINDEX** | Geography list spinner. | Exit index. |
| `/random-animal-picker-wheel` | **NOINDEX** | Animal list spinner. | Exit index. |
| `/random-day-picker-wheel` | **NOINDEX** | Seven weekdays — trivial preset. | Exit index. |
| `/what-to-draw-wheel` | **NOINDEX** | Prompt list spinner; no demand evidence. | Exit index (or later: printable prompt pack PDF — only then reconsider). |
| `/twister-spinner-online` | **NOINDEX** | Party novelty preset; no GSC evidence. | Exit index. |
| `/random-color-wheel` | **NOINDEX** | Color list; weak standalone index case. | Exit index (hex/RGB output mode would be ENRICH later — not claimed today). |
| `/family-game-night-picker-wheel` | **NOINDEX** | Game-title presets; overlaps generic picker. | Exit index. |
| `/bedtime-story-picker-wheel` | **NOINDEX** | Story-title presets. | Exit index. |
| `/fortnite-drop-location-wheel` | **NOINDEX** | Map POI list; seasonal/game-skin; no protect-list evidence. | Exit index. |
| `/roblox-game-picker-wheel` | **NOINDEX** | Experience list spinner. | Exit index. |
| `/truth-or-dare-spinner-online` | **NOINDEX** | Party prompt presets; ceiling = words. | Exit index. |
| `/random-travel-destination-wheel` | **NOINDEX** | Destination list spinner. | Exit index. |
| `/random-hobby-generator-wheel` | **NOINDEX** | Hobby list spinner. | Exit index. |

### Verdict counts (wheels only)

| Verdict | Count |
|---------|-------|
| KEEP | 9 |
| ENRICH | 12 |
| MERGE | 6 |
| NOINDEX | 16 |
| **Total** | **43** |

---

## 4. Expected final shape of the indexed site (after B/C/D — not executed yet)

### Indexed wheels remaining

**21 URLs** (9 KEEP + 12 ENRICH), down from **43**.

Survivors:

- KEEP: `secret-santa-wheel-generator`, `team-generator-wheel`, `random-number-wheel`, `random-student-picker`, `winner-picker-wheel`, `raffle-wheel`, `classroom-spinner`, `coin-flip-wheel`, `alphabet-spinner-wheel`
- ENRICH (stay indexed while building): `abcd-spin-wheel`, `should-i-text-him-wheel`, `chinese-zodiac-wheel`, `self-care-wheel`, `pokemon-randomizer-wheel`, `outfit-picker-wheel`, `random-name-picker-wheel`, `yes-or-no-wheel`, `dinner-picker-wheel`, `movie-picker-wheel`, `date-night-wheel`, `zodiac-sign-wheel`

### Non-wheel indexed surface (unchanged by this wheel verdict; listed for shape)

Approximately the current pages sitemap set: home, hub (`/all-spin-wheels`), blog index, team pages, about/contact/legal, fairness study, comparisons, select tutorials/case studies, wheel-of-names alternative — on the order of **~20–22** URLs — plus **~1–2** indexed blog posts (protect `blog/best-spin-wheel-games-for-students`).

### Approximate indexed footprint after wheel program

**~45 indexed URLs** (order of magnitude), versus **~66** today — driven by cutting **22** wheels from the index (16 NOINDEX + 6 MERGE), not by adding essays.

### What “done” means before the next AdSense submission

1. All **MERGE** 301s live; survivors absorb only real utility.  
2. All **NOINDEX** wheels: `noindex,follow`, removed from sitemaps and `llms.txt`, still reachable if bookmarked.  
3. Every **ENRICH** differentiator above **shipped and clickable** (not described in markdown only).  
4. No new preset-only wheel added to the index.

---

## 5. Stop gate

**Phase A ends here.** No noindex tags, 301s, mode builds, or sitemap edits have been applied in this phase.

**Owner approval needed to proceed**, with explicit go/no-go on:

- The KEEP / ENRICH / NOINDEX / MERGE assignments above  
- Especially: aggressive NOINDEX of gaming/party/random-* skins; MERGE of prize / hat / Instagram / fast-food / horror / daily-horoscope  

Reply with approval or a marked-up verdict table; then Phases B/C/D can execute.
