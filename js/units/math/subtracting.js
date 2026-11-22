// SUBTRACTING — Babysitting Gemma 👶
import { rand, pick, QBOX } from '../../util.js';
import { emojiGroup, baseTen, card } from '../../visuals.js';
import { numberQ, sayEq } from '../common.js';
import { FAMILY } from '../../config.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;

const STORIES = [
  { e: '🫐', s: (a, b) => `${F} gives ${G} ${a} blueberries. ${G} eats ${b}.`, q: 'How many are left?' },
  { e: '🧱', s: (a, b) => `${M} builds a tower of ${a} blocks. ${G} knocks down ${b}!`, q: 'How many are still standing?' },
  { e: '🫧', s: (a, b) => `${F} blows ${a} bubbles. ${G} pops ${b}.`, q: 'How many bubbles are left?' },
  { e: '🧸', s: (a, b) => `There are ${a} toys on the floor. ${M} puts ${b} away.`, q: 'How many are still on the floor?' },
  { e: '🍓', s: (a, b) => `${M} has ${a} strawberries. She shares ${b} with ${G}.`, q: 'How many does she have now?' },
  { e: '🍪', s: (a, b) => `${F} bakes ${a} cookies. The family eats ${b}.`, q: 'How many are left?' },
  { e: '🧦', s: (a, b) => `${G} has ${a} socks in the laundry basket. She pulls out ${b}!`, q: 'How many are still in the basket?' },
];
const BADGES = ['👶 Babysitting time!', '🍼 Snack time!', '🧸 Playtime!', '🛁 Bath time!'];

const eqBig = (a, b) => `${a} − ${b} = ${QBOX}`;

function story(a, b, { mode, visual, hint, max = 100 }) {
  const st = pick(STORIES);
  const text = `${st.s(a, b)} ${st.q}`;
  return numberQ({
    key: `sub-${a}-${b}`,
    badge: pick(BADGES),
    text,
    big: eqBig(a, b),
    say: `${text} ${sayEq(eqBig(a, b))}`,
    visual: typeof visual === 'function' ? visual(st) : visual,
    answer: a - b,
    hint: typeof hint === 'function' ? hint(st) : hint,
    mode, max,
  });
}

function placeValueHint(a, b) {
  const [ta, oa] = [Math.floor(a / 10), a % 10];
  const [tb, ob] = [Math.floor(b / 10), b % 10];
  if (ob > oa) {
    return {
      text: `You can't take ${ob} ones from ${oa} ones. Trade 1 ten for 10 ones! Now you have ${oa + 10} ones. ${oa + 10} − ${ob} = ${oa + 10 - ob}.`,
      say: `You can't take ${ob} ones from ${oa} ones. Trade 1 ten for 10 ones! Now you have ${oa + 10} ones. ${oa + 10} minus ${ob} is ${oa + 10 - ob}.`,
      visual: card(baseTen(a)),
    };
  }
  return {
    text: `Take away the tens: ${ta} − ${tb} = ${ta - tb} tens. Take away the ones: ${oa} − ${ob} = ${oa - ob}.`,
    say: `Take away the tens: ${ta} minus ${tb} is ${ta - tb} tens. Take away the ones: ${oa} minus ${ob} is ${oa - ob}.`,
    visual: card(baseTen(a)),
  };
}

// ---------- 🌶️ Mild: within 20 ----------
function mild() {
  const a = rand(5, 20);
  const b = rand(1, Math.min(10, a - 1));
  return story(a, b, {
    max: 20,
    visual: (st) => emojiGroup(st.e, a),
    hint: (st) => ({
      text: `Cross out ${b}. Count the ones that are left!`,
      visual: emojiGroup(st.e, a, { crossed: b }),
    }),
  });
}

