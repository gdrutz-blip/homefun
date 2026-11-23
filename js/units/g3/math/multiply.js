// GRADE 3 — MULTIPLICATION: Puppy Training School 🐶 / L'école des chiots
import { rand, pick, QBOX } from '../../../util.js';
import { numberQ } from '../../common.js';
import { equalGroups, array } from '../../../visuals3.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M } = FAMILY3;
const TREATS = [['🦴', 'bones', 'os'], ['🍪', 'dog cookies', 'biscuits pour chien'], ['🧸', 'toys', 'jouets'], ['🥩', 'snacks', 'gâteries']];
const BADGES = () => L(['🐶 Puppy class!', '🐾 Sit! Stay!', '🦴 Treat time!', '🐕 Good dog!'], ['🐶 Cours de chiots!', '🐾 Assis! Reste!', '🦴 L’heure des gâteries!', '🐕 Bon chien!']);
const eq = (a, b) => `${a} × ${b} = ${QBOX}`;
const sayEq = (a, b) => L(`${a} times ${b} equals what?`, `${a} fois ${b} égale combien?`);

function groupsQ(a, b, mode) {
  const [e, en, fr] = pick(TREATS);
  const text = L(`${F} has ${a} puppies. Each puppy gets ${b} ${en}. How many ${en} in all?`,
    `${F} a ${a} chiots. Chaque chiot reçoit ${b} ${fr}. Combien de ${fr} en tout?`);
  return numberQ({
    key: `mg-${a}-${b}`, badge: pick(BADGES()), text, big: eq(a, b), say: `${text} ${sayEq(a, b)}`,
    visual: a * b <= 30 ? equalGroups(a, b, e, { container: '🐶' }) : '',
    answer: a * b, mode, max: 100, near: [a, -a, b, -b, 1, -1],
    hint: {
      text: L(`${a} groups of ${b}. Skip count by ${b}: ${Array.from({ length: a }, (_, i) => b * (i + 1)).slice(0, -1).join(', ')}, …`,
        `${a} groupes de ${b}. Compte par bonds de ${b} : ${Array.from({ length: a }, (_, i) => b * (i + 1)).slice(0, -1).join(', ')}, …`),
      visual: equalGroups(a, b, e, { container: '🐶' }),
    },
  });
}

function arrayQ(a, b, mode) {
  const text = L(`${M} lines up the puppies for a photo: ${a} rows of ${b}. How many puppies?`,
    `${M} place les chiots pour une photo : ${a} rangées de ${b}. Combien de chiots?`);
  return numberQ({
    key: `ma-${a}-${b}`, badge: '📸 Photo day!', text, big: eq(a, b), say: `${text} ${sayEq(a, b)}`,
    visual: array(a, b, '🐶'), answer: a * b, mode, max: 100, near: [a, -a, b, -b, 1],
    hint: { text: L(`Count one row: ${b}. There are ${a} rows. Add ${b} again and again.`, `Une rangée : ${b}. Il y a ${a} rangées. Additionne ${b} plusieurs fois.`) },
  });
}

function factQ(a, b, mode) {
  return numberQ({
    key: `mf-${a}-${b}`, badge: pick(BADGES()),
    text: L('Quick trick! Solve the fact.', 'Tour rapide! Trouve la réponse.'),
    big: eq(a, b), say: sayEq(a, b),
    answer: a * b, mode, max: 100, near: [a, -a, b, -b, 1, -1],
    hint: {
      text: b === 10 || a === 10 ? L('Times 10: put a zero on the end!', 'Fois 10 : ajoute un zéro à la fin!')
        : b === 5 || a === 5 ? L('Times 5: count by fives!', 'Fois 5 : compte par bonds de 5!')
          : b === 2 || a === 2 ? L('Times 2 is a double!', 'Fois 2, c’est le double!')
            : L(`Break it apart: ${a} × ${b} = ${a} × ${b - 1} + ${a}.`, `Sépare-le : ${a} × ${b} = ${a} × ${b - 1} + ${a}.`),
    },
  });
}

function missingQ(mode) {
  const a = rand(2, 7), b = rand(2, 7);
  return numberQ({
    key: `mm-${a}-${b}`, badge: '🔍 Mystery treat!',
    text: L(`${F} gave out ${a * b} treats, ${a} to each puppy. How many puppies?`, `${F} a donné ${a * b} gâteries, ${a} à chaque chiot. Combien de chiots?`),
    big: `${a} × ${QBOX} = ${a * b}`, say: L(`${a} times what equals ${a * b}?`, `${a} fois combien égale ${a * b}?`),
    answer: b, mode, max: 12, min: 1, near: [1, -1, 2],
    hint: { text: L(`Count by ${a}s until you reach ${a * b}. How many jumps?`, `Compte par bonds de ${a} jusqu'à ${a * b}. Combien de bonds?`) },
  });
}

export default {
  id: 'multiply',
  emoji: '🐶',
  theme: 'puppy',
  color: '#ff8f3d',
  get title() { return L('Puppy Training School', 'L’école des chiots'); },
  get skill() { return L('Multiplication', 'La multiplication'); },
  get blurb() { return L('Treats for every puppy — equal groups and times tables!', 'Des gâteries pour chaque chiot — groupes égaux et tables!'); },
  get intro() {
    return L(`${F} runs a puppy training school! Every puppy gets the same number of treats. Multiply to find out how many.`,
      `${F} dirige une école pour chiots! Chaque chiot reçoit le même nombre de gâteries. Multiplie pour trouver combien.`);
  },
  get levels() {
    return {
      mild: { kid: L('Equal groups with pictures', 'Groupes égaux avec images'), parent: 'Equal groups and arrays with pictures (up to 5 × 5); ×2, ×5, ×10.' },
      medium: { kid: L('Facts of 2, 5 and 10', 'Les tables de 2, 5 et 10'), parent: 'Multiplication facts of 2, 5 and 10 (to ×10); arrays; half typed on keypad.' },
      spicy: { kid: L('Facts up to 7 × 7 and mystery numbers', 'Tables jusqu’à 7 × 7 et nombres mystères'), parent: 'Multiplication up to 7 × 7, missing factors (related division).' },
    };
  },
  get praise() { return L(['Good puppy! 🐶', 'Paw-some! 🐾', 'Woof woof! 🐕'], ['Bon chien! 🐶', 'Super! 🐾', 'Ouaf ouaf! 🐕']); },
  get doneTitles() { return L(['Puppies trained! 🐶', 'Top trainer! 🏆'], ['Chiots dressés! 🐶', 'Super dresseuse! 🏆']); },
  makeQuestion(level, i) {
    if (level === 'mild') {
      const a = rand(2, 5), b = pick([2, 3, 4, 5]);
      return pick([groupsQ, groupsQ, arrayQ])(a, b, 'choice');
    }
    if (level === 'medium') {
      const mode = i % 2 ? 'number' : 'choice';
      const a = pick([2, 5, 10]), b = rand(2, 10);
      const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
      return pick([factQ, factQ, groupsQ, arrayQ])(x, y, mode);
    }
    const mode = i % 3 === 0 ? 'choice' : 'number';
    if (Math.random() < 0.25) return missingQ(mode);
    const a = rand(2, 7), b = rand(2, 7);
    return pick([factQ, factQ, groupsQ])(a, b, mode);
  },
};
