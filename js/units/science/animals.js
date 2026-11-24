// SCIENCE — Growth and Changes in Animals: Gemma's Animal Book 🐣 / Le livre des animaux de Gemma
import { pick, sample, shuffle } from '../../util.js';
import { wordQ, emojiQ } from '../common.js';
import { sequence, card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L, aAn } from '../../i18n.js';

const { kid: M, baby: G } = FAMILY;

// Animal names: [English, French]
const A = {
  cow: { e: '🐄', n: ['cow', 'vache'], f: "la vache", baby: ['calf', 'veau'] },
  horse: { e: '🐎', n: ['horse', 'cheval'], f: "le cheval", baby: ['foal', 'poulain'] },
  sheep: { e: '🐑', n: ['sheep', 'mouton'], f: "le mouton", baby: ['lamb', 'agneau'] },
  cat: { e: '🐈', n: ['cat', 'chat'], f: "le chat", baby: ['kitten', 'chaton'] },
  dog: { e: '🐕', n: ['dog', 'chien'], f: "le chien", baby: ['puppy', 'chiot'] },
  bear: { e: '🐻', n: ['bear', 'ours'], f: "l'ours", baby: ['cub', 'ourson'] },
  duck: { e: '🦆', n: ['duck', 'canard'], f: "le canard", baby: ['duckling', 'caneton'] },
  hen: { e: '🐔', n: ['chicken', 'poule'], f: "la poule", baby: ['chick', 'poussin'] },
  frog: { e: '🐸', n: ['frog', 'grenouille'], f: "la grenouille", baby: ['tadpole', 'têtard'] },
  butterfly: { e: '🦋', n: ['butterfly', 'papillon'], f: "le papillon", baby: ['caterpillar', 'chenille'] },
  lion: { e: '🦁', n: ['lion', 'lion'], f: "le lion", baby: ['cub', 'lionceau'] },
  pig: { e: '🐖', n: ['pig', 'cochon'], f: "le cochon", baby: ['piglet', 'porcelet'] },
  owl: { e: '🦉', n: ['owl', 'hibou'], f: "le hibou" },
  parrot: { e: '🦜', n: ['parrot', 'perroquet'], f: "le perroquet" },
  penguin: { e: '🐧', n: ['penguin', 'manchot'], f: "le manchot" },
  fish: { e: '🐟', n: ['fish', 'poisson'], f: "le poisson" },
  snake: { e: '🐍', n: ['snake', 'serpent'], f: "le serpent" },
  croc: { e: '🐊', n: ['crocodile', 'crocodile'], f: "le crocodile" },
  lizard: { e: '🦎', n: ['lizard', 'lézard'], f: "le lézard" },
  turtle: { e: '🐢', n: ['turtle', 'tortue'], f: "la tortue" },
  snail: { e: '🐌', n: ['snail', 'escargot'], f: "l'escargot" },
  rabbit: { e: '🐇', n: ['rabbit', 'lapin'], f: "le lapin" },
  fox: { e: '🦊', n: ['fox', 'renard'], f: "le renard" },
  deer: { e: '🦌', n: ['deer', 'cerf'], f: "le cerf" },
  giraffe: { e: '🦒', n: ['giraffe', 'girafe'], f: "la girafe" },
  koala: { e: '🐨', n: ['koala', 'koala'], f: "le koala" },
  wolf: { e: '🐺', n: ['wolf', 'loup'], f: "le loup" },
  bee: { e: '🐝', n: ['bee', 'abeille'], f: "l'abeille" },
};
const cap1 = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const name = (k) => L(...A[k].n);
const babyName = (k) => L(...A[k].baby);
/** French with article: "la vache", "l'ours". */
const le = (k) => A[k].f;
/** "du chat", "de la vache", "de l'ours" */
const du = (k) => A[k].f.replace(/^le /, 'du ').replace(/^la /, 'de la ').replace(/^l'/, "de l'");
const Cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);

const WITH_BABIES = Object.keys(A).filter((k) => A[k].baby);
const EGG_LAYERS = ['hen', 'duck', 'frog', 'butterfly', 'fish', 'snake', 'turtle', 'croc', 'owl', 'penguin', 'bee'];
const LIVE_BORN = ['cow', 'horse', 'sheep', 'cat', 'dog', 'bear', 'pig', 'rabbit', 'fox', 'deer', 'giraffe', 'lion'];

const COVER = {
  fur: { n: ['fur', 'de la fourrure'], who: ['bear', 'cat', 'dog', 'rabbit', 'fox', 'sheep', 'koala'] },
  feathers: { n: ['feathers', 'des plumes'], who: ['owl', 'hen', 'duck', 'parrot', 'penguin'] },
  scales: { n: ['scales', 'des écailles'], who: ['fish', 'snake', 'croc', 'lizard'] },
  shell: { n: ['a shell', 'une carapace'], who: ['turtle', 'snail'] },
};