// ---------- 🌶️🌶️ Medium: 2-digit, no regrouping ----------
function medium(i) {
  const mode = i % 2 ? 'number' : 'choice';
  const kind = pick(['minus1', 'minusTens', 'minus2', 'minus2']);
  let a, b;
  if (kind === 'minus1') {
    a = rand(21, 99);
    if (a % 10 === 0) a += rand(1, 9);
    b = rand(1, a % 10);
  } else if (kind === 'minusTens') {
    a = rand(25, 99);
    b = 10 * rand(1, Math.floor(a / 10) - 1);
  } else {
    const ta = rand(3, 9), tb = rand(1, ta - 1);
    const oa = rand(1, 9), ob = rand(0, oa);
    a = 10 * ta + oa; b = 10 * tb + ob;
  }
  return story(a, b, { mode, hint: placeValueHint(a, b), max: 99 });
}

// ---------- 🌶️🌶️🌶️ Spicy: regrouping, missing number, compare ----------
function spicy(i) {
  const mode = i % 3 === 0 ? 'choice' : 'number';
  const kind = pick(['regroup', 'regroup', 'compare', 'missing']);
  if (kind === 'compare') {
    const big = rand(35, 95);
    const small = rand(12, big - 6);
    const text = `${M} has ${big} stickers. ${F} has ${small} stickers. How many more does ${M} have?`;
    const eq = `${big} − ${small} = ${QBOX}`;
    return numberQ({
      key: `cmp-${big}-${small}`, badge: '⭐ Sticker count!', text, big: eq, mode,
      say: `${text} ${sayEq(eq)}`, answer: big - small, max: 100,
      hint: { text: `Count up from ${small} to ${big}. Or take away: ${big} − ${small}.`, say: `Count up from ${small} to ${big}. Or take away: ${big} minus ${small}.` },
    });
  }
  if (kind === 'missing') {
    const a = rand(40, 99);
    const ans = rand(11, a - 15);
    const c = a - ans;
    const text = `${G} had ${a} Cheerios. Now there are ${c}. How many did she eat?`;
    const eq = `${a} − ${QBOX} = ${c}`;
    return numberQ({
      key: `smiss-${a}-${c}`, badge: '🥣 Snack mystery!', text, big: eq, mode,
      say: `${text} ${a} minus what equals ${c}?`, answer: ans, max: 100,
      hint: { text: `Count up from ${c} to ${a}. How big was the jump?` },
    });
  }
  const ta = rand(3, 9), tb = rand(1, ta - 1);
  const oa = rand(0, 8), ob = rand(oa + 1, 9);
  const a = 10 * ta + oa, b = 10 * tb + ob;
  return story(a, b, { mode, hint: placeValueHint(a, b), max: 100 });
}

export default {
  id: 'subtracting',
  title: 'Babysitting Gemma',
  skill: 'Subtracting',
  emoji: '👶',
  theme: 'gemma',
  color: '#2bb5a0',
  blurb: `Help ${M} and ${F} watch baby ${G}!`,
  intro: `${M} and ${F} are babysitting ${G}! ${G} eats snacks and knocks things over. Figure out how many are left.`,
  levels: {
    mild: { kid: 'Take away within 20, with pictures', parent: 'Subtraction within 20 with pictures; hint crosses items out.' },
    medium: { kid: 'Take away big numbers, no trading', parent: '2-digit − 1-digit, − tens, 2-digit − 2-digit without regrouping. Half typed on keypad.' },
    spicy: { kid: 'Take away with trading, compare, mystery numbers', parent: '2-digit subtraction with regrouping, "how many more" comparisons, missing subtrahend.' },
  },
  praise: [`${G} is so proud! 👶`, 'Great babysitting! 🍼', 'Goo goo, gaga — that means YES! 👶'],
  doneTitles: [`${G} is napping! 😴`, 'Babysitting done! 🍼', 'Super sitters! 🧸'],
  makeQuestion(level, i) {
    return level === 'spicy' ? spicy(i) : level === 'medium' ? medium(i) : mild(i);
  },
};
