// GRADE 3 FRANÇAIS — reading comprehension: Le journal de Farrah 📓 (doodle diary, always in French)
import { pick, shuffle } from '../../../util.js';
import { wordQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';

const { kid: F, sister: M, baby: G, cousins, uncleFr } = FAMILY3;
const [LO, LA, SY] = cousins;
const base = { lang: 'fr-CA' };
const BADGES = ['📓 Mon journal', '✏️ Gribouillis!', '📖 Lecture!', '🖍️ Dessin du jour'];

// Short diary entries (with a doodle) and questions about them. a = right answer, o = wrong answers.
const ENTRIES = [
  {
    d: '🐶🎾', t: `Samedi, ${F} va au parc avec son chiot Biscuit. Biscuit court après une balle. Après, ils mangent des gaufres.`,
    qs: [
      { q: 'Quand est-ce que Farrah va au parc?', a: 'Samedi', o: ['Lundi', 'Ce soir'] },
      { q: 'Qui est Biscuit?', a: 'Un chiot', o: ['Un chat', 'Un cousin'] },
      { q: 'Qu’est-ce qu’ils mangent après?', a: 'Des gaufres', o: ['De la pizza', 'Du chili'] },
    ],
  },
  {
    d: '🟢✨', t: `Ce matin, ${M} fait du slime vert. Elle met des paillettes dedans. ${G} veut le toucher!`,
    qs: [
      { q: 'De quelle couleur est le slime?', a: 'Vert', o: ['Rouge', 'Bleu'] },
      { q: 'Qui veut toucher le slime?', a: G, o: [F, LA] },
      { q: 'Qu’est-ce que Mia met dans le slime?', a: 'Des paillettes', o: ['Des céréales', 'Du sable'] },
    ],
  },
  {
    d: '🛶☀️🍕', t: `Au chalet de ${uncleFr}, il fait chaud. ${F} nage dans le lac. Le soir, toute la famille mange de la pizza.`,
    qs: [
      { q: 'Où est-ce que Farrah nage?', a: 'Dans le lac', o: ['Dans la piscine', 'Dans la mer'] },
      { q: 'Quel temps fait-il?', a: 'Il fait chaud', o: ['Il neige', 'Il pleut'] },
      { q: 'Que mange la famille le soir?', a: 'De la pizza', o: ['Des œufs', 'Des crêpes'] },
    ],
  },
  {
    d: '💃🎶', t: `Lundi, ${F} a son cours de danse. Elle apprend un nouveau mouvement. Ensuite, elle danse sur sa chanson préférée.`,
    qs: [
      { q: 'Quel jour est le cours de danse?', a: 'Lundi', o: ['Samedi', 'Dimanche'] },
      { q: 'Qu’est-ce que Farrah apprend?', a: 'Un nouveau mouvement', o: ['Une nouvelle recette', 'Un nouveau jeu'] },
    ],
  },
  {
    d: '🛏️🧸', t: `${F} fait son lit chaque matin. Elle place ses toutous en rang. Sa chambre est toujours bien rangée!`,
    qs: [
      { q: 'Quand est-ce que Farrah fait son lit?', a: 'Chaque matin', o: ['Le soir', 'Jamais'] },
      { q: 'Comment est sa chambre?', a: 'Bien rangée', o: ['En désordre', 'Toute sale'] },
      { q: 'Que place-t-elle en rang?', a: 'Ses toutous', o: ['Ses souliers', 'Ses livres'] },
    ],
  },
  {
    d: '🌧️⛺', t: `Il pleut. ${LA} et ${SY} restent à la maison. Ils construisent une cabane avec des couvertures.`,
    qs: [
      { q: 'Pourquoi restent-ils à la maison?', a: 'Parce qu’il pleut', o: ['Parce qu’ils sont malades', 'Parce qu’il fait nuit'] },
      { q: 'Avec quoi construisent-ils la cabane?', a: 'Des couvertures', o: ['Des blocs', 'Du bois'] },
      { q: 'Qui construit la cabane?', a: `${LA} et ${SY}`, o: [`${F} et ${M}`, `${LO} et ${G}`] },
    ],
  },
  {
    d: '🍳🥣', t: `${F} prépare le déjeuner : des œufs, des saucisses et des céréales. ${LO} aide à mettre la table.`,
    qs: [
      { q: 'Qui aide Farrah?', a: LO, o: [M, SY] },
      { q: 'Que fait Lorelai?', a: 'Elle met la table', o: ['Elle fait la vaisselle', 'Elle dort'] },
      { q: 'Qu’est-ce que Farrah ne prépare PAS?', a: 'Du chili', o: ['Des œufs', 'Des céréales'] },
    ],
  },
  {
    d: '🏝️🐠', t: `En Jamaïque, la mer est bleue et le sable est chaud. ${F} voit un petit poisson jaune près des rochers.`,
    qs: [
      { q: 'De quelle couleur est le poisson?', a: 'Jaune', o: ['Bleu', 'Vert'] },
      { q: 'Où est-ce que Farrah voit le poisson?', a: 'Près des rochers', o: ['Dans la piscine', 'Sur le sable'] },
      { q: 'Comment est le sable?', a: 'Chaud', o: ['Froid', 'Mouillé'] },
    ],
  },
  {
    d: '🚲🤕', t: `${F} fait du vélo trop vite dans la côte. Elle tombe et se fait mal au genou. Maintenant, elle porte toujours son casque et va plus lentement.`,
    qs: [
      { q: 'Pourquoi Farrah tombe-t-elle?', a: 'Elle va trop vite', o: ['Son vélo est cassé', 'Il fait noir'] },
      { q: 'Qu’est-ce qu’elle a appris?', a: 'Aller plus lentement', o: ['Ne plus jamais faire de vélo', 'Aller encore plus vite'] },
    ],
  },
];

const QWORDS = [
  { q: '___ habites-tu? — J’habite en Ontario.', a: 'Où' },
  { q: '___ est ton anniversaire? — C’est en mai.', a: 'Quand' },
  { q: '___ est ta meilleure amie? — C’est ma cousine Lorelai.', a: 'Qui' },
  { q: '___ de chiots as-tu? — J’en ai deux.', a: 'Combien' },
  { q: '___ es-tu fatiguée? — Parce que j’ai dansé toute la journée.', a: 'Pourquoi' },
  { q: '___ manges-tu? — Je mange une gaufre.', a: 'Que' },
  { q: '___ vas-tu au chalet? — Samedi.', a: 'Quand' },
  { q: '___ est le chalet? — Près d’un grand lac.', a: 'Où' },
];

function entryQ(hard) {
  const pool = hard ? ENTRIES : ENTRIES.slice(0, 6);
  const e = pick(pool);
  const qq = pick(e.qs);
  return wordQ({
    ...base,
    key: `j-${qq.q}`, badge: pick(BADGES),
    text: `<span class="diary">${e.d}<br>${e.t}</span><br><b>${qq.q}</b>`,
    say: `${e.t} ${qq.q}`,
    options: shuffle([qq.a, ...qq.o]),
    answer: qq.a,
    hint: { text: 'Relis la page du journal. La réponse est cachée dans une des phrases!', say: `Relis la page : ${e.t}` },
    plain: `${e.t} — ${qq.q}`,
  });
}

function qwordQ() {
  const w = pick(QWORDS);
  const all = ['Qui', 'Où', 'Quand', 'Combien', 'Pourquoi', 'Que'];
  const opts = shuffle([w.a, ...shuffle(all.filter((x) => x !== w.a)).slice(0, 2)]);
  return wordQ({
    ...base,
    key: `qw-${w.q}`, badge: '❓ Mot-question',
    text: `Quel mot-question va dans le trou?<br><b>${w.q}</b>`,
    say: `Quel mot-question va dans le trou? ${w.q.replace('___', 'blanc')}`,
    options: opts,
    answer: w.a,
    hint: { text: 'Qui = une personne. Où = un endroit. Quand = un moment. Combien = un nombre. Pourquoi = une raison. Que = une chose.' },
  });
}

const SENTENCES = [
  ['Farrah aime les chiots.', 'farrah aime les chiots.', 'Aime Farrah les chiots.'],
  ['Mia fait du slime.', 'Mia fait du slime', 'Slime du fait Mia.'],
  ['Nous allons au parc.', 'nous allons au parc', 'Nous allez au parc.'],
  ['Les cousins sont contents.', 'Les cousins est contents.', 'les cousins sont contents'],
  ['Gemma a un toutou.', 'Gemma as un toutou.', 'gemma a un toutou'],
  ['Je suis prête!', 'Je es prête!', 'je suis prête'],
];
function sentenceQ() {
  const s = pick(SENTENCES);
  return wordQ({
    ...base,
    key: `s-${s[0]}`, badge: '✏️ Phrase parfaite',
    text: 'Quelle phrase est bien écrite?',
    options: shuffle([...s]),
    answer: s[0],
    hint: { text: 'Une phrase commence par une majuscule, finit par un point, les mots sont dans le bon ordre et le verbe va avec le sujet.' },
  });
}

export default {
  id: 'journal',
  emoji: '📓',
  theme: 'doodle',
  color: '#455a64',
  forceLang: 'fr',
  title: 'Le journal de Farrah',
  skill: 'Lecture et écriture',
  blurb: 'Lis les pages de son journal plein de dessins!',
  intro: `${F} écrit tout dans son journal plein de dessins et de gribouillis. Lis ses pages et réponds aux questions!`,
  levels: {
    mild: { kid: 'Mots-questions', parent: 'Question words (qui, où, quand, combien, pourquoi, que) and short diary entries.' },
    medium: { kid: 'Lis le journal', parent: 'Reading comprehension of short diary entries (who, where, when, what).' },
    spicy: { kid: 'Lecture et phrases parfaites', parent: 'Harder reading (why, what was learned, what is NOT mentioned) and choosing the correctly written sentence (capitals, punctuation, word order, subject–verb agreement).' },
  },
  praise: ['Super lectrice! 📖', 'Bravo! ✏️', 'Génial! 📓', 'Tu lis comme une pro! 🌟'],
  doneTitles: ['Journal terminé! 📓', 'Quelle lectrice! 📖'],
  makeQuestion(level) {
    if (level === 'mild') return pick([qwordQ, qwordQ, () => entryQ(false)])();
    if (level === 'medium') return pick([() => entryQ(false), () => entryQ(false), qwordQ])();
    return pick([() => entryQ(true), () => entryQ(true), sentenceQ, sentenceQ])();
  },
};
