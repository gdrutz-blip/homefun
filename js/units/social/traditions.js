// SOCIAL STUDIES — Changing Family and Community Traditions: Family Celebrations 🎉 / Les fêtes en famille
import { pick, sample, shuffle } from '../../util.js';
import { wordQ, emojiQ } from '../common.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;

const CELEB = {
  birthday: { e: '🎂', n: ['a birthday', 'un anniversaire'], season: null },
  halloween: { e: '🎃', n: ['Halloween', "l'Halloween"], season: 'fall', month: 10 },
  christmas: { e: '🎄', n: ['Christmas', 'Noël'], season: 'winter', month: 12 },
  diwali: { e: '🪔', n: ['Diwali', 'Diwali'], season: 'fall' },
  lunar: { e: '🧧', n: ['Lunar New Year', 'le Nouvel An lunaire'], season: 'winter' },
  hanukkah: { e: '🕎', n: ['Hanukkah', 'Hanoukka'], season: 'winter' },
  canada: { e: '🍁', n: ['Canada Day', 'la fête du Canada'], season: 'summer', month: 7 },
  thanks: { e: '🦃', n: ['Thanksgiving', "l'Action de grâce"], season: 'fall', month: 10 },
  eid: { e: '🌙', n: ['Eid al-Fitr', "l'Aïd al-Fitr"] },
  valentine: { e: '💝', n: ["Valentine's Day", 'la Saint-Valentin'], season: 'winter', month: 2 },
  earth: { e: '🌎', n: ['Earth Day', 'le Jour de la Terre'], season: 'spring', month: 4 },
  newyear: { e: '🎆', n: ["New Year's Day", 'le jour de l’An'], season: 'winter', month: 1 },
};
const cn = (k) => L(...CELEB[k].n);

const SEASONS = { winter: ['winter', "l'hiver"], spring: ['spring', 'le printemps'], summer: ['summer', "l'été"], fall: ['fall', "l'automne"] };
const MONTHS = [null, ['January', 'janvier'], ['February', 'février'], ['March', 'mars'], ['April', 'avril'], ['May', 'mai'], ['June', 'juin'],
  ['July', 'juillet'], ['August', 'août'], ['September', 'septembre'], ['October', 'octobre'], ['November', 'novembre'], ['December', 'décembre']];

const SYMBOL_FACTS = () => ({
  birthday: L('Birthdays have cake and candles!', "Les anniversaires ont un gâteau et des bougies!"),
  halloween: L('Halloween has jack-o’-lanterns and costumes.', "L'Halloween a des citrouilles et des costumes."),
  christmas: L('Many families decorate a tree at Christmas.', 'Beaucoup de familles décorent un sapin à Noël.'),
  diwali: L('Diwali is a festival of lights. Families light little oil lamps called diyas.', 'Diwali est une fête des lumières. Les familles allument de petites lampes appelées diyas.'),
  lunar: L('At Lunar New Year, children often get red envelopes with money for good luck.', 'Au Nouvel An lunaire, les enfants reçoivent souvent des enveloppes rouges pour la chance.'),
  hanukkah: L('At Hanukkah, families light candles on a menorah for eight nights.', 'À Hanoukka, les familles allument les bougies d’une ménorah pendant huit soirs.'),
  canada: L('Canada Day has maple leaf flags and fireworks on July 1.', 'La fête du Canada a des drapeaux à la feuille d’érable et des feux d’artifice le 1er juillet.'),
  thanks: L('At Thanksgiving, families share a big meal and say what they are thankful for.', "À l'Action de grâce, les familles partagent un grand repas et disent merci."),
  eid: L('Eid al-Fitr starts when the new crescent moon is seen.', "L'Aïd al-Fitr commence quand on voit le nouveau croissant de lune."),
  valentine: L("Valentine's Day has hearts and cards for people we love.", 'La Saint-Valentin a des cœurs et des cartes pour les gens qu’on aime.'),
  earth: L('On Earth Day, people help take care of our planet.', 'Le Jour de la Terre, on prend soin de notre planète.'),
  newyear: L("On New Year's Day we start a brand new year!", 'Le jour de l’An, on commence une nouvelle année!'),
});

