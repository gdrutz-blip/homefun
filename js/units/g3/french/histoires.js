// GRADE 3 FRANÇAIS — reading stories: Les histoires de Farrah 📚 (always in French)
import { pick, shuffle } from '../../../util.js';
import { wordQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';

const { kid: F, sister: M, baby: G, cousins, uncleFr } = FAMILY3;
const [LO] = cousins;
const base = { lang: 'fr-CA' };
const BADGES = ['📚 Une histoire!', '🔍 Lis bien!', '✏️ Détective de lecture!', '🖍️ Un petit conte!'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// kind: lit = who/what/where, seq = order, inf = why / feelings, vocab = word meaning, title = best title
const STORIES = [
  {
    id: 'chili', d: '🌶️🍲',
    t: `${F} veut préparer du chili pour toute la famille. Elle met des haricots, des tomates et beaucoup de piment dans la marmite. Quand elle goûte, elle crie : « Ouf! C’est trop piquant! » Alors, elle ajoute du fromage et de la crème. Maintenant, tout le monde en reprend deux fois!`,
    qs: [
      { k: 'lit', q: `Qu’est-ce que ${F} prépare?`, a: 'Du chili', o: ['Des crêpes', 'Une salade'] },
      { k: 'inf', q: `Pourquoi ${F} crie-t-elle « Ouf! »?`, a: 'Le chili est trop piquant', o: ['Le chili est froid', 'Elle a perdu sa cuillère'] },
      { k: 'lit', q: `Qu’est-ce que ${F} ajoute pour corriger le chili?`, a: 'Du fromage et de la crème', o: ['Du sel et du sucre', 'Plus de piment'] },
      { k: 'seq', q: 'Qu’est-ce qui arrive en dernier?', a: 'Tout le monde en reprend deux fois', o: ['Elle goûte le chili', 'Elle met du piment'] },
      { k: 'title', q: 'Quel titre va le mieux avec cette histoire?', a: 'Un chili sauvé!', o: ['Un jour de pluie', 'Le chat perdu'] },
    ],
  },
  {
    id: 'spectacle', d: '💃🎶',
    t: `Samedi, c’est le grand spectacle de danse. ${F} a le trac. Ses mains tremblent et son cœur bat très vite. Sa cousine ${LO} lui dit : « Respire, tu es prête! » Sur la scène, la musique commence et ${F} oublie sa peur. À la fin, tout le monde applaudit.`,
    qs: [
      { k: 'lit', q: 'Quand a lieu le spectacle?', a: 'Samedi', o: ['Lundi', 'Dimanche'] },
      { k: 'lit', q: `Qui encourage ${F}?`, a: `Sa cousine ${LO}`, o: [M, `Oncle Aaron`] },
      { k: 'vocab', q: 'Que veut dire « avoir le trac »?', a: 'Être nerveux avant quelque chose', o: ['Avoir très faim', 'Être très fatigué'] },
      { k: 'inf', q: `Que se passe-t-il quand la musique commence?`, a: `${F} oublie sa peur`, o: [`${F} sort de la scène`, `${F} pleure`] },
      { k: 'seq', q: 'Qu’est-ce qui arrive après la danse?', a: 'Tout le monde applaudit', o: [`${F} a le trac`, `${LO} dit « Respire! »`] },
    ],
  },
  {
    id: 'chiot', d: '🐶🧺',
    t: `Biscuit, le chiot de ${F}, a disparu! ${F} cherche dans le jardin, sous le lit et derrière le divan. Enfin, elle entend un petit ronflement. Biscuit dort dans le panier à linge, enroulé dans une serviette. ${F} rit et prend une photo.`,
    qs: [
      { k: 'lit', q: 'Où est Biscuit?', a: 'Dans le panier à linge', o: ['Dans le jardin', 'Sous le lit'] },
      { k: 'lit', q: 'Que fait Biscuit?', a: 'Il dort', o: ['Il mange', 'Il joue'] },
      { k: 'seq', q: `Où ${F} cherche-t-elle en premier?`, a: 'Dans le jardin', o: ['Sous le lit', 'Derrière le divan'] },
      { k: 'inf', q: `Pourquoi ${F} rit-elle?`, a: 'Elle est contente et Biscuit est drôle', o: ['Elle est triste', 'Elle a peur'] },
      { k: 'vocab', q: 'Que veut dire « disparu »?', a: 'On ne le trouve plus', o: ['Il est très grand', 'Il est très sale'] },
    ],
  },
  {
    id: 'velo', d: '🚲🌧️',
    t: `${F} et ${M} font du vélo sur le sentier près du chalet. Soudain, il commence à pleuvoir. Elles se dépêchent de rentrer. Oncle Aaron leur donne des serviettes et du chocolat chaud. Dehors, la pluie tombe fort, mais à l’intérieur, il fait bon.`,
    qs: [
      { k: 'lit', q: 'Où font-elles du vélo?', a: 'Sur le sentier près du chalet', o: ['Dans le parc', 'Dans la ville'] },
      { k: 'lit', q: 'Qu’est-ce qui arrive soudainement?', a: 'Il commence à pleuvoir', o: ['Il commence à neiger', 'Un chien apparaît'] },
      { k: 'inf', q: 'Pourquoi se dépêchent-elles de rentrer?', a: 'Pour ne pas être trempées', o: ['Parce qu’elles ont faim', 'Parce qu’elles sont fâchées'] },
      { k: 'vocab', q: 'Que veut dire « se dépêcher »?', a: 'Aller vite', o: ['Aller doucement', 'S’asseoir'] },
      { k: 'lit', q: 'Qu’est-ce qu’Oncle Aaron leur donne?', a: 'Des serviettes et du chocolat chaud', o: ['Des vélos', 'Des parapluies'] },
    ],
  },
  {
    id: 'journal', d: '🍌🖍️',
    t: `Cher journal, aujourd’hui j’ai gardé ${G}. Elle a mangé sa banane, puis elle a mis la banane dans mes cheveux! J’ai dessiné un monstre-banane dans mon cahier. ${G} a ri très fort. Finalement, c’était une très bonne journée.`,
    qs: [
      { k: 'lit', q: 'Qui a mis la banane dans les cheveux?', a: G, o: [M, LO] },
      { k: 'lit', q: 'Qu’est-ce que la narratrice dessine?', a: 'Un monstre-banane', o: ['Un chien', 'Une maison'] },
      { k: 'inf', q: 'Qui écrit ce texte?', a: `${F}, qui garde ${G}`, o: [`${G}, qui mange sa banane`, `${M}, qui dessine`] },
      { k: 'inf', q: 'Comment la journée se termine-t-elle?', a: 'Très bien', o: ['Très mal', 'Dans la tristesse'] },
      { k: 'title', q: 'Quel titre va le mieux?', a: 'La banane dans les cheveux', o: ['Le grand spectacle', 'Un voyage en Jamaïque'] },
    ],
  },
  {
    id: 'lit', d: '🛏️🧸',
    t: `Chaque matin, ${F} fait son lit. D’abord, elle tire le drap bien serré. Ensuite, elle met l’oreiller au bon endroit. Enfin, elle place ses toutous en rang. Sa chambre est si bien rangée que ${M} dit : « Tu es la reine du rangement! »`,
    qs: [
      { k: 'seq', q: 'Que fait-elle en premier?', a: 'Elle tire le drap', o: ['Elle met l’oreiller', 'Elle place les toutous'] },
      { k: 'seq', q: 'Que fait-elle en dernier?', a: 'Elle place ses toutous en rang', o: ['Elle tire le drap', 'Elle met l’oreiller'] },
      { k: 'lit', q: 'Qui dit « Tu es la reine du rangement! »?', a: M, o: [G, LO] },
      { k: 'inf', q: `Pourquoi ${M} dit-elle ça?`, a: 'Parce que la chambre est très bien rangée', o: ['Parce que la chambre est en désordre', 'Parce que Farrah dort'] },
      { k: 'vocab', q: 'Que veut dire « en rang »?', a: 'L’un à côté de l’autre, bien alignés', o: ['Tout mélangés', 'Cachés sous le lit'] },
    ],
  },
];

const KINDS_BY_LEVEL = { mild: ['lit'], medium: ['lit', 'seq'], spicy: ['inf', 'vocab', 'title', 'seq'] };

function storyQ(level) {
  const kinds = KINDS_BY_LEVEL[level];
  const pool = STORIES.flatMap((s) => s.qs.filter((q) => kinds.includes(q.k)).map((q) => ({ s, q })));
  const { s, q } = pick(pool);
  return wordQ({
    ...base,
    key: `h-${s.id}-${q.q}`, badge: pick(BADGES),
    text: `<span class="diary">${s.d}<br>${s.t}</span><br><b>${q.q}</b>`,
    say: `${s.t} ${q.q}`,
    options: shuffle([q.a, ...q.o]), answer: q.a,
    hint: { text: q.k === 'vocab' ? 'Relis la phrase. Les mots autour t’aident à trouver le sens.' : q.k === 'title' ? 'Pense à ce qui se passe dans toute l’histoire, pas juste une phrase.' : q.k === 'seq' ? 'Cherche les mots : d’abord, ensuite, enfin, à la fin.' : 'Relis l’histoire. La réponse est cachée dans les phrases!', say: `Relis l’histoire : ${s.t}` },
    plain: `${s.t} — ${q.q}`,
  });
}

export default {
  id: 'histoires',
  emoji: '📚',
  theme: 'doodle',
  color: '#6a1b9a',
  forceLang: 'fr',
  title: 'Les histoires de Farrah',
  skill: 'Lecture d’histoires',
  blurb: 'Lis de petites histoires et réponds aux questions!',
  intro: `${F} adore lire! Lis chaque histoire lentement, puis réponds aux questions. Tu peux toucher un mot pour l’entendre!`,
  levels: {
    mild: { kid: 'Qui? Quoi? Où?', parent: 'Short story reading: literal questions (who, what, where, when).' },
    medium: { kid: 'Qui, quoi et dans quel ordre?', parent: 'Literal questions plus sequencing (first, next, last).' },
    spicy: { kid: 'Pourquoi? Sens des mots et titres', parent: 'Inference (why, how does she feel), vocabulary in context, best title, sequencing.' },
  },
  praise: ['Super lectrice! 📚', 'Bravo! ✏️', 'Tu as tout compris! 🌟', 'Quelle détective! 🔍'],
  doneTitles: ['Histoire terminée! 📚', 'Quelle lectrice! 🌟'],
  makeQuestion(level) { return storyQ(level); },
};
