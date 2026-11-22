// Reusable pictures: counting groups, base-ten blocks, number sequences.
import { L } from './i18n.js';

export function emojiGroup(e, n, { crossed = 0 } = {}) {
  const cols = Math.max(1, Math.min(n, 5));
  let s = `<div class="egroup" style="--cols:${cols}">`;
  for (let i = 0; i < n; i++) {
    s += `<span class="em${i >= n - crossed ? ' crossed' : ''}">${e}</span>`;
  }
  return s + '</div>';
}

export const emojiAdd = (e, a, b) =>
  `<div class="combo">${emojiGroup(e, a)}<span class="op">+</span>${emojiGroup(e, b)}</div>`;

/** Ten-frame: `filled` cells show the emoji, the rest are empty. */
export function tenFrame(filled, e) {
  let s = '<div class="tenframe">';
  for (let i = 0; i < 10; i++) s += `<span class="tf-cell">${i < filled ? e : ''}</span>`;
  return s + '</div>';
}

/** Base-ten blocks: tall rods for tens, little cubes for ones. */
export function baseTen(n, { label = true } = {}) {
  const t = Math.floor(n / 10);
  const o = n % 10;
  const rods = '<span class="rod"></span>'.repeat(t);
  const cubes = '<span class="cube"></span>'.repeat(o);
  const tensWord = L(t === 1 ? 'ten' : 'tens', t > 1 ? 'dizaines' : 'dizaine');
  const onesWord = L(o === 1 ? 'one' : 'ones', o > 1 ? 'unités' : 'unité');
  return `<div class="b10">
    <div class="b10-blocks">${rods}${o ? `<span class="cubes">${cubes}</span>` : ''}</div>
    ${label ? `<div class="b10-label"><b>${n}</b> = ${t} ${tensWord} + ${o} ${onesWord}</div>` : ''}
  </div>`;
}

export const baseTenPair = (a, b, op = '+') =>
  `<div class="combo">${baseTen(a)}<span class="op">${op}</span>${baseTen(b)}</div>`;

/** A row of boxes. `items` are strings; index `blank` shows a "?" box. `jumps` labels the gaps. */
export function sequence(items, { blank = -1, jumps = null, cls = '' } = {}) {
  let s = `<div class="seq ${cls}">`;
  items.forEach((v, i) => {
    if (i > 0 && jumps) s += `<span class="jump">${jumps}</span>`;
    s += i === blank
      ? '<span class="seq-box blank">?</span>'
      : `<span class="seq-box">${v}</span>`;
  });
  return s + '</div>';
}

export const card = (inner, cls = '') => `<div class="vcard ${cls}">${inner}</div>`;
