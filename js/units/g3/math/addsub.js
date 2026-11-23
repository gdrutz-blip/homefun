// GRADE 3 — ADD & SUBTRACT TO 1000: Farrah's Breakfast Diner 🍳 / Le resto-déjeuner de Farrah
import { rand, pick, QBOX } from '../../../util.js';
import { numberQ, sayEq } from '../../common.js';
import { pvChart } from '../../../visuals3.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M } = FAMILY3;
const FOOD = [['🍳', 'eggs', 'œufs'], ['🌭', 'sausages', 'saucisses'], ['🥣', 'Cheerios', 'céréales'], ['🧇', 'waffles', 'gaufres'], ['🥞', 'pancakes', 'crêpes']];
const BADGES = () => L(['🍳 Order up!', '🧇 Waffle rush!', '🥓 Sizzle!', '☕ Breakfast time!'], ['🍳 Commande prête!', '🧇 Rush de gaufres!', '🥓 Ça grésille!', '☕ L’heure du déjeuner!']);

function addStory(a, b, mode, hint) {
  const [e, en, fr] = pick(FOOD);
  const text = pick([
    () => L(`The diner cooked ${a} ${en} on Saturday and ${b} on Sunday. How many in all?`, `Le resto a cuisiné ${a} ${fr} samedi et ${b} dimanche. Combien en tout?`),
    () => L(`${F} has ${a} ${en}. The truck brings ${b} more. How many now?`, `${F} a ${a} ${fr}. Le camion en apporte ${b} de plus. Combien maintenant?`),
  ])();
  const big = `${a} + ${b} = ${QBOX}`;
  return numberQ({ key: `a3-${a}-${b}`, badge: pick(BADGES()), text, big, say: `${text} ${sayEq(big)}`, answer: a + b, mode, max: 1000, near: [10, -10, 100, -100, 1, -1], hint });
}

function subStory(a, b, mode, hint) {
  const [e, en, fr] = pick(FOOD);
  const text = pick([
    () => L(`The diner had ${a} ${en}. Customers ate ${b}. How many are left?`, `Le resto avait ${a} ${fr}. Les clients en ont mangé ${b}. Combien en reste-t-il?`),
    () => L(`${F} made ${a} ${en}. ${M} made ${b}. How many more did ${F} make?`, `${F} a fait ${a} ${fr}. ${M} en a fait ${b}. Combien ${F} en a-t-elle fait de plus?`),
  ])();
  const big = `${a} − ${b} = ${QBOX}`;
  return numberQ({ key: `s3-${a}-${b}`, badge: pick(BADGES()), text, big, say: `${text} ${sayEq(big)}`, answer: a - b, mode, max: 1000, near: [10, -10, 100, -100, 1, -1], hint });
}

const digits = (n) => [Math.floor(n / 100), Math.floor((n % 100) / 10), n % 10];

function addHint(a, b) {
  const [ha, ta, oa] = digits(a), [hb, tb, ob] = digits(b);
  const carryO = oa + ob >= 10, carryT = ta + tb + (carryO ? 1 : 0) >= 10;
  return {
    text: L(`Line up the places. Ones: ${oa} + ${ob}${carryO ? ' (trade 10 ones for a ten!)' : ''}. Tens: ${ta} + ${tb}${carryO ? ' + 1' : ''}${carryT ? ' (trade 10 tens for a hundred!)' : ''}. Hundreds: ${ha} + ${hb}${carryT ? ' + 1' : ''}.`,
      `Aligne les positions. Unités : ${oa} + ${ob}${carryO ? ' (échange 10 unités contre une dizaine!)' : ''}. Dizaines : ${ta} + ${tb}${carryO ? ' + 1' : ''}${carryT ? ' (échange 10 dizaines contre une centaine!)' : ''}. Centaines : ${ha} + ${hb}${carryT ? ' + 1' : ''}.`),
    visual: `<div class="combo">${pvChart(a)}<span class="op">+</span>${pvChart(b)}</div>`,
  };
}

function subHint(a, b) {
  const [, ta, oa] = digits(a), [, tb, ob] = digits(b);
  const borrowO = ob > oa, borrowT = tb + (borrowO ? 1 : 0) > ta;
  return {
    text: L(`Start with the ones.${borrowO ? ' Not enough ones? Trade 1 ten for 10 ones.' : ''}${borrowT ? ' Not enough tens? Trade 1 hundred for 10 tens.' : ''} Or count up from ${b} to ${a}!`,
      `Commence par les unités.${borrowO ? ' Pas assez d’unités? Échange 1 dizaine contre 10 unités.' : ''}${borrowT ? ' Pas assez de dizaines? Échange 1 centaine contre 10 dizaines.' : ''} Ou compte de ${b} jusqu'à ${a}!`),
    visual: pvChart(a),
  };
}

