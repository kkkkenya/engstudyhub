# Engineering Study Hub

Website for the Engineering Study Hub, a Discord community for Kenyan engineering students:
https://www.engineeringhub.site

## What is served

The site is static and has no build step. Vercel publishes `public/redesign/` as it is (see `vercel.json`).

- `public/redesign/index.html`: the home page, one self-contained file
- `public/redesign/units/`: one page per unit
- `public/redesign/README.md`: page map, and where to change copy, colours, prices and links
- `public/redesign/images/README.md`: every image slot, its filename and its subject

Drop an image into `public/redesign/images/` with the exact filename from that list and it appears on the site.

To look at it locally: `npx serve public/redesign`.

## Security

Do not commit API keys. Anything shipped to the browser is public the moment it is deployed.
