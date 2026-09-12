# Engineering Study Hub

Website for the Engineering Study Hub — a Discord community for Kenyan engineering students.

## What is served where

| Path | What it is |
|---|---|
| `/` | The app — React + TypeScript + Vite + Tailwind + shadcn/ui |
| `/redesign/` | The redesign — a standalone static build, no dependencies, no build step |

## Working on the app

```bash
npm install
npm run dev
npm run build
```

## Working on the redesign

`public/redesign/index.html` is a single self-contained file. Vite copies `public/` verbatim into
the build output, so anything in that folder ships with the app.

- `public/redesign/README.md` — page map, where to change copy, colours, prices and links
- `public/redesign/images/README.md` — every image slot, its filename and its subject

Drop an image into `public/redesign/images/` using the exact filename from that list and it appears
on the site. No code changes needed.

## Security

Do not commit API keys. Anything shipped to the browser is public the moment it is deployed — route
third-party calls through a server-side proxy and keep credentials in environment variables that are
never committed.
