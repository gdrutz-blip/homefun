// FRANÇAIS — Vocabulary: Super Mots 🎮 (video-game theme, always in French)
import { pick, sample, shuffle } from '../../util.js';
import { wordQ, emojiQ } from '../common.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';

const { kid: M } = FAMILY;

// [emoji, word, gender, category]
const WORDS = [
  ['🐈', 'chat', 'm', 'animaux'], ['🐕', 'chien', 'm', 'animaux'], ['🐟', 'poisson', 'm', 'animaux'], ['🐦', 'oiseau', 'm', 'animaux'],
  ['🐄', 'vache', 'f', 'animaux'], ['🐎', 'cheval', 'm', 'animaux'], ['🐰', 'lapin', 'm', 'animaux'], ['🐻', 'ours', 'm', 'animaux'],
  ['🐸', 'grenouille', 'f', 'animaux'], ['🐭', 'souris', 'f', 'animaux'], ['🐢', 'tortue', 'f', 'animaux'], ['🦋', 'papillon', 'm', 'animaux'],
  ['🍎', 'pomme', 'f', 'nourriture'], ['🍌', 'banane', 'f', 'nourriture'], ['🍞', 'pain', 'm', 'nourriture'], ['🧀', 'fromage', 'm', 'nourriture'],
  ['🥛', 'lait', 'm', 'nourriture'], ['🍓', 'fraise', 'f', 'nourriture'], ['🍪', 'biscuit', 'm', 'nourriture'], ['🍕', 'pizza', 'f', 'nourriture'],
  ['🥕', 'carotte', 'f', 'nourriture'], ['🍦', 'crème glacée', 'f', 'nourriture'], ['🥚', 'œuf', 'm', 'nourriture'], ['🍫', 'chocolat', 'm', 'nourriture'],
  ['✏️', 'crayon', 'm', 'école'], ['📚', 'livre', 'm', 'école'], ['✂️', 'ciseaux', 'm', 'école'], ['🎒', 'sac à dos', 'm', 'école'],
  ['🏠', 'maison', 'f', 'choses'], ['🚗', 'voiture', 'f', 'choses'], ['⚽', 'ballon', 'm', 'choses'], ['🪑', 'chaise', 'f', 'choses'],
  ['🌳', 'arbre', 'm', 'nature'], ['☀️', 'soleil', 'm', 'nature'], ['🌙', 'lune', 'f', 'nature'], ['⭐', 'étoile', 'f', 'nature'],
  ['🌸', 'fleur', 'f', 'nature'], ['🌧️', 'pluie', 'f', 'nature'], ['❄️', 'neige', 'f', 'nature'], ['🌈', 'arc-en-ciel', 'm', 'nature'],
].filter((w) => w[1] !== 'ciseaux'); // plural-only word: skip for un/une questions

const COLOURS = [['🔴', 'rouge'], ['🔵', 'bleu'], ['🟢', 'vert'], ['🟡', 'jaune'], ['🟠', 'orange'], ['🟣', 'violet'], ['⚫', 'noir'], ['⚪', 'blanc'], ['🟤', 'brun']];

const vowel = (w) => /^[aeiouéèêœh]/i.test(w);
const un = (w) => (w[2] === 'f' ? 'une' : 'un');
const le = (w) => (vowel(w[1]) ? "l'" : w[2] === 'f' ? 'la ' : 'le ');
const withLe = (w) => `${le(w)}${w[1]}`;
const BADGES = ['🎮 Niveau 1!', '🕹️ Bonus!', '⭐ Super Mots!', '👾 Défi!'];
const base = { lang: 'fr-CA' };

function pictureToWord(level) {
  const w = pick(WORDS);
  const pool = level === 'mild' ? WORDS.filter((x) => x[3] === w[3]) : WORDS;
  const others = sample(pool.filter((x) => x[1] !== w[1]), 2);
  return wordQ({
    ...base,
    key: `p2w-${w[1]}`, badge: pick(BADGES),
    text: 'Quel est le bon mot pour cette image?',
    visual: card(`<span class="big-emoji">${w[0]}</span>`),
    options: shuffle([w, ...others]).map((x) => ({ value: x[1], label: `${un(x)} ${x[1]}` })),
    answer: w[1],
    hint: { text: `C'est ${un(w)} ${w[1]}. Écoute bien! 🔊`, say: `C'est ${un(w)} ${w[1]}.` },
  });
}

function wordToPicture() {
  const w = pick(WORDS);
  const others = sample(WORDS.filter((x) => x[1] !== w[1]), 3);
  return emojiQ({
    ...base,
    key: `w2p-${w[1]}`, badge: pick(BADGES),
    text: `Touche : <b>${un(w)} ${w[1]}</b>`,
    say: `Touche : ${un(w)} ${w[1]}`,
    options: shuffle([w, ...others]).map((x) => ({ value: x[1], e: x[0] })),
    answer: w[1],
    revealSay: `${un(w)} ${w[1]}`,
    hint: { text: `Lis le mot lentement : ${w[1]}.` },
  });
}

