// GRADE 3 SCIENCE — Growth and Changes in Plants: Farrah's Chili Garden 🌶️ / Le potager à chili de Farrah
import { pick, sample, shuffle } from '../../../util.js';
import { wordQ, factQ } from '../../common.js';
import { sequence, card } from '../../../visuals.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M, uncle, uncleFr } = FAMILY3;
const BADGES = () => L(['🌶️ Chili garden!', '🌱 Grow, grow!', '🪴 Garden time!', '🐝 Busy bees!'], ['🌶️ Potager à chili!', '🌱 Pousse, pousse!', '🪴 Au jardin!', '🐝 Les abeilles!']);

const PARTS = () => ({
  roots: { n: L('roots', 'les racines'), job: L('soak up water and hold the plant in the soil', 'absorbent l’eau et tiennent la plante dans le sol') },
  stem: { n: L('stem', 'la tige'), job: L('holds the plant up and carries water to the leaves', 'tient la plante debout et transporte l’eau jusqu’aux feuilles') },
  leaves: { n: L('leaves', 'les feuilles'), job: L('use sunlight to make food for the plant', 'utilisent la lumière du soleil pour fabriquer la nourriture de la plante') },
  flower: { n: L('flower', 'la fleur'), job: L('makes seeds so new plants can grow', 'fabrique des graines pour que de nouvelles plantes poussent') },
  fruit: { n: L('fruit', 'le fruit'), job: L('protects the seeds inside it', 'protège les graines à l’intérieur') },
});

const EAT = () => [
  { e: '🥕', n: L('a carrot', 'une carotte'), p: 'roots' }, { e: '🥬', n: L('lettuce', 'la laitue'), p: 'leaves' },
  { e: '🥦', n: L('broccoli', 'le brocoli'), p: 'flower' }, { e: '🍎', n: L('an apple', 'une pomme'), p: 'fruit' },
  { e: '🍅', n: L('a tomato', 'une tomate'), p: 'fruit' }, { e: '🌶️', n: L('a chili pepper', 'un piment'), p: 'fruit' },
  { e: '🍓', n: L('a strawberry', 'une fraise'), p: 'fruit' }, { e: '🌿', n: L('celery', 'le céleri'), p: 'stem' },
  { e: '🫛', n: L('peas', 'les pois'), p: 'seeds' }, { e: '🌽', n: L('corn kernels', 'les grains de maïs'), p: 'seeds' },
  { e: '🫘', n: L('beans for chili', 'les haricots pour le chili'), p: 'seeds' },
];
const PART_LABEL = () => ({ roots: L('root', 'racine'), stem: L('stem', 'tige'), leaves: L('leaf', 'feuille'), flower: L('flower', 'fleur'), fruit: L('fruit', 'fruit'), seeds: L('seed', 'graine') });

function partJob() {
  const parts = PARTS();
  const k = pick(Object.keys(parts));
  return wordQ({
    key: `job-${k}`, badge: pick(BADGES()),
    text: L(`Which part of a plant ${parts[k].job}?`, `Quelle partie de la plante ${parts[k].job}?`),
    visual: card('<span class="big-emoji">🪴</span>'),
    options: sample(Object.keys(parts), 3, k).map((x) => ({ value: x, label: parts[x].n })),
    answer: k,
    hint: { text: L('Roots are underground, the stem holds it up, leaves catch sunlight, flowers make seeds, fruit protects seeds.', 'Les racines sont sous la terre, la tige tient la plante, les feuilles captent le soleil, les fleurs font des graines, le fruit protège les graines.') },
  });
}

function weEat() {
  const it = pick(EAT());
  const labels = PART_LABEL();
  return wordQ({
    key: `eat-${it.e}`, badge: L('🥗 Snack from the garden!', '🥗 Collation du jardin!'),
    text: L(`${F} picks ${it.n} for her chili. Which part of the plant is it?`, `${F} cueille ${it.n} pour son chili. Quelle partie de la plante est-ce?`),
    visual: card(`<span class="big-emoji">${it.e}</span>`),
    options: sample(Object.keys(labels), 3, it.p).map((x) => ({ value: x, label: labels[x] })),
    answer: it.p,
    hint: { text: L('If it has seeds inside, it is a fruit (even tomatoes and peppers!). Carrots grow underground, so they are roots.', 'S’il a des graines à l’intérieur, c’est un fruit (même la tomate et le piment!). Les carottes poussent sous la terre : ce sont des racines.') },
  });
}

