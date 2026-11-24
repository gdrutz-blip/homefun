// GRADE 2 — CODING: Robot Dance Party 🤖 / La fête du robot
// Programs are rows of arrows. Questions: which program reaches the star, where does it end,
// what does a repeat do, and which change fixes the bug.
import { rand, pick, sample, shuffle } from '../../util.js';
import { wordQ } from '../common.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M } = FAMILY;
const DIR = {
  U: { dr: -1, dc: 0, e: '⬆️', w: ['up', 'haut'], opp: 'D' },
  D: { dr: 1, dc: 0, e: '⬇️', w: ['down', 'bas'], opp: 'U' },
  L: { dr: 0, dc: -1, e: '⬅️', w: ['left', 'gauche'], opp: 'R' },
  R: { dr: 0, dc: 1, e: '➡️', w: ['right', 'droite'], opp: 'L' },
};
const KEYS = ['U', 'D', 'L', 'R'];
const BADGES = () => L(['🤖 Code it!', '🎸 Robot concert!', '💃 Dance moves!', '🧩 Puzzle time!'], ['🤖 On programme!', '🎸 Concert de robots!', '💃 Pas de danse!', '🧩 Un casse-tête!']);

/** Run a program. Returns [row, col] or null if the robot would fall off the grid. */
function run(start, prog, n) {
  let [r, c] = start;
  for (const k of prog) {
    r += DIR[k].dr; c += DIR[k].dc;
    if (r < 0 || c < 0 || r >= n || c >= n) return null;
  }
  return [r, c];
}
const same = (a, b) => a && b && a[0] === b[0] && a[1] === b[1];
const arrows = (prog) => prog.map((k) => DIR[k].e).join(' ');
const words = (prog) => prog.map((k) => L(...DIR[k].w)).join(', ');
const cellKey = (p) => `${p[0]},${p[1]}`;

function grid(n, marks) {
  let g = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) g += `<span class="cg-cell">${marks[`${r},${c}`] || ''}</span>`;
  return `<div class="codegrid" style="--n:${n}">${g}</div>`;
}

/** A random walk of `len` steps that ends somewhere other than the start. */
function walk(n, len) {
  for (let t = 0; t < 200; t++) {
    const start = [rand(0, n - 1), rand(0, n - 1)];
    let [r, c] = start;
    const prog = [];
    for (let i = 0; i < len; i++) {
      const opts = KEYS.filter((k) => {
        const rr = r + DIR[k].dr, cc = c + DIR[k].dc;
        return rr >= 0 && cc >= 0 && rr < n && cc < n && !(prog.length && DIR[k].opp === prog[prog.length - 1]);
      });
      const k = pick(opts);
      prog.push(k); r += DIR[k].dr; c += DIR[k].dc;
    }
    if (!(r === start[0] && c === start[1])) return { start, prog, end: [r, c] };
  }
  return null;
}

/** Wrong versions of a program: flip one arrow, or drop / add one step. */
function mutations(prog, start, n) {
  const out = [];
  prog.forEach((k, i) => out.push(prog.map((x, j) => (j === i ? DIR[x].opp : x))));
  out.push(prog.slice(0, -1));
  KEYS.forEach((k) => out.push([...prog, k]));
  return shuffle(out).filter((p) => p.length > 0 && run(start, p, n));
}

// ---------- question types ----------
function reachStar(n, len) {
  const w = walk(n, len);
  const wrong = [];
  for (const m of mutations(w.prog, w.start, n)) {
    if (!same(run(w.start, m, n), w.end) && !wrong.some((x) => arrows(x) === arrows(m))) wrong.push(m);
    if (wrong.length === 2) break;
  }
  if (wrong.length < 2) return reachStar(n, len);
  const opts = shuffle([w.prog, ...wrong]);
  // make sure only one option reaches the star
  if (opts.filter((p) => same(run(w.start, p, n), w.end)).length !== 1) return reachStar(n, len);
  return {
    ...wordQ({
      key: `reach-${n}-${cellKey(w.start)}-${arrows(w.prog)}`, badge: pick(BADGES()),
      text: L(`Help the robot 🤖 dance to the star ⭐! Which program gets it there?`, `Aide le robot 🤖 à danser jusqu’à l’étoile ⭐! Quel programme l’y amène?`),
      visual: card(grid(n, { [cellKey(w.start)]: '🤖', [cellKey(w.end)]: '⭐' })),
      options: opts.map((p) => ({ value: arrows(p), label: arrows(p), say: words(p) })),
      answer: arrows(w.prog),
      hint: { text: L('Put your finger on the robot. Follow each arrow one step at a time. Does it land on the star?', 'Mets ton doigt sur le robot. Suis chaque flèche, une à la fois. Est-ce qu’il arrive sur l’étoile?'), visual: '' },
    }),
    sayChoices: false,
  };
}

