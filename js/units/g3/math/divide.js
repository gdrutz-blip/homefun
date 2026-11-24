// GRADE 3 — DIVISION: Cousin Snack Share 🪱 / Le partage des collations
import { rand, pick, sample } from '../../../util.js';
import { numberQ } from '../../common.js';
import { equalGroups } from '../../../visuals3.js';
import { emojiGroup } from '../../../visuals.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';
import { QBOX } from '../../../util.js';

const { kid: F, sister: M, baby: G, cousins } = FAMILY3;
const KIDS = [M, G, ...cousins];
const SNACKS = [['🪱', 'gummy worms', 'jujubes en forme de vers'], ['🥣', 'Cheerios', 'céréales'], ['🍓', 'strawberries', 'fraises'], ['🧇', 'waffle pieces', 'morceaux de gaufre'], ['🥕', 'carrot sticks', 'bâtonnets de carotte']];
const BADGES = () => L(['👶 Babysitting!', '🪱 Gummy worm share!', '🍽️ Snack time!'], ['👶 On garde les petits!', '🪱 Partage des vers!', '🍽️ La collation!']);
const eq = (t, n) => `${t} ÷ ${n} = ${QBOX}`;
const sayEq = (t, n) => L(`${t} divided by ${n} equals what?`, `${t} divisé par ${n} égale combien?`);

function shareQ(n, each, mode, showPic) {
  const total = n * each;
  const kids = sample(KIDS, Math.min(n, KIDS.length));
  const who = n <= kids.length ? kids.join(', ').replace(/, ([^,]*)$/, L(' and $1', ' et $1')) : L(`${n} kids`, `${n} enfants`);
  const [e, en, fr] = pick(SNACKS);
  const text = L(`${F} shares ${total} ${en} equally with ${who}. How many does each kid get?`,
    `${F} partage ${total} ${fr} également entre ${who}. Combien chaque enfant en reçoit-il?`);
  return numberQ({
    key: `ds-${total}-${n}`, badge: pick(BADGES()), text, big: eq(total, n), say: `${text} ${sayEq(total, n)}`,
    visual: showPic ? emojiGroup(e, total) : '',
    answer: each, mode, min: 1, max: 20, near: [1, -1, 2, -2],
    hint: {
      text: L(`Deal them out one at a time, like cards, into ${n} plates. Or think: ${n} × ? = ${total}.`,
        `Distribue-les un par un dans ${n} assiettes, comme des cartes. Ou pense : ${n} × ? = ${total}.`),
      visual: total <= 30 ? equalGroups(n, each, e, { container: '🍽️' }) : '',
    },
  });
}

function groupsQ(size, groups, mode) {
  const total = size * groups;
  const [e, en, fr] = pick(SNACKS);
  const text = L(`${F} has ${total} ${en}. She puts ${size} in each snack bag. How many bags can she fill?`,
    `${F} a ${total} ${fr}. Elle en met ${size} dans chaque sac. Combien de sacs peut-elle remplir?`);
  return numberQ({
    key: `dg-${total}-${size}`, badge: L('🛍️ Snack bags!', '🛍️ Les sacs de collation!'), text, big: eq(total, size), say: `${text} ${sayEq(total, size)}`,
    visual: total <= 24 ? emojiGroup(e, total) : '',
    answer: groups, mode, min: 1, max: 20, near: [1, -1, 2, -2],
    hint: { text: L(`Count by ${size}s up to ${total}. Each jump is one bag.`, `Compte par bonds de ${size} jusqu'à ${total}. Chaque bond est un sac.`) },
  });
}

function factQ(n, each, mode) {
  const total = n * each;
  return numberQ({
    key: `df-${total}-${n}`, badge: pick(BADGES()),
    text: L('Quick share! Solve the division fact.', 'Partage rapide! Trouve la réponse.'),
    big: eq(total, n), say: sayEq(total, n),
    answer: each, mode, min: 1, max: 20, near: [1, -1, 2, -2],
    hint: { text: L(`Think multiplication: ${n} × ? = ${total}.`, `Pense à la multiplication : ${n} × ? = ${total}.`) },
  });
}

export default {
  id: 'divide',
  emoji: '🪱',
  theme: 'gummy',
  color: '#2bb5a0',
  get title() { return L('Cousin Snack Share', 'Le partage des collations'); },
  get skill() { return L('Division', 'La division'); },
  get blurb() { return L(`Share snacks fairly with ${G}, ${cousins.join(', ')}!`, `Partage les collations avec ${G}, ${cousins.join(', ')}!`); },
  get intro() {
    return L(`${F} is babysitting ${G} and the cousins, ${cousins.join(', ')}! Everyone has to get the same amount, or there will be trouble.`,
      `${F} garde ${G} et les cousins, ${cousins.join(', ')}! Tout le monde doit avoir la même quantité, sinon il y aura de la chicane.`);
  },
  get levels() {
    return {
      mild: { kid: L('Share with pictures', 'Partage avec des images'), parent: 'Sharing up to 20 objects equally among 2–5 kids, with pictures.' },
      medium: { kid: L('Snack bags and sharing', 'Sacs de collation et partage'), parent: 'Division as sharing and as grouping, related to facts of 2, 5 and 10.' },
      spicy: { kid: L('Division facts up to 100 ÷ 10', 'Divisions jusqu’à 100 ÷ 10'), parent: 'Division facts related to multiplication up to 10 × 10; half typed on keypad.' },
    };
  },
  get praise() { return L(['Fair share! 🪱', 'No fighting! 😄', 'Super sitter! 👶'], ['Partage juste! 🪱', 'Pas de chicane! 😄', 'Super gardienne! 👶']); },
  get doneTitles() { return L(['Everyone is happy! 😄', 'Babysitter of the year! 🏆'], ['Tout le monde est content! 😄', 'Gardienne de l’année! 🏆']); },
  makeQuestion(level, i) {
    if (level === 'mild') {
      const n = rand(2, 5), each = rand(1, Math.floor(20 / n));
      return shareQ(n, Math.max(2, each), 'choice', true);
    }
    if (level === 'medium') {
      const mode = i % 2 ? 'number' : 'choice';
      const n = pick([2, 5, 10]), each = rand(2, 10);
      return pick([() => shareQ(Math.min(n, 5), each, mode, false), () => groupsQ(n, each, mode), () => factQ(n, each, mode)])();
    }
    const mode = i % 3 === 0 ? 'choice' : 'number';
    const n = rand(2, 10), each = rand(2, 10);
    return pick([() => factQ(n, each, mode), () => factQ(n, each, mode), () => groupsQ(n, each, mode), () => shareQ(Math.min(n, 5), each, mode, false)])();
  },
};
