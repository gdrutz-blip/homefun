// GRADE 3 — NUMBERS TO 1000: Gummy Worm Factory 🏭 / L'usine de jujubes
import { rand, pick, shuffle, QBOX } from '../../../util.js';
import { numberQ, wordQ } from '../../common.js';
import { pvChart, blocks3 } from '../../../visuals3.js';
import { sequence } from '../../../visuals.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F } = FAMILY3;
const BADGES = () => L(['🏭 Factory floor!', '🪱 Worm count!', '📦 Packing time!'], ['🏭 À l’usine!', '🪱 On compte les vers!', '📦 L’emballage!']);
const PACK = () => L('Gummy worms come in boxes of 100, bags of 10, and single worms.', 'Les vers viennent en boîtes de 100, en sacs de 10 et à l’unité.');

function buildQ(mode) {
  const h = rand(1, 9), t = rand(0, 9), o = rand(0, 9);
  const n = h * 100 + t * 10 + o;
  const text = L(`The factory packed ${h} boxes of 100, ${t} bags of 10, and ${o} single worms. How many worms?`,
    `L'usine a emballé ${h} boîtes de 100, ${t} sacs de 10 et ${o} vers seuls. Combien de vers?`);
  return numberQ({
    key: `build-${n}`, badge: pick(BADGES()), text, visual: pvChart(n), answer: n, mode, max: 999,
    near: [100, -100, 10, -10, 1, -1],
    hint: { text: L(`${h} hundreds + ${t} tens + ${o} ones = ${h * 100} + ${t * 10} + ${o}.`, `${h} centaines + ${t} dizaines + ${o} unités = ${h * 100} + ${t * 10} + ${o}.`), visual: blocks3(n) },
  });
}

function digitValueQ() {
  let n;
  do { n = rand(101, 999); } while (new Set(String(n)).size < 3 || String(n).includes('0'));
  const pos = pick([0, 1, 2]);
  const d = Number(String(n)[pos]);
  const value = d * [100, 10, 1][pos];
  const opts = shuffle([...new Set([value, d, d * 10, d * 100])]).slice(0, 3);
  if (!opts.includes(value)) opts[0] = value;
  return wordQ({
    key: `dv-${n}-${pos}`, badge: '🔍 Digit detective!',
    text: L(`In the number ${n}, what is the ${d} worth?`, `Dans le nombre ${n}, que vaut le ${d}?`),
    big: String(n).split('').map((c, i) => (i === pos ? `<u>${c}</u>` : c)).join(''),
    options: shuffle(opts).map((v) => ({ value: v, label: String(v) })),
    answer: value,
    hint: { text: L(`Which place is the ${d} in: hundreds, tens or ones?`, `À quelle position est le ${d} : centaines, dizaines ou unités?`), visual: pvChart(n) },
  });
}

function compareQ() {
  const a = rand(100, 999);
  let b = pick([a + rand(1, 9), a - rand(1, 9), a + rand(1, 9) * 10, a - rand(1, 9) * 10, rand(100, 999), Number(String(a).split('').reverse().join(''))]);
  if (b < 100 || b > 999) b = rand(100, 999);
  const ans = a > b ? '>' : a < b ? '<' : '=';
  return wordQ({
    key: `cmp-${a}-${b}`, badge: L('⚖️ Which is bigger?', '⚖️ Lequel est plus grand?'),
    text: L('Choose the right sign.', 'Choisis le bon signe.'),
    big: `${a} ${QBOX} ${b}`,
    say: L(`${a}, what sign, ${b}? Greater than, less than, or equal to?`, `${a}, quel signe, ${b}? Plus grand que, plus petit que, ou égal?`),
    options: [
      { value: '>', label: L('&gt; greater than', '&gt; plus grand que'), say: L('greater than', 'plus grand que') },
      { value: '<', label: L('&lt; less than', '&lt; plus petit que'), say: L('less than', 'plus petit que') },
      { value: '=', label: L('= equal to', '= égal à'), say: L('equal to', 'égal à') },
    ],
    answer: ans,
    hint: { text: L('Compare the hundreds first. If they match, compare the tens, then the ones. The open mouth eats the bigger number!', 'Compare d’abord les centaines. Si elles sont pareilles, compare les dizaines, puis les unités. La bouche ouverte mange le plus grand nombre!') },
  });
}

