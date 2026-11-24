// GRADE 2 — NUMBERS TO 200: Mia's Build-It Workshop 🔧 / L'atelier de bricolage de Mia
import { rand, pick, sample, pl, QBOX } from '../../util.js';
import { numberQ, wordQ } from '../common.js';
import { baseTen, sequence } from '../../visuals.js';
import { pvChart } from '../../visuals3.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F } = FAMILY;
const BADGES = () => L(['🔧 Build time!', '🪛 Screw count!', '📦 Flat-pack box!', '🛠️ Workshop!'], ['🔧 On construit!', '🪛 On compte les vis!', '📦 La boîte à monter!', '🛠️ L’atelier!']);
const THINGS = () => L(['a bookshelf', 'a toy box', 'a desk', 'a bunk bed', 'a little table'], ['une bibliothèque', 'un coffre à jouets', 'un bureau', 'un lit superposé', 'une petite table']);

function tensOnesQ(mode, max) {
  const n = rand(21, max);
  const t = Math.floor(n / 10), o = n % 10;
  const text = L(`${M} is building ${pick(THINGS())}. She has ${pl(t, 'bag', 'bags')} of 10 screws and ${pl(o, 'loose screw', 'loose screws')}. How many screws?`,
    `${M} monte ${pick(THINGS())}. Elle a ${pl(t, 'sac', 'sacs')} de 10 vis et ${pl(o, 'vis toute seule', 'vis toutes seules')}. Combien de vis?`);
  return numberQ({
    key: `to-${n}`, badge: pick(BADGES()), text, visual: n <= 99 ? baseTen(n, { label: false }) : pvChart(n),
    answer: n, mode, max: 200, near: [10, -10, 1, -1],
    hint: { text: L(`Count the tens: 10, 20, 30… then count on the ones.`, `Compte les dizaines : 10, 20, 30… puis ajoute les unités.`), visual: baseTen(n) },
  });
}

function beforeAfterQ(max) {
  const n = rand(12, max - 2);
  const kind = pick(['before', 'after', 'between']);
  const seq = kind === 'before' ? [QBOX, n] : kind === 'after' ? [n, QBOX] : [n - 1, QBOX, n + 1];
  const ans = kind === 'before' ? n - 1 : kind === 'after' ? n + 1 : n;
  const text = kind === 'before' ? L(`What number comes just BEFORE ${n}?`, `Quel nombre vient juste AVANT ${n}?`)
    : kind === 'after' ? L(`What number comes just AFTER ${n}?`, `Quel nombre vient juste APRÈS ${n}?`)
      : L(`What number is BETWEEN ${n - 1} and ${n + 1}?`, `Quel nombre est ENTRE ${n - 1} et ${n + 1}?`);
  return numberQ({
    key: `ba-${kind}-${n}`, badge: L('🔢 Number line!', '🔢 Droite numérique!'), text,
    big: seq.join(', '), answer: ans, max: 200, near: [1, -1, 10, -10, 2],
    hint: { text: L('Count forward by 1 for after. Count back by 1 for before.', 'Compte 1 de plus pour après. Compte 1 de moins pour avant.') },
  });
}

function compareQ(max) {
  const a = rand(20, max);
  let b = pick([a + rand(1, 9), a - rand(1, 9), a + 10, a - 10, Number(String(a).split('').reverse().join(''))]);
  if (b < 10 || b > max || b === a) b = a + 1 <= max ? a + 1 : a - 1;
  const ans = a > b ? '>' : '<';
  return wordQ({
    key: `cmp-${a}-${b}`, badge: L('⚖️ Bigger or smaller?', '⚖️ Plus grand ou plus petit?'),
    text: L('Choose the right sign.', 'Choisis le bon signe.'),
    big: `${a} ${QBOX} ${b}`,
    say: L(`${a}, what sign, ${b}? Greater than, or less than?`, `${a}, quel signe, ${b}? Plus grand que, ou plus petit que?`),
    options: [
      { value: '>', label: L('&gt; greater than', '&gt; plus grand que'), say: L('greater than', 'plus grand que') },
      { value: '<', label: L('&lt; less than', '&lt; plus petit que'), say: L('less than', 'plus petit que') },
    ],
    answer: ans,
    hint: { text: L('Compare the tens first. The open mouth always eats the bigger number! 🐊', 'Compare d’abord les dizaines. La bouche ouverte mange toujours le plus grand nombre! 🐊') },
  });
}

function evenOddQ() {
  const n = rand(2, 50);
  return wordQ({
    key: `eo-${n}`, badge: L('🧦 Pairs of socks!', '🧦 Des paires de bas!'),
    text: L(`${F} sorts ${n} socks into pairs. Is ${n} even or odd?`, `${F} met ${n} bas en paires. Est-ce que ${n} est pair ou impair?`),
    options: [{ value: 'even', label: L('even (no sock left over)', 'pair (pas de bas tout seul)') }, { value: 'odd', label: L('odd (one sock left over)', 'impair (un bas reste tout seul)') }],
    answer: n % 2 === 0 ? 'even' : 'odd',
    hint: { text: L('Look at the ones digit. 0, 2, 4, 6, 8 are even. 1, 3, 5, 7, 9 are odd.', 'Regarde le chiffre des unités. 0, 2, 4, 6, 8 sont pairs. 1, 3, 5, 7, 9 sont impairs.') },
  });
}