function colourQ() {
  const c = pick(COLOURS);
  const asWord = Math.random() < 0.5;
  if (asWord) {
    const others = sample(COLOURS.filter((x) => x[1] !== c[1]), 2);
    return wordQ({
      ...base,
      key: `col-w-${c[1]}`, badge: '🎨 Les couleurs!',
      text: 'De quelle couleur est ce rond?',
      visual: card(`<span class="big-emoji">${c[0]}</span>`),
      options: shuffle([c, ...others]).map((x) => ({ value: x[1], label: x[1] })),
      answer: c[1],
      hint: { text: `C'est ${c[1]}!` },
    });
  }
  const others = sample(COLOURS.filter((x) => x[1] !== c[1]), 3);
  return emojiQ({
    ...base,
    key: `col-p-${c[1]}`, badge: '🎨 Les couleurs!',
    text: `Touche la couleur <b>${c[1]}</b>.`,
    say: `Touche la couleur ${c[1]}.`,
    options: shuffle([c, ...others]).map((x) => ({ value: x[1], e: x[0] })),
    answer: c[1],
    revealSay: c[1],
    hint: { text: `Écoute encore : ${c[1]}.` },
  });
}

function genderQ(kind) {
  const w = pick(kind === 'le' ? WORDS.filter((x) => !vowel(x[1])) : WORDS);
  const opts = kind === 'le' ? ['le', 'la'] : ['un', 'une'];
  const ans = kind === 'le' ? le(w).trim() : un(w);
  return wordQ({
    ...base,
    key: `g-${kind}-${w[1]}`, badge: '🕹️ Masculin ou féminin?',
    text: `Choisis le bon petit mot : ___ ${w[1]}`,
    say: `Choisis le bon petit mot pour : ${w[1]}. ${opts[0]} ou ${opts[1]}?`,
    visual: card(`<span class="big-emoji">${w[0]}</span>`),
    options: opts.map((o) => ({ value: o, label: `${o} ${w[1]}` })),
    answer: ans,
    hint: { text: `Dis-le à voix haute. Lequel sonne mieux : « ${opts[0]} ${w[1]} » ou « ${opts[1]} ${w[1]} »?` },
  });
}

function oddOneOut() {
  const cats = ['animaux', 'nourriture', 'nature'];
  const cat = pick(cats);
  const three = sample(WORDS.filter((x) => x[3] === cat), 3);
  const odd = pick(WORDS.filter((x) => x[3] !== cat));
  const all = shuffle([...three, odd]);
  return wordQ({
    ...base,
    key: `odd-${odd[1]}-${three.map((x) => x[1]).join()}`, badge: '👾 L’intrus!',
    text: 'Quel mot ne va pas avec les autres?',
    options: all.map((x) => ({ value: x[1], label: `${x[0]} ${x[1]}` })),
    answer: odd[1],
    revealSay: odd[1],
    hint: { text: `Trois mots sont dans la même famille : ${cat}. Trouve celui qui est différent!` },
  });
}

function missingLetter() {
  const w = pick(WORDS.filter((x) => /^[a-z]+$/.test(x[1]) && x[1].length >= 4 && x[1].length <= 7));
  const vowelsIdx = [...w[1]].map((ch, i) => ('aeiou'.includes(ch) ? i : -1)).filter((i) => i > 0);
  const i = pick(vowelsIdx.length ? vowelsIdx : [1]);
  const letter = w[1][i];
  const shown = `${w[1].slice(0, i)}_${w[1].slice(i + 1)}`;
  const opts = shuffle([letter, ...sample('aeiou'.split('').filter((x) => x !== letter), 2)]);
  return wordQ({
    ...base,
    key: `miss-${w[1]}-${i}`, badge: '⭐ Lettre mystère!',
    text: `Quelle lettre manque? <b class="spell">${shown}</b>`,
    say: `Quelle lettre manque dans le mot ${w[1]}?`,
    visual: card(`<span class="big-emoji">${w[0]}</span>`),
    options: opts.map((x) => ({ value: x, label: x })),
    answer: letter,
    hint: { text: `Dis le mot lentement : ${w[1].split('').join(' - ')}.`, say: `Dis le mot lentement : ${w[1]}.` },
  });
}

export default {
  id: 'mots',
  emoji: '🎮',
  theme: 'console',
  color: '#e4000f',
  forceLang: 'fr',
  title: 'Super Mots',
  skill: 'Le vocabulaire',
  blurb: 'Gagne des niveaux en apprenant des mots!',
  intro: `Bienvenue dans Super Mots, ${M}! Chaque bon mot te fait monter de niveau. Prête? C'est parti!`,
  levels: {
    mild: { kid: 'Images et mots', parent: 'Picture ↔ word matching (animals, food, school, nature); colours. All spoken in French.' },
    medium: { kid: 'Un ou une? Les couleurs', parent: 'Gender with un/une and le/la; mixed picture/word matching; colours.' },
    spicy: { kid: 'L’intrus et les lettres mystères', parent: 'Odd-one-out by category, missing-letter spelling, harder word/picture matching.' },
  },
  praise: ['Niveau suivant! 🎮', 'Bonus! ⭐', 'Super! 🕹️', 'Combo! 👾'],
  doneTitles: ['Niveau terminé! 🎮', 'Tu as gagné! 🏆', 'Score parfait! ⭐'],
  makeQuestion(level) {
    if (level === 'mild') return pick([() => pictureToWord('mild'), wordToPicture, colourQ])();
    if (level === 'medium') return pick([() => genderQ('un'), () => genderQ('le'), () => pictureToWord('medium'), colourQ])();
    return pick([oddOneOut, missingLetter, missingLetter, () => genderQ('le'), wordToPicture])();
  },
};