function skipQ(mode) {
  const by = pick([25, 50, 100, 10]);
  const back = Math.random() < 0.35;
  const len = 5;
  const start = back ? by * rand(len, Math.floor(1000 / by)) : by * rand(0, Math.floor(1000 / by) - len);
  const items = Array.from({ length: len }, (_, k) => start + (back ? -by : by) * k);
  const blank = rand(1, len - 1);
  return numberQ({
    key: `sk-${start}-${by}-${back}`, badge: '🚚 Delivery truck!',
    text: L(`The truck counts ${back ? 'back ' : ''}by ${by}s. What number is missing?`, `Le camion compte ${back ? 'à rebours ' : ''}par bonds de ${by}. Quel nombre manque?`),
    say: L(`Count ${back ? 'back ' : ''}by ${by}s: ${items.map((v, k) => (k === blank ? 'blank' : v)).join(', ')}. What number is missing?`,
      `Compte ${back ? 'à rebours ' : ''}par bonds de ${by} : ${items.map((v, k) => (k === blank ? 'trou' : v)).join(', ')}. Quel nombre manque?`),
    visual: sequence(items.map(String), { blank, cls: 'picks' }),
    answer: items[blank], mode, max: 1000, near: [by, -by, 10, -10, 1],
    hint: { text: L(`Each jump is ${back ? '−' : '+'}${by}.`, `Chaque bond est ${back ? '−' : '+'}${by}.`) },
  });
}

function expandedQ(mode) {
  const n = rand(101, 999);
  const [h, t, o] = String(n).split('').map(Number);
  const hide = pick(['h', 't', 'o']);
  const parts = { h: h * 100, t: t * 10, o };
  const big = ['h', 't', 'o'].map((k) => (k === hide ? QBOX : parts[k])).join(' + ') + ` = ${n}`;
  return numberQ({
    key: `ex-${n}-${hide}`, badge: '📦 Unpack it!',
    text: L('Fill in the missing part.', 'Trouve la partie manquante.'),
    big, say: L(`${big.replace(QBOX, 'what')}`, `${big.replace(QBOX, 'combien')}`),
    answer: parts[hide], mode, max: 999, near: [hide === 'o' ? 1 : 10, hide === 'h' ? 100 : 10, -1, -10],
    hint: { text: PACK(), visual: pvChart(n) },
  });
}

export default {
  id: 'numbers',
  emoji: '🏭',
  theme: 'gummy',
  color: '#9c27b0',
  get title() { return L('Gummy Worm Factory', 'L’usine de jujubes'); },
  get skill() { return L('Numbers to 1000', 'Les nombres jusqu’à 1000'); },
  get blurb() { return L('Boxes of 100, bags of 10 — count the gummy worms!', 'Boîtes de 100, sacs de 10 — compte les vers!'); },
  get intro() {
    return L(`${F} is the boss of a gummy worm factory! ${PACK()} Help her count and compare.`,
      `${F} est la patronne d'une usine de jujubes! ${PACK()} Aide-la à compter et à comparer.`);
  },
  get levels() {
    return {
      mild: { kid: L('Hundreds, tens and ones', 'Centaines, dizaines et unités'), parent: 'Building 3-digit numbers from hundreds/tens/ones; expanded form.' },
      medium: { kid: L('Compare and digit values', 'Comparer et valeur des chiffres'), parent: 'Comparing with <, >, =; value of a digit; skip counting by 10, 25, 50, 100.' },
      spicy: { kid: L('Skip counting and tricky numbers', 'Compter par bonds et nombres pièges'), parent: 'Counting forward/back by 25, 50, 100 to 1000; expanded form; comparing close numbers.' },
    };
  },
  get praise() { return L(['Wiggly good! 🪱', 'Factory boss! 🏭', 'Sweet! 🍬'], ['Super! 🪱', 'Patronne de l’usine! 🏭', 'Trop bon! 🍬']); },
  get doneTitles() { return L(['Shift complete! 🏭', 'Gummy genius! 🪱'], ['Quart de travail fini! 🏭', 'Génie des jujubes! 🪱']); },
  makeQuestion(level, i) {
    const mode = i % 2 ? 'number' : 'choice';
    if (level === 'mild') return pick([() => buildQ(mode), () => buildQ(mode), () => expandedQ('choice')])();
    if (level === 'medium') return pick([compareQ, digitValueQ, () => skipQ('choice'), () => buildQ(mode)])();
    return pick([() => skipQ(mode), compareQ, () => expandedQ(mode), digitValueQ])();
  },
};
