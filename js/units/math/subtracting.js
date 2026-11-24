// SUBTRACTING — Babysitting Gemma 👶 / On garde Gemma
import { rand, pick, QBOX } from '../../util.js';
import { emojiGroup, baseTen, card } from '../../visuals.js';
import { numberQ, sayEq } from '../common.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;

const STORIES = [
  {
    e: '🫐',
    s: (a, b) => L(`${F} gives ${G} ${a} blueberries. ${G} eats ${b}.`, `${F} donne ${a} bleuets à ${G}. ${G} en mange ${b}.`),
    q: () => L('How many are left?', 'Combien en reste-t-il?'),
  },
  {
    e: '🧱',
    s: (a, b) => L(`${M} builds a tower of ${a} blocks. ${G} knocks down ${b}!`, `${M} construit une tour de ${a} blocs. ${G} en fait tomber ${b}!`),
    q: () => L('How many are still standing?', 'Combien de blocs restent debout?'),
  },
  {
    e: '🫧',
    s: (a, b) => L(`${F} blows ${a} bubbles. ${G} pops ${b}.`, `${F} fait ${a} bulles. ${G} en éclate ${b}.`),
    q: () => L('How many bubbles are left?', 'Combien de bulles reste-t-il?'),
  },
  {
    e: '🧸',
    s: (a, b) => L(`There are ${a} toys on the floor. ${M} puts ${b} away.`, `Il y a ${a} jouets par terre. ${M} en range ${b}.`),
    q: () => L('How many are still on the floor?', 'Combien de jouets reste-t-il par terre?'),
  },
  {
    e: '🍓',
    s: (a, b) => L(`${M} has ${a} strawberries. She shares ${b} with ${G}.`, `${M} a ${a} fraises. Elle en partage ${b} avec ${G}.`),
    q: () => L('How many does she have now?', 'Combien lui en reste-t-il?'),
  },
  {
    e: '🍪',
    s: (a, b) => L(`${F} bakes ${a} cookies. The family eats ${b}.`, `${F} fait cuire ${a} biscuits. La famille en mange ${b}.`),
    q: () => L('How many are left?', 'Combien en reste-t-il?'),
  },
  {
    e: '🧦',
    s: (a, b) => L(`${G} has ${a} socks in the laundry basket. She pulls out ${b}!`, `Il y a ${a} chaussettes dans le panier. ${G} en sort ${b}!`),
    q: () => L('How many are still in the basket?', 'Combien en reste-t-il dans le panier?'),
  },
];
const BADGES = () => L(
  ['👶 Babysitting time!', '🍼 Snack time!', '🧸 Playtime!', '🛁 Bath time!'],
  ['👶 On garde Gemma!', '🍼 La collation!', "🧸 On s'amuse!", "🛁 L'heure du bain!"],
);

const eqBig = (a, b) => `${a} − ${b} = ${QBOX}`;