function letterOptions(n, start, end, prog) {
  const cells = [];
  for (const m of mutations(prog, start, n)) {
    const e = run(start, m, n);
    if (e && !same(e, end) && !same(e, start) && !cells.some((c) => same(c, e))) cells.push(e);
    if (cells.length === 2) break;
  }
  while (cells.length < 2) {
    const e = [rand(0, n - 1), rand(0, n - 1)];
    if (!same(e, end) && !same(e, start) && !cells.some((c) => same(c, e))) cells.push(e);
  }
  const all = shuffle([end, ...cells]);
  const letters = ['A', 'B', 'C'];
  const marks = { [cellKey(start)]: '🤖' };
  all.forEach((c, i) => { marks[cellKey(c)] = `<b class="cg-letter">${letters[i]}</b>`; });
  return { marks, answer: letters[all.findIndex((c) => same(c, end))] };
}

function whereEnd(n, len) {
  const w = walk(n, len);
  const { marks, answer } = letterOptions(n, w.start, w.end, w.prog);
  return {
    ...wordQ({
      key: `where-${n}-${cellKey(w.start)}-${arrows(w.prog)}`, badge: pick(BADGES()),
      text: L('The robot 🤖 follows this program. Which letter does it reach?', 'Le robot 🤖 suit ce programme. Quelle lettre atteint-il?'),
      big: arrows(w.prog),
      say: L(`The robot follows this program: ${words(w.prog)}. Which letter does it reach?`, `Le robot suit ce programme : ${words(w.prog)}. Quelle lettre atteint-il?`),
      visual: card(grid(n, marks)),
      options: ['A', 'B', 'C'],
      answer,
      hint: { text: L('Start on the robot. Do the first arrow, then the next one. Use your finger to move one square for each arrow.', 'Commence sur le robot. Fais la première flèche, puis la suivante. Utilise ton doigt pour avancer d’une case par flèche.') },
    }),
    sayChoices: false,
  };
}

function repeatQ(n) {
  for (let t = 0; t < 60; t++) {
    const body = [pick(KEYS), pick(KEYS)].slice(0, rand(1, 2));
    if (body.length === 2 && DIR[body[0]].opp === body[1]) continue;
    const times = rand(2, 3);
    const flat = Array.from({ length: times }, () => body).flat();
    const start = [rand(0, n - 1), rand(0, n - 1)];
    const end = run(start, flat, n);
    if (!end || same(end, start)) continue;
    const { marks, answer } = letterOptions(n, start, end, flat);
    const loop = `🔁 ${times}× ( ${arrows(body)} )`;
    return {
      ...wordQ({
        key: `rep-${n}-${cellKey(start)}-${times}-${arrows(body)}`, badge: L('🔁 Repeat!', '🔁 Répète!'),
        text: L('“Repeat” means do it again. Which letter does the robot 🤖 reach?', '« Répète » veut dire recommence. Quelle lettre le robot 🤖 atteint-il?'),
        big: loop,
        say: L(`Repeat ${times} times: ${words(body)}. Which letter does the robot reach?`, `Répète ${times} fois : ${words(body)}. Quelle lettre le robot atteint-il?`),
        visual: card(grid(n, marks)),
        options: ['A', 'B', 'C'],
        answer,
        hint: { text: L(`Write it out: ${arrows(flat)}. Then follow every arrow.`, `Écris-le en entier : ${arrows(flat)}. Puis suis chaque flèche.`) },
      }),
      sayChoices: false,
    };
  }
  return whereEnd(n, 3);
}