function needs() {
  const real = L(['sunlight', 'water', 'air', 'soil with nutrients', 'space to grow'], ['la lumière du soleil', 'de l’eau', 'de l’air', 'un sol nutritif', 'de l’espace pour pousser']);
  const fake = pick(L(['candy', 'a blanket', 'music', 'a toy'], ['des bonbons', 'une couverture', 'de la musique', 'un jouet']));
  return wordQ({
    key: `need-${fake}`, badge: pick(BADGES()),
    text: L('Which one is NOT something a plant needs to grow?', 'Lequel n’est PAS un besoin d’une plante?'),
    options: shuffle([...sample(real, 3), fake]),
    answer: fake,
    hint: { text: L('Plants need sunlight, water, air, good soil and space.', 'Les plantes ont besoin de soleil, d’eau, d’air, d’un bon sol et d’espace.') },
  });
}

function lifeCycle() {
  const stages = [['🫘', L('seed', 'graine')], ['🌱', L('sprout', 'pousse')], ['🪴', L('young plant', 'jeune plante')], ['🌼', L('flowering plant', 'plante en fleur')], ['🌶️', L('fruit with seeds', 'fruit avec graines')]];
  const blank = 1 + Math.floor(Math.random() * 4);
  const wrong = sample(stages.map((_, i) => i).filter((i) => i !== blank), 2);
  return {
    ...wordQ({
      key: `cycle-${blank}`, badge: L('🔄 Life cycle!', '🔄 Cycle de vie!'),
      text: L('This is the life cycle of a chili plant. What goes in the empty box?', 'Voici le cycle de vie d’un plant de piment. Qu’est-ce qui va dans la case vide?'),
      visual: sequence(stages.map((s) => `${s[0]}<small>${s[1]}</small>`), { blank, cls: 'words', jumps: '➜' }),
      options: shuffle([blank, ...wrong]).map((i) => ({ value: i, label: `${stages[i][0]} ${stages[i][1]}`, say: stages[i][1] })),
      answer: blank,
      hint: { text: L('Seed → sprout → young plant → flowers → fruit with new seeds… and it starts again!', 'Graine → pousse → jeune plante → fleurs → fruit avec de nouvelles graines… et ça recommence!') },
    }),
    revealSay: stages[blank][1],
  };
}

const SEEDS = () => [
  { e: '🌼', t: L('Dandelion seeds have fluffy parachutes. How do they travel?', 'Les graines de pissenlit ont des petits parachutes. Comment voyagent-elles?'), a: L('By the wind', 'Par le vent') },
  { e: '🍁', t: L(`The maple trees at ${uncle}'s cottage drop "helicopter" seeds that spin. How do they travel?`, `Les érables au chalet de ${uncleFr} laissent tomber des graines « hélicoptères ». Comment voyagent-elles?`), a: L('By the wind', 'Par le vent') },
  { e: '🐕', t: L('Burrs stick to a puppy’s fur and fall off later. How do these seeds travel?', 'Des graines qui piquent s’accrochent au poil d’un chiot. Comment voyagent-elles?'), a: L('By animals', 'Par les animaux') },
  { e: '🐦', t: L('A bird eats berries and drops the seeds far away. How do the seeds travel?', 'Un oiseau mange des petits fruits et laisse tomber les graines plus loin. Comment voyagent-elles?'), a: L('By animals', 'Par les animaux') },
  { e: '🥥', t: L('A coconut falls into the ocean and floats to a new beach in Jamaica. How did it travel?', 'Une noix de coco tombe dans l’océan et flotte jusqu’à une plage de la Jamaïque. Comment a-t-elle voyagé?'), a: L('By water', 'Par l’eau') },
];

function seedTravel() {
  const s = pick(SEEDS());
  const all = [L('By the wind', 'Par le vent'), L('By animals', 'Par les animaux'), L('By water', 'Par l’eau')];
  return factQ({ ...s, o: all.filter((x) => x !== s.a), h: L('Seeds move by wind, water or animals so new plants can grow in new places.', 'Les graines voyagent par le vent, l’eau ou les animaux pour pousser à de nouveaux endroits.') }, { badge: L('🌬️ Seed travel!', '🌬️ Les graines voyagent!'), prefix: 'seed' });
}