function symbolQ() {
  const k = pick(Object.keys(CELEB));
  const others = sample(Object.keys(CELEB).filter((x) => x !== k), 3);
  return emojiQ({
    key: `sym-${k}`, badge: L('🎉 Party time!', '🎉 C’est la fête!'),
    text: L(`Which picture goes with ${cn(k)}?`, `Quelle image va avec ${cn(k)}?`),
    options: shuffle([k, ...others]).map((x) => ({ value: x, e: CELEB[x].e, say: cn(x) })),
    answer: k,
    revealSay: cn(k),
    hint: { text: SYMBOL_FACTS()[k] },
  });
}

function nameQ() {
  const k = pick(Object.keys(CELEB));
  const others = sample(Object.keys(CELEB).filter((x) => x !== k), 2);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  return wordQ({
    key: `celname-${k}`, badge: L('🎉 Party time!', '🎉 C’est la fête!'),
    text: L('Which celebration is this?', 'Quelle fête est-ce?'),
    visual: card(`<span class="big-emoji">${CELEB[k].e}</span>`),
    options: shuffle([k, ...others]).map((x) => ({ value: x, label: cap(cn(x)) })),
    answer: k,
    hint: { text: SYMBOL_FACTS()[k] },
  });
}

function seasonQ() {
  const k = pick(Object.keys(CELEB).filter((x) => CELEB[x].season && CELEB[x].month));
  return wordQ({
    key: `season-${k}`, badge: L('📅 Calendar!', '📅 Le calendrier!'),
    text: L(`In which season is ${cn(k)}?`, `En quelle saison est ${cn(k)}?`),
    visual: card(`<span class="big-emoji">${CELEB[k].e}</span>`),
    options: Object.keys(SEASONS).map((s) => ({ value: s, label: L(...SEASONS[s]) })),
    answer: CELEB[k].season,
    hint: { text: L(`${cn(k)} is in ${MONTHS[CELEB[k].month][0]}.`, `${cn(k).charAt(0).toUpperCase() + cn(k).slice(1)} est en ${MONTHS[CELEB[k].month][1]}.`) },
  });
}

function monthQ() {
  const k = pick(Object.keys(CELEB).filter((x) => CELEB[x].month));
  const m = CELEB[k].month;
  const opts = shuffle([m, ...sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((x) => x !== m), 2)]);
  return wordQ({
    key: `month-${k}`, badge: L('📅 Calendar!', '📅 Le calendrier!'),
    text: L(`In which month is ${cn(k)}?`, `En quel mois est ${cn(k)}?`),
    visual: card(`<span class="big-emoji">${CELEB[k].e}</span>`),
    options: opts.map((x) => ({ value: x, label: L(...MONTHS[x]) })),
    answer: m,
    hint: { text: L(`Think about the weather at ${cn(k)}. Is it cold, warm or hot?`, `Pense à la météo pendant cette fête. Fait-il froid, doux ou chaud?`) },
  });
}

const FAMILY_Q = () => [
  { t: L("Your mom's mom is your…", 'La mère de ta mère, c’est ta…'), a: L('grandmother', 'grand-mère'), o: [L('aunt', 'tante'), L('cousin', 'cousine')] },
  { t: L("Your dad's dad is your…", 'Le père de ton père, c’est ton…'), a: L('grandfather', 'grand-père'), o: [L('uncle', 'oncle'), L('brother', 'frère')] },
  { t: L("Your mom's sister is your…", 'La sœur de ta mère, c’est ta…'), a: L('aunt', 'tante'), o: [L('grandmother', 'grand-mère'), L('cousin', 'cousine')] },
  { t: L("Your dad's brother is your…", 'Le frère de ton père, c’est ton…'), a: L('uncle', 'oncle'), o: [L('cousin', 'cousin'), L('grandfather', 'grand-père')] },
  { t: L("Your aunt's daughter is your…", 'La fille de ta tante, c’est ta…'), a: L('cousin', 'cousine'), o: [L('sister', 'sœur'), L('aunt', 'tante')] },
  { t: L(`${G} is ${M}'s baby sister. So ${M} is ${G}'s…`, `${G} est la petite sœur de ${M}. Alors ${M} est la…`), a: L('big sister', 'grande sœur'), o: [L('mom', 'maman'), L('cousin', 'cousine')] },
  { t: L(`${F} and ${M} are…`, `${F} et ${M} sont…`), a: L('sisters', 'sœurs'), o: [L('cousins', 'cousines'), L('aunts', 'tantes')] },
];

