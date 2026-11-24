import { readdirSync, readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import assert from 'node:assert/strict';

// Run after a production build, against HTML fetched from that same build.
const htmlPath = process.argv[2];
assert(
  htmlPath,
  'Usage: node scripts/check-motion-bundle.mjs /path/to/home.html',
);
const html = readFileSync(htmlPath, 'utf8');
const directory = '.next/static/chunks';
const chunks = readdirSync(directory)
  .filter((name) => name.endsWith('.js'))
  .map((name) => ({ name, code: readFileSync(`${directory}/${name}`) }));
const motion = chunks.filter(({ code }) =>
  /Ribbon renderer unavailable|threejs\.org/.test(code.toString()),
);
assert(motion.length > 0, 'Expected Three/ribbon chunk in build');
const initialTags = [...html.matchAll(/<(?:script|link)\b[^>]*>/g)]
  .map(([tag]) => tag)
  .join('\n');
for (const { name, code } of motion) {
  assert(
    !initialTags.includes(name),
    `${name} is in initial script/preload tags`,
  );
  console.log(
    `${name}: ${code.length} raw bytes; ${gzipSync(code).length} gzip bytes; absent from initial script/preload tags`,
  );
}
console.log(
  'PASS: build/HTML evidence only; runtime requests and Lighthouse require a browser.',
);
