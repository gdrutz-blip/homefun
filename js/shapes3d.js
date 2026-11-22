// 3D shape drawings (SVG) plus their properties.

export const SHAPES3D = {
  cube: {
    name: 'cube', fr: 'cube', g: 'm', faces: 6, edges: 12, vertices: 8, rolls: false, stacks: true, faceShape: 'square',
    things: [{ e: '🎲', name: 'a dice', fr: 'un dé' }, { e: '🧊', name: 'an ice cube', fr: 'un glaçon' }],
  },
  prism: {
    name: 'rectangular prism', fr: 'prisme rectangulaire', g: 'm', faces: 6, edges: 12, vertices: 8, rolls: false, stacks: true, faceShape: 'rectangle',
    things: [{ e: '📦', name: 'a box', fr: 'une boîte' }, { e: '🧱', name: 'a brick', fr: 'une brique' }, { e: '🍫', name: 'a chocolate bar', fr: 'une tablette de chocolat' }],
  },
  sphere: {
    name: 'sphere', fr: 'sphère', g: 'f', faces: 0, edges: 0, vertices: 0, rolls: true, stacks: false, faceShape: null,
    things: [{ e: '⚽', name: 'a soccer ball', fr: 'un ballon de soccer' }, { e: '🏀', name: 'a basketball', fr: 'un ballon de basket' }, { e: '🍊', name: 'an orange', fr: 'une orange' }, { e: '🌍', name: 'the Earth', fr: 'la Terre' }],
  },
  cylinder: {
    name: 'cylinder', fr: 'cylindre', g: 'm', faces: 2, edges: null, vertices: 0, rolls: true, stacks: true, faceShape: 'circle',
    things: [{ e: '🥫', name: 'a soup can', fr: 'une boîte de soupe' }, { e: '🥁', name: 'a drum', fr: 'un tambour' }, { e: '🧻', name: 'a paper roll', fr: 'un rouleau d’essuie-tout' }],
  },
  cone: {
    name: 'cone', fr: 'cône', g: 'm', faces: 1, edges: null, vertices: 1, rolls: true, stacks: false, faceShape: 'circle',
    things: [{ e: '🍦', name: 'an ice cream cone', fr: 'un cornet de crème glacée' }],
  },
  pyramid: {
    name: 'pyramid', fr: 'pyramide', g: 'f', faces: 5, edges: 8, vertices: 5, rolls: false, stacks: false, faceShape: null,
    things: [],
  },
  triprism: {
    name: 'triangular prism', fr: 'prisme triangulaire', g: 'm', faces: 5, edges: 9, vertices: 6, rolls: false, stacks: true, faceShape: null,
    things: [{ e: '⛺', name: 'a tent', fr: 'une tente' }, { e: '🧀', name: 'a wedge of cheese', fr: 'un morceau de fromage' }],
  },
};

const S = 'stroke="#2a2340" stroke-width="2.5" stroke-linejoin="round"';
const HID = 'stroke="#2a2340" stroke-width="1.8" stroke-dasharray="4 4" fill="none"';

const DRAW = {
  cube: (c) => `
    <path d="M20 100 L45 80 L105 80" ${HID}/><path d="M45 20 L45 80" ${HID}/>
    <polygon points="20,40 45,20 105,20 80,40" fill="${c[0]}" ${S}/>
    <polygon points="80,40 105,20 105,80 80,100" fill="${c[2]}" ${S}/>
    <polygon points="20,40 80,40 80,100 20,100" fill="${c[1]}" ${S}/>`,
  prism: (c) => `
    <path d="M8 100 L33 82 L114 82" ${HID}/><path d="M33 40 L33 82" ${HID}/>
    <polygon points="8,58 33,40 114,40 89,58" fill="${c[0]}" ${S}/>
    <polygon points="89,58 114,40 114,82 89,100" fill="${c[2]}" ${S}/>
    <polygon points="8,58 89,58 89,100 8,100" fill="${c[1]}" ${S}/>`,
  sphere: (c) => `
    <defs><radialGradient id="sg" cx="38%" cy="35%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient></defs>
    <circle cx="60" cy="60" r="46" fill="url(#sg)" ${S}/>
    <path d="M14 60 A46 13 0 0 1 106 60" ${HID}/>
    <path d="M14 60 A46 13 0 0 0 106 60" fill="none" stroke="#2a2340" stroke-width="1.8"/>`,
  cylinder: (c) => `
    <path d="M20 25 L20 95 A40 12 0 0 0 100 95 L100 25 Z" fill="${c[1]}" ${S}/>
    <path d="M20 95 A40 12 0 0 1 100 95" ${HID}/>
    <ellipse cx="60" cy="25" rx="40" ry="12" fill="${c[0]}" ${S}/>`,
  cone: (c) => `
    <path d="M20 95 L60 10 L100 95 A40 12 0 0 1 20 95 Z" fill="${c[1]}" ${S}/>
    <path d="M20 95 A40 12 0 0 1 100 95" ${HID}/>`,
  pyramid: (c) => `
    <path d="M15 98 L40 78 L105 78" ${HID}/><path d="M40 78 L58 10" ${HID}/>
    <polygon points="80,98 105,78 58,10" fill="${c[2]}" ${S}/>
    <polygon points="15,98 80,98 58,10" fill="${c[1]}" ${S}/>`,
  triprism: (c) => `
    <path d="M10 100 L60 75 L110 75" ${HID}/><path d="M60 75 L85 30" ${HID}/>
    <polygon points="60,100 35,55 85,30 110,75" fill="${c[2]}" ${S}/>
    <polygon points="10,100 60,100 35,55" fill="${c[1]}" ${S}/>`,
};

const PALETTES = [
  ['#ffd0e2', '#ff6fa5', '#d8407c'],
  ['#e2d8ff', '#9b7bff', '#6a45d8'],
  ['#c9f3ea', '#2bb5a0', '#178a79'],
  ['#ffe6b0', '#ffb020', '#d98a00'],
  ['#d6e5ff', '#4f8cff', '#2a62d6'],
];

let uid = 0;
export function solidSVG(key, paletteIndex) {
  const p = PALETTES[(paletteIndex ?? Object.keys(SHAPES3D).indexOf(key)) % PALETTES.length];
  // give each sphere gradient a unique id so several on one screen don't clash
  const svg = DRAW[key](p).replace(/id="sg"/, `id="sg${++uid}"`).replace(/url\(#sg\)/, `url(#sg${uid})`);
  return `<svg class="solid" viewBox="0 0 120 120" role="img" aria-label="${SHAPES3D[key].name}">${svg}</svg>`;
}
