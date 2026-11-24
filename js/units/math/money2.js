// GRADE 2 — MONEY: Mia's Slime Shop 🫧 / La boutique de slime de Mia
import { rand, pick, shuffle } from '../../util.js';
import { wordQ, visualQ } from '../common.js';
import { coin, coinRow, money, sayMoney } from '../../visuals3.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;
const BADGES = () => L(['🫧 Slime shop!', '✨ Glitter time!', '🧪 Mix it up!', '🟣 Squishy!'], ['🫧 Boutique de slime!', '✨ Des paillettes!', '🧪 On mélange!', '🟣 Tout mou!']);
const STUFF = () => [
  { e: '🫧', n: L('a tub of slime', 'un pot de slime') }, { e: '✨', n: L('a pack of glitter', 'un paquet de paillettes') },
  { e: '🧴', n: L('a bottle of glue', 'une bouteille de colle') }, { e: '🟣', n: L('a ball of play dough', 'une boule de pâte à modeler') },
  { e: '⭐', n: L('a sticker', 'un autocollant') }, { e: '🎨', n: L('a tube of paint', 'un tube de peinture') },
];
const Cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);
const NAMES = () => ({
  5: L('nickel', 'pièce de 5 cents'), 10: L('dime', 'pièce de 10 cents'), 25: L('quarter', 'pièce de 25 cents'),
  100: L('loonie', 'huard'), 200: L('toonie', 'pièce de 2 dollars'),
});

function opts(ans, steps = [5, -5, 10, -10, 25, -25]) {
  const set = new Set([ans]);
  for (const d of shuffle(steps)) { if (set.size >= 4) break; if (ans + d > 0) set.add(ans + d); }
  return shuffle([...set]).map((v) => ({ value: v, label: money(v), say: sayMoney(v) }));
}

/** Make `total` with few coins (biggest first), sometimes breaking one big coin into smaller ones. */
function coinsTo(total, kinds) {
  const out = [];
  let left = total;
  for (const k of kinds) while (left >= k) { out.push(k); left -= k; }
  const i = out.indexOf(25);
  if (i >= 0 && Math.random() < 0.5) out.splice(i, 1, 10, 10, 5);
  return out.sort((a, b) => b - a);
}

function nameCoin() {
  const v = pick([5, 10, 25, 100, 200]);
  const others = shuffle([5, 10, 25, 100, 200].filter((x) => x !== v)).slice(0, 2);
  return wordQ({
    key: `name-${v}`, badge: '🪙',
    text: L('What is this coin worth?', 'Combien vaut cette pièce?'),
    visual: `<div class="coins big">${coin(v)}</div>`,
    options: shuffle([v, ...others]).map((x) => ({ value: x, label: `${money(x)} — ${NAMES()[x]}`, say: `${sayMoney(x)}, ${NAMES()[x]}` })),
    answer: v,
    hint: { text: L('Nickel 5¢ (a beaver), dime 10¢ (a ship), quarter 25¢ (a caribou), loonie $1, toonie $2.', 'La pièce de 5 ¢ a un castor, 10 ¢ un voilier, 25 ¢ un caribou. Le huard vaut 1 $. La pièce de 2 $ a deux couleurs.') },
  });
}

function countSame() {
  const v = pick([5, 10]);
  const n = rand(2, v === 5 ? 10 : 10);
  return wordQ({
    key: `same-${v}-${n}`, badge: pick(BADGES()),
    text: L(`${M} opens her piggy bank. How much money is there?`, `${M} ouvre sa tirelire. Combien d'argent y a-t-il?`),
    visual: coinRow(Array(n).fill(v)),
    options: opts(n * v, [v, -v, 2 * v, 1, -1]),
    answer: n * v,
    hint: { text: L(`Count by ${v}s: ${Array.from({ length: Math.min(n, 4) }, (_, i) => (i + 1) * v).join(', ')}…`, `Compte par bonds de ${v} : ${Array.from({ length: Math.min(n, 4) }, (_, i) => (i + 1) * v).join(', ')}…`) },
  });
}

function countMixed(max) {
  let total;
  do { total = rand(3, max / 5) * 5; } while (total < 20);
  const coins = coinsTo(total, max > 100 ? [100, 25, 10, 5] : [25, 10, 5]);
  if (coins.length > 9) return countMixed(max);
  return wordQ({
    key: `mix-${coins.join('-')}`, badge: pick(BADGES()),
    text: L(`${F} pays for slime with these coins. How much is it?`, `${F} paie du slime avec ces pièces. Combien est-ce?`),
    visual: coinRow(coins),
    options: opts(total),
    answer: total,
    hint: { text: L('Start with the biggest coins. Count by 25s, then 10s, then 5s.', 'Commence par les plus grosses pièces. Compte par 25, puis par 10, puis par 5.') },
  });
}

