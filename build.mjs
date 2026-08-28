// Cross-platform port of build-site.ps1 — inlines the product photos into
// template.html as base64 so the site ships as one self-contained file.
// Used by both local builds and the GitHub Pages workflow (which runs on Linux).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(root, 'images');

const MAP = {
  IMG_CAT: 'cat-main-sm.jpg',
  IMG_RACOON: 'raccoon-main-sm.jpg',
  IMG_DOG: 'dog-main-sm.jpg',
  IMG_BEAR: 'bear-main-sm.jpg',
  IMG_FAMILY: 'family-main-sm.jpg',
  IMG_PAIR1: 'pairs-chairs-sm.jpg',
  IMG_PAIR2: 'dog-bear-pair-sm.jpg',
};

let html = readFileSync(join(root, 'template.html'), 'utf8');

for (const [token, file] of Object.entries(MAP)) {
  const b64 = readFileSync(join(imagesDir, file)).toString('base64');
  const before = html;
  html = html.replaceAll(`{{${token}}}`, `data:image/jpeg;base64,${b64}`);
  if (before === html) console.warn(`warning: {{${token}}} not found in template`);
}

const leftover = html.match(/\{\{[A-Z0-9_]+\}\}/g);
if (leftover) {
  console.error('unreplaced placeholders:', [...new Set(leftover)].join(', '));
  process.exit(1);
}

writeFileSync(join(root, 'index.html'), html);
console.log(`built index.html: ${Math.round(Buffer.byteLength(html) / 1024)} KB`);
