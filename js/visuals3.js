// Pictures for the Grade 3 games: equal groups, arrays, place-value charts, fractions, coins.
import { L } from './i18n.js';

/** `groups` circles (bowls/plates), each holding `per` emoji. */
export function equalGroups(groups, per, e, { container = '' } = {}) {
  const one = `<div class="eqg">${container ? `<span class="eqg-c">${container}</span>` : ''}<div class="eqg-items" style="--cols:${Math.min(per, 4)}">${`<span>${e}</span>`.repeat(per)}</div></div>`;
  return `<div class="eqgroups">${one.repeat(groups)}</div>`;
}

/** rows × cols array of emoji. */
export function array(rows, cols, e) {
  return `<div class="arr" style="--cols:${cols}">${`<span>${e}</span>`.repeat(rows * cols)}</div>`;
}

/** Hundreds / tens / ones chart. */
export function pvChart(n, { hide = null } = {}) {
  const h = Math.floor(n / 100), t = Math.floor((n % 100) / 10), o = n % 10;
  const cell = (v, k) => `<td>${hide === k ? '<span class="qbox">?</span>' : v}</td>`;
  return `<table class="pv">
    <tr><th>${L('Hundreds', 'Centaines')}</th><th>${L('Tens', 'Dizaines')}</th><th>${L('Ones', 'Unités')}</th></tr>
    <tr>${cell(h, 'h')}${cell(t, 't')}${cell(o, 'o')}</tr>
  </table>`;
}

/** Hundreds flats, tens rods and ones cubes. */
export function blocks3(n) {
  const h = Math.floor(n / 100), t = Math.floor((n % 100) / 10), o = n % 10;
  return `<div class="b3">${'<span class="flat"></span>'.repeat(h)}${'<span class="rod"></span>'.repeat(t)}<span class="cubes">${'<span class="cube"></span>'.repeat(o)}</span></div>`;
}

// ---------- fractions ----------
/** Stacked fraction like ¾. */
export const frac = (k, n) => `<span class="frac"><span>${k}</span><span>${n}</span></span>`;

const DEN = {
  2: { en: ['half', 'halves'], fr: ['demi', 'demis'] },
  3: { en: ['third', 'thirds'], fr: ['tiers', 'tiers'] },
  4: { en: ['fourth', 'fourths'], fr: ['quart', 'quarts'] },
  5: { en: ['fifth', 'fifths'], fr: ['cinquième', 'cinquièmes'] },
  6: { en: ['sixth', 'sixths'], fr: ['sixième', 'sixièmes'] },
  8: { en: ['eighth', 'eighths'], fr: ['huitième', 'huitièmes'] },
  10: { en: ['tenth', 'tenths'], fr: ['dixième', 'dixièmes'] },
};
const NUM_EN = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const NUM_FR = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'];

/** "three fourths" / "trois quarts", "one half" / "un demi". */
export function fracWords(k, n) {
  const d = DEN[n];
  const en = `${NUM_EN[k]} ${k === 1 ? d.en[0] : d.en[1]}`;
  const fr = `${NUM_FR[k]} ${k === 1 ? d.fr[0] : d.fr[1]}`;
  return L(en, fr);
}

const SHADE = '#ff8a3d', EMPTY = '#fff4e6', LINE = '#5b3a1e';

/** Pizza cut into n equal slices, k shaded. */
export function pie(n, k, size = 150) {
  const r = 46, cx = 50, cy = 50;
  let paths = '';
  for (let i = 0; i < n; i++) {
    const a0 = (2 * Math.PI * i) / n - Math.PI / 2, a1 = (2 * Math.PI * (i + 1)) / n - Math.PI / 2;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const d = n === 1 ? `M${cx - r},${cy} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0` : `M${cx},${cy} L${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${large} 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z`;
    paths += `<path d="${d}" fill="${i < k ? SHADE : EMPTY}" stroke="${LINE}" stroke-width="2"/>`;
  }
  return `<svg class="fracsvg" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="${k}/${n}"><circle cx="50" cy="50" r="49" fill="#f3c27a"/>${paths}</svg>`;
}

