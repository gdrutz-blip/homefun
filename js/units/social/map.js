// SOCIAL STUDIES — Global Communities & Mapping: The Band's World Tour 🗺️ / La tournée mondiale
import { rand, pick, sample, shuffle } from '../../util.js';
import { wordQ, emojiQ } from '../common.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M } = FAMILY;
const SIZE = 4;

const PLACES = [
  { e: '🏠', n: ['the house', 'la maison'] },
  { e: '🏫', n: ['the school', "l'école"] },
  { e: '🌳', n: ['the park', 'le parc'] },
  { e: '🍦', n: ['the ice cream shop', 'le bar laitier'] },
  { e: '🎸', n: ['the music store', 'le magasin de musique'] },
  { e: '🏥', n: ['the hospital', "l'hôpital"] },
  { e: '📚', n: ['the library', 'la bibliothèque'] },
  { e: '🛝', n: ['the playground', 'le terrain de jeux'] },
];
const pn = (p) => L(...p.n);
/** Fix French contractions: "de le parc" -> "du parc". */
const fx = (t) => t.replace(/\bde le /g, 'du ').replace(/\bDe le /g, 'Du ');

const DIRS = {
  north: { dr: -1, dc: 0, n: ['north', 'nord'] },
  south: { dr: 1, dc: 0, n: ['south', 'sud'] },
  east: { dr: 0, dc: 1, n: ['east', 'est'] },
  west: { dr: 0, dc: -1, n: ['west', 'ouest'] },
};
const dn = (d) => L(...DIRS[d].n);
const OPP = { north: 'south', south: 'north', east: 'west', west: 'east' };

function drawMap(cells, highlight) {
  let g = '';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const p = cells[r][c];
      g += `<span class="gm-cell${highlight && highlight[0] === r && highlight[1] === c ? ' hl' : ''}">${p ? p.e : ''}</span>`;
    }
  }
  return `<div class="gridmap">
    <span class="gm-n">${L('N', 'N')} ⬆</span>
    <span class="gm-w">${L('W', 'O')}</span>
    <div class="gm-grid">${g}</div>
    <span class="gm-e">${L('E', 'E')}</span>
    <span class="gm-s">${L('S', 'S')}</span>
  </div>`;
}

/** Build a map where walking `moves` from the start lands on a place. */
function buildRoute(moves) {
  for (let tries = 0; tries < 100; tries++) {
    const r0 = rand(0, SIZE - 1), c0 = rand(0, SIZE - 1);
    let r = r0, c = c0, ok = true;
    for (const [d, n] of moves) {
      r += DIRS[d].dr * n; c += DIRS[d].dc * n;
      if (r < 0 || c < 0 || r >= SIZE || c >= SIZE) { ok = false; break; }
    }
    if (!ok || (r === r0 && c === c0)) continue;
    const places = sample(PLACES, 5);
    const cells = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
    cells[r0][c0] = places[0];
    cells[r][c] = places[1];
    for (const p of places.slice(2)) {
      let rr, cc;
      do { rr = rand(0, SIZE - 1); cc = rand(0, SIZE - 1); } while (cells[rr][cc]);
      cells[rr][cc] = p;
    }
    return { cells, start: places[0], target: places[1], others: places.slice(2), at: [r, c], from: [r0, c0] };
  }
  return null;
}

function walkQ(moves, badge) {
  const m = buildRoute(moves);
  const steps = moves.map(([d, n]) => L(`${n} ${n === 1 ? 'square' : 'squares'} ${dn(d)}`, `${n} ${n === 1 ? 'case' : 'cases'} vers l'${dn(d)}`.replace("l'nord", 'le nord').replace("l'sud", 'le sud')));
  const route = steps.join(L(', then ', ', puis '));
  const text = moves.length === 1 && moves[0][1] === 1
    ? L(`What is ${dn(moves[0][0])} of ${m.start.e} ${pn(m.start)}?`, `Qu'est-ce qui est au ${dn(moves[0][0])} de ${m.start.e} ${pn(m.start)}?`.replace('au est', "à l'est").replace('au ouest', "à l'ouest"))
    : L(`Start at ${m.start.e} ${pn(m.start)}. Go ${route}. Where are you?`, `Pars de ${m.start.e} ${pn(m.start)}. Va ${route}. Où es-tu?`);
  return emojiQ({
    key: `walk-${moves.flat().join()}-${m.start.e}-${m.target.e}`,
    badge,
    text: fx(text),
    visual: drawMap(m.cells, m.from),
    options: shuffle([m.target, ...sample(m.others, 2)]).map((p) => ({ value: p.e, e: p.e, say: pn(p) })),
    answer: m.target.e,
    revealSay: pn(m.target),
    hint: {
      text: L('North is up ⬆, south is down ⬇, east is right ➡, west is left ⬅. Put your finger on the start and move!',
        'Le nord est en haut ⬆, le sud en bas ⬇, l’est à droite ➡, l’ouest à gauche ⬅. Mets ton doigt sur le départ et avance!'),
    },
  });
}

