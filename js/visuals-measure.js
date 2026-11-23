// Pictures for measuring, telling time and graphs.
import { L } from './i18n.js';

/** A ruler in cm with a coloured object lined up at `start`..`end`. */
export function ruler(start, end, { max = 12, e = '', color = '#ff8a3d' } = {}) {
  const W = 330, pad = 18, u = (W - 2 * pad) / max;
  const x = (v) => pad + v * u;
  let s = `<svg class="mapsvg" viewBox="0 0 ${W} 104" role="img" aria-label="ruler">`;
  s += `<rect x="${x(start)}" y="8" width="${(end - start) * u}" height="30" rx="8" fill="${color}" stroke="#7a3d00" stroke-width="2"/>`;
  if (e) s += `<text x="${x(start) + 10}" y="30" font-size="20">${e}</text>`;
  for (const v of [start, end]) s += `<line x1="${x(v)}" y1="38" x2="${x(v)}" y2="50" stroke="#7a3d00" stroke-width="1.5" stroke-dasharray="3 3"/>`;
  s += `<rect x="${pad - 10}" y="50" width="${W - 2 * pad + 20}" height="46" rx="4" fill="#ffe9a8" stroke="#8a6d00" stroke-width="2"/>`;
  for (let i = 0; i <= max; i++) {
    s += `<line x1="${x(i)}" y1="50" x2="${x(i)}" y2="68" stroke="#5a4500" stroke-width="2"/>`;
    s += `<text x="${x(i)}" y="86" font-size="13" font-weight="700" text-anchor="middle" fill="#3a2d00">${i}</text>`;
  }
  s += `<text x="${W - 16}" y="64" font-size="12" text-anchor="end" fill="#5a4500">cm</text></svg>`;
  return s;
}

/** Two bars side by side to compare lengths. */
export function twoBars(a, b, max = 20) {
  const W = 330, pad = 12, u = (W - 2 * pad - 24) / max;
  const bar = (v, y, color, name) =>
    `<rect x="${pad + 24}" y="${y}" width="${v * u}" height="26" rx="8" fill="${color}" stroke="#333" stroke-width="2"/>
     <text x="${pad + 6}" y="${y + 19}" font-size="17" font-weight="700">${name}</text>
     <text x="${pad + 24 + v * u + 6}" y="${y + 19}" font-size="14">${v} cm</text>`;
  return `<svg class="mapsvg" viewBox="0 0 ${W} 80" role="img">${bar(a, 6, '#ff6fa5', 'A')}${bar(b, 44, '#4f8cff', 'B')}</svg>`;
}

/** Analog clock. */
export function clock(h, m, size = 150) {
  const ha = ((h % 12) + m / 60) * 30, ma = m * 6;
  const pt = (angle, len) => [50 + len * Math.sin((angle * Math.PI) / 180), 50 - len * Math.cos((angle * Math.PI) / 180)];
  let nums = '', ticks = '';
  for (let i = 1; i <= 12; i++) {
    const [x, y] = pt(i * 30, 37);
    nums += `<text x="${x.toFixed(1)}" y="${(y + 3.6).toFixed(1)}" font-size="10" font-weight="700" text-anchor="middle" fill="#2a2340">${i}</text>`;
  }
  for (let i = 0; i < 60; i++) {
    const [x1, y1] = pt(i * 6, 46), [x2, y2] = pt(i * 6, i % 5 ? 44.5 : 43);
    ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#555" stroke-width="${i % 5 ? 0.5 : 1}"/>`;
  }
  const [hx, hy] = pt(ha, 22), [mx, my] = pt(ma, 33);
  return `<svg class="clocksvg" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="clock">
    <circle cx="50" cy="50" r="48" fill="#fff" stroke="#2a2340" stroke-width="3"/>${ticks}${nums}
    <line x1="50" y1="50" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#e53935" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#1e88e5" stroke-width="2.8" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="3" fill="#2a2340"/></svg>`;
}

const COLORS = ['#ff6fa5', '#4f8cff', '#2bb5a0', '#ffb020', '#9b7bff', '#ff7a45'];

/** Bar graph. items: [{ e, w, c }] (emoji, word, count). */
export function barGraph(items, { step = 2 } = {}) {
  const W = 330, H = 230, left = 34, bottom = 56, top = 14;
  const maxV = Math.max(step * 3, Math.ceil(Math.max(...items.map((i) => i.c)) / step) * step);
  const plotH = H - bottom - top;
  const y = (v) => H - bottom - (v / maxV) * plotH;
  const bw = (W - left - 10) / items.length;
  let s = `<svg class="mapsvg" viewBox="0 0 ${W} ${H}" role="img" aria-label="bar graph">`;
  for (let v = 0; v <= maxV; v += step) {
    s += `<line x1="${left}" y1="${y(v)}" x2="${W - 6}" y2="${y(v)}" stroke="${v ? '#d5d5e5' : '#2a2340'}" stroke-width="${v ? 1 : 2}"/>`;
    s += `<text x="${left - 6}" y="${y(v) + 4}" font-size="11" text-anchor="end" fill="#2a2340">${v}</text>`;
  }
  items.forEach((it, i) => {
    const x = left + i * bw + bw * 0.18, w = bw * 0.64;
    s += `<rect x="${x.toFixed(1)}" y="${y(it.c).toFixed(1)}" width="${w.toFixed(1)}" height="${(H - bottom - y(it.c)).toFixed(1)}" fill="${COLORS[i % COLORS.length]}" stroke="#2a2340" stroke-width="2" rx="3"/>`;
    s += `<text x="${(x + w / 2).toFixed(1)}" y="${H - bottom + 20}" font-size="20" text-anchor="middle">${it.e}</text>`;
    s += `<text x="${(x + w / 2).toFixed(1)}" y="${H - bottom + 36}" font-size="10" text-anchor="middle" fill="#2a2340">${it.w}</text>`;
  });
  return s + `</svg>`;
}

/** Pictograph: each row is a flavour with one 🙋 per `per` votes. */
export function pictograph(items, per = 1) {
  const rows = items.map((it) => `<div class="pict-row"><span class="pict-label">${it.e} ${it.w}</span><span class="pict-items">${'🙋'.repeat(it.c / per)}</span></div>`).join('');
  return `<div class="pict">${rows}<div class="pict-key">${L(`Each 🙋 = ${per} ${per === 1 ? 'vote' : 'votes'}`, `Chaque 🙋 = ${per} ${per === 1 ? 'vote' : 'votes'}`)}</div></div>`;
}
