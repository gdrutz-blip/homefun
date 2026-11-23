// GRADE 3 — FRACTIONS: Pizza Night at Uncle Aaron's Cottage 🍕 / Soirée pizza au chalet
import { rand, pick, sample, shuffle } from '../../../util.js';
import { wordQ, visualQ, numberQ } from '../../common.js';
import { pie, bar, frac, fracWords } from '../../../visuals3.js';
import { card } from '../../../visuals.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M, uncle, uncleFr } = FAMILY3;
const U = () => L(uncle, uncleFr);
const DENS_MILD = [2, 3, 4];
const DENS = [2, 3, 4, 5, 6, 8];
const BADGES = () => L(['🍕 Pizza night!', '🛶 At the cottage!', '🧇 Waffle breakfast!'], ['🍕 Soirée pizza!', '🛶 Au chalet!', '🧇 Déjeuner gaufres!']);
const picture = (n, k) => (Math.random() < 0.6 ? pie(n, k) : bar(n, k));

/** Fraction answer buttons. */
function fracChoices(pairs) {
  return pairs.map(([k, n]) => ({ value: `${k}/${n}`, label: frac(k, n), say: fracWords(k, n) }));
}

function nameShaded(dens, unitOnly) {
  const n = pick(dens);
  const k = unitOnly ? 1 : rand(1, n - 1);
  const wrong = shuffle([[k, n + 1], [n - k, n], [k, n - 1 || 2], [Math.max(1, k - 1), n], [k + 1, n]])
    .filter(([a, b]) => a >= 1 && a < b && !(a === k && b === n) && [2, 3, 4, 5, 6, 8, 10].includes(b));
  const uniq = [];
  for (const w of wrong) if (!uniq.some((u) => u[0] === w[0] && u[1] === w[1])) uniq.push(w);
  const opts = shuffle([[k, n], ...uniq.slice(0, 2)]);
  return {
    ...wordQ({
      key: `name-${k}-${n}-${rand(0, 1)}`, badge: pick(BADGES()),
      text: L(`What fraction is shaded orange?`, `Quelle fraction est coloriée en orange?`),
      visual: card(picture(n, k)),
      options: fracChoices(opts),
      answer: `${k}/${n}`,
      hint: {
        text: L(`Count ALL the equal parts: that's the bottom number (${n}). Count the orange parts: that's the top number.`,
          `Compte TOUTES les parties égales : c'est le nombre du bas (${n}). Compte les parties orange : c'est le nombre du haut.`),
      },
    }),
    choiceStyle: 'num',
  };
}

function pickPicture() {
  const n = pick(DENS), k = rand(1, n - 1);
  const others = shuffle([[k, n === 8 ? 6 : 8], [n - k, n], [k + 1 <= n - 1 ? k + 1 : k - 1, n]])
    .filter(([a, b]) => a >= 1 && a < b && !(a === k && b === n));
  const opts = [[k, n]];
  for (const o of others) if (opts.length < 3 && !opts.some((x) => x[0] === o[0] && x[1] === o[1])) opts.push(o);
  const usePie = Math.random() < 0.5;
  return visualQ({
    key: `pick-${k}-${n}`, badge: pick(BADGES()),
    text: L(`${F} wants ${fracWords(k, n)} of the pizza. Which picture shows ${k}/${n}?`, `${F} veut ${fracWords(k, n)} de la pizza. Quelle image montre ${k}/${n}?`),
    say: L(`${F} wants ${fracWords(k, n)} of the pizza. Which picture shows ${fracWords(k, n)}?`, `${F} veut ${fracWords(k, n)} de la pizza. Quelle image montre ${fracWords(k, n)}?`),
    options: shuffle(opts).map(([a, b]) => ({ value: `${a}/${b}`, html: usePie ? pie(b, a, 120) : bar(b, a, { w: 150, h: 54 }) })),
    answer: `${k}/${n}`,
    hint: { text: L(`Look for the picture cut into ${n} equal parts with ${k} shaded.`, `Cherche l'image coupée en ${n} parties égales avec ${k} parties coloriées.`) },
  });
}

function equalParts() {
  const equal = Math.random() < 0.5;
  const n = pick([2, 3, 4]);
  const cuts = equal ? null : { 2: [0.35], 3: [0.2, 0.62], 4: [0.15, 0.45, 0.6] }[n];
  return wordQ({
    key: `eq-${equal}-${n}`, badge: L('🧇 Waffle check!', '🧇 Vérifie la gaufre!'),
    text: L(`${M} cut this waffle into ${n} pieces. Are the pieces EQUAL?`, `${M} a coupé cette gaufre en ${n} morceaux. Les morceaux sont-ils ÉGAUX?`),
    visual: card(bar(n, 0, { cuts })),
    options: [{ value: 'yes', label: L('Yes, equal parts', 'Oui, parts égales') }, { value: 'no', label: L('No, not equal', 'Non, pas égales') }],
    answer: equal ? 'yes' : 'no',
    hint: { text: L('For fractions, every piece must be the SAME size. Is that fair?', 'Pour les fractions, chaque morceau doit être de la MÊME grandeur. Est-ce juste?') },
  });
}