/** Random 3-digit numbers with (regroup=false) no carrying/borrowing in any place. */
function noRegroupAdd() {
  const pa = [rand(1, 7), rand(0, 8), rand(0, 8)];
  const pb = [rand(1, 8 - pa[0]), rand(0, 9 - pa[1]), rand(0, 9 - pa[2])];
  return [pa[0] * 100 + pa[1] * 10 + pa[2], pb[0] * 100 + pb[1] * 10 + pb[2]];
}
function noRegroupSub() {
  const pa = [rand(2, 9), rand(1, 9), rand(1, 9)];
  const pb = [rand(1, pa[0] - 1), rand(0, pa[1]), rand(0, pa[2])];
  return [pa[0] * 100 + pa[1] * 10 + pa[2], pb[0] * 100 + pb[1] * 10 + pb[2]];
}

export default {
  id: 'addsub',
  emoji: '🍳',
  theme: 'diner',
  color: '#f2a20c',
  get title() { return L(`${F}'s Breakfast Diner`, `Le resto-déjeuner de ${F}`); },
  get skill() { return L('Add & subtract to 1000', 'Additionner et soustraire jusqu’à 1000'); },
  get blurb() { return L('Eggs, sausages, Cheerios and waffles — big orders!', 'Œufs, saucisses, céréales et gaufres — de grosses commandes!'); },
  get intro() {
    return L(`${F} is the chef at her own breakfast diner! The orders are huge today. Add and subtract to keep track.`,
      `${F} est la cheffe de son propre resto-déjeuner! Les commandes sont énormes aujourd'hui. Additionne et soustrais pour suivre.`);
  },
  get levels() {
    return {
      mild: { kid: L('Hundreds and tens', 'Centaines et dizaines'), parent: 'Adding/subtracting multiples of 10 and 100 (e.g., 300 + 400, 560 − 30); 2-digit with regrouping.' },
      medium: { kid: L('3-digit, no trading', '3 chiffres, sans échange'), parent: '3-digit addition and subtraction without regrouping; half typed on keypad.' },
      spicy: { kid: L('3-digit with trading', '3 chiffres avec échange'), parent: '3-digit addition and subtraction with regrouping (sums ≤ 1000).' },
    };
  },
  get praise() { return L(['Order up! 🍳', 'Sizzling! 🥓', 'Chef’s kiss! 👩‍🍳'], ['Commande prête! 🍳', 'Ça grésille! 🥓', 'Bravo, cheffe! 👩‍🍳']); },
  get doneTitles() { return L(['Diner closed! 🍳', 'Five-star chef! ⭐'], ['Le resto est fermé! 🍳', 'Cheffe cinq étoiles! ⭐']); },
  makeQuestion(level, i) {
    const mode = level === 'mild' ? (i % 3 ? 'choice' : 'number') : i % 2 ? 'number' : 'choice';
    const add = Math.random() < 0.5;
    if (level === 'mild') {
      const k = pick(['hund', 'tens', 'two']);
      if (k === 'hund') {
        const a = rand(1, 8) * 100, b = rand(1, (1000 - a) / 100) * 100;
        return add ? addStory(a, b, mode, addHint(a, b)) : subStory(a + b, b, mode, subHint(a + b, b));
      }
      if (k === 'tens') {
        const a = rand(11, 89) * 10, b = rand(1, 9) * 10;
        return add && a + b <= 1000 ? addStory(a, b, mode, addHint(a, b)) : subStory(a, Math.min(b, a - 10), mode, subHint(a, Math.min(b, a - 10)));
      }
      const a = rand(15, 89), b = rand(12, 99 - 0);
      return add ? addStory(a, b, mode, addHint(a, b)) : subStory(Math.max(a, b), Math.min(a, b), mode, subHint(Math.max(a, b), Math.min(a, b)));
    }
    if (level === 'medium') {
      if (add) { const [a, b] = noRegroupAdd(); return addStory(a, b, mode, addHint(a, b)); }
      const [a, b] = noRegroupSub(); return subStory(a, b, mode, subHint(a, b));
    }
    if (add) {
      let a, b;
      do { a = rand(150, 800); b = rand(120, 1000 - a); } while ((a % 10) + (b % 10) < 10 || a + b > 1000);
      return addStory(a, b, mode, addHint(a, b));
    }
    let a, b;
    do { a = rand(300, 999); b = rand(110, a - 50); } while ((b % 10) <= (a % 10));
    return subStory(a, b, mode, subHint(a, b));
  },
};
