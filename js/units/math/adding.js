// ADDING — Mia's Ice Cream Shop 🍦 / Le bar laitier de Mia
import { rand, pick, shuffle, QBOX } from '../../util.js';
import { emojiAdd, baseTenPair, tenFrame } from '../../visuals.js';
import { numberQ, sayEq } from '../common.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;

const ITEMS = [
  { e: '🍦', one: 'ice cream cone', many: 'ice cream cones', frOne: 'cornet', frMany: 'cornets' },
  { e: '🍨', one: 'sundae', many: 'sundaes', frOne: 'coupe glacée', frMany: 'coupes glacées' },
  { e: '🍫', one: 'chocolate', many: 'chocolates', frOne: 'chocolat', frMany: 'chocolats' },
  { e: '🧁', one: 'cupcake', many: 'cupcakes', frOne: 'petit gâteau', frMany: 'petits gâteaux' },
  { e: '🍓', one: 'strawberry', many: 'strawberries', frOne: 'fraise', frMany: 'fraises' },
  { e: '🍪', one: 'cookie', many: 'cookies', frOne: 'biscuit', frMany: 'biscuits' },
  { e: '🍩', one: 'donut', many: 'donuts', frOne: 'beigne', frMany: 'beignes' },
];
const many = (it) => L(it.many, it.frMany);
const n = (k, it) => `${k} ${k === 1 ? L(it.one, it.frOne) : many(it)}`;

// "en" stories avoid French gender agreement for the second number.
const STORIES = [
  (a, b, it) => L(`${M} makes ${n(a, it)}. Then she makes ${b} more.`, `${M} fait ${n(a, it)}. Puis elle en fait ${b} de plus.`),
  (a, b, it) => L(`${F} sells ${n(a, it)}. ${M} sells ${b}.`, `${F} vend ${n(a, it)}. ${M} en vend ${b}.`),
  (a, b, it) => L(`There are ${n(a, it)} on the counter. ${G} finds ${b} more!`, `Il y a ${n(a, it)} sur le comptoir. ${G} en trouve ${b} de plus!`),
  (a, b, it) => L(`The shop has ${n(a, it)}. The truck brings ${b} more.`, `Le bar laitier a ${n(a, it)}. Le camion en apporte ${b} de plus.`),
  (a, b, it) => L(`${M} puts out ${n(a, it)}. ${F} adds ${b} more.`, `${M} sort ${n(a, it)}. ${F} en ajoute ${b}.`),
];
const BADGES = () => L(['Scoop time!', 'Sweet treats!', 'Shop time!', 'Treat rush!'], ['Miam miam!', 'Petites gâteries!', 'Au bar laitier!', 'Quelle douceur!']);
const HOW_MANY = () => L('How many in all?', 'Combien en tout?');

const eqBig = (a, b) => `${a} + ${b} = ${QBOX}`;

function story(a, b, { mode, visual, hint, max = 200 }) {
  const it = pick(ITEMS);
  const text = `${pick(STORIES)(a, b, it)} ${HOW_MANY()}`;
  return numberQ({
    key: `add-${a}-${b}`,
    badge: `${it.e} ${pick(BADGES())}`,
    text,
    big: eqBig(a, b),
    say: `${text} ${sayEq(eqBig(a, b))}`,
    visual: typeof visual === 'function' ? visual(it) : visual,
    answer: a + b,
    hint: typeof hint === 'function' ? hint(it) : hint,
    mode, max,
  });
}

function placeValueHint(a, b) {
  const [ta, oa] = [Math.floor(a / 10), a % 10];
  const [tb, ob] = [Math.floor(b / 10), b % 10];
  if (oa + ob >= 10) {
    return {
      text: L(
        `Add the ones first: ${oa} + ${ob} = ${oa + ob}. That makes a new ten! Then add the tens: ${ta} + ${tb} + 1.`,
        `Additionne d'abord les unités : ${oa} + ${ob} = ${oa + ob}. Ça fait une nouvelle dizaine! Puis additionne les dizaines : ${ta} + ${tb} + 1.`,
      ),
      visual: baseTenPair(a, b),
    };
  }
  return {
    text: L(
      `Add the tens: ${ta} + ${tb} = ${ta + tb} tens. Add the ones: ${oa} + ${ob} = ${oa + ob}.`,
      `Additionne les dizaines : ${ta} + ${tb} = ${ta + tb} dizaines. Additionne les unités : ${oa} + ${ob} = ${oa + ob}.`,
    ),
    visual: baseTenPair(a, b),
  };
}