function familyQ() {
  const f = pick(FAMILY_Q());
  return wordQ({
    key: `fam-${f.a}`, badge: L('👨‍👩‍👧‍👧 Family tree!', '👨‍👩‍👧‍👧 L’arbre généalogique!'), text: f.t,
    options: shuffle([f.a, ...f.o]), answer: f.a,
    hint: { text: L('Draw a little family tree in your head. Who is whose mom, dad, sister or brother?', 'Imagine un petit arbre généalogique. Qui est la maman, le papa, la sœur ou le frère de qui?') },
  });
}

const CHANGE_Q = () => [
  { t: L('Long ago, families sent letters by mail. Today they can also…', 'Il y a longtemps, les familles envoyaient des lettres. Aujourd’hui, elles peuvent aussi…'), a: L('video call', 'faire un appel vidéo'), o: [L('send a carrier pigeon', 'envoyer un pigeon voyageur'), L('ride a horse to visit', 'aller à cheval')] },
  { t: L('Long ago, families listened to music on records. Today we often use…', 'Il y a longtemps, on écoutait de la musique sur des disques. Aujourd’hui, on utilise souvent…'), a: L('phones and speakers', 'des téléphones et des haut-parleurs'), o: [L('only drums', 'seulement des tambours'), L('candles', 'des bougies')] },
  { t: L('A tradition is something a family…', 'Une tradition, c’est quelque chose qu’une famille…'), a: L('does again and again, often for a special day', 'refait souvent, surtout pour une journée spéciale'), o: [L('does only one time ever', 'fait une seule fois'), L('never talks about', 'ne dit jamais')] },
  { t: L('Why do families have traditions?', 'Pourquoi les familles ont-elles des traditions?'), a: L('To feel close and remember what is special to them', 'Pour être proches et se souvenir de ce qui compte'), o: [L('To make homework longer', 'Pour avoir plus de devoirs'), L('Because it is a rule at school', 'Parce que c’est une règle à l’école')] },
];

function changeQ() {
  const c = pick(CHANGE_Q());
  return wordQ({
    key: `chg-${c.a}`, badge: L('⏳ Then and now!', '⏳ Avant et maintenant!'), text: c.t,
    options: shuffle([c.a, ...c.o]), answer: c.a,
    hint: { text: L('Think about what your own family does today.', 'Pense à ce que ta famille fait aujourd’hui.') },
  });
}

export default {
  id: 'traditions',
  emoji: '🎉',
  theme: 'party',
  color: '#e91e63',
  get title() { return L('Family Celebrations', 'Les fêtes en famille'); },
  get skill() { return L('Traditions & celebrations', 'Traditions et célébrations'); },
  get blurb() { return L('Holidays, seasons and family trees!', 'Fêtes, saisons et arbre généalogique!'); },
  get intro() {
    return L(`Families and communities celebrate in lots of ways! Let's learn about traditions with ${M}, ${F} and ${G}.`,
      `Les familles et les communautés célèbrent de plein de façons! Découvrons les traditions avec ${M}, ${F} et ${G}.`);
  },
  get levels() {
    return {
      mild: { kid: L('Match the celebration', 'Associe la fête'), parent: 'Recognizing symbols of celebrations from many cultures (Diwali, Lunar New Year, Hanukkah, Christmas, Eid, Canada Day…).' },
      medium: { kid: L('Seasons and months', 'Les saisons et les mois'), parent: 'When celebrations happen (season, month); naming celebrations from symbols.' },
      spicy: { kid: L('Family trees and then & now', 'Arbre généalogique et avant/maintenant'), parent: 'Family relationships (grandparent, aunt, cousin…); how traditions and family life change over time.' },
    };
  },
  get praise() { return L(['Party on! 🎉', 'Hooray! 🎈', 'Celebrate! 🥳'], ['C’est la fête! 🎉', 'Hourra! 🎈', 'On célèbre! 🥳']); },
  get doneTitles() { return L(['What a celebration! 🎉', 'Tradition expert! 🎈'], ['Quelle fête! 🎉', 'Experte des traditions! 🎈']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([symbolQ, symbolQ, nameQ])();
    if (level === 'medium') return pick([seasonQ, monthQ, nameQ, symbolQ])();
    return pick([familyQ, familyQ, changeQ, monthQ])();
  },
};