function whichSet() {
  const total = pick([30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100]);
  const right = coinsTo(total, [25, 10, 5]);
  const wrongs = [total + pick([5, 10]), total - pick([5, 10])].map((t) => coinsTo(t, [25, 10, 5]));
  const options = shuffle([{ v: total, c: right }, ...wrongs.map((c, i) => ({ v: `w${i}`, c }))]);
  const it = pick(STUFF());
  return visualQ({
    key: `set-${total}`, badge: pick(BADGES()),
    text: L(`${it.e} ${Cap(it.n)} costs ${money(total)}. Which coins make exactly ${money(total)}?`, `${it.e} ${Cap(it.n)} coûte ${money(total)}. Quelles pièces font exactement ${money(total)}?`),
    say: L(`${Cap(it.n)} costs ${sayMoney(total)}. Which coins make exactly ${sayMoney(total)}?`, `${it.n} coûte ${sayMoney(total)}. Quelles pièces font exactement ${sayMoney(total)}?`),
    options: options.map((o) => ({ value: o.v, html: `<div class="coins small">${o.c.map(coin).join('')}</div>` })),
    answer: total,
    hint: { text: L('Count each group of coins. Which one adds up to the price?', 'Compte chaque groupe de pièces. Lequel donne le bon prix?') },
  });
}

function enough() {
  const it = pick(STUFF());
  const price = rand(4, 19) * 5;
  const have = Math.max(10, price + pick([-20, -10, -5, 5, 10, 20]));
  const coins = coinsTo(have, [25, 10, 5]);
  return wordQ({
    key: `enough-${price}-${have}`, badge: '🤔',
    text: L(`${it.e} ${G} wants ${it.n}. It costs ${money(price)}. Does ${M} have enough?`, `${it.e} ${G} veut ${it.n}. Ça coûte ${money(price)}. ${M} a-t-elle assez d'argent?`),
    say: L(`${G} wants ${it.n}. It costs ${sayMoney(price)}. Does ${M} have enough?`, `${G} veut ${it.n}. Ça coûte ${sayMoney(price)}. ${M} a-t-elle assez d'argent?`),
    visual: coinRow(coins),
    options: [{ value: 'yes', label: L('Yes!', 'Oui!') }, { value: 'no', label: L('No, not enough', 'Non, pas assez') }],
    answer: have >= price ? 'yes' : 'no',
    hint: { text: L(`Count the coins first. ${M} has ${money(have)}.`, `Compte d'abord les pièces. ${M} a ${money(have)}.`) },
  });
}

function mostValue() {
  const set = shuffle([5, 10, 25, 100, 200]).slice(0, 3);
  const best = Math.max(...set);
  return visualQ({
    key: `most-${set.join('-')}`, badge: '🪙',
    text: L('Which coin is worth the MOST?', 'Quelle pièce vaut le PLUS?'),
    options: set.map((v) => ({ value: v, html: `<div class="coins small">${coin(v)}</div>` })),
    answer: best,
    hint: { text: L('Big coins are not always worth more! A dime is smaller than a nickel but worth more.', 'Les grosses pièces ne valent pas toujours plus! La pièce de 10 ¢ est plus petite que celle de 5 ¢, mais elle vaut plus.') },
  });
}

export default {
  id: 'money2',
  emoji: '🫧',
  theme: 'slime',
  color: '#8e44ad',
  get title() { return L(`${M}'s Slime Shop`, `La boutique de slime de ${M}`); },
  get skill() { return L('Money', 'L’argent'); },
  get blurb() { return L('Buy slime, glitter and play dough with Canadian coins!', 'Achète du slime, des paillettes et de la pâte à modeler!'); },
  get intro() {
    return L(`${M} opened a slime shop! Customers pay with nickels, dimes, quarters, loonies and toonies. Count the money!`,
      `${M} a ouvert une boutique de slime! Les clients paient avec des pièces canadiennes. Compte l'argent!`);
  },
  get levels() {
    return {
      mild: { kid: L('Know your coins', 'Connais tes pièces'), parent: 'Naming Canadian coins and their values; counting groups of nickels or dimes.' },
      medium: { kid: L('Count mixed coins', 'Compte des pièces mélangées'), parent: 'Counting mixed nickels, dimes and quarters up to 100¢; which coin is worth more.' },
      spicy: { kid: L('Make exact amounts', 'Fais le montant exact'), parent: 'Choosing coins that make an amount; is there enough money; counting up to $2.' },
    };
  },
  get praise() { return L(['Squishy good! 🫧', 'Ka-ching! 🪙', 'Slime-tastic! 🟣'], ['Super gluant! 🫧', 'Ka-tching! 🪙', 'Slime-tastique! 🟣']); },
  get doneTitles() { return L(['Shop closed! 🫧', 'Slime boss! 🪙'], ['La boutique est fermée! 🫧', 'Patronne du slime! 🪙']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([nameCoin, nameCoin, countSame])();
    if (level === 'medium') return pick([() => countMixed(100), () => countMixed(100), mostValue, countSame])();
    return pick([whichSet, whichSet, enough, () => countMixed(200)])();
  },
};