// ---------- 🌶️ Mild: sums to 20 ----------
function mild() {
  const kind = pick(['story', 'story', 'story', 'doubles', 'make10']);
  if (kind === 'doubles') {
    const a = rand(2, 10);
    const it = pick(ITEMS);
    const text = L(
      `Double scoop! ${a} ${it.many} and ${a} more ${it.many}. How many?`,
      `Double portion! ${a} ${it.frMany} et encore ${a} ${it.frMany}. Combien en tout?`,
    );
    return numberQ({
      key: `add-${a}-${a}`, badge: L('🍦🍦 Doubles!', '🍦🍦 Les doubles!'), text, big: eqBig(a, a),
      say: `${text} ${sayEq(eqBig(a, a))}`,
      visual: emojiAdd(it.e, a, a), answer: a * 2, max: 20,
      hint: { text: L(`Doubles! Count them all, or think: ${a} + ${a}.`, `Un double! Compte-les tous, ou pense : ${a} + ${a}.`) },
    });
  }
  if (kind === 'make10') {
    const a = rand(1, 9);
    const it = pick(ITEMS);
    const text = L(
      `The box holds 10 ${it.many}. It has ${a}. How many more to make 10?`,
      `La boîte peut contenir 10 ${it.frMany}. Il y en a ${a}. Combien en manque-t-il pour faire 10?`,
    );
    const big = `${a} + ${QBOX} = 10`;
    return numberQ({
      key: `make10-${a}`, badge: L('📦 Fill the box!', '📦 Remplis la boîte!'), text, big,
      say: `${text} ${a} ${L('plus what equals 10?', 'plus combien égale 10?')}`,
      visual: tenFrame(a, it.e), answer: 10 - a, max: 10,
      hint: { text: L('Count the empty spots in the box!', 'Compte les cases vides dans la boîte!') },
    });
  }
  let a = rand(2, 10), b = rand(1, 10);
  while (a + b > 20) b = rand(1, 10);
  const [hi, lo] = [Math.max(a, b), Math.min(a, b)];
  return story(a, b, {
    max: 20,
    visual: (it) => emojiAdd(it.e, a, b),
    hint: {
      text: L(`Start at ${hi} and count on ${lo} more.`, `Commence à ${hi} et compte encore ${lo}.`),
      say: L(`Start at ${hi}, and count on ${lo} more.`, `Commence à ${hi}, et compte encore ${lo}.`),
    },
  });
}

// ---------- 🌶️🌶️ Medium: 2-digit, no regrouping ----------
function medium(i) {
  const mode = i % 2 ? 'number' : 'choice';
  const kind = pick(['plus1', 'plusTens', 'plus2', 'plus2']);
  let a, b;
  if (kind === 'plus1') {
    a = rand(11, 89);
    if (a % 10 > 8) a -= 1;
    b = rand(1, 9 - (a % 10));
  } else if (kind === 'plusTens') {
    a = rand(11, 79);
    b = 10 * rand(1, Math.floor((99 - a) / 10));
  } else {
    const ta = rand(1, 7), tb = rand(1, 8 - ta);
    const oa = rand(0, 8), ob = rand(0, 9 - oa);
    a = 10 * ta + oa; b = 10 * tb + ob;
  }
  return story(a, b, { mode, hint: placeValueHint(a, b), max: 99 });
}