/** Waffle bar split into n equal parts (or unequal `cuts` in 0..1), k shaded. */
export function bar(n, k, { cuts = null, w = 220, h = 70 } = {}) {
  const edges = cuts ? [0, ...cuts, 1] : Array.from({ length: n + 1 }, (_, i) => i / n);
  let rects = '';
  for (let i = 0; i < edges.length - 1; i++) {
    const x = 4 + edges[i] * (w - 8), wd = (edges[i + 1] - edges[i]) * (w - 8);
    rects += `<rect x="${x.toFixed(1)}" y="4" width="${wd.toFixed(1)}" height="${h - 8}" fill="${i < k ? SHADE : EMPTY}" stroke="${LINE}" stroke-width="2.5"/>`;
  }
  return `<svg class="fracsvg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">${rects}</svg>`;
}

// ---------- Canadian money ----------
export const COINS = {
  5: { label: '5¢', r: 21, fill: '#d9d9d9', ring: null },
  10: { label: '10¢', r: 18, fill: '#e3e3e3', ring: null },
  25: { label: '25¢', r: 24, fill: '#d0d0d0', ring: null },
  100: { label: '$1', frLabel: '1 $', r: 26, fill: '#e8c14a', ring: null },
  200: { label: '$2', frLabel: '2 $', r: 28, fill: '#e8c14a', ring: '#cfcfcf' },
};
export const BILLS = { 500: { label: '$5', frLabel: '5 $', fill: '#6fa8dc' }, 1000: { label: '$10', frLabel: '10 $', fill: '#b48ad6' } };

export function coin(v) {
  if (BILLS[v]) {
    const b = BILLS[v];
    return `<svg class="bill" viewBox="0 0 110 54" width="96" height="48"><rect x="2" y="2" width="106" height="50" rx="6" fill="${b.fill}" stroke="#2a2340" stroke-width="2"/><text x="55" y="35" text-anchor="middle" font-size="20" font-weight="700" fill="#1a1530">${L(b.label, b.frLabel)}</text></svg>`;
  }
  const c = COINS[v];
  const s = c.r * 2 + 4;
  const ring = c.ring ? `<circle cx="${s / 2}" cy="${s / 2}" r="${c.r}" fill="${c.ring}" stroke="#555" stroke-width="1.5"/><circle cx="${s / 2}" cy="${s / 2}" r="${c.r * 0.66}" fill="${c.fill}"/>` : `<circle cx="${s / 2}" cy="${s / 2}" r="${c.r}" fill="${c.fill}" stroke="#555" stroke-width="1.5"/>`;
  const label = c.frLabel ? L(c.label, c.frLabel) : c.label;
  return `<svg class="coin" viewBox="0 0 ${s} ${s}" width="${s}" height="${s}">${ring}<text x="${s / 2}" y="${s / 2 + 4.5}" text-anchor="middle" font-size="${c.r > 22 ? 12 : 11}" font-weight="700" fill="#333">${label}</text></svg>`;
}

export const coinRow = (values) => `<div class="coins">${values.map(coin).join('')}</div>`;

/** 375 -> "$3.75" / "3,75 $"; 75 -> "75¢" / "75 ¢" */
export function money(cents, { forceDollars = false } = {}) {
  if (cents < 100 && !forceDollars) return L(`${cents}¢`, `${cents} ¢`);
  const d = Math.floor(cents / 100), c = String(cents % 100).padStart(2, '0');
  return L(`$${d}.${c}`, `${d},${c} $`);
}
/** How to say an amount out loud. */
export function sayMoney(cents) {
  const d = Math.floor(cents / 100), c = cents % 100;
  if (!d) return L(`${c} cents`, `${c} cents`);
  const dol = L(d === 1 ? 'dollar' : 'dollars', d === 1 ? 'dollar' : 'dollars');
  if (!c) return `${d} ${dol}`;
  return L(`${d} ${dol} and ${c} cents`, `${d} ${dol} et ${c} cents`);
}
