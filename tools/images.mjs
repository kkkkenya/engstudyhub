// Makes the site's photos small: each JPG/PNG in public/redesign/images becomes WebP at 480, 960 and 1440 px wide
// (never wider than the original), next to the original as <name>-<width>.webp. Run after adding a photo:
//   cd tools && npm install && npm run images
// The hero is squeezed until it is under 120 KB, other photos under 80 KB (at 960 px).
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const DIR = fileURLToPath(new URL('../public/redesign/images/', import.meta.url));
const HERO = 'plate-01-hub-workshop';
const WIDTHS = [480, 960, 1440];

for (const file of readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f) && !/-\d+\.webp$/.test(f))) {
  const name = file.replace(/\.[^.]+$/, '');
  const src = sharp(`${DIR}${file}`);
  const { width } = await src.metadata();
  const budget = (name === HERO ? 120 : 80) * 1024;
  const out = [];
  for (const w of WIDTHS.filter((x) => x <= width || x === WIDTHS[0])) {
    const target = Math.min(w, width);
    let q = 78;
    let size;
    do {
      size = (await sharp(`${DIR}${file}`).resize({ width: target }).webp({ quality: q }).toFile(`${DIR}${name}-${w}.webp`)).size;
      q -= 8;
    } while (w === 960 && size > budget && q >= 40);
    out.push(`${w}:${Math.round(size / 1024)}KB`);
  }
  console.log(`${file} (${Math.round(statSync(`${DIR}${file}`).size / 1024)} KB, ${width}px) → ${out.join(' ')}`);
}
