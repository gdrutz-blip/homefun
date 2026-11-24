// GRADE 3 FRANÇAIS — verbs, opposites, plurals: Le studio de danse 💃 (always in French)
import { pick, sample, shuffle } from '../../../util.js';
import { wordQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';

const { kid: F, sister: M } = FAMILY3;
const base = { lang: 'fr-CA' };
// Badges are song-title nods for a Michael Jackson fan.
const BADGES = ['🕺 ABC!', '🎶 Beat It!', '💃 Rock With You!', '🪩 Don’t Stop!', '🧤 Moonwalk!'];

const VERBS = {
  être: { je: 'suis', tu: 'es', il: 'est', nous: 'sommes', vous: 'êtes', ils: 'sont' },
  avoir: { je: 'ai', tu: 'as', il: 'a', nous: 'avons', vous: 'avez', ils: 'ont' },
  aller: { je: 'vais', tu: 'vas', il: 'va', nous: 'allons', vous: 'allez', ils: 'vont' },
};
const ENDINGS = {
  être: ['au studio de danse.', 'en retard pour le cours.', 'sur la scène.', 'dans la salle de danse.'],
  avoir: ['un cours de danse ce soir.', 'des souliers de claquette.', 'un nouveau chiot.', 'faim après le spectacle.'],
  aller: ['au spectacle ce soir.', 'au parc à vélo.', 'à la plage en Jamaïque.', 'au chalet samedi.'],
};
const SUBJECTS = () => [
  { s: 'Je', p: 'je' }, { s: 'Tu', p: 'tu' }, { s: F, p: 'il' }, { s: 'Il', p: 'il' }, { s: 'Elle', p: 'il' },
  { s: 'Nous', p: 'nous' }, { s: 'Vous', p: 'vous' }, { s: `${F} et ${M}`, p: 'ils' }, { s: 'Les cousins', p: 'ils' }, { s: 'Elles', p: 'ils' },
];
const PERSON_HINT = { je: 'je', tu: 'tu', il: 'il / elle', nous: 'nous', vous: 'vous', ils: 'ils / elles' };

function verbQ(verbs, persons) {
  const v = pick(verbs);
  const subj = pick(SUBJECTS().filter((x) => persons.includes(x.p)));
  const right = VERBS[v][subj.p];
  const elide = subj.p === 'je' && /^[aeiou]/.test(right);
  const shownSubj = elide ? 'J’' : subj.s;
  const end = pick(ENDINGS[v]);
  const wrong = sample(Object.values(VERBS[v]).filter((x) => x !== right), 2);
  return wordQ({
    ...base,
    key: `v-${v}-${subj.s}-${end}`, badge: pick(BADGES),
    text: `Verbe <b>${v}</b> : ${shownSubj}${elide ? '' : ' '}<span class="qbox">?</span> ${end}`,
    say: `Choisis le bon verbe ${v}. ${subj.s}, blanc, ${end}`,
    options: shuffle([right, ...wrong]),
    answer: right,
    hint: {
      text: `${v} : ${/^[aeiouhéè]/.test(VERBS[v].je) ? 'j’' : 'je '}${VERBS[v].je}, tu ${VERBS[v].tu}, il/elle ${VERBS[v].il}, nous ${VERBS[v].nous}, vous ${VERBS[v].vous}, ils/elles ${VERBS[v].ils}. Ici, c’est « ${PERSON_HINT[subj.p]} ».`,
      say: `Avec ${PERSON_HINT[subj.p]}, on dit ${right}.`,
    },
  });
}

const OPPOSITES = [
  ['grand', 'petit'], ['chaud', 'froid'], ['rapide', 'lent'], ['content', 'triste'], ['haut', 'bas'],
  ['jour', 'nuit'], ['propre', 'sale'], ['plein', 'vide'], ['ouvert', 'fermé'], ['facile', 'difficile'],
  ['avant', 'après'], ['devant', 'derrière'], ['beaucoup', 'peu'], ['entrer', 'sortir'],
];
function oppositeQ() {
  const pair = pick(OPPOSITES);
  const [w, ans] = Math.random() < 0.5 ? pair : [pair[1], pair[0]];
  const others = sample(OPPOSITES.filter((p) => p !== pair).flat(), 2);
  return wordQ({
    ...base,
    key: `opp-${w}`, badge: pick(BADGES),
    text: `Quel est le contraire de <b>${w}</b>?`,
    say: `Quel est le contraire de ${w}?`,
    options: shuffle([ans, ...others]),
    answer: ans,
    hint: { text: 'Le contraire, c’est le mot qui veut dire l’inverse. Exemple : grand ↔ petit.' },
  });
}

// [singular, plural, tempting wrong answers]
const PLURALS = [
  ['un chiot', 'des chiots', ['des chiotx', 'des chiot']], ['un chapeau', 'des chapeaux', ['des chapeaus', 'des chapeau']],
  ['un gâteau', 'des gâteaux', ['des gâteaus', 'des gâteau']], ['un cheval', 'des chevaux', ['des chevals', 'des chevalx']],
  ['un oiseau', 'des oiseaux', ['des oiseaus', 'des oiseau']], ['un journal', 'des journaux', ['des journals', 'des journalx']],
  ['une souris', 'des souris', ['des sourises', 'des sourix']], ['un bijou', 'des bijoux', ['des bijous', 'des bijou']],
  ['une gaufre', 'des gaufres', ['des gaufrex', 'des gaufre']], ['un œil', 'des yeux', ['des œils', 'des œilx']],
  ['un jeu', 'des jeux', ['des jeus', 'des jeu']], ['un ballon', 'des ballons', ['des ballonx', 'des ballon']],
];
function pluralQ() {
  const [sing, plur, wrongs] = pick(PLURALS);
  return wordQ({
    ...base,
    key: `pl-${sing}`, badge: pick(BADGES),
    text: `Un, deux, trois! Écris au pluriel : <b>${sing}</b> → <span class="qbox">?</span>`,
    say: `Comment dit-on ${sing} au pluriel?`,
    options: shuffle([plur, ...wrongs]),
    answer: plur,
    hint: { text: 'La plupart des mots prennent un -s. Les mots en -eau et -eu prennent un -x. Les mots en -al deviennent -aux. Attention aux exceptions!', say: `Au pluriel, on dit ${plur}.` },
  });
}

export default {
  id: 'danse',
  emoji: '💃',
  theme: 'dance',
  color: '#c2185b',
  forceLang: 'fr',
  title: 'Le studio de danse',
  skill: 'Verbes et mots',
  blurb: 'Être, avoir, aller, contraires et pluriels — au rythme de la musique!',
  intro: `Bienvenue au studio de danse, ${F}! Chaque bonne réponse est un nouveau pas de danse. Que la musique commence!`,
  levels: {
    mild: { kid: 'Être et avoir (je, tu, il, elle)', parent: 'Present tense of être and avoir with je, tu, il/elle; simple opposites.' },
    medium: { kid: 'Être, avoir et aller avec tout le monde', parent: 'Present tense of être, avoir, aller with all subject pronouns; opposites.' },
    spicy: { kid: 'Verbes, contraires et pluriels', parent: 'Mixed verbs with all subjects; opposites; irregular plurals (-eau → -eaux, -al → -aux, œil → yeux).' },
  },
  praise: ['Quel pas de danse! 💃', 'Bravo, la star! 🌟', 'Tu bouges bien! 🕺', 'Encore! 🎶'],
  doneTitles: ['Le spectacle est terminé! 💃', 'Standing ovation! 👏', 'Tu es une star! 🌟'],
  makeQuestion(level) {
    if (level === 'mild') return pick([() => verbQ(['être', 'avoir'], ['je', 'tu', 'il']), () => verbQ(['être', 'avoir'], ['je', 'tu', 'il']), oppositeQ])();
    if (level === 'medium') return pick([() => verbQ(['être', 'avoir', 'aller'], ['je', 'tu', 'il', 'nous', 'vous', 'ils']), () => verbQ(['être', 'avoir', 'aller'], ['je', 'tu', 'il', 'nous', 'vous', 'ils']), oppositeQ])();
    return pick([() => verbQ(['être', 'avoir', 'aller'], ['nous', 'vous', 'ils']), pluralQ, pluralQ, oppositeQ])();
  },
};

