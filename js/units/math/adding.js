// ADDING — Mia's Ice Cream Shop 🍦
import { rand, pick, shuffle, QBOX } from '../../util.js';
import { emojiAdd, baseTenPair, tenFrame } from '../../visuals.js';
import { numberQ, sayEq } from '../common.js';
import { FAMILY } from '../../config.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;

const ITEMS = [
  { e: '🍦', one: 'ice cream cone', many: 'ice cream cones' },
  { e: '🍨', one: 'sundae', many: 'sundaes' },
  { e: '🍫', one: 'chocolate', many: 'chocolates' },
  { e: '🧁', one: 'cupcake', many: 'cupcakes' },
  { e: '🍓', one: 'strawberry', many: 'strawberries' },
  { e: '🍪', one: 'cookie', many: 'cookies' },
  { e: '🍩', one: 'donut', many: 'donuts' },
];
const n = (k, it) => `${k} ${k === 1 ? it.one : it.many}`;

const STORIES = [
  (a, b, it) => `${M} makes ${n(a, it)}. Then she makes ${b} more.`,
  (a, b, it) => `${F} sells ${n(a, it)}. ${M} sells ${b}.`,
  (a, b, it) => `There are ${n(a, it)} on the counter. ${G} finds ${b} more!`,
  (a, b, it) => `The shop has ${n(a, it)}. The truck brings ${b} more.`,
  (a, b, it) => `${M} puts out ${n(a, it)}. ${F} adds ${b} more.`,
];
const BADGES = ['Scoop time!', 'Sweet treats!', 'Shop time!', 'Treat rush!'];

const eqBig = (a, b) => `${a} + ${b} = ${QBOX}`;

function story(a, b, { mode, visual, hint, max = 200 }) {
  const it = pick(ITEMS);
  const text = `${pick(STORIES)(a, b, it)} How many in all?`;
  return numberQ({
    key: `add-${a}-${b}`,
    badge: `${it.e} ${pick(BADGES)}`,
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
      text: `Add the ones first: ${oa} + ${ob} = ${oa + ob}. That makes a new ten! Then add the tens: ${ta} + ${tb} + 1.`,
      visual: baseTenPair(a, b),
    };
  }
  return {
    text: `Add the tens: ${ta} + ${tb} = ${ta + tb} tens. Add the ones: ${oa} + ${ob} = ${oa + ob}.`,
    visual: baseTenPair(a, b),
  };
}

// ---------- 🌶️ Mild: sums to 20 ----------
function mild(i) {
  const kind = pick(['story', 'story', 'story', 'doubles', 'make10']);
  if (kind === 'doubles') {
    const a = rand(2, 10);
    const it = pick(ITEMS);
    const text = `Double scoop! ${a} ${it.many} and ${a} more ${it.many}. How many?`;
    return numberQ({
      key: `add-${a}-${a}`, badge: '🍦🍦 Doubles!', text, big: eqBig(a, a),
      say: `${text} ${sayEq(eqBig(a, a))}`,
      visual: emojiAdd(it.e, a, a), answer: a * 2, max: 20,
      hint: { text: `Doubles! Count them all, or think: ${a} + ${a}.` },
    });
  }
  if (kind === 'make10') {
    const a = rand(1, 9);
    const it = pick(ITEMS);
    const text = `The box holds 10 ${it.many}. It has ${a}. How many more to make 10?`;
    const big = `${a} + ${QBOX} = 10`;
    return numberQ({
      key: `make10-${a}`, badge: '📦 Fill the box!', text, big,
      say: `${text} ${a} plus what equals 10?`,
      visual: tenFrame(a, it.e), answer: 10 - a, max: 10,
      hint: { text: 'Count the empty spots in the box!' },
    });
  }
  let a = rand(2, 10), b = rand(1, 10);
  while (a + b > 20) b = rand(1, 10);
  return story(a, b, {
    max: 20,
    visual: (it) => emojiAdd(it.e, a, b),
    hint: { text: `Start at ${Math.max(a, b)} and count on ${Math.min(a, b)} more.`, say: `Start at ${Math.max(a, b)}, and count on ${Math.min(a, b)} more.` },
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
    const text = `The shop needs ${c} ${it.many}. It has ${a}. How many more does it need?`;
    const big = `${a} + ${QBOX} = ${c}`;
    return numberQ({
      key: `miss-${a}-${c}`, badge: '🚚 Big order!', text, big, mode,
      say: `${text} ${a} plus what equals ${c}?`,
      answer: c - a, max: 100,
      hint: { text: `Count up from ${a} to ${c}. Jump by tens first, then ones!` },
    });
  }
  if (kind === 'three') {
    const x = rand(1, 9), y = 10 - x, z = rand(2, 9);
    const [a, b, c] = shuffle([x, y, z]);
    const big = `${a} + ${b} + ${c} = ${QBOX}`;
    const text = `${M}, ${F}, and ${G} each pick some sprinkles: ${a}, ${b}, and ${c}. How many sprinkles?`;
    return numberQ({
      key: `three-${a}-${b}-${c}`, badge: '✨ Sprinkle party!', text, big, mode,
      say: `${text} ${sayEq(big)}`, answer: a + b + c, max: 30,
      hint: { text: `Look for two numbers that make 10! ${x} + ${y} = 10.` },
    });
  }
  const oa = rand(1, 9), ob = rand(10 - oa, 9);
  const ta = rand(1, 7), tb = rand(1, 8 - ta);
  const a = 10 * ta + oa, b = 10 * tb + ob;
  return story(a, b, { mode, hint: placeValueHint(a, b), max: 100 });
}

export default {
  id: 'adding',
  title: 'Ice Cream Shop',
  skill: 'Adding',
  emoji: '🍦',
  theme: 'icecream',
  color: '#f0609e',
  blurb: 'Add up scoops, chocolates and treats!',
  intro: `Welcome to ${M}'s Ice Cream Shop! Help add up all the sweet treats.`,
  levels: {
    mild: { kid: 'Add up to 20, with pictures', parent: 'Sums to 20; doubles; making 10 (ten-frame).' },
    medium: { kid: 'Add big numbers, no trading', parent: '2-digit + 1-digit, + tens, 2-digit + 2-digit without regrouping (sums ≤ 99). Half typed on keypad.' },
    spicy: { kid: 'Add with trading, find missing numbers', parent: '2-digit addition with regrouping (sums ≤ 100), missing addends, three addends using make-10.' },
  },
  praise: ['Sweet! 🍦', 'Delicious! 🍫', 'Yum, you got it! 😋'],
  doneTitles: ['The shop is closed! 🍦', 'Treats all counted! 🍫', 'Sweet work! 🧁'],
  makeQuestion(level, i) {
    return level === 'spicy' ? spicy(i) : level === 'medium' ? medium(i) : mild(i);
  },
};

