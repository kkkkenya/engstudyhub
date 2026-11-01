# engstudyhub
engineeringhub.site, the Engineering Study Hub website. Static: Vercel publishes public/redesign/ as it is (vercel.json), no build step.
Plan and status: C:\Users\grego\Downloads\discord-sync-bot\fixplan.md (local only), Track S. Read §0–6 and the phase you're doing.

## What's served
- public/redesign/index.html: the home page (one file; hash "sheets" for projects, membership, starter kit)
- public/redesign/units/: 114 unit pages + index; sitemap.xml; google*.html (Search Console, keep)
- public/redesign/images/: photos. Pages use the <name>-480/960/1440.webp versions with srcset

## Commands
- Look at it: any static file server on public/redesign
- Images: cd tools && npm install && npm run images (after adding a photo; sharp, dev only)

## Rules
- Work on main; commit and push (Vercel deploys main). Tag before risky changes.
- Fonts: system stack only, no web fonts. Motion: CSS only, minimal (owner's call).
- Copy (fixplan Appendix E): plain and short, labels not slogans, no hype words, no unverifiable numbers.
  Run python ~/.claude/skills/slopmonster/tools/deslop.py <file> on changed copy.
- Images: WebP with width/height and srcset; hero fetchpriority="high", others loading="lazy".
- Cached files: /images/* is cached for a week. When a CSS/JS file moves to /assets/, version its name (site.v2.css)
  and bump the version on every change.
- Always link https://www.engineeringhub.site (the apex redirect costs ~1.6 s on mobile).
- Never commit .env*. No keys in browser code: the old React app shipped a RapidAPI key.
