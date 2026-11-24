// GRADE 3 FRANÇAIS — articles, -er verbs, agreement: La cuisine de Farrah 🍳 (always in French)
import { pick, sample, shuffle } from '../../../util.js';
import { wordQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';

const { kid: F, sister: M } = FAMILY3;
const base = { lang: 'fr-CA' };
const BADGES = ['🍳 À la cuisine!', '🥞 Miam!', '🥄 On mélange!', '🧂 Une pincée!', '🍽️ À table!'];

// ----- articles: [word, gender (m/f), starts with vowel/h muet] -----
const NOUNS = [
  ['œuf', 'm', true], ['saucisse', 'f'], ['gaufre', 'f'], ['jus', 'm'], ['fromage', 'm'], ['confiture', 'f'], ['bol', 'm'],
  ['assiette', 'f', true], ['fourchette', 'f'], ['couteau', 'm'], ['cuillère', 'f'], ['crêpe', 'f'], ['pomme', 'f'], ['chaudron', 'm'],
  ['orange', 'f', true], ['ananas', 'm', true], ['omelette', 'f', true], ['sirop', 'm'], ['pain', 'm'], ['tomate', 'f'],
];
const PLURAL = (w) => (/(s|x)$/.test(w) ? w : /eau$/.test(w) ? `${w}x` : `${w}s`);

function articleQ(mode) {
  const [w, g, vowel] = pick(NOUNS);
  const plural = Math.random() < 0.35;
  if (mode === 'indef') {
    const ans = plural ? 'des' : (g === 'f' ? 'une' : 'un');
    return wordQ({
      ...base, key: `art-i-${w}-${plural}`, badge: pick(BADGES),
      text: `Choisis le bon mot : <b>___ ${plural ? PLURAL(w) : w}</b>`,
      say: `Choisis le bon mot pour : ${plural ? PLURAL(w) : w}. un, une ou des?`,
      options: shuffle(['un', 'une', 'des']), answer: ans,
      hint: { text: `Un = masculin singulier. Une = féminin singulier. Des = pluriel. « ${w} » est ${g === 'f' ? 'féminin' : 'masculin'}.` },
    });
  }
  // definite
  const ans = plural ? 'les' : vowel ? "l'" : (g === 'f' ? 'la' : 'le');
  const opts = plural ? ['les', 'le', 'la'] : vowel ? ["l'", 'le', 'la'] : ['le', 'la', 'les'];
  return wordQ({
    ...base, key: `art-d-${w}-${plural}`, badge: pick(BADGES),
    text: `Choisis le bon mot : <b>___ ${plural ? PLURAL(w) : w}</b>`,
    say: `Choisis le bon mot pour : ${plural ? PLURAL(w) : w}.`,
    options: shuffle(opts).map((o) => ({ value: o, label: o })), answer: ans,
    hint: { text: plural ? 'Au pluriel, on dit « les ».' : vowel ? `Devant une voyelle ou un h muet, « le » et « la » deviennent « l' ».` : `« ${w} » est ${g === 'f' ? 'féminin : la' : 'masculin : le'}.` },
  });
}

// ----- -er verbs -----
const VERBS = {
  parler: { stem: 'parl' }, danser: { stem: 'dans' }, cuisiner: { stem: 'cuisin' }, chanter: { stem: 'chant' }, jouer: { stem: 'jou' },
  regarder: { stem: 'regard' }, préparer: { stem: 'prépar' }, travailler: { stem: 'travaill' }, aimer: { stem: 'aim', vowel: true },
  écouter: { stem: 'écout', vowel: true }, adorer: { stem: 'ador', vowel: true }, manger: { stem: 'mang', nous: 'mangeons' },
};
const END = { je: 'e', tu: 'es', il: 'e', nous: 'ons', vous: 'ez', ils: 'ent' };
const form = (v, p) => (p === 'nous' && VERBS[v].nous) || `${VERBS[v].stem}${END[p]}`;
const SUBJ = (v, p, who) => ({ je: VERBS[v].vowel ? "J'" : 'Je', tu: 'Tu', il: who || 'Il', nous: 'Nous', vous: 'Vous', ils: 'Elles' }[p]);
const ENDS = {
  parler: 'français avec Gemma.', danser: 'sur la musique.', cuisiner: 'le déjeuner.', chanter: 'dans la douche.', jouer: 'au soccer.',
  regarder: 'un film.', préparer: 'des crêpes.', travailler: 'très fort.', aimer: 'les gaufres.', écouter: 'la radio.', adorer: 'le chili.', manger: 'des céréales.',
};

function verbQ(persons) {
  const v = pick(Object.keys(VERBS));
  const p = pick(persons);
  const who = p === 'il' ? pick(['Il', 'Elle', F, M]) : null;
  const right = form(v, p);
  const wrong = sample(Object.keys(END).filter((x) => form(v, x) !== right).map((x) => form(v, x)), 2);
  const subj = SUBJ(v, p, who);
  return wordQ({
    ...base, key: `er-${v}-${p}-${subj}`, badge: pick(BADGES),
    text: `Verbe <b>${v}</b> : ${subj}${subj.endsWith("'") ? '' : ' '}<span class="qbox">?</span> ${ENDS[v]}`,
    say: `Choisis la bonne forme du verbe ${v}. ${subj}, blanc, ${ENDS[v]}`,
    options: shuffle([right, ...[...new Set(wrong)].slice(0, 2)]), answer: right,
    hint: { text: `Les verbes en -er : je -e, tu -es, il/elle -e, nous -ons, vous -ez, ils/elles -ent. On garde le début du verbe : ${VERBS[v].stem}-.${v === 'manger' ? ' Attention : nous mangeons!' : ''}`, say: `Avec ${p === 'il' ? 'il ou elle' : p === 'ils' ? 'ils ou elles' : p}, on dit ${right}.` },
  });
}

// ----- adjective agreement -----
const ADJ = [
  ['petit', 'petite', 'petits', 'petites'], ['grand', 'grande', 'grands', 'grandes'], ['content', 'contente', 'contents', 'contentes'],
  ['délicieux', 'délicieuse', 'délicieux', 'délicieuses'], ['chaud', 'chaude', 'chauds', 'chaudes'], ['joli', 'jolie', 'jolis', 'jolies'],
  ['froid', 'froide', 'froids', 'froides'], ['mignon', 'mignonne', 'mignons', 'mignonnes'], ['heureux', 'heureuse', 'heureux', 'heureuses'],
];
const NP = [ // [article, noun, index into ADJ forms: 0 ms, 1 fs, 2 mp, 3 fp]
  ['Le', 'chiot', 0], ['Le', 'ballon', 0], ['Le', 'gâteau', 0], ['Le', 'vélo', 0], ['Le', 'sirop', 0],
  ['La', 'gaufre', 1], ['La', 'chambre', 1], ['La', 'crêpe', 1], ['La', 'cousine', 1], ['La', 'soupe', 1],
  ['Les', 'chiots', 2], ['Les', 'gâteaux', 2], ['Les', 'ballons', 2], ['Les', 'cousins', 2],
  ['Les', 'saucisses', 3], ['Les', 'gaufres', 3], ['Les', 'chaussures', 3], ['Les', 'cousines', 3],
];
const FORM_NAME = ['masculin singulier', 'féminin singulier', 'masculin pluriel', 'féminin pluriel'];

function agreeQ() {
  const [art, noun, idx] = pick(NP);
  const adj = pick(ADJ);
  const right = adj[idx];
  const wrong = [...new Set(adj.filter((f) => f !== right))];
  const be = idx >= 2 ? 'sont' : 'est';
  return wordQ({
    ...base, key: `agr-${noun}-${adj[0]}`, badge: pick(BADGES),
    text: `Accorde l'adjectif : ${art} ${noun} ${be} <span class="qbox">?</span> (${adj[0]})`,
    say: `Accorde l'adjectif. ${art} ${noun} ${be}, blanc. Adjectif : ${adj[0]}.`,
    options: shuffle([right, ...sample(wrong, 2)]), answer: right,
    hint: { text: `« ${noun} » est ${FORM_NAME[idx]}. L'adjectif s'accorde : ${right}.`, say: `${noun} est ${FORM_NAME[idx]}. On dit ${right}.` },
  });
}

export default {
  id: 'cuisine',
  emoji: '🍳',
  theme: 'diner',
  color: '#ef6c00',
  forceLang: 'fr',
  title: 'La cuisine de Farrah',
  skill: 'Articles, verbes et accords',
  blurb: 'Un, une, des, les verbes en -er et les accords!',
  intro: `Bienvenue dans la cuisine de ${F}! Pour réussir la recette, il faut les bons mots. Allons-y!`,
  levels: {
    mild: { kid: 'Un, une, des, le, la, les', parent: 'Indefinite and definite articles with food nouns (gender, plural, l\' before a vowel).' },
    medium: { kid: 'Les verbes en -er', parent: 'Present tense of regular -er verbs with je, tu, il/elle, nous (including manger → nous mangeons).' },
    spicy: { kid: 'Tous les verbes et les accords', parent: 'Regular -er verbs with all subject pronouns; agreement of adjectives in gender and number.' },
  },
  praise: ['Délicieux! 🍳', 'Bravo, cheffe! 👩‍🍳', 'Miam miam! 🥞', 'Excellent! 🥄'],
  doneTitles: ['À table! 🍽️', 'Cheffe des mots! 👩‍🍳', 'La recette est réussie! 🥞'],
  makeQuestion(level) {
    if (level === 'mild') return pick([() => articleQ('indef'), () => articleQ('indef'), () => articleQ('def')])();
    if (level === 'medium') return pick([() => verbQ(['je', 'tu', 'il', 'nous']), () => verbQ(['je', 'tu', 'il', 'nous']), () => articleQ('def')])();
    return pick([() => verbQ(['nous', 'vous', 'ils', 'je', 'tu', 'il']), () => verbQ(['nous', 'vous', 'ils']), agreeQ, agreeQ])();
  },
};
