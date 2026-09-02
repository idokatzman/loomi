// Copies template.html -> index.html. Historically this also inlined the
// product photos as base64 so the site shipped as one self-contained file;
// that stopped scaling once the doll count grew past a handful (every photo
// on every page load, no browser caching), so template.html now references
// real files in images/ directly and this step is just a straight copy —
// kept as its own script/step so the existing edit->build->deploy habit and
// the GitHub Pages workflow don't need to change.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(root, 'template.html'), 'utf8');

const leftover = html.match(/\{\{[A-Z0-9_]+\}\}/g);
if (leftover) {
  console.error('unreplaced placeholders (should not exist anymore):', [...new Set(leftover)].join(', '));
  process.exit(1);
}

writeFileSync(join(root, 'index.html'), html);
console.log(`built index.html: ${Math.round(Buffer.byteLength(html) / 1024)} KB`);
