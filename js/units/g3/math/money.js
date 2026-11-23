// GRADE 3 — MONEY: Amusement Park Day 🎢 / Une journée au parc d'attractions
import { rand, pick, shuffle } from '../../../util.js';
import { wordQ } from '../../common.js';
import { coinRow, coin, money, sayMoney } from '../../../visuals3.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M } = FAMILY3;
const BADGES = () => L(['🎢 Coaster time!', '🎡 Ferris wheel!', '🍕 Pizza arcade!', '🎟️ Ticket booth!'], ['🎢 Montagnes russes!', '🎡 Grande roue!', '🍕 Pizza et jeux!', '🎟️ Billetterie!']);
const ITEMS = () => [
  { e: '🍦', n: L('an ice cream', 'une crème glacée') }, { e: '🍿', n: L('popcorn', 'du maïs soufflé') },
  { e: '🧃', n: L('a juice', 'un jus') }, { e: '🎈', n: L('a balloon', 'un ballon') },
  { e: '🍕', n: L('a slice of pizza', 'une pointe de pizza') }, { e: '🎟️', n: L('a game ticket', 'un billet de jeu') },
  { e: '🧸', n: L('a small prize', 'un petit prix') }, { e: '🌭', n: L('a hot dog', 'un hot-dog') },
];

/** Money answer buttons with near-miss wrong answers. */
function moneyOptions(ans, step) {
  const set = new Set([ans]);
  for (const d of shuffle([step, -step, 5, -5, 10, -10, 25, -25, 100, -100])) {
    if (set.size >= 4) break;
    if (ans + d > 0) set.add(ans + d);
  }
  return shuffle([...set]).map((v) => ({ value: v, label: money(v), say: sayMoney(v) }));
}

function randomCoins(maxTotal, kinds) {
  const coins = [];
  let total = 0;
  const count = rand(3, 7);
  for (let i = 0; i < count; i++) {
    const c = pick(kinds);
    if (total + c > maxTotal) continue;
    coins.push(c); total += c;
  }
  if (!coins.length) { coins.push(kinds[0]); total = kinds[0]; }
  return { coins: coins.sort((a, b) => b - a), total };
}

function countQ(maxTotal, kinds) {
  const { coins, total } = randomCoins(maxTotal, kinds);
  return {
    ...wordQ({
      key: `cnt-${coins.join('-')}`, badge: pick(BADGES()),
      text: L(`${F} empties her pocket at the park. How much money does she have?`, `${F} vide sa poche au parc. Combien d'argent a-t-elle?`),
      visual: coinRow(coins),
      options: moneyOptions(total, 5),
      answer: total,
      hint: {
        text: L('Start with the biggest coins, then count on: toonie $2, loonie $1, quarter 25¢, dime 10¢, nickel 5¢.',
          'Commence par les plus grosses pièces, puis compte : 2 $, 1 $, 25 ¢, 10 ¢, 5 ¢.'),
      },
    }),
    choiceStyle: 'word',
  };
}

function changeQ(level) {
  const it = pick(ITEMS());
  let price, paid;
  if (level === 'medium') { price = rand(1, 4) * 25; paid = 100; } else {
    paid = pick([500, 1000]);
    price = Math.random() < 0.5 ? rand(1, paid / 100 - 1) * 100 : rand(4, (paid / 25) - 2) * 25;
  }
  const change = paid - price;
  return wordQ({
    key: `chg-${price}-${paid}`, badge: pick(BADGES()),
    text: L(`${it.e} ${M} buys ${it.n} for ${money(price)}. She pays with ${money(paid, { forceDollars: true })}. How much change does she get?`,
      `${it.e} ${M} achète ${it.n} pour ${money(price)}. Elle paie avec ${money(paid, { forceDollars: true })}. Combien de monnaie reçoit-elle?`),
    say: L(`${M} buys ${it.n} for ${sayMoney(price)}. She pays with ${sayMoney(paid)}. How much change does she get?`,
      `${M} achète ${it.n} pour ${sayMoney(price)}. Elle paie avec ${sayMoney(paid)}. Combien de monnaie reçoit-elle?`),
    visual: `<div class="coins">${coin(paid)}</div>`,
    options: moneyOptions(change, 25),
    answer: change,
    hint: { text: L(`Count up from ${money(price)} to ${money(paid, { forceDollars: true })}.`, `Compte de ${money(price)} jusqu'à ${money(paid, { forceDollars: true })}.`) },
  });
}

