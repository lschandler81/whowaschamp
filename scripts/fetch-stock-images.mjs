/*
  Fetch stock images into public/images/stock

  Usage:
    node scripts/fetch-stock-images.mjs

  Notes:
  - Fill the URLs below with direct JPG links (Unsplash/Pexels). Make sure
    they are allowed under the license and do not include logos or talent.
  - Files are written as provided in `targets`.
*/

import { writeFile } from 'node:fs/promises';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('public/images/stock');

const targets = [
  // Replace `url` with a direct image URL for each file
  { file: 'stadium-spotlight.jpg', url: '' },
  { file: 'wwe-belt-dark.jpg', url: '' },
  { file: 'ufc-octagon.jpg', url: '' },
  { file: 'octagon-lights.jpg', url: '' },
  { file: 'arena-retro.jpg', url: '' },
  { file: 'scoreboard-closeup.jpg', url: '' },
  { file: 'wwe-ring-ropes.jpg', url: '' },
];

async function main() {
  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
  }

  for (const t of targets) {
    if (!t.url) {
      console.log(`Skip ${t.file}: url not set`);
      continue;
    }
    const res = await fetch(t.url);
    if (!res.ok) {
      console.error(`Failed ${t.file}: ${res.status} ${res.statusText}`);
      continue;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);
    const outPath = path.join(OUT_DIR, t.file);
    await writeFile(outPath, buf);
    console.log(`Saved ${outPath} (${buf.length} bytes)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

