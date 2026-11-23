// GRADE 2 — FRACTIONS: Pancake Party 🥞 / La fête des crêpes
import { pick, shuffle } from '../../util.js';
import { wordQ, visualQ, numberQ } from '../common.js';
import { pancake, bar, fracWords } from '../../visuals3.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;
const BADGES = () => L(['🥞 Pancake party!', '🍓 Breakfast time!', '🧈 Fair share!'], ['🥞 Fête des crêpes!', '🍓 Le déjeuner!', '🧈 Partage juste!']);
const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);

/** Word answers like "one fourth". */
const fracOpt = (k, n) => ({ value: `${k}/${n}`, label: fracWords(k, n), say: fracWords(k, n) });

const PART_NAMES = { 2: ['HALVES', 'DEMIS'], 3: ['THIRDS', 'TIERS'], 4: ['FOURTHS', 'QUARTS'] };
const UNEVEN = { 2: [[0.3], [0.62]], 3: [[0.2, 0.55], [0.4, 0.85]], 4: [[0.1, 0.4, 0.7], [0.25, 0.4, 0.8]] };

function halfOrNot() {
  const n = pick([2, 2, 3, 4]);
  const equal = Math.random() < 0.5;
  const variant = pick([0, 1]);
  const food = pick([L('pancake', 'crêpe'), L('waffle', 'gaufre'), L('slab of play dough', 'galette de pâte à modeler')]);
  return wordQ({
    key: `parts-${n}-${equal}-${equal ? 0 : variant}-${food}`, badge: pick(BADGES()),
    text: L(`${M} cut a ${food} for ${G}. Is it cut into ${PART_NAMES[n][0]} (${n} equal parts)?`, `${M} a coupé une ${food} pour ${G}. Est-elle coupée en ${PART_NAMES[n][1]} (${n} parts égales)?`),
    visual: card(bar(n, 0, { cuts: equal ? null : UNEVEN[n][variant] })),
    options: [{ value: 'yes', label: L(`Yes, ${n} equal parts`, `Oui, ${n} parts égales`) }, { value: 'no', label: L('No, the parts are not equal', 'Non, pas égales') }],
    answer: equal ? 'yes' : 'no',
    hint: { text: L('Every part must be the SAME size. Would that be fair?', 'Chaque part doit être de la MÊME grandeur. Est-ce juste?') },
  });
}

function nameIt(dens) {
  const n = pick(dens);
  const k = dens.length <= 3 ? 1 : pick([1, 1, 2, 3].filter((x) => x < n));
  const pool = [[1, 2], [1, 3], [1, 4], [2, 4], [3, 4], [2, 3]].filter(([a, b]) => a / b !== k / n);
  const opts = shuffle([[k, n], ...shuffle(pool).slice(0, 2)]);
  const useBar = Math.random() < 0.4;
  return wordQ({
    key: `name-${k}-${n}-${useBar}`, badge: pick(BADGES()),
    text: useBar ? L('How much of the waffle is coloured in?', 'Quelle partie de la gaufre est coloriée?') : L('How much of the pancake has syrup?', 'Quelle partie de la crêpe a du sirop?'),
    visual: card(useBar ? bar(n, k) : pancake(n, k)),
    options: opts.map(([a, b]) => fracOpt(a, b)),
    answer: `${k}/${n}`,
    hint: { text: L(`Count the equal pieces: ${n}. Count the coloured pieces: ${k}. That's ${fracWords(k, n)}.`, `Compte les parts égales : ${n}. Compte les parts coloriées : ${k}. C'est ${fracWords(k, n)}.`) },
  });
}

function findPicture() {
  const [k, n] = pick([[1, 2], [1, 4], [3, 4], [1, 3], [2, 4], [2, 3]]);
  const others = shuffle([[1, 2], [1, 4], [3, 4], [1, 3], [2, 3]].filter(([a, b]) => a / b !== k / n)).slice(0, 2);
  return visualQ({
    key: `find-${k}-${n}`, badge: pick(BADGES()),
    text: L(`${F} wants ${fracWords(k, n)} of a pancake with syrup. Tap the right pancake.`, `${F} veut ${fracWords(k, n)} de crêpe avec du sirop. Touche la bonne crêpe.`),
    options: shuffle([[k, n], ...others]).map(([a, b]) => ({ value: `${a}/${b}`, html: pancake(b, a, 110) })),
    answer: `${k}/${n}`,
    hint: { text: L(`Find the pancake cut into ${n} equal pieces, with ${k} covered in syrup.`, `Trouve la crêpe coupée en ${n} parts égales, avec ${k} ${k > 1 ? 'parts' : 'part'} de sirop.`) },
  });
}

