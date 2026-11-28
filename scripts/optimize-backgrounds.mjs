import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sources = {
  hero: 'Crimson-Lit Athlete With Dumbbell-1',
  training: 'Black Dumbbells on Charcoal Floor',
  plans: 'Black dumbbells and barbell in shadow',
  questions: 'Controlled curl in crimson light',
  visit: 'Battle ropes in a crimson-lit gym',
  closing: 'Crouched Athlete Preparing Beside a Loaded Barbell-2',
};

const normalize = (name) => name.toLowerCase().replace(/[\s_]/g, '');
const files = (await readdir('assets-source', { withFileTypes: true })).filter(
  (entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === '.png',
);
const output = 'public/images/bg';
const images = new Map();
for (const [key, name] of Object.entries(sources)) {
  const matches = files.filter(({ name: file }) => normalize(path.parse(file).name) === normalize(name));
  if (matches.length !== 1) throw new Error(`Expected one PNG for ${key}; found ${matches.length}: ${name}`);
  const image = sharp(path.join('assets-source', matches[0].name));
  if (key === 'visit' || key === 'closing') image.flop();
  const { data, info } = await image.resize({ width: 1672, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 }).toBuffer({ resolveWithObject: true });
  if (info.width !== 1672 || info.height !== 941 || data.length > 150_000) {
    throw new Error(`${key}: unexpected output ${info.width}x${info.height}, ${data.length} bytes`);
  }
  images.set(key, data);
}

await mkdir(output, { recursive: true });
for (const [key, data] of images) {
  await writeFile(path.join(output, `${key}.webp`), data);
  console.log(`${key}.webp: ${data.length} bytes`);
}