const CONTINENTS = {
  na: ['North America', "l'Amérique du Nord"],
  sa: ['South America', "l'Amérique du Sud"],
  eu: ['Europe', "l'Europe"],
  af: ['Africa', "l'Afrique"],
  as: ['Asia', "l'Asie"],
  au: ['Australia', "l'Australie"],
  an: ['Antarctica', "l'Antarctique"],
};
const cn = (k) => L(...CONTINENTS[k]);
const cnCap = (k) => { const s = cn(k); return s.charAt(0).toUpperCase() + s.slice(1); };

const TOUR = () => [
  { e: '🍁', t: L('The tour starts at home in Canada! Which continent is Canada on?', 'La tournée commence chez nous, au Canada! Sur quel continent est le Canada?'), a: 'na' },
  { e: '🦘', t: L('The band meets kangaroos and koalas. Where are they?', 'Le groupe voit des kangourous et des koalas. Où sont-ils?'), a: 'au' },
  { e: '🐧', t: L('The band visits the coldest place on Earth, full of penguins and ice. Where are they?', 'Le groupe visite l’endroit le plus froid de la Terre, plein de manchots et de glace. Où sont-ils?'), a: 'an' },
  { e: '🐼', t: L('The band sees giant pandas in China. Which continent is that?', 'Le groupe voit des pandas géants en Chine. Sur quel continent?'), a: 'as' },
  { e: '🗼', t: L('The band plays a show near the Eiffel Tower in France. Where are they?', 'Le groupe joue près de la tour Eiffel, en France. Où sont-ils?'), a: 'eu' },
  { e: '🦒', t: L('The band goes on safari and sees giraffes and lions. Where are they?', 'Le groupe fait un safari et voit des girafes et des lions. Où sont-ils?'), a: 'af' },
  { e: '🦙', t: L('The band visits the Amazon rainforest and meets llamas in the mountains. Where are they?', 'Le groupe visite la forêt amazonienne et voit des lamas dans les montagnes. Où sont-ils?'), a: 'sa' },
  { e: '🗽', t: L('The band plays in New York City, near Canada. Which continent?', 'Le groupe joue à New York, près du Canada. Quel continent?'), a: 'na' },
];

function tourQ() {
  const t = pick(TOUR());
  return wordQ({
    key: `tour-${t.e}`, badge: L('✈️ World tour!', '✈️ Tournée mondiale!'), text: t.t,
    visual: card(`<span class="big-emoji">${t.e}</span>`),
    options: sample(Object.keys(CONTINENTS), 3, t.a).map((k) => ({ value: k, label: cnCap(k) })),
    answer: t.a,
    hint: { text: L(`The answer is one of the 7 continents. ${t.e} lives in ${cn(t.a)}.`, `C'est un des 7 continents. ${t.e} : ${cn(t.a)}.`) },
  });
}

const FACTS = () => [
  { t: L('Which ocean is on the EAST side of Canada?', 'Quel océan est à l’EST du Canada?'), o: [L('Atlantic Ocean', 'L’océan Atlantique'), L('Pacific Ocean', 'L’océan Pacifique'), L('Arctic Ocean', 'L’océan Arctique')], a: 0, h: L('Atlantic is on the east (right). Pacific is on the west (left). Arctic is up north.', 'L’Atlantique est à l’est (à droite). Le Pacifique est à l’ouest (à gauche). L’Arctique est au nord.') },
  { t: L('Which ocean is on the WEST side of Canada?', 'Quel océan est à l’OUEST du Canada?'), o: [L('Pacific Ocean', 'L’océan Pacifique'), L('Atlantic Ocean', 'L’océan Atlantique'), L('Arctic Ocean', 'L’océan Arctique')], a: 0, h: L('Pacific is on the west (left), by British Columbia.', 'Le Pacifique est à l’ouest (à gauche), près de la Colombie-Britannique.') },
  { t: L('How many continents are there?', 'Combien y a-t-il de continents?'), o: ['5', '7', '10'], a: 1, h: L('Count them: North America, South America, Europe, Africa, Asia, Australia, Antarctica.', 'Compte : Amérique du Nord, Amérique du Sud, Europe, Afrique, Asie, Australie, Antarctique.') },
  { t: L('On a map, what does the colour BLUE usually show?', 'Sur une carte, que montre souvent la couleur BLEUE?'), o: [L('Water', 'L’eau'), L('Roads', 'Les routes'), L('Forests', 'Les forêts')], a: 0, h: L('Oceans, lakes and rivers are blue on most maps.', 'Les océans, les lacs et les rivières sont bleus sur la plupart des cartes.') },
  { t: L('Places near the equator (the middle of the Earth) are usually…', 'Les endroits près de l’équateur (le milieu de la Terre) sont souvent…'), o: [L('hot', 'chauds'), L('icy cold', 'glacés'), L('snowy all year', 'enneigés toute l’année')], a: 0, h: L('The sun shines strongest in the middle of the Earth. The North and South Poles are the coldest.', 'Le soleil est le plus fort au milieu de la Terre. Les pôles Nord et Sud sont les plus froids.') },
  { t: L('What is the box on a map that explains the symbols called?', 'Comment s’appelle la boîte qui explique les symboles sur une carte?'), o: [L('The legend', 'La légende'), L('The title', 'Le titre'), L('The ocean', 'L’océan')], a: 0, h: L('The legend tells you what each symbol on the map means.', 'La légende explique ce que veut dire chaque symbole.') },
  { t: L('Which country is our country?', 'Quel est notre pays?'), o: [L('Canada', 'Le Canada'), L('France', 'La France'), L('Japan', 'Le Japon')], a: 0, h: L('We live in Ontario, in Canada! 🍁', 'Nous habitons en Ontario, au Canada! 🍁') },
  { t: L('Which province do we live in?', 'Dans quelle province habitons-nous?'), o: ['Ontario', L('Quebec', 'Le Québec'), L('Alberta', 'L’Alberta')], a: 0, h: L('Our province is Ontario. Its capital is Toronto.', 'Notre province est l’Ontario. Sa capitale est Toronto.') },
];