const DIET = {
  plants: { n: ['only plants', 'seulement des plantes'], word: ['a herbivore', 'un herbivore'], who: ['cow', 'horse', 'sheep', 'rabbit', 'deer', 'giraffe', 'koala'] },
  meat: { n: ['only meat', 'seulement de la viande'], word: ['a carnivore', 'un carnivore'], who: ['lion', 'wolf', 'owl', 'snake', 'croc'] },
  both: { n: ['plants and meat', 'des plantes et de la viande'], word: ['an omnivore', 'un omnivore'], who: ['bear', 'pig', 'hen', 'fox'] },
};

// Life cycles: [emoji, English, French]
const CYCLES = {
  butterfly: [['🥚', 'egg', 'œuf'], ['🐛', 'caterpillar', 'chenille'], ['🪺', 'chrysalis', 'chrysalide'], ['🦋', 'butterfly', 'papillon']],
  frog: [['🥚', 'egg', 'œuf'], ['💧', 'tadpole', 'têtard'], ['🐸', 'froglet', 'jeune grenouille'], ['🐸', 'frog', 'grenouille']],
  hen: [['🥚', 'egg', 'œuf'], ['🐣', 'hatching chick', 'poussin qui éclot'], ['🐥', 'chick', 'poussin'], ['🐔', 'chicken', 'poule']],
};
const stageName = (s) => L(s[1], s[2]);

const BADGES = () => L(['🐣 Animal book!', '🐾 Animal tracks!', '🔍 Nature detective!'], ['🐣 Livre des animaux!', '🐾 Traces d’animaux!', '🔍 Détective nature!']);

// ---------- question makers ----------
function babyOf() {
  const k = pick(WITH_BABIES);
  const seenNames = new Set([babyName(k)]);
  const others = shuffle(WITH_BABIES).filter((x) => !seenNames.has(babyName(x)) && seenNames.add(babyName(x))).slice(0, 2);
  return wordQ({
    key: `baby-${k}`, badge: pick(BADGES()),
    text: L(`${G} sees ${aAn(name(k))}. What is a baby ${name(k)} called?`, `Comment s'appelle le bébé ${du(k)}?`),
    visual: card(`<span class="big-emoji">${A[k].e}</span>`),
    options: shuffle([k, ...others]).map((x) => ({ value: babyName(x), label: babyName(x) })),
    answer: babyName(k),
    hint: { text: L(`A baby ${name(k)} is called a ${babyName(k)}.`, `Le bébé s'appelle : ${babyName(k)}.`) },
  });
}

function eggOrBorn() {
  const egg = pick([true, false]);
  const target = pick(egg ? EGG_LAYERS : LIVE_BORN);
  const others = sample(egg ? LIVE_BORN : EGG_LAYERS, 2);
  return emojiQ({
    key: `egg-${egg}-${target}`, badge: '🥚',
    text: egg
      ? L('Which baby animal hatches from an EGG?', 'Quel bébé animal sort d’un ŒUF?')
      : L('Which baby animal is BORN alive (not from an egg)?', 'Quel bébé animal NAÎT vivant (pas dans un œuf)?'),
    options: shuffle([target, ...others]).map((k) => ({ value: k, e: A[k].e, say: name(k) })),
    answer: target,
    hint: {
      text: L('Birds, fish, frogs, insects, snakes and turtles lay eggs. Most furry animals are born alive.',
        'Les oiseaux, les poissons, les grenouilles, les insectes, les serpents et les tortues pondent des œufs. La plupart des animaux à fourrure naissent vivants.'),
    },
  });
}

function covering() {
  const c = pick(Object.keys(COVER));
  const k = pick(COVER[c].who);
  return wordQ({
    key: `cover-${k}`, badge: pick(BADGES()),
    text: L(`What covers ${aAn(name(k))}'s body?`, `Qu'est-ce qui couvre le corps ${du(k)}?`),
    visual: card(`<span class="big-emoji">${A[k].e}</span>`),
    options: Object.keys(COVER).map((x) => ({ value: x, label: L(...COVER[x].n) })),
    answer: c,
    hint: { text: L('Fur is soft and hairy. Feathers are on birds. Scales are smooth and shiny, like on a fish.', 'La fourrure est douce. Les plumes sont sur les oiseaux. Les écailles sont lisses et brillantes, comme sur un poisson.') },
  });
}

