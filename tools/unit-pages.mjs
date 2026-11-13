// Adds a page for every unit on KU's semester timetable that doesn't have one yet, rebuilds the all-units index
// with every department, and adds the new pages to sitemap.xml. Existing unit pages are never changed (their URLs
// stay). Source: the timetable transcribed in the bot's repo (discord-sync-bot/lib/timetable.json).
//   node tools/unit-pages.mjs [path to discord-sync-bot]
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../public/redesign/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const bot = process.argv[2] || join(root, '../../../discord-sync-bot');
const timetable = JSON.parse(readFileSync(join(bot, 'lib/timetable.json'), 'utf8'));
const unitsDir = join(root, 'units');
const SITE = 'https://www.engineeringhub.site';
const INVITE = 'https://discord.gg/7yUz2rXumm';
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' });

const COURSE = { EMM: 'Mechanical', EAR: 'Aerospace', EBE: 'Agricultural & Biosystems', ECV: 'Civil', EEE: 'Electrical & Electronic', EBM: 'Biomedical' };
const DEPT = { EMM: 'Mechanical & Aerospace', EAR: 'Mechanical & Aerospace', EBE: 'Agricultural & Biosystems', ECV: 'Civil', EEE: 'Electrical & Electronic', EBM: 'Biomedical', ECU: 'Common Units', UCU: 'Common Units' };
const DEPT_ORDER = ['Mechanical & Aerospace', 'Agricultural & Biosystems', 'Civil', 'Electrical & Electronic', 'Biomedical', 'Common Units'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugOf = (codes, title) => [...codes.map((c) => c.toLowerCase().replace(' ', '-')), title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')].join('-');
const yearNum = (label) => Number((label.match(/\d/) || [9])[0]);

// the pages that exist: codes from the folder name, title and place from the page, files from its count
const existing = readdirSync(unitsDir).filter((d) => d !== 'index.html' && existsSync(join(unitsDir, d, 'index.html'))).map((slug) => {
  const html = readFileSync(join(unitsDir, slug, 'index.html'), 'utf8');
  const codes = []; const w = slug.split('-');
  for (let n = 0; n + 1 < w.length && /^[a-z]{3}$/.test(w[n]) && /^\d{3}$/.test(w[n + 1]); n += 2) codes.push(`${w[n].toUpperCase()} ${w[n + 1]}`);
  const crumbs = html.match(/All units<\/a> › ([^›<]+) › ([^<]+)<\/p>/);
  return { slug, codes, label: html.match(/<h1>([^<]+)<\/h1>/)[1], dept: crumbs[1].trim().replace(/&amp;/g, '&'), year: crumbs[2].trim(), files: Number((html.match(/<span class="stat">(\d+) files<\/span>/) || [0, 0])[1]) };
});
const covered = new Set(existing.flatMap((p) => p.codes));

// the timetable's units without a page; place: the course of the code, the year it's taught in
const cohortsOf = (code) => Object.entries(timetable.cohorts).filter(([, list]) => list.includes(code)).map(([k]) => k);
const fresh = Object.entries(timetable.titles).filter(([code]) => !covered.has(code)).map(([code, title]) => {
  const prefix = code.slice(0, 3);
  const cohorts = cohortsOf(code);
  const home = cohorts.find((k) => k.startsWith(prefix)) || cohorts[0];
  const year = home ? `Year ${home.split(' ')[1]}` : 'All years';
  const others = cohorts.filter((k) => k !== home && !k.startsWith(prefix)).map((k) => `${COURSE[k.split(' ')[0]] || k.split(' ')[0]} Year ${k.split(' ')[1]}`);
  return { code, codes: [code], title, slug: slugOf([code], title), label: `${code} — ${esc(title)}`, dept: DEPT[prefix] || 'Common Units', year, files: 0, home, others: [...new Set(others)] };
});

// the look comes from an existing unit page: its style, the site's shared header and the light/dark scripts
const page0 = readFileSync(join(unitsDir, existing[0].slug, 'index.html'), 'utf8');
const style = page0.match(/<style>[\s\S]*?<\/style>/)[0];
const themeInit = page0.match(/<script>\(function\(\)\{var t;[\s\S]*?<\/script>/)[0];
const header = page0.match(/<header class="hdr">[\s\S]*?<\/header>/)[0];
const themeJs = page0.match(/<script>\s*\(function \(\) \{\s*var b = document\.getElementById\('themeBtn'\)[\s\S]*?<\/script>/)[0];
const head = (title, desc, url, crumbs) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${themeInit}
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
${style}
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map(([name, item], n) => ({ '@type': 'ListItem', position: n + 1, name, item })) })}</script>
</head>
<body>
${header}
`;
const ACCESS = `<h2>How to get access</h2>
<ol class="steps"><li><b>Join the Discord free.</b> You get 7 days of full access to every unit library straight away.</li><li><b>Keep it for KES 50 a semester.</b> Send it by M-Pesa to 0745947704 (the name shows as Peter Mwangi).</li><li><b>Tap "I've paid"</b> in #plans and paste your M-Pesa code. You're usually in within minutes.</li></ol>`;
const FOOT = `<footer><div class="wrap">Engineering Study Hub, a study community for Kenyan engineering students on Discord. <a href="/units/">All units</a> · <a href="/">Home</a> · <a href="/crux/">Crux</a> · <a href="/#/membership">Membership</a></div></footer>
${themeJs}
</body>
</html>
`;

const all = [...existing, ...fresh];
const bySlug = new Map(all.map((p) => [p.slug, p]));
const slugFor = (code) => all.find((p) => p.codes.includes(code))?.slug;

for (const u of fresh) {
  const url = `${SITE}/units/${u.slug}/`;
  const name = `${u.code} ${u.title}`;
  const where = u.home ? `${COURSE[u.home.split(' ')[0]]} ${u.year}` : 'every course';
  const title = `${esc(name)} past papers, CATs &amp; notes (KU) | Engineering Study Hub`;
  const desc = `${esc(name)} at Kenyatta University, on the ${esc(where)} timetable for Semester 1 2026/27. Share and find past papers, CATs and notes on the Engineering Study Hub.`;
  const mates = (u.home ? timetable.cohorts[u.home] : []).filter((c) => c !== u.code).map(slugFor).filter(Boolean).filter((s, n, a) => a.indexOf(s) === n).map((s) => bySlug.get(s));
  const html = head(title, desc, url, [['All units', `${SITE}/units/`], [name, url]]) + `<main class="wrap">
<p class="crumbs"><a href="/units/">All units</a> › ${esc(u.dept)} › ${u.year}</p>
<h1>${u.label}</h1>
<p class="lede">${esc(name)} is on KU's ${esc(where)} timetable for Semester 1, 2026/27${u.others.length ? `, and ${esc(u.others.join(' and '))} take it too` : ''}.</p>
<div class="stats"><span class="stat">No files yet</span><span class="stat">Semester 1 2026/27</span></div>
<div class="cta"><a class="btn" href="${INVITE}" rel="noopener">Start your free 7-day trial</a><span class="mono">Then KES 50 a semester by M-Pesa. No card.</span></div>
<h2>No files yet</h2>
<p>Nobody has shared past papers, CATs or notes for ${esc(u.code)} on the Hub yet. Got some? Add them from <a href="/crux/">Crux</a>, the Hub's study app: your whole class gets them, and 10 files in a semester gets you Premium for the rest of it.</p>
${ACCESS}
${mates.length ? `<h2>More ${esc(where)} units</h2>
<ul class="units">${mates.map((m) => `<li><a href="/units/${m.slug}/">${m.label}</a></li>`).join('')}</ul>` : ''}
</main>
${FOOT}`;
  mkdirSync(join(unitsDir, u.slug), { recursive: true });
  writeFileSync(join(unitsDir, u.slug, 'index.html'), html);
}

// the index: every department, its years in order, its units by code
const groups = new Map();
for (const p of all) {
  if (!groups.has(p.dept)) groups.set(p.dept, new Map());
  const years = groups.get(p.dept);
  if (!years.has(p.year)) years.set(p.year, []);
  years.get(p.year).push(p);
}
const totalFiles = all.reduce((s, p) => s + p.files, 0);
const depts = [...groups.keys()].sort((a, b) => (DEPT_ORDER.indexOf(a) + 1 || 99) - (DEPT_ORDER.indexOf(b) + 1 || 99));
const index = head('KU engineering past papers, CATs &amp; notes by unit | Engineering Study Hub',
  `Past papers, CATs and notes for ${all.length} Kenyatta University engineering units, by department and year. Free 7-day trial, then KES 50 a semester.`,
  `${SITE}/units/`, [['All units', `${SITE}/units/`]]) + `<main class="wrap">
<h1>KU engineering past papers, by unit</h1>
<p class="lede">Every unit on the Engineering Study Hub with the past papers, CATs and notes inside it, and every unit on this semester's timetable. ${all.length} units, ${totalFiles.toLocaleString('en-US')} files.</p>
<div class="cta"><a class="btn" href="${INVITE}" rel="noopener">Start your free 7-day trial</a><span class="mono">Then KES 50 a semester by M-Pesa.</span></div>
${depts.map((d) => `<h2>${esc(d)}</h2>
${[...groups.get(d)].sort((a, b) => yearNum(a[0]) - yearNum(b[0])).map(([y, list]) => `<h3>${y}</h3>
<ul class="units">${list.sort((a, b) => a.codes[0].localeCompare(b.codes[0])).map((p) => `<li><a href="/units/${p.slug}/">${p.label}</a> <span class="mono">${p.files || 'new'}</span></li>`).join('')}</ul>`).join('\n')}`).join('\n')}
${ACCESS}
</main>
${FOOT}`;
writeFileSync(join(unitsDir, 'index.html'), index);

// sitemap: the new pages, and today's date on the index
const mapPath = join(root, 'sitemap.xml');
let map = readFileSync(mapPath, 'utf8');
map = map.replace(new RegExp(`(<loc>${SITE}/units/</loc><lastmod>)[^<]+`), `$1${today}`);
const add = fresh.filter((u) => !map.includes(`/units/${u.slug}/`)).map((u) => `  <url><loc>${SITE}/units/${u.slug}/</loc><lastmod>${today}</lastmod></url>`);
if (add.length) map = map.replace('</urlset>', `${add.join('\n')}\n</urlset>`);
writeFileSync(mapPath, map);
console.log(`${fresh.length} new unit pages; index lists ${all.length} units in ${depts.length} departments; sitemap +${add.length}`);