function factQ() {
  const f = pick(FACTS());
  return wordQ({
    key: `mf-${f.t.slice(0, 14)}`, badge: L('🧭 Map smarts!', '🧭 Experte des cartes!'), text: f.t,
    options: shuffle(f.o.map((o, i) => ({ value: i, label: o }))), answer: f.a, hint: { text: f.h },
  });
}

function opposite() {
  const d = pick(Object.keys(DIRS));
  return wordQ({
    key: `opp-${d}`, badge: '🧭',
    text: L(`If you walk ${dn(d)} and turn around, which way are you facing?`, `Si tu marches vers le ${dn(d)} et que tu te retournes, vers où regardes-tu?`.replace('le est', "l'est").replace('le ouest', "l'ouest")),
    options: Object.keys(DIRS).map((x) => ({ value: x, label: dn(x) })),
    answer: OPP[d],
    hint: { text: L('North and south are opposites. East and west are opposites.', 'Le nord et le sud sont opposés. L’est et l’ouest sont opposés.') },
  });
}

export default {
  id: 'map',
  emoji: '🗺️',
  theme: 'map',
  color: '#1e88e5',
  get title() { return L('World Tour', 'La tournée mondiale'); },
  get skill() { return L('Maps & the world', 'Les cartes et le monde'); },
  get blurb() { return L('Go on tour with Mia & the Blue Sweaters!', 'Pars en tournée avec Mia & the Blue Sweaters!'); },
  get intro() {
    return L(`${M}'s band is going on a world tour! Use maps, directions and continents to find the way.`,
      `Le groupe de ${M} part en tournée mondiale! Utilise les cartes, les directions et les continents pour trouver le chemin.`);
  },
  get levels() {
    return {
      mild: { kid: L('North, south, east, west', 'Nord, sud, est, ouest'), parent: 'Cardinal directions on a simple grid map (one step).' },
      medium: { kid: L('Follow directions and find continents', 'Suis les directions et trouve les continents'), parent: 'Multi-step routes on a grid; the 7 continents via landmarks and animals; opposite directions.' },
      spicy: { kid: L('Oceans, map legends and the Earth', 'Océans, légendes et la Terre'), parent: 'Oceans around Canada, map legends, equator/poles climate, two-direction routes, continents.' },
    };
  },
  get praise() { return L(['Next stop! ✈️', 'Great navigating! 🧭', 'Rock on, world! 🌎'], ['Prochain arrêt! ✈️', 'Bonne navigation! 🧭', 'On rocke le monde! 🌎']); },
  get doneTitles() { return L(['Tour complete! 🌎', 'Map master! 🗺️'], ['Tournée terminée! 🌎', 'Championne des cartes! 🗺️']); },
  makeQuestion(level) {
    const d = () => pick(Object.keys(DIRS));
    if (level === 'mild') return walkQ([[d(), 1]], L('🧭 Which way?', '🧭 Quelle direction?'));
    if (level === 'medium') {
      return pick([
        () => walkQ([[d(), 2]], L('🚌 Tour bus!', '🚌 L’autobus de tournée!')),
        () => walkQ([[pick(['east', 'west']), 1], [pick(['north', 'south']), 1]], L('🚌 Tour bus!', '🚌 L’autobus de tournée!')),
        tourQ, tourQ, opposite,
      ])();
    }
    return pick([
      () => walkQ([[pick(['east', 'west']), rand(1, 2)], [pick(['north', 'south']), rand(1, 2)]], L('🚌 Long drive!', '🚌 Long trajet!')),
      factQ, factQ, factQ, tourQ,
    ])();
  },
};