const FACTS = () => [
  { e: '🌞', t: L(`${F} puts a plant by the window. After a week, it leans toward the window. Why?`, `${F} met une plante près de la fenêtre. Après une semaine, elle penche vers la fenêtre. Pourquoi?`), a: L('Plants grow toward light', 'Les plantes poussent vers la lumière'), o: [L('The plant is tired', 'La plante est fatiguée'), L('The wind pushed it', 'Le vent l’a poussée')], h: L('Leaves need sunlight to make food, so plants turn toward light.', 'Les feuilles ont besoin de soleil pour faire leur nourriture, alors la plante se tourne vers la lumière.') },
  { e: '🐝', t: L('Why are bees important for the chili garden?', 'Pourquoi les abeilles sont-elles importantes pour le potager?'), a: L('They carry pollen from flower to flower so fruit can grow', 'Elles transportent le pollen de fleur en fleur pour que les fruits poussent'), o: [L('They water the plants', 'Elles arrosent les plantes'), L('They eat the weeds', 'Elles mangent les mauvaises herbes')], h: L('Bees spread pollen. Pollen helps flowers turn into fruit with seeds.', 'Les abeilles transportent le pollen. Le pollen aide les fleurs à devenir des fruits.') },
  { e: '👕', t: L('Which of these comes from a plant?', 'Lequel vient d’une plante?'), a: L('A cotton T-shirt', 'Un t-shirt en coton'), o: [L('A glass marble', 'Une bille de verre'), L('A metal spoon', 'Une cuillère en métal')], h: L('Cotton grows on a plant! Wood, paper and many foods come from plants too.', 'Le coton pousse sur une plante! Le bois, le papier et beaucoup d’aliments viennent aussi des plantes.') },
  { e: '🌳', t: L('What do plants give off that people and animals need to breathe?', 'Que donnent les plantes dont les humains et les animaux ont besoin pour respirer?'), a: L('Oxygen', 'L’oxygène'), o: [L('Smoke', 'De la fumée'), L('Sand', 'Du sable')], h: L('Leaves make oxygen while they make food.', 'Les feuilles fabriquent de l’oxygène quand elles font leur nourriture.') },
  { e: '🍂', t: L(`In the fall at ${uncle}'s cottage, why do maple leaves change colour and fall off?`, `À l’automne au chalet de ${uncleFr}, pourquoi les feuilles d’érable changent-elles de couleur et tombent-elles?`), a: L('The tree gets ready for winter', 'L’arbre se prépare pour l’hiver'), o: [L('The tree is sick', 'L’arbre est malade'), L('Squirrels pull them off', 'Les écureuils les arrachent')], h: L('Less sunlight and cold weather mean the tree rests for winter.', 'Moins de soleil et le froid : l’arbre se repose pour l’hiver.') },
  { e: '🌵', t: L('A cactus has thick stems that store water. Where does it live?', 'Un cactus a des tiges épaisses qui gardent l’eau. Où vit-il?'), a: L('In a hot, dry desert', 'Dans un désert chaud et sec'), o: [L('In a pond', 'Dans un étang'), L('Under the snow', 'Sous la neige')], h: L('Storing water helps plants live where it rarely rains.', 'Garder de l’eau aide la plante à vivre là où il pleut peu.') },
];

function fact() {
  return factQ(pick(FACTS()), { badge: pick(BADGES()), prefix: 'pf' });
}

export default {
  id: 'plants',
  emoji: '🌱',
  theme: 'garden',
  color: '#2e7d32',
  get title() { return L(`${F}'s Chili Garden`, `Le potager à chili de ${F}`); },
  get skill() { return L('Plants grow & change', 'La croissance des plantes'); },
  get blurb() { return L('Grow tomatoes, peppers and beans for the best chili ever!', 'Fais pousser tomates, piments et haricots pour le meilleur chili!'); },
  get intro() {
    return L(`${F} is growing a garden so she can make the best chili ever! Help her learn how plants grow and change.`,
      `${F} fait pousser un potager pour préparer le meilleur chili! Aide-la à découvrir comment les plantes poussent et changent.`);
  },
  get levels() {
    return {
      mild: { kid: L('Plant parts and needs', 'Parties et besoins des plantes'), parent: 'Parts of a plant and their jobs; what plants need to grow.' },
      medium: { kid: L('Life cycles and plants we eat', 'Cycle de vie et plantes qu’on mange'), parent: 'Plant life cycle; which part of the plant we eat (root, stem, leaf, flower, fruit, seed).' },
      spicy: { kid: L('Seeds, bees and plant facts', 'Graines, abeilles et plantes'), parent: 'Seed dispersal, pollination, plants growing toward light, adaptations, how people use plants.' },
    };
  },
  get praise() { return L(['Growing strong! 🌱', 'Spicy smart! 🌶️', 'Bloomin’ great! 🌼'], ['Ça pousse! 🌱', 'Piquante et brillante! 🌶️', 'En pleine floraison! 🌼']); },
  get doneTitles() { return L(['Harvest time! 🌶️', 'Green thumb! 🌱'], ['C’est la récolte! 🌶️', 'Tu as le pouce vert! 🌱']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([partJob, partJob, needs])();
    if (level === 'medium') return pick([lifeCycle, weEat, weEat, partJob])();
    return pick([seedTravel, fact, fact, weEat])();
  },
};