function shareQ() {
  const [pancakes, kids, k, n] = pick([[1, 2, 1, 2], [2, 4, 1, 2], [1, 4, 1, 4], [3, 4, 3, 4], [2, 8, 1, 4], [3, 6, 1, 2], [4, 8, 1, 2]]);
  const opts = shuffle([[k, n], ...[[1, 2], [1, 4], [3, 4], [1, 3]].filter(([a, b]) => a / b !== k / n).slice(0, 2)]);
  return wordQ({
    key: `share-${pancakes}-${kids}`, badge: L('🧒 Sharing!', '🧒 On partage!'),
    text: L(`${pancakes} ${pancakes > 1 ? 'pancakes are' : 'pancake is'} shared equally by ${kids} kids. How much does each kid get?`,
      `${pancakes} ${pancakes > 1 ? 'crêpes sont partagées' : 'crêpe est partagée'} également entre ${kids} enfants. Combien chaque enfant reçoit-il?`),
    visual: `<div class="coins">${Array.from({ length: pancakes }, () => pancake(1, 0, 70)).join('')}</div>`,
    options: opts.map(([a, b]) => fracOpt(a, b)),
    answer: `${k}/${n}`,
    hint: { text: L('Draw it! Cut each pancake so every kid gets the same amount.', 'Dessine-le! Coupe chaque crêpe pour que chaque enfant ait la même quantité.') },
  });
}

function biggerPiece() {
  const pair = shuffle([2, 4]);
  return visualQ({
    key: `big-${pair.join('')}`, badge: L('🥞 Biggest piece!', '🥞 Le plus gros morceau!'),
    text: L(`Which piece is BIGGER: ${fracWords(1, 2)} or ${fracWords(1, 4)} of the same pancake?`, `Quel morceau est le plus GROS : ${fracWords(1, 2)} ou ${fracWords(1, 4)} de la même crêpe?`),
    options: pair.map((d) => ({ value: d, html: `${pancake(d, 1, 110)}<div class="frac-cap">${cap(fracWords(1, d))}</div>` })),
    answer: 2,
    hint: { text: L('More pieces means smaller pieces!', 'Plus il y a de morceaux, plus ils sont petits!') },
  });
}

function howManyHalves(mode) {
  const p = pick([1, 2, 3, 4]), n = pick([2, 4]);
  return numberQ({
    key: `count-${p}-${n}`, badge: pick(BADGES()),
    text: L(`${M} cuts ${p} ${p > 1 ? 'pancakes' : 'pancake'} into ${n === 2 ? 'halves' : 'fourths'}. How many pieces are there?`,
      `${M} coupe ${p} ${p > 1 ? 'crêpes' : 'crêpe'} en ${n === 2 ? 'demis' : 'quarts'}. Combien y a-t-il de morceaux?`),
    visual: `<div class="coins">${Array.from({ length: p }, () => pancake(n, 0, 80)).join('')}</div>`,
    answer: p * n, mode, min: 1, max: 20, near: [1, -1, 2, -2, n],
    hint: { text: L(`Each pancake has ${n} pieces. Count them all!`, `Chaque crêpe a ${n} morceaux. Compte-les tous!`) },
  });
}

export default {
  id: 'fractions2',
  emoji: '🥞',
  theme: 'pancake',
  color: '#c77d1e',
  get title() { return L('Pancake Party', 'La fête des crêpes'); },
  get skill() { return L('Fractions', 'Les fractions'); },
  get blurb() { return L('Cut pancakes into halves and fourths and share them fairly!', 'Coupe des crêpes en demis et en quarts et partage-les!'); },
  get intro() {
    return L(`${M} is making pancakes for the whole family! Everyone needs a fair share. Let's learn about halves, thirds and fourths.`,
      `${M} fait des crêpes pour toute la famille! Tout le monde veut sa juste part. Apprenons les demis, les tiers et les quarts.`);
  },
  get levels() {
    return {
      mild: { kid: L('Halves and equal parts', 'Les demis et les parts égales'), parent: 'Recognizing equal parts and halves; naming one half, one third, one fourth.' },
      medium: { kid: L('Halves, thirds and fourths', 'Demis, tiers et quarts'), parent: 'Naming fractions in words (two fourths, three fourths…); matching words to pictures.' },
      spicy: { kid: L('Sharing pancakes fairly', 'Partager les crêpes'), parent: 'Sharing problems (e.g., 2 pancakes among 4 kids); comparing one half and one fourth; counting halves/fourths.' },
    };
  },
  get praise() { return L(['Flip-tastic! 🥞', 'Syrup-er! 🍯', 'Yum! 😋'], ['Crêpe-tastique! 🥞', 'Super sirop! 🍯', 'Miam! 😋']); },
  get doneTitles() { return L(['Pancakes for everyone! 🥞', 'Fraction chef! 👩‍🍳'], ['Des crêpes pour tous! 🥞', 'Cheffe des fractions! 👩‍🍳']); },
  makeQuestion(level, i) {
    if (level === 'mild') return pick([halfOrNot, halfOrNot, () => nameIt([2, 3, 4])])();
    if (level === 'medium') return pick([() => nameIt([2, 3, 4, 4]), findPicture, findPicture, halfOrNot])();
    return pick([shareQ, shareQ, biggerPiece, () => howManyHalves(i % 2 ? 'number' : 'choice'), findPicture])();
  },
};
