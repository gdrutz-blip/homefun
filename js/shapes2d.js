// 2D shape drawings (SVG) plus the facts kids learn about them.
import { rand } from './util.js';

export const SHAPES2D = {
  circle: { name: 'circle', fr: 'cercle', sides: 0, vertices: 0 },
  oval: { name: 'oval', fr: 'ovale', sides: 0, vertices: 0 },
  triangle: { name: 'triangle', fr: 'triangle', sides: 3, vertices: 3 },
  square: { name: 'square', fr: 'carré', sides: 4, vertices: 4 },
  rectangle: { name: 'rectangle', fr: 'rectangle', sides: 4, vertices: 4 },
  rhombus: { name: 'rhombus', fr: 'losange', sides: 4, vertices: 4 },
  trapezoid: { name: 'trapezoid', fr: 'trapèze', sides: 4, vertices: 4 },
  pentagon: { name: 'pentagon', fr: 'pentagone', sides: 5, vertices: 5 },
  hexagon: { name: 'hexagon', fr: 'hexagone', sides: 6, vertices: 6 },
  octagon: { name: 'octagon', fr: 'octogone', sides: 8, vertices: 8 },
};

const FILLS = ['#ff6fa5', '#9b7bff', '#2bb5a0', '#ffb020', '#4f8cff', '#ff7a45'];
const DARK = { '#ff6fa5': '#c2185b', '#9b7bff': '#5a33c9', '#2bb5a0': '#137a6b', '#ffb020': '#b26a00', '#4f8cff': '#1f4fb8', '#ff7a45': '#b8461b' };
export const randomFill = () => FILLS[rand(0, FILLS.length - 1)];

function regular(n, r, startDeg) {
  return Array.from({ length: n }, (_, i) => {
    const a = ((startDeg + (360 / n) * i) * Math.PI) / 180;
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
  });
}

function irregular(n) {
  const start = rand(0, 359);
  return Array.from({ length: n }, (_, i) => {
    const a = ((start + (360 / n) * i + rand(-10, 10)) * Math.PI) / 180;
    const r = rand(30, 44);
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
  });
}

function rotate(points, deg) {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a), s = Math.sin(a);
  return points.map(([x, y]) => [50 + (x - 50) * c - (y - 50) * s, 50 + (x - 50) * s + (y - 50) * c]);
}

/** Corner points for a shape (empty for circle/oval). */
export function shapePoints(name, { rot = 0, irregular: irr = false } = {}) {
  const n = SHAPES2D[name]?.sides || 0;
  if (!n) return [];
  if (irr && n !== 4) return irregular(n);
  let pts;
  switch (name) {
    case 'triangle': pts = regular(3, 44, -90).map(([x, y]) => [x, y + 8]); break;
    case 'square': pts = regular(4, 42, 45); break;
    case 'rectangle': pts = [[12, 28], [88, 28], [88, 72], [12, 72]]; break;
    case 'rhombus': pts = [[50, 7], [80, 50], [50, 93], [20, 50]]; break;
    case 'trapezoid': pts = [[30, 28], [70, 28], [90, 72], [10, 72]]; break;
    case 'pentagon': pts = regular(5, 44, -90).map(([x, y]) => [x, y + 4]); break;
    case 'hexagon': pts = regular(6, 44, 0); break;
    case 'octagon': pts = regular(8, 44, 22.5); break;
    default: pts = irregular(n);
  }
  return rot ? rotate(pts, rot) : pts;
}

/**
 * Draw a shape. Options:
 *  rot: degrees, irregular: wobbly version, fill: colour,
 *  dots: number the vertices (used in hints), points: pre-computed points.
 */
export function shapeSVG(name, opts = {}) {
  const fill = opts.fill || randomFill();
  const stroke = DARK[fill] || '#333';
  const pts = opts.points || shapePoints(name, opts);
  let body;
  if (name === 'circle') {
    body = `<circle cx="50" cy="50" r="42" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
  } else if (name === 'oval') {
    body = `<ellipse cx="50" cy="50" rx="44" ry="27" fill="${fill}" stroke="${stroke}" stroke-width="3" transform="rotate(${opts.rot || 0} 50 50)"/>`;
  } else {
    const p = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
    body = `<polygon points="${p}" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/>`;
    if (opts.dots) {
      body += pts.map(([x, y], i) =>
        `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.5" fill="#fff" stroke="#222" stroke-width="2"/>` +
        `<text x="${x.toFixed(1)}" y="${(y + 3.6).toFixed(1)}" font-size="9" font-weight="700" text-anchor="middle" fill="#222">${i + 1}</text>`
      ).join('');
    }
  }
  return `<svg class="shape" viewBox="-4 -4 108 108" role="img" aria-label="${name}">${body}</svg>`;
}