function bugQ(n, len) {
  for (let t = 0; t < 80; t++) {
    const w = walk(n, len);
    const k = rand(0, len - 1);
    const bug = w.prog.map((x, j) => (j === k ? DIR[x].opp : x));
    if (!run(w.start, bug, n)) continue;
    // every single-arrow fix that works
    const fixes = [];
    bug.forEach((x, j) => KEYS.filter((d) => d !== x).forEach((d) => {
      const p = bug.map((y, i) => (i === j ? d : y));
      fixes.push({ j, d, ok: same(run(w.start, p, n), w.end) });
    }));
    const good = fixes.filter((f) => f.ok);
    if (good.length !== 1) continue;
    const bad = sample(fixes.filter((f) => !f.ok && run(w.start, bug.map((y, i) => (i === f.j ? f.d : y)), n)), 2);
    if (bad.length < 2) continue;
    const label = (f) => L(`Change step ${f.j + 1} to ${DIR[f.d].e}`, `Change l’étape ${f.j + 1} pour ${DIR[f.d].e}`);
    const say = (f) => L(`Change step ${f.j + 1} to ${L(...DIR[f.d].w)}`, `Change l’étape ${f.j + 1} pour ${L(...DIR[f.d].w)}`);
    const opts = shuffle([good[0], ...bad]);
    const steps = bug.map((x, i) => `<span class="step"><small>${i + 1}</small>${DIR[x].e}</span>`).join('');
    return {
      ...wordQ({
        key: `bug-${n}-${cellKey(w.start)}-${arrows(bug)}-${cellKey(w.end)}`, badge: L('🐞 Find the bug!', '🐞 Trouve l’erreur!'),
        text: L('Oh no, a bug! The robot 🤖 should reach the star ⭐ but this program has a mistake. Which change fixes it?', 'Oh non, une erreur! Le robot 🤖 devrait atteindre l’étoile ⭐ mais ce programme a une erreur. Quel changement la corrige?'),
        big: `<span class="steps">${steps}</span>`,
        say: L(`The robot should reach the star, but the program has a bug: ${words(bug)}. Which change fixes it?`, `Le robot devrait atteindre l’étoile, mais le programme a une erreur : ${words(bug)}. Quel changement la corrige?`),
        visual: card(grid(n, { [cellKey(w.start)]: '🤖', [cellKey(w.end)]: '⭐' })),
        options: opts.map((f) => ({ value: `${f.j}${f.d}`, label: label(f), say: say(f) })),
        answer: `${good[0].j}${good[0].d}`,
        hint: { text: L('Follow the arrows on the grid. Find the step where the robot goes the wrong way.', 'Suis les flèches sur la grille. Trouve l’étape où le robot va dans la mauvaise direction.') },
      }),
      sayChoices: true,
    };
  }
  return reachStar(n, len);
}

export default {
  id: 'coding',
  emoji: '🤖',
  theme: 'robot',
  color: '#455a9e',
  get title() { return L('Robot Dance Party', 'La fête du robot'); },
  get skill() { return L('Coding', 'La programmation'); },
  get blurb() { return L('Give the robot arrow commands to dance to the star!', 'Donne des flèches au robot pour qu’il danse jusqu’à l’étoile!'); },
  get intro() {
    return L(`${M}'s robot is dancing at the Blue Sweaters concert! Write a program of arrows to move it to the star.`,
      `Le robot de ${M} danse au concert des Blue Sweaters! Écris un programme de flèches pour l’amener à l’étoile.`);
  },
  get levels() {
    return {
      mild: { kid: L('Pick the right program', 'Choisis le bon programme'), parent: 'Sequencing: which arrow program moves the robot to the goal (2–3 steps on a 4×4 grid); where does a short program end.' },
      medium: { kid: L('Longer programs and bugs', 'Programmes plus longs et erreurs'), parent: 'Longer sequences on a 5×5 grid; tracing a program to its end; finding and fixing a bug (debugging).' },
      spicy: { kid: L('Repeat and debug', 'Répéter et déboguer'), parent: 'Loops ("repeat 3 times"); debugging longer programs; tracing 4–5 step programs.' },
    };
  },
  get praise() { return L(['Beep boop, you got it! 🤖', 'Great coder! 💻', 'Dance, robot, dance! 💃'], ['Bip bop, bravo! 🤖', 'Super programmeuse! 💻', 'Danse, robot, danse! 💃']); },
  get doneTitles() { return L(['Concert complete! 🎸', 'Code master! 💻'], ['Concert terminé! 🎸', 'Maîtresse du code! 💻']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([() => reachStar(4, rand(2, 3)), () => reachStar(4, rand(2, 3)), () => whereEnd(4, 2)])();
    if (level === 'medium') return pick([() => reachStar(5, rand(3, 5)), () => whereEnd(5, rand(3, 4)), () => bugQ(5, 3), () => bugQ(5, 4)])();
    return pick([() => repeatQ(5), () => repeatQ(5), () => bugQ(5, rand(4, 5)), () => whereEnd(5, 5)])();
  },
};
