import { readFileSync } from 'node:fs';

const css = readFileSync('src/app/globals.css', 'utf8');
const root = css.slice(
  css.indexOf(':root {'),
  css.indexOf('\n}', css.indexOf(':root {')),
);
const tokens = Object.fromEntries(
  [...root.matchAll(/--([\w-]+):\s*(#[\da-f]{6});/gi)].map((m) => [m[1], m[2]]),
);
function luminance(hex) {
  const rgb = hex
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
function ratio(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
const rows = [];
function check(label, foreground, background, minimum = 4.5) {
  const value = ratio(foreground, background);
  rows.push(
    `| ${label} | ${foreground} / ${background} | ${value.toFixed(2)}:1 | ${minimum}:1 | ${value >= minimum ? 'PASS' : 'FAIL'} |`,
  );
  if (value < minimum) process.exitCode = 1;
}
for (const bg of ['background', 'surface']) {
  for (const fg of ['foreground', 'muted', 'accent-text', 'focus'])
    check(`${fg} on ${bg}`, tokens[fg], tokens[bg]);
  check(`control boundary on ${bg}`, tokens['control-border'], tokens[bg], 3);
  check(`large accent on ${bg}`, tokens.accent, tokens[bg], 3);
}
for (const bg of [tokens['light-surface'], '#ffffff']) {
  for (const fg of ['light-ink', 'light-muted', 'accent-deep'])
    check(`${fg} on light`, tokens[fg], bg);
  check('light control boundary', '#6c7178', bg, 3);
}
for (const bg of ['accent', 'accent-hover'])
  check(`button / skip text on ${bg}`, tokens['on-accent'], tokens[bg]);
check('pricing-note on cream', '#45494f', '#f5f2eb');
console.log(
  '| Pair | Colors | Ratio | Required | Result |\n| --- | --- | --- | --- | --- |\n' +
    rows.join('\n'),
);
console.log(
  '\nSource-declared text pairs and control boundaries, including hover, focus and disabled text. Decorative dividers and logo artwork are not text-contrast assertions. Rendered/composited state coverage requires a browser.',
);
