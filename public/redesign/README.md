# Engineering Study Hub — site guide

One file, no build step, no dependencies. Open it and it runs.

---

## Open it

Double-click `V3 Engineering Study Hub.html`, or drag it into any browser. That's the whole
deployment story for local preview.

## Put it online

Two ways, depending on what you want.

**Alongside the existing app (recommended, zero risk).** The build lives in `public/redesign/`, and Vite copies `public/`
verbatim into the build output — so after a deploy it is live at `https://<your-domain>/redesign/`. Your React app, its
routes, the formula directory and the job board all keep working untouched.

**As the whole site.** Only do this if you're happy to drop the app's current features — the AI formula directory and the
live job board both need the backend that the static build doesn't have. Say the word and I'll plan that migration
properly instead of swapping files.

Nothing needs to be compiled. There is no server, no database, no npm install.

## How the site is put together

| Sheet | Route | What it is |
|---|---|---|
| 01 | `#/` | Home — pitch, proof, plans, FAQ |
| 02 | `#/projects` | Project library — the free entry point |
| 03 | `#/membership` | Membership — the conversion page |
| 04 | `#/starter-kit` | Starter kits — four priced kits, sourced parts, pre-filled WhatsApp ordering |
| 05 | `#/showcase` | Member builds — the wall, and the submission sheet |
| — | anything else | 404 |

Routing is hash-based (`#/projects`). In-page links like `#plans` scroll within a page; if you click
one from another page the site switches home first.

## Where to change things

| You want to change | Go to |
|---|---|
| Contact links (WhatsApp, email, Discord) | Search the file for `wa.me/254745947704`, `mailto:` and `discord.gg` — there is one `CFG` block near the bottom of the script that holds them for the interactive parts |
| Prices and plan features | Search for `KES 50` and `KES 800` |
| Kit contents and part prices | The `SHEET 04 — Starter kits` section; each kit is a `<ul class="parts">` list and a `TOTAL` line. Re-total by hand after any change |
| Kit order messages | Every kit button already opens WhatsApp with the order written. Search for `wa.me/254745947704?text=` and edit the encoded message |
| The bestseller badge | Search for `kit--hero` and `Most popular` — that is the card being promoted |
| Project data (titles, budgets, steps) | The `var PROJECTS = [` array in the script near the bottom |
| Headlines and body copy | Search for the text you see on the page; it is plain HTML |
| Colours / theming | The `:root` block in the **last** `<style>` block. That is the live palette — the earlier `:root` blocks are superseded. `html[data-theme="dark"]` right below it holds the dark palette |
| Fonts | One `<link>` in the `<head>` loads Instrument Serif (headlines), Figtree (UI and body) and JetBrains Mono (prices, labels). The three `--f-*` variables in the **last** `:root` block are the live ones |
| Corner radius, shadows | `--r`, `--r-lg`, `--r-xl`, `--sh-1`, `--sh-2`, `--sh-3` in that same last `:root` |
| Default appearance | The tiny `<script>` in the `<head>` reads `localStorage["esh-theme"]`, falling back to the device setting. Delete it to always start light |
| Images | The `images/` folder — see its own README for the slot map |

## Adding a page

1. Copy an existing `<div class="page" data-page="/something" hidden>` block and give it a new route.
2. Add that route to `var ROUTES = [...]` and `var SHEET = {...}` in the script.
3. Add a link in the header nav **and** the mobile drawer nav.

## Interactive parts

| Feature | Where |
|---|---|
| Project search + 4 filters | Library page, filters by discipline, level, year, duration |
| Project detail sheet | Open any project — the build sequence is gated after step 2 |
| FAQ accordions | Home, membership and starter-kit pages |
| Appearance toggle | Sun/moon button in the header — follows the device setting until the visitor chooses |
| Mobile navigation | Bottom tab bar below 900px, home-indicator safe area included |
| Loading / empty / error states | Library filter miss, the gated block in the project sheet, and the empty wall on the showcase sheet |

## Version history

| Version | What changed |
|---|---|
| V1 | Full redesign from the old site. "Drafting sheet" visual language, all six original routes, AI media replaced with placeholders |
| V2 | Removed the formula directory, job finder, exam timetable and tools pages. Library became the core. Paywall added |
| V3 | Softer type system, rounded surfaces, diffused shadows. Added the membership page and the starter-kit page |
| V4 | Native-polish pass: full light/dark with a toggle, translucent navigation bar and mobile tab bar, SF-style icon set, sheet modality, safe-area insets, Apple easing curve, ratings & reviews component |
| V5 | Typography replaced with Instrument Serif + Figtree + JetBrains Mono. Starter-kit sheet rebuilt around four real, priced kits with pre-filled WhatsApp order links |
| V6 | Showcase sheet added — member builds, an honest empty wall with six open slots, a build-submission sheet, and a fifth tab |
| V7 | Discord community block with a persistent header entry point, every WhatsApp link pre-filled, showcase buttons made real buttons, size cap on header and tab-bar icons |
| V8 | Discord entry point promoted to a labelled pill in the header, plus a 'join free, pay only when you've decided' section on the home page |

Earlier versions sit in `archive/` untouched — never edit them, they're the rollback path.

## Known gaps

- **Project library carries 12 of the 28 original projects.** The rest need porting across.
- **Membership payment is WhatsApp-first.** The M-Pesa block shows the flow, not a paybill number.
  Send one and it goes in.
- **Starter-kit prices are ArduinoTech Kenya's published prices at the time of writing.** They
  change — always confirm before quoting a student.
- **No live backend.** Anything that needs data will need an endpoint, and any API key must live on
  a server, never in this file.
