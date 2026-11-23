// GRADE 2 — TIME: Mia's Busy Day ⏰ / La journée bien remplie de Mia
import { rand, pick, sample, shuffle } from '../../util.js';
import { wordQ, visualQ, factQ } from '../common.js';
import { clock } from '../../visuals-measure.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;
const BADGES = () => L(['⏰ Tick tock!', '🤸‍♀️ Practice time!', '🎮 Game time!', '🍕 Dinner time!'], ['⏰ Tic tac!', '🤸‍♀️ L’heure de la pratique!', '🎮 L’heure du jeu!', '🍕 L’heure du souper!']);

const mm = (m) => String(m).padStart(2, '0');
const norm = (h) => ((((h - 1) % 12) + 12) % 12) + 1;
const label = (h, m) => L(`${h}:${mm(m)}`, m ? `${h} h ${mm(m)}` : `${h} h`);

const EN_H = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
const FR_H = ['douze', 'une', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze'];
const frHour = (h) => `${FR_H[h % 12]} heure${h % 12 === 1 ? '' : 's'}`;

function words(h, m) {
  const h1 = norm(h + 1);
  if (m === 0) return L(`${EN_H[h % 12]} o'clock`, frHour(h));
  if (m === 15) return L(`quarter past ${EN_H[h % 12]}`, `${frHour(h)} et quart`);
  if (m === 30) return L(`half past ${EN_H[h % 12]}`, `${frHour(h)} et demie`);
  if (m === 45) return L(`quarter to ${EN_H[h1 % 12]}`, `${frHour(h1)} moins le quart`);
  if (m < 30) return L(`${m} minutes past ${EN_H[h % 12]}`, `${frHour(h)} ${m}`);
  return L(`${60 - m} minutes to ${EN_H[h1 % 12]}`, `${frHour(h1)} moins ${60 - m}`);
}

function wrongTimes(h, m, five) {
  const c = [];
  const add = (hh, mi) => {
    hh = norm(Math.round(hh)); mi = ((mi % 60) + 60) % 60;
    if (!(hh === h && mi === m) && !c.some((x) => x[0] === hh && x[1] === mi)) c.push([hh, mi]);
  };
  add(m / 5 || 12, (h % 12) * 5); // hands mixed up
  add(h + 1, m); add(h - 1, m); add(h, m === 0 ? 30 : 0); add(h, m + 15); add(h, m + 30);
  if (five) { add(h, m + 5); add(h, m - 5); }
  return c;
}

function pickTime(level) {
  const h = rand(1, 12);
  const m = level === 'mild' ? pick([0, 0, 30]) : level === 'medium' ? pick([0, 15, 30, 45]) : pick([5, 10, 20, 25, 35, 40, 50, 55, 15, 45, 0, 30]);
  return [h, m];
}

function readClock(level) {
  const [h, m] = pickTime(level);
  const wrong = sample(wrongTimes(h, m, level === 'spicy'), 2);
  return wordQ({
    key: `rc-${h}-${m}`, badge: pick(BADGES()),
    text: L('What time does the clock show?', 'Quelle heure est-il à l’horloge?'),
    visual: card(clock(h, m)),
    options: shuffle([[h, m], ...wrong]).map(([a, b]) => ({ value: `${a}:${b}`, label: label(a, b) })),
    answer: `${h}:${m}`,
    hint: { text: L('The short red hand is the HOUR hand. The long blue hand is the MINUTE hand. Read the hour first, then the minutes (count by 5s).', 'La courte aiguille rouge est celle des HEURES. La longue aiguille bleue est celle des MINUTES. Lis d’abord l’heure, puis les minutes (compte par 5).') },
  });
}

function findClock(level) {
  const [h, m] = pickTime(level);
  const wrong = sample(wrongTimes(h, m, level === 'spicy'), 2);
  return visualQ({
    key: `fc-${h}-${m}`, badge: pick(BADGES()),
    text: L(`${M}'s gym class starts at ${label(h, m)}. Which clock shows that time?`, `Le cours de gym de ${M} commence à ${label(h, m)}. Quelle horloge montre cette heure?`),
    options: shuffle([[h, m], ...wrong]).map(([a, b]) => ({ value: `${a}:${b}`, html: clock(a, b, 120) })),
    answer: `${h}:${m}`,
    hint: { text: L('Find the clock where the short hand points to the hour and the long hand points to the minutes.', 'Trouve l’horloge où la courte aiguille montre l’heure et la longue aiguille montre les minutes.') },
  });
}

function wordsQ(level) {
  const [h, m] = pickTime(level === 'mild' ? 'medium' : level);
  const right = words(h, m);
  const wrongs = [...new Set(wrongTimes(h, m, false).map(([a, b]) => words(a, b)))].filter((x) => x !== right);
  return wordQ({
    key: `wq-${h}-${m}`, badge: pick(BADGES()),
    text: L('Which words match this clock?', 'Quels mots vont avec cette horloge?'),
    visual: card(clock(h, m)),
    options: shuffle([right, ...sample(wrongs, 2)]),
    answer: right,
    hint: { text: L('15 minutes = quarter past. 30 minutes = half past. 45 minutes = quarter to the next hour.', '15 minutes = et quart. 30 minutes = et demie. 45 minutes = moins le quart (de l’heure suivante).') },
  });
}

function elapsedQ() {
  const h = rand(1, 11), m = pick([0, 30]);
  const [dur, durTxt] = pick([[30, L('30 minutes', '30 minutes')], [60, L('1 hour', '1 heure')], [90, L('1 hour and 30 minutes', '1 heure et 30 minutes')]]);
  const total = h * 60 + m + dur;
  const eh = norm(Math.floor(total / 60)), em = total % 60;
  const things = L(['gymnastics practice', 'movie night', 'a bike ride', 'a babysitting shift with Farrah'], ['la pratique de gymnastique', 'la soirée cinéma', 'une balade à vélo', 'garder Gemma avec Farrah']);
  const what = pick(things);
  const wrong = sample(wrongTimes(eh, em, false), 2);
  return wordQ({
    key: `el-${h}-${m}-${dur}`, badge: L('🕒 How long?', '🕒 Combien de temps?'),
    text: L(`${what.charAt(0).toUpperCase() + what.slice(1)} starts at ${label(h, m)} and lasts ${durTxt}. What time does it end?`,
      `${what.charAt(0).toUpperCase() + what.slice(1)} commence à ${label(h, m)} et dure ${durTxt}. À quelle heure finit-elle?`),
    visual: card(clock(h, m)),
    options: shuffle([[eh, em], ...wrong]).map(([a, b]) => ({ value: `${a}:${b}`, label: label(a, b) })),
    answer: `${eh}:${em}`,
    hint: { text: L('Add the time on to the clock one step at a time. 1 hour = 60 minutes. Half an hour = 30 minutes.', 'Ajoute le temps pas à pas sur l’horloge. 1 heure = 60 minutes. Une demi-heure = 30 minutes.') },
  });
}

const CAL = () => [
  { e: '📅', t: L('How many days are in one week?', 'Combien de jours y a-t-il dans une semaine?'), a: '7', o: ['5', '10'], h: L('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday: 7 days.', 'Lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche : 7 jours.') },
  { e: '🗓️', t: L('How many months are in one year?', 'Combien de mois y a-t-il dans une année?'), a: '12', o: ['10', '7'], h: L('January to December: 12 months.', 'De janvier à décembre : 12 mois.') },
  { e: '⏱️', t: L('How many minutes are in one hour?', 'Combien de minutes y a-t-il dans une heure?'), a: '60', o: ['100', '30'], h: L('The minute hand goes all the way around the clock in 1 hour: 60 minutes.', 'La grande aiguille fait tout le tour de l’horloge en 1 heure : 60 minutes.') },
  { e: '📆', t: L('Which day comes right AFTER Friday?', 'Quel jour vient juste APRÈS le vendredi?'), a: L('Saturday', 'Samedi'), o: [L('Thursday', 'Jeudi'), L('Monday', 'Lundi')], h: L('Friday, then Saturday, then Sunday.', 'Vendredi, puis samedi, puis dimanche.') },
  { e: '📆', t: L('Which day comes right BEFORE Wednesday?', 'Quel jour vient juste AVANT le mercredi?'), a: L('Tuesday', 'Mardi'), o: [L('Thursday', 'Jeudi'), L('Sunday', 'Dimanche')], h: L('Monday, Tuesday, Wednesday.', 'Lundi, mardi, mercredi.') },
  { e: '🗓️', t: L('Which month comes right AFTER March?', 'Quel mois vient juste APRÈS mars?'), a: L('April', 'Avril'), o: [L('February', 'Février'), L('June', 'Juin')], h: L('January, February, March, April…', 'Janvier, février, mars, avril…') },
  { e: '🎂', t: L('Which month comes right BEFORE December?', 'Quel mois vient juste AVANT décembre?'), a: L('November', 'Novembre'), o: [L('January', 'Janvier'), L('October', 'Octobre')], h: L('…October, November, December.', '…octobre, novembre, décembre.') },
  { e: '🌞', t: L('How many hours are in one day?', 'Combien d’heures y a-t-il dans une journée?'), a: '24', o: ['12', '60'], h: L('There are 24 hours from midnight to midnight.', 'Il y a 24 heures de minuit à minuit.') },
  { e: '🌙', t: L('Which is a better time for sleeping?', 'Quel est le meilleur moment pour dormir?'), a: L('At night', 'La nuit'), o: [L('At noon', 'À midi'), L('At lunchtime', 'Au dîner')], h: L('Most kids go to bed at night.', 'La plupart des enfants se couchent la nuit.') },
];
function calendarQ() {
  return factQ(pick(CAL()), { badge: L('📅 Calendar!', '📅 Le calendrier!'), prefix: 'cal' });
}

export default {
  id: 'time',
  emoji: '⏰',
  theme: 'clock',
  color: '#d84315',
  get title() { return L(`${M}'s Busy Day`, `La journée bien remplie de ${M}`); },
  get skill() { return L('Telling time', 'Lire l’heure'); },
  get blurb() { return L('Gym class, game time and dinner — read the clock!', 'Cours de gym, jeux et souper — lis l’horloge!'); },
  get intro() {
    return L(`${M} has a busy day: gymnastics, games, babysitting ${G}, and pizza! Read the clock so she is never late.`,
      `${M} a une journée bien remplie : gymnastique, jeux, garder ${G} et pizza! Lis l’horloge pour qu’elle ne soit jamais en retard.`);
  },
  get levels() {
    return {
      mild: { kid: L('O’clock and half past', 'Les heures et les demies'), parent: 'Reading analog clocks to the hour and half hour; matching digital and analog.' },
      medium: { kid: L('Quarter past and quarter to', 'Et quart et moins le quart'), parent: 'Reading to the quarter hour; time in words; days of the week and months.' },
      spicy: { kid: L('Five minutes and how long?', 'Par 5 minutes et combien de temps?'), parent: 'Reading to 5 minutes; elapsed time (30 minutes, 1 hour, 1.5 hours); calendar facts.' },
    };
  },
  get praise() { return L(['Right on time! ⏰', 'Tick tock, you got it! 🕒', 'Perfect timing! 🤸‍♀️'], ['Juste à temps! ⏰', 'Tic tac, bravo! 🕒', 'Un timing parfait! 🤸‍♀️']); },
  get doneTitles() { return L(['Never late! ⏰', 'Clock champion! 🕒'], ['Jamais en retard! ⏰', 'Championne de l’horloge! 🕒']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([() => readClock('mild'), () => readClock('mild'), () => findClock('mild')])();
    if (level === 'medium') return pick([() => readClock('medium'), () => findClock('medium'), () => wordsQ('medium'), calendarQ])();
    return pick([() => readClock('spicy'), () => findClock('spicy'), elapsedQ, elapsedQ, () => wordsQ('spicy'), calendarQ])();
  },
};