function orderQ(max) {
  const nums = sample(Array.from({ length: max - 10 }, (_, i) => i + 10), 4);
  const smallest = Math.min(...nums);
  return wordQ({
    key: `ord-${nums.join('-')}`, badge: L('📏 Line them up!', '📏 Mets-les en ordre!'),
    text: L('Which number is the SMALLEST?', 'Quel nombre est le PLUS PETIT?'),
    options: nums.map((n) => ({ value: n, label: String(n) })),
    answer: smallest,
    hint: { text: L('Look at the hundreds, then the tens, then the ones.', 'Regarde les centaines, puis les dizaines, puis les unités.') },
  });
}

function hundredsQ(mode) {
  const n = rand(100, 199);
  const text = L(`${M} has 1 big box of 100 screws, ${pl(Math.floor((n % 100) / 10), 'bag', 'bags')} of 10, and ${pl(n % 10, 'loose screw', 'loose screws')}. How many?`,
    `${M} a 1 grosse boîte de 100 vis, ${pl(Math.floor((n % 100) / 10), 'sac', 'sacs')} de 10 et ${pl(n % 10, 'vis seule', 'vis seules')}. Combien?`);
  return numberQ({
    key: `h-${n}`, badge: pick(BADGES()), text, visual: pvChart(n),
    answer: n, mode, max: 200, near: [10, -10, 1, -1, 100, -100],
    hint: { text: L('100 + the tens + the ones.', '100 + les dizaines + les unités.') },
  });
}

function skip10Q() {
  const start = rand(1, 9) + 10 * rand(0, 12);
  const items = Array.from({ length: 5 }, (_, k) => start + 10 * k);
  const blank = rand(1, 4);
  return numberQ({
    key: `s10-${start}-${blank}`, badge: L('🔩 10 more screws!', '🔩 10 vis de plus!'),
    text: L('Each step adds 10 screws. What number is missing?', 'Chaque étape ajoute 10 vis. Quel nombre manque?'),
    say: L(`Count by tens: ${items.map((v, k) => (k === blank ? 'blank' : v)).join(', ')}. What number is missing?`, `Compte par bonds de 10 : ${items.map((v, k) => (k === blank ? 'trou' : v)).join(', ')}. Quel nombre manque?`),
    visual: sequence(items.map(String), { blank, cls: 'picks' }),
    answer: items[blank], max: 200, near: [10, -10, 1, -1],
    hint: { text: L('Only the tens digit changes. The ones digit stays the same!', 'Seul le chiffre des dizaines change. Celui des unités reste pareil!') },
  });
}

export default {
  id: 'numbers200',
  emoji: '🔧',
  theme: 'build',
  color: '#0b6fb8',
  get title() { return L(`${M}'s Build-It Workshop`, `L'atelier de bricolage de ${M}`); },
  get skill() { return L('Numbers to 200', 'Les nombres jusqu’à 200'); },
  get blurb() { return L('Count screws in bags of 10 and build furniture!', 'Compte les vis en sacs de 10 et monte des meubles!'); },
  get intro() {
    return L(`${M} loves building furniture from flat-pack boxes! The screws come in bags of 10. Let's count, compare and build.`,
      `${M} adore monter des meubles en kit! Les vis viennent en sacs de 10. Comptons, comparons et construisons.`);
  },
  get levels() {
    return {
      mild: { kid: L('Tens and ones', 'Dizaines et unités'), parent: 'Tens and ones to 99 with base-ten blocks; before, after and between.' },
      medium: { kid: L('Compare, even and odd', 'Comparer, pair et impair'), parent: 'Comparing with < and >; even/odd; smallest of a set; counting by 10s from any number.' },
      spicy: { kid: L('Numbers up to 200', 'Les nombres jusqu’à 200'), parent: 'Numbers 100–200 with place value; comparing and ordering to 200; half typed on keypad.' },
    };
  },
  get praise() { return L(['Built it! 🔧', 'Nailed it! 🔨', 'Perfect fit! 📦'], ['C’est monté! 🔧', 'Bien vissé! 🔨', 'Ça s’emboîte! 📦']); },
  get doneTitles() { return L(['Furniture built! 🛠️', 'Master builder! 🔧'], ['Meuble terminé! 🛠️', 'Super bricoleuse! 🔧']); },
  makeQuestion(level, i) {
    const mode = i % 2 ? 'number' : 'choice';
    if (level === 'mild') return pick([() => tensOnesQ('choice', 99), () => tensOnesQ('choice', 99), () => beforeAfterQ(99)])();
    if (level === 'medium') return pick([() => compareQ(99), evenOddQ, () => orderQ(99), skip10Q])();
    return pick([() => hundredsQ(mode), () => compareQ(200), () => orderQ(200), () => beforeAfterQ(200), skip10Q])();
  },
};