function compareUnit() {
  const [a, b] = sample(DENS, 2);
  const bigger = a < b ? a : b;
  return visualQ({
    key: `cmp-${Math.min(a, b)}-${Math.max(a, b)}`, badge: L('🍕 Biggest slice!', '🍕 La plus grosse pointe!'),
    text: L(`Which is the BIGGER slice of pizza: 1/${a} or 1/${b}?`, `Quelle est la plus GROSSE pointe de pizza : 1/${a} ou 1/${b}?`),
    say: L(`Which is the bigger slice of pizza: ${fracWords(1, a)} or ${fracWords(1, b)}?`, `Quelle est la plus grosse pointe de pizza : ${fracWords(1, a)} ou ${fracWords(1, b)}?`),
    options: shuffle([a, b]).map((d) => ({ value: d, html: `${pie(d, 1, 110)}<div class="frac-cap">${frac(1, d)}</div>` })),
    answer: bigger,
    hint: { text: L('The MORE pieces you cut a pizza into, the SMALLER each piece is!', 'Plus on coupe la pizza en morceaux, plus chaque morceau est PETIT!') },
  });
}

function wholeQ(mode) {
  const n = pick(DENS);
  return numberQ({
    key: `whole-${n}`, badge: pick(BADGES()),
    text: L(`${U()} cuts a pizza into ${fracWords(2, n).split(' ')[1]}. How many pieces make one WHOLE pizza?`,
      `${U().charAt(0).toUpperCase() + U().slice(1)} coupe une pizza en ${fracWords(2, n).split(' ')[1]}. Combien de morceaux font une pizza ENTIÈRE?`),
    visual: card(pie(n, n)),
    answer: n, mode, min: 1, max: 12, near: [1, -1, 2],
    hint: { text: L(`Count the slices. ${n}/${n} is one whole!`, `Compte les pointes. ${n}/${n}, c'est un entier!`) },
  });
}

function leftQ() {
  const n = pick([4, 6, 8]), eaten = rand(1, n - 1);
  const left = n - eaten;
  const wrong = [[eaten, n], [left, n + (n === 8 ? -2 : 2)], [Math.max(1, left - 1), n]].filter(([a, b]) => !(a === left && b === n) && a < b);
  const opts = [[left, n]];
  for (const w of wrong) if (!opts.some((o) => o[0] === w[0] && o[1] === w[1])) opts.push(w);
  return {
    ...wordQ({
      key: `left-${eaten}-${n}`, badge: L('😋 Who ate the pizza?', '😋 Qui a mangé la pizza?'),
      text: L(`The pizza had ${n} equal slices. ${F} and ${M} ate ${eaten}. What fraction of the pizza is LEFT?`,
        `La pizza avait ${n} pointes égales. ${F} et ${M} en ont mangé ${eaten}. Quelle fraction de la pizza RESTE?`),
      visual: card(pie(n, left)),
      options: fracChoices(shuffle(opts.slice(0, 3))),
      answer: `${left}/${n}`,
      hint: { text: L(`${n} − ${eaten} = ${left} slices left, out of ${n}.`, `${n} − ${eaten} = ${left} pointes restent, sur ${n}.`) },
    }),
    choiceStyle: 'num',
  };
}

export default {
  id: 'fractions',
  emoji: '🍕',
  theme: 'pizza',
  color: '#e53935',
  get title() { return L('Pizza Night at the Cottage', 'Soirée pizza au chalet'); },
  get skill() { return L('Fractions', 'Les fractions'); },
  get blurb() { return L(`Slice pizzas and waffles at ${uncle}'s cottage!`, `Coupe des pizzas et des gaufres au chalet de ${uncleFr}!`); },
  get intro() {
    return L(`It's pizza night at ${uncle}'s cottage! Everyone wants a fair share. Let's use fractions.`,
      `C'est la soirée pizza au chalet de ${uncleFr}! Tout le monde veut sa juste part. Utilisons les fractions.`);
  },
  get levels() {
    return {
      mild: { kid: L('Halves, thirds and fourths', 'Demis, tiers et quarts'), parent: 'Equal vs. unequal parts; naming unit fractions (1/2, 1/3, 1/4) from pictures.' },
      medium: { kid: L('Name and find fractions', 'Nommer et trouver des fractions'), parent: 'Fractions like 3/4, 5/6, 3/8 from pies and bars; picking the matching picture; parts in a whole.' },
      spicy: { kid: L('Compare and pizza left over', 'Comparer et les restes'), parent: 'Comparing unit fractions (1/3 vs 1/8), fraction remaining, fractions in a whole.' },
    };
  },
  get praise() { return L(['Slice-tastic! 🍕', 'Fair share! 🧇', 'Delicious math! 😋'], ['Super pointe! 🍕', 'Partage juste! 🧇', 'Des maths délicieuses! 😋']); },
  get doneTitles() { return L(['Pizza party! 🍕', 'Fraction pro! 🏆'], ['Fête de pizza! 🍕', 'Pro des fractions! 🏆']); },
  makeQuestion(level, i) {
    if (level === 'mild') return pick([() => nameShaded(DENS_MILD, true), () => nameShaded(DENS_MILD, true), equalParts])();
    if (level === 'medium') return pick([() => nameShaded(DENS, false), pickPicture, () => wholeQ('choice'), equalParts])();
    return pick([compareUnit, compareUnit, leftQ, () => nameShaded(DENS, false), () => wholeQ(i % 2 ? 'number' : 'choice')])();
  },
};