// ---------- 🌶️🌶️🌶️ Spicy: regrouping, missing numbers, three addends ----------
function spicy(i) {
  const mode = i % 3 === 0 ? 'choice' : 'number';
  const kind = pick(['regroup', 'regroup', 'missing', 'three']);
  if (kind === 'missing') {
    const c = rand(4, 10) * 10 - pick([0, 0, rand(1, 9)]);
    const a = rand(10, c - 6);
    const it = pick(ITEMS);
    const text = L(
      `The shop needs ${c} ${it.many}. It has ${a}. How many more does it need?`,
      `Le bar laitier a besoin de ${c} ${it.frMany}. Il en a ${a}. Combien lui en manque-t-il?`,
    );
    const big = `${a} + ${QBOX} = ${c}`;
    return numberQ({
      key: `miss-${a}-${c}`, badge: L('🚚 Big order!', '🚚 Grosse commande!'), text, big, mode,
      say: `${text} ${a} ${L('plus what equals', 'plus combien égale')} ${c}?`,
      answer: c - a, max: 100,
      hint: { text: L(`Count up from ${a} to ${c}. Jump by tens first, then ones!`, `Compte de ${a} jusqu'à ${c}. Fais des bonds de 10 d'abord, puis de 1!`) },
    });
  }
  if (kind === 'three') {
    const x = rand(1, 9), y = 10 - x, z = rand(2, 9);
    const [a, b, c] = shuffle([x, y, z]);
    const big = `${a} + ${b} + ${c} = ${QBOX}`;
    const text = L(
      `${M}, ${F}, and ${G} each pick some sprinkles: ${a}, ${b}, and ${c}. How many sprinkles?`,
      `${M}, ${F} et ${G} prennent des bonbons : ${a}, ${b} et ${c}. Combien de bonbons en tout?`,
    );
    return numberQ({
      key: `three-${a}-${b}-${c}`, badge: L('✨ Sprinkle party!', '✨ Fête des bonbons!'), text, big, mode,
      say: `${text} ${sayEq(big)}`, answer: a + b + c, max: 30,
      hint: { text: L(`Look for two numbers that make 10! ${x} + ${y} = 10.`, `Cherche deux nombres qui font 10! ${x} + ${y} = 10.`) },
    });
  }
  const oa = rand(1, 9), ob = rand(10 - oa, 9);
  const ta = rand(1, 7), tb = rand(1, 8 - ta);
  const a = 10 * ta + oa, b = 10 * tb + ob;
  return story(a, b, { mode, hint: placeValueHint(a, b), max: 100 });
}

export default {
  id: 'adding',
  emoji: '🍦',
  theme: 'icecream',
  color: '#f0609e',
  get title() { return L('Ice Cream Shop', 'Le bar laitier'); },
  get skill() { return L('Adding', "L'addition"); },
  get blurb() { return L('Add up scoops, chocolates and treats!', 'Additionne les cornets, les chocolats et les gâteries!'); },
  get intro() {
    return L(`Welcome to ${M}'s Ice Cream Shop! Help add up all the sweet treats.`,
      `Bienvenue au bar laitier de ${M}! Aide-la à additionner toutes les gâteries.`);
  },
  get levels() {
    return {
      mild: { kid: L('Add up to 20, with pictures', "Additionne jusqu'à 20, avec des images"), parent: 'Sums to 20; doubles; making 10 (ten-frame).' },
      medium: { kid: L('Add big numbers, no trading', 'Additionne de grands nombres, sans échange'), parent: '2-digit + 1-digit, + tens, 2-digit + 2-digit without regrouping (sums ≤ 99). Half typed on keypad.' },
      spicy: { kid: L('Add with trading, find missing numbers', 'Additionne avec échange, trouve les nombres manquants'), parent: '2-digit addition with regrouping (sums ≤ 100), missing addends, three addends using make-10.' },
    };
  },
  get praise() { return L(['Sweet! 🍦', 'Delicious! 🍫', 'Yum, you got it! 😋'], ['Délicieux! 🍦', 'Miam! 🍫', 'Trop bon! 😋']); },
  get doneTitles() { return L(['The shop is closed! 🍦', 'Treats all counted! 🍫', 'Sweet work! 🧁'], ['Le bar laitier est fermé! 🍦', 'Toutes les gâteries sont comptées! 🍫', 'Beau travail! 🧁']); },
  makeQuestion(level, i) {
    return level === 'spicy' ? spicy(i) : level === 'medium' ? medium(i) : mild(i);
  },
};
