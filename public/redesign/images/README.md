# Image drop folder

Every picture slot in the site is wired to a file in **this folder**. Kit 01-04 now carry real photographs; every other slot that has no photo
shows a green IN-PROGRESS banner — nothing is broken, nothing is a stock
photo, and no AI-generated media ships with this build.

**To add a real image:** drop a file with the exact name below into this folder. Nothing else to
edit — it appears automatically and the placeholder steps aside.

> The old auto-playing intro video and all borrowed/AI imagery are gone. The video slot is now
> `plate-02-about-hub.jpg`.

## Slot map

| # | File name | Where it appears | Aspect / size | What belongs there |
|---|---|---|---|---|
| 00 | `plate-00-og-cover.jpg` | Social share card (Open Graph + Twitter) | 1200 × 630 | The hub's cover image for link previews |
| 01 | `plate-01-hub-workshop.jpg` | Home, hero | 21:9 · 2000 × 860 | Students working on a hardware or study project |
| 02 | `plate-02-about-hub.jpg` | Home, "Inside the hub" | 4:3 · 1400 × 1050 | **Replaces the old intro video.** A still from a session |
| 03 | `plate-03-truss-bridge.jpg` | Home, featured project card | 16:9 · 1600 × 900 | Truss bridge build / load test |
| 04 | `plate-04-iot-irrigation.jpg` | Home, featured project card | 16:9 · 1600 × 900 | Soil-moisture rig or irrigation controller |
| 05 | `plate-05-water-dashboard.jpg` | Home, featured project card | 16:9 · 1600 × 900 | Sensor dashboard on a screen |
| 06 | `plate-06-wind-tunnel.jpg` | Home, featured project card | 16:9 · 1600 × 900 | Wind-tunnel or aerofoil test rig |
| 07 | `plate-07-avatar-brian.jpg` | Home, testimonial | 1:1 · 400 × 400 | Portrait — Brian M. |
| 08 | `plate-08-avatar-aisha.jpg` | Home, testimonial | 1:1 · 400 × 400 | Portrait — Aisha K. |
| 09 | `plate-09-avatar-denis.jpg` | Home, testimonial | 1:1 · 400 × 400 | Portrait — Denis O. |
| 10 | `plate-10-team.jpg` | Home, "Join the core team" | 16:9 · 1600 × 900 | Core team or an event photo |
| K1 | `kit-01-starter.jpg` | Starter kit, Kit 01 card | 16:9 · 1600 × 900 | The Starter Kit parts laid out on a bench |
| K2 | `kit-02-sensor-display.jpg` | Starter kit, Kit 02 card | 16:9 · 1600 × 900 | Sensor and display kit, powered up |
| K3 | `kit-03-rover.jpg` | Starter kit, Kit 03 card | 16:9 · 1600 × 900 | **The assembled rover — this is the bestseller card, make it the best photo you have** |
| K4 | `kit-04-motion-control.jpg` | Starter kit, Kit 04 card | 16:9 · 1600 × 900 | The motion rig, lead screw and driver stack |
| B1 | `build-01.jpg` | Showcase, slot 01 | 4:3 · 1400 × 1050 | A member's finished 4WD rover |
| B2 | `build-02.jpg` | Showcase, slot 02 | 4:3 · 1400 × 1050 | Water quality dashboard, powered on |
| B3 | `build-03.jpg` | Showcase, slot 03 | 4:3 · 1400 × 1050 | Truss bridge, before or after testing |
| B4 | `build-04.jpg` | Showcase, slot 04 | 4:3 · 1400 × 1050 | Irrigation controller installed |
| B5 | `build-05.jpg` | Showcase, slot 05 | 4:3 · 1400 × 1050 | Motion rig in position |
| B6 | `build-06.jpg` | Showcase, slot 06 | 4:3 · 1400 × 1050 | Any bench instrument build |
| D1 | `discord-server.jpg` | Home, community block | 4:3 · 1920 × 1440 | **A screenshot of your actual Discord server** — channel list plus an active conversation. A real screenshot converts far better than any illustration, and it's the only image on that block |

Plates 03–06 are pulled in by the featured-project cards on the home page; the rest are placed
directly in the markup. The four kit photos are the highest-leverage images on the site — a real
photograph of the assembled rover will do more for kit sales than any copy.

## Notes

- **Portraits:** please use photos you have permission to publish. If you'd rather not show faces,
  say so and the initials blocks come back instead.
- **Formats:** `.jpg`, `.png` and `.webp` all work. If you use a different extension, update the
  matching `src="images/..."` in the HTML to match, or just export as `.jpg`.
- **Weight:** aim for under 350 KB each. Any modern editor's "export for web" does this.
- **Alt text:** every slot already has descriptive alt text written for screen readers. If a photo
  shows something different, update the `alt="..."` on that `<img>`.
- **Logo:** the header uses a typographic mark (a drawn `EH` block) so no logo file is required. If
  you want the real logo up there, drop `plate-logo.svg` here and we'll swap it in.
- **Project sheet thumbnails:** the project library cards are deliberately text-only for scanning
  speed. If you want a photo on each of the 12 sheets, that's a follow-up — say the word.


## Status (2026-09)

- **Filled:** the four kit photos (`kit-01-starter.jpg` - `kit-04-motion-control.jpg`), plus
  `plate-01-hub-workshop.jpg` (lab / workstation), `plate-02-about-hub.jpg` (CAD modelling session),
  `plate-03-truss-bridge.jpg` (truss build), `plate-05-water-dashboard.jpg` (water dashboard) and
  `plate-10-team.jpg` (event photo).
- **Pending (shows a green IN-PROGRESS banner):** `plate-00-og-cover.jpg`, `plate-04-iot-irrigation.jpg`,
  `plate-06-wind-tunnel.jpg`, and the six showcase slots `build-01.jpg` - `build-06.jpg`.
- **Avatars:** the three testimonial portraits were replaced with a person icon, so
  `plate-07-avatar-brian.jpg`, `plate-08-avatar-aisha.jpg` and `plate-09-avatar-denis.jpg` are no longer used.
- Drop a file with an exact name from the table above into this folder and it appears automatically.
- **Featured projects on the home page** are project ids 2, 3, 6 and 9 (see `HOME_IMG` / `FEATURED`
  in the page script) - they render as a stacked deck.
