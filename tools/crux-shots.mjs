// Crux screenshots for /crux/: the PNGs from the Crux repo (study/tools/site-shots.js) become WebP in
// public/redesign/crux/, laptop at 960 and 1440 px wide, phone at 390 and 780, plus the 1200×630 share image.
//   cd tools && npm run crux-shots [-- <folder with the PNGs>]
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SRC = process.argv[2] || 'C:/Users/grego/Downloads/discord-sync-bot/study/shots/site/';
const OUT = fileURLToPath(new URL('../public/redesign/crux/', import.meta.url));
const BUDGET = 110 * 1024; // the larger laptop size

for (const file of readdirSync(SRC).filter((f) => f.endsWith('.png'))) {
  const name = file.replace(/\.png$/, ''); // e.g. solution-laptop-dark
  const widths = name.includes('-phone-') ? [390, 780] : [960, 1440];
  const sizes = [];
  for (const w of widths) {
    let q = 80;
    let size;
    do {
      size = (await sharp(`${SRC}${file}`).resize({ width: w }).webp({ quality: q }).toFile(`${OUT}${name}-${w}.webp`)).size;
      q -= 6;
    } while (w === widths[1] && size > BUDGET && q >= 50);
    sizes.push(`${w}:${Math.round(size / 1024)}KB`);
  }
  console.log(`${name} → ${sizes.join(' ')}`);
}

// the link preview on WhatsApp and Discord: the Today screen, cropped to 1200×630
await sharp(`${SRC}today-laptop-light.png`).resize({ width: 1200, height: 630, fit: 'cover', position: 'top' }).jpeg({ quality: 82 }).toFile(`${OUT}crux-share-1200.jpg`);
console.log('crux-share-1200.jpg');