function lifeCycle(level) {
  const which = pick(Object.keys(CYCLES));
  const cyc = CYCLES[which];
  const blank = level === 'medium' ? 1 + Math.floor(Math.random() * 3) : 3;
  const items = cyc.map((s) => `${s[0]}<small>${stageName(s)}</small>`);
  const label = L({ butterfly: 'butterfly', frog: 'frog', hen: 'chicken' }[which], { butterfly: 'papillon', frog: 'grenouille', hen: 'poule' }[which]);
  const wrong = sample(cyc.map((_, i) => i).filter((i) => i !== blank), 2);
  const opts = shuffle([blank, ...wrong]);
  return {
    ...wordQ({
      key: `cycle-${which}-${blank}`, badge: L('🔄 Life cycle!', '🔄 Cycle de vie!'),
      text: L(`This is the life cycle of a ${label}. What goes in the empty box?`, `Voici le cycle de vie : ${label}. Qu'est-ce qui va dans la case vide?`),
      visual: sequence(items, { blank, cls: 'words', jumps: '➜' }),
      options: opts.map((i) => ({ value: i, label: stageName(cyc[i]) })),
      answer: blank,
      hint: { text: L(`It goes: ${cyc.map(stageName).join(' → ')}.`, `L'ordre est : ${cyc.map(stageName).join(' → ')}.`) },
    }),
    revealSay: stageName(cyc[blank]),
  };
}

function diet() {
  const d = pick(Object.keys(DIET));
  const k = pick(DIET[d].who);
  const askWord = Math.random() < 0.5;
  return wordQ({
    key: `diet-${k}-${askWord}`, badge: L('🍽️ Dinner time!', '🍽️ L’heure du repas!'),
    text: askWord
      ? L(`${cap1(aAn(name(k)))} eats ${L(...DIET[d].n)}. What kind of eater is it?`, `${Cap(le(k))} mange ${L(...DIET[d].n)}. Quel genre de mangeur est-ce?`)
      : L(`What does ${aAn(name(k))} eat?`, `Que mange ${le(k)}?`),
    visual: card(`<span class="big-emoji">${A[k].e}</span>`),
    options: Object.keys(DIET).map((x) => ({ value: x, label: askWord ? L(...DIET[x].word) : L(...DIET[x].n) })),
    answer: d,
    hint: {
      text: L('Herbivores eat plants. Carnivores eat meat. Omnivores eat both!',
        'Les herbivores mangent des plantes. Les carnivores mangent de la viande. Les omnivores mangent les deux!'),
    },
  });
}

function needs() {
  const real = L(['food', 'water', 'air', 'a safe home'], ['de la nourriture', 'de l’eau', 'de l’air', 'un abri sûr']);
  const fake = pick(L(['a tablet', 'a toy car', 'a hat', 'candy'], ['une tablette', 'une petite voiture', 'un chapeau', 'des bonbons']));
  const opts = shuffle([...sample(real, 3), fake]);
  return wordQ({
    key: `needs-${fake}`, badge: L('🌱 Growing up!', '🌱 Grandir!'),
    text: L('All baby animals need things to grow. Which one is NOT a need?', 'Tous les bébés animaux ont besoin de choses pour grandir. Lequel n’est PAS un besoin?'),
    options: opts,
    answer: fake,
    hint: { text: L('Animals need food, water, air and a safe place to live.', 'Les animaux ont besoin de nourriture, d’eau, d’air et d’un endroit sûr pour vivre.') },
  });
}

export default {
  id: 'animals',
  emoji: '🐣',
  theme: 'animals',
  color: '#4caf50',
  get title() { return L(`${G}'s Animal Book`, `Le livre des animaux de ${G}`); },
  get skill() { return L('Animals grow & change', 'La croissance des animaux'); },
  get blurb() { return L('Baby animals, eggs, fur, feathers and life cycles!', 'Bébés animaux, œufs, plumes et cycles de vie!'); },
  get intro() {
    return L(`${M} is reading ${G}'s favourite animal book with her. Help ${G} learn how animals grow and change!`,
      `${M} lit le livre d'animaux préféré de ${G}. Aide ${G} à apprendre comment les animaux grandissent et changent!`);
  },
  get levels() {
    return {
      mild: { kid: L('Baby animals and eggs', 'Les bébés et les œufs'), parent: 'Names of baby animals; which animals hatch from eggs vs. are born alive.' },
      medium: { kid: L('Life cycles and body coverings', 'Cycles de vie et corps des animaux'), parent: 'Missing stage in butterfly/frog/chicken life cycles; fur, feathers, scales, shells.' },
      spicy: { kid: L('What animals eat and need', 'Ce que les animaux mangent et leurs besoins'), parent: 'Herbivore/carnivore/omnivore; basic needs of animals; next stage in a life cycle.' },
    };
  },
  get praise() { return L(['Wild! 🐾', 'Roar-some! 🦁', 'Hoot hoot! 🦉'], ['Super! 🐾', 'Rrrr-génial! 🦁', 'Hou hou! 🦉']); },
  get doneTitles() { return L([`${G} loves it! 🐣`, 'Animal expert! 🐾'], [`${G} adore ça! 🐣`, 'Experte des animaux! 🐾']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([babyOf, babyOf, eggOrBorn])();
    if (level === 'medium') return pick([() => lifeCycle('medium'), () => lifeCycle('medium'), covering, eggOrBorn])();
    return pick([diet, diet, needs, () => lifeCycle('spicy'), covering])();
  },
};