function story(a, b, { mode, visual, hint, max = 100 }) {
  const st = pick(STORIES);
  const text = `${st.s(a, b)} ${st.q()}`;
  return numberQ({
    key: `sub-${a}-${b}`,
    badge: pick(BADGES()),
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
      text: L(
        `You can't take ${ob} ones from ${oa} ones. Trade 1 ten for 10 ones! Now you have ${oa + 10} ones. ${oa + 10} − ${ob} = ${oa + 10 - ob}.`,
        `Tu ne peux pas enlever ${ob} unités de ${oa} unités. Échange 1 dizaine contre 10 unités! Maintenant tu as ${oa + 10} unités. ${oa + 10} − ${ob} = ${oa + 10 - ob}.`,
      ),
      say: L(
        `You can't take ${ob} ones from ${oa} ones. Trade 1 ten for 10 ones! Now you have ${oa + 10} ones. ${oa + 10} minus ${ob} is ${oa + 10 - ob}.`,
        `Tu ne peux pas enlever ${ob} unités de ${oa} unités. Échange 1 dizaine contre 10 unités! Maintenant tu as ${oa + 10} unités. ${oa + 10} moins ${ob} égale ${oa + 10 - ob}.`,
      ),
      visual: card(baseTen(a)),
    };
  }
  return {
    text: L(
      `Take away the tens: ${ta} − ${tb} = ${ta - tb} ${ta - tb === 1 ? 'ten' : 'tens'}. Take away the ones: ${oa} − ${ob} = ${oa - ob}.`,
      `Enlève les dizaines : ${ta} − ${tb} = ${ta - tb} ${ta - tb === 1 ? 'dizaine' : 'dizaines'}. Enlève les unités : ${oa} − ${ob} = ${oa - ob}.`,
    ),
    say: L(
      `Take away the tens: ${ta} minus ${tb} is ${ta - tb} ${ta - tb === 1 ? 'ten' : 'tens'}. Take away the ones: ${oa} minus ${ob} is ${oa - ob}.`,
      `Enlève les dizaines : ${ta} moins ${tb} égale ${ta - tb} ${ta - tb === 1 ? 'dizaine' : 'dizaines'}. Enlève les unités : ${oa} moins ${ob} égale ${oa - ob}.`,
    ),
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
      text: L(`Cross out ${b}. Count the ones that are left!`, `Barre-en ${b}. Compte ceux qui restent!`),
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
    const text = L(
      `${M} has ${big} stickers. ${F} has ${small} stickers. How many more does ${M} have?`,
      `${M} a ${big} autocollants. ${F} a ${small} autocollants. Combien ${M} en a-t-elle de plus?`,
    );
    const eq = `${big} − ${small} = ${QBOX}`;
    return numberQ({
      key: `cmp-${big}-${small}`, badge: L('⭐ Sticker count!', '⭐ On compte les autocollants!'), text, big: eq, mode,
      say: `${text} ${sayEq(eq)}`, answer: big - small, max: 100,
      hint: {
        text: L(`Count up from ${small} to ${big}. Or take away: ${big} − ${small}.`, `Compte de ${small} jusqu'à ${big}. Ou soustrais : ${big} − ${small}.`),
        say: L(`Count up from ${small} to ${big}. Or take away: ${big} minus ${small}.`, `Compte de ${small} jusqu'à ${big}. Ou soustrais : ${big} moins ${small}.`),
      },
    });
  }
  if (kind === 'missing') {
    const a = rand(40, 99);
    const ans = rand(11, a - 15);
    const c = a - ans;
    const text = L(
      `${G} had ${a} Cheerios. Now there are ${c}. How many did she eat?`,
      `${G} avait ${a} céréales. Maintenant, il en reste ${c}. Combien en a-t-elle mangé?`,
    );
    const eq = `${a} − ${QBOX} = ${c}`;
    return numberQ({
      key: `smiss-${a}-${c}`, badge: L('🥣 Snack mystery!', '🥣 Le mystère de la collation!'), text, big: eq, mode,
      say: `${text} ${a} ${L('minus what equals', 'moins combien égale')} ${c}?`, answer: ans, max: 100,
      hint: { text: L(`Count up from ${c} to ${a}. How big was the jump?`, `Compte de ${c} jusqu'à ${a}. Quelle est la grandeur du bond?`) },
    });
  }
  const ta = rand(3, 9), tb = rand(1, ta - 1);
  const oa = rand(0, 8), ob = rand(oa + 1, 9);
  const a = 10 * ta + oa, b = 10 * tb + ob;
  return story(a, b, { mode, hint: placeValueHint(a, b), max: 100 });
}

export default {
  id: 'subtracting',
  emoji: '👶',
  theme: 'gemma',
  color: '#2bb5a0',
  get title() { return L(`Babysitting ${G}`, `On garde ${G}`); },
  get skill() { return L('Subtracting', 'La soustraction'); },
  get blurb() { return L(`Help ${M} and ${F} watch baby ${G}!`, `Aide ${M} et ${F} à garder bébé ${G}!`); },
  get intro() {
    return L(`${M} and ${F} are babysitting ${G}! ${G} eats snacks and knocks things over. Figure out how many are left.`,
      `${M} et ${F} gardent ${G}! ${G} mange des collations et fait tout tomber. Trouve combien il en reste.`);
  },
  get levels() {
    return {
      mild: { kid: L('Take away within 20, with pictures', "Soustrais jusqu'à 20, avec des images"), parent: 'Subtraction within 20 with pictures; hint crosses items out.' },
      medium: { kid: L('Take away big numbers, no trading', 'Soustrais de grands nombres, sans échange'), parent: '2-digit − 1-digit, − tens, 2-digit − 2-digit without regrouping. Half typed on keypad.' },
      spicy: { kid: L('Take away with trading, compare, mystery numbers', 'Soustrais avec échange, compare, nombres mystères'), parent: '2-digit subtraction with regrouping, "how many more" comparisons, missing subtrahend.' },
    };
  },
  get praise() { return L([`${G} is so proud! 👶`, 'Great babysitting! 🍼', 'Goo goo, gaga — that means YES! 👶'], [`${G} est fière de toi! 👶`, 'Super gardienne! 🍼', 'Areu areu — ça veut dire OUI! 👶']); },
  get doneTitles() { return L([`${G} is napping! 😴`, 'Babysitting done! 🍼', 'Super sitters! 🧸'], [`${G} fait la sieste! 😴`, 'Mission accomplie! 🍼', 'Super gardiennes! 🧸']); },
  makeQuestion(level, i) {
    return level === 'spicy' ? spicy(i) : level === 'medium' ? medium(i) : mild(i);
  },
};