function enoughQ() {
  const it = pick(ITEMS());
  const { coins, total } = randomCoins(500, [200, 100, 25, 10]);
  const price = Math.max(25, total + pick([-75, -25, 25, 50, 100]));
  return wordQ({
    key: `enough-${coins.join('-')}-${price}`, badge: '🤔',
    text: L(`${it.e} ${it.n.charAt(0).toUpperCase() + it.n.slice(1)} costs ${money(price)}. Does ${F} have enough money?`,
      `${it.e} ${it.n.charAt(0).toUpperCase() + it.n.slice(1)} coûte ${money(price)}. ${F} a-t-elle assez d'argent?`),
    say: L(`${it.n} costs ${sayMoney(price)}. Does ${F} have enough money?`, `${it.n} coûte ${sayMoney(price)}. ${F} a-t-elle assez d'argent?`),
    visual: coinRow(coins),
    options: [{ value: 'yes', label: L('Yes, enough!', 'Oui, assez!') }, { value: 'no', label: L('No, not enough', 'Non, pas assez') }],
    answer: total >= price ? 'yes' : 'no',
    hint: { text: L(`Count her money first. She has ${money(total)}.`, `Compte d'abord son argent. Elle a ${money(total)}.`) },
  });
}

function coinNameQ() {
  const v = pick([5, 10, 25, 100, 200]);
  const names = { 5: [L('nickel', '5 cents'), 'nickel'], 10: [L('dime', '10 cents'), 'dime'], 25: [L('quarter', '25 cents'), 'quarter'], 100: [L('loonie', 'huard'), 'loonie'], 200: [L('toonie', '2 dollars'), 'toonie'] };
  const opts = shuffle([5, 10, 25, 100, 200]).filter((x) => x !== v).slice(0, 2).concat(v);
  return wordQ({
    key: `coin-${v}`, badge: '🪙',
    text: L('What is this coin worth?', 'Combien vaut cette pièce?'),
    visual: `<div class="coins big">${coin(v)}</div>`,
    options: shuffle(opts).map((x) => ({ value: x, label: `${money(x)} (${names[x][0]})`, say: sayMoney(x) })),
    answer: v,
    hint: { text: L('Nickel 5¢, dime 10¢, quarter 25¢, loonie $1, toonie $2.', '5 ¢, 10 ¢, 25 ¢, le huard vaut 1 $, et la pièce de 2 $.') },
  });
}

export default {
  id: 'money',
  emoji: '🎢',
  theme: 'park',
  color: '#00a3c4',
  get title() { return L('Amusement Park Day', 'Journée au parc d’attractions'); },
  get skill() { return L('Money', 'L’argent'); },
  get blurb() { return L('Coins, toonies and change at the amusement park!', 'Pièces, huards et monnaie au parc d’attractions!'); },
  get intro() {
    return L(`${F} and ${M} are spending the day at the amusement park! Count coins and figure out change.`,
      `${F} et ${M} passent la journée au parc d'attractions! Compte les pièces et calcule la monnaie.`);
  },
  get levels() {
    return {
      mild: { kid: L('Coins up to $1', 'Les pièces jusqu’à 1 $'), parent: 'Naming Canadian coins; counting nickels, dimes and quarters up to $1.' },
      medium: { kid: L('Loonies, toonies and change from $1', 'Huards, 2 $ et monnaie sur 1 $'), parent: 'Counting mixed coins up to $5; making change from $1.' },
      spicy: { kid: L('Change from $5 and $10', 'Monnaie sur 5 $ et 10 $'), parent: 'Making change from $5/$10 bills; deciding if there is enough money; counting up to $10.' },
    };
  },
  get praise() { return L(['Ka-ching! 🪙', 'Ride time! 🎢', 'Money smart! 💰'], ['Ka-tching! 🪙', 'En voiture! 🎢', 'Super avec l’argent! 💰']); },
  get doneTitles() { return L(['Best park day ever! 🎢', 'Money master! 💰'], ['Meilleure journée au parc! 🎢', 'Championne de l’argent! 💰']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([coinNameQ, () => countQ(100, [25, 10, 5]), () => countQ(100, [25, 10, 5])])();
    if (level === 'medium') return pick([() => countQ(500, [200, 100, 25, 10, 5]), () => changeQ('medium'), () => countQ(500, [200, 100, 25])])();
    return pick([() => changeQ('spicy'), () => changeQ('spicy'), enoughQ, () => countQ(1000, [200, 100, 25, 10])])();
  },
};
