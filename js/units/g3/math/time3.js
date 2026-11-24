// GRADE 3 — TIME: Game Day Schedule ⏱️ / L'horaire de la journée sportive
import { rand, pick, sample, shuffle } from '../../../util.js';
import { numberQ, wordQ } from '../../common.js';
import { clock } from '../../../visuals-measure.js';
import { card } from '../../../visuals.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M } = FAMILY3;
const BADGES = () => L(['⏱️ Tick tock!', '🚴 Bike race!', '⚽ Game day!', '🤸‍♀️ Practice!'], ['⏱️ Tic tac!', '🚴 Course à vélo!', '⚽ Journée sportive!', '🤸‍♀️ La pratique!']);
const mm = (m) => String(m).padStart(2, '0');
const norm = (h) => ((((h - 1) % 12) + 12) % 12) + 1;
const label = (h, m) => L(`${h}:${mm(m)}`, `${h} h ${mm(m)}`);

function wrongTimes(h, m) {
  const c = [];
  const add = (hh, mi) => { hh = norm(Math.round(hh)); mi = ((mi % 60) + 60) % 60; if (!(hh === h && mi === m) && !c.some((x) => x[0] === hh && x[1] === mi)) c.push([hh, mi]); };
  add(m / 5 || 12, (h % 12) * 5); add(h + 1, m); add(h - 1, m); add(h, m + 1); add(h, m - 1); add(h, m + 10); add(h, m - 10); add(h, 60 - m);
  return c;
}

function readClock(five) {
  const h = rand(1, 12), m = five ? rand(0, 11) * 5 : rand(1, 59);
  const wrong = sample(wrongTimes(h, m), 2);
  return wordQ({
    key: `rc-${h}-${m}`, badge: pick(BADGES()),
    text: L(`${F}'s soccer game starts at the time on the clock. What time is it?`, `Le match de soccer de ${F} commence à l’heure indiquée. Quelle heure est-il?`),
    visual: card(clock(h, m)),
    options: shuffle([[h, m], ...wrong]).map(([a, b]) => ({ value: `${a}:${b}`, label: label(a, b) })),
    answer: `${h}:${m}`,
    hint: { text: L(`Read the hour hand first (it is just past ${h}). Then count the minutes: by 5s around the clock, then by 1s.`, `Lis d’abord la petite aiguille (juste passé ${h}). Puis compte les minutes : par 5 autour de l’horloge, puis par 1.`) },
  });
}

function ampm() {
  const items = [
    [L('Breakfast: eggs and Cheerios', 'Déjeuner : œufs et céréales'), 'am', 7, 30], [L('Soccer practice after school', 'Pratique de soccer après l’école'), 'pm', 4, 15],
    [L('Dance class', 'Cours de danse'), 'pm', 5, 45], [L('Brushing teeth after waking up', 'Se brosser les dents au réveil'), 'am', 7, 5],
    [L('Dinner: chili', 'Souper : chili'), 'pm', 6, 0], [L('Morning bike ride', 'Balade à vélo le matin'), 'am', 9, 20], [L('Bedtime story', 'Histoire du dodo'), 'pm', 8, 15],
  ];
  const [what, ap, h, m] = pick(items);
  return wordQ({
    key: `ap-${h}-${m}-${ap}`, badge: L('🌙 Day or night?', '🌙 Jour ou nuit?'),
    text: L(`${what} at ${h}:${mm(m)}. Is that a.m. or p.m.?`, `${what} à ${h} h ${mm(m)}. Est-ce le matin, l’après-midi ou le soir?`),
    visual: card(clock(h, m)),
    options: L([{ value: 'am', label: 'a.m. (morning)' }, { value: 'pm', label: 'p.m. (afternoon or evening)' }], [{ value: 'am', label: 'Le matin' }, { value: 'pm', label: 'L’après-midi ou le soir' }]),
    answer: ap,
    hint: { text: L('a.m. is from midnight to noon. p.m. is from noon to midnight.', 'Le matin va de minuit à midi. L’après-midi et le soir vont de midi à minuit.') },
  });
}

function elapsed(mode) {
  const h = rand(1, 10), m = pick([0, 10, 15, 20, 30, 40, 45, 50]);
  const dur = pick([20, 25, 35, 40, 45, 50, 55, 65, 75, 80, 90]);
  const total = h * 60 + m + dur;
  const eh = norm(Math.floor(total / 60)), em = total % 60;
  return numberQ({
    key: `el-${h}-${m}-${dur}`, badge: L('⏳ How long?', '⏳ Combien de temps?'),
    text: L(`The game starts at ${label(h, m)} and ends at ${label(eh, em)}. How many MINUTES long is the game?`, `Le match commence à ${label(h, m)} et finit à ${label(eh, em)}. Combien de MINUTES dure-t-il?`),
    visual: `<div class="coins">${clock(h, m, 120)}<span class="op">➜</span>${clock(eh, em, 120)}</div>`,
    answer: dur, mode, max: 120, min: 5, near: [5, -5, 10, -10, 60],
    hint: { text: L('Count up in chunks: to the next hour, then the extra minutes. Add the chunks.', 'Compte par morceaux : jusqu’à l’heure suivante, puis les minutes en plus. Additionne.') },
  });
}

function endTime() {
  const h = rand(1, 10), m = pick([0, 15, 30, 45]);
  const dur = pick([25, 35, 40, 50, 55, 70, 85]);
  const total = h * 60 + m + dur;
  const eh = norm(Math.floor(total / 60)), em = total % 60;
  const wrong = sample(wrongTimes(eh, em), 2);
  return wordQ({
    key: `et-${h}-${m}-${dur}`, badge: L('⏳ What time will it end?', '⏳ À quelle heure finira-t-il?'),
    text: L(`${F}'s dance class starts at ${label(h, m)} and lasts ${dur} minutes. What time does it end?`, `Le cours de danse de ${F} commence à ${label(h, m)} et dure ${dur} minutes. À quelle heure finit-il?`),
    visual: card(clock(h, m)),
    options: shuffle([[eh, em], ...wrong]).map(([a, b]) => ({ value: `${a}:${b}`, label: label(a, b) })),
    answer: `${eh}:${em}`,
    hint: { text: L(`Start at ${label(h, m)}. Add ${dur} minutes: get to the next hour first, then add the rest.`, `Pars de ${label(h, m)}. Ajoute ${dur} minutes : va jusqu’à l’heure suivante, puis ajoute le reste.`) },
  });
}

const UNITS = () => [
  { t: L('Which unit is best for measuring how long a soccer game lasts?', 'Quelle unité convient le mieux pour mesurer la durée d’un match de soccer?'), a: L('Minutes', 'Minutes'), o: [L('Seconds', 'Secondes'), L('Days', 'Jours')] },
  { t: L('Which unit is best for how long it takes to blink?', 'Quelle unité convient le mieux pour le temps d’un clignement d’œil?'), a: L('Seconds', 'Secondes'), o: [L('Hours', 'Heures'), L('Weeks', 'Semaines')] },
  { t: L('How many minutes are in 2 hours?', 'Combien de minutes y a-t-il dans 2 heures?'), a: '120', o: ['100', '200'] },
  { t: L('How many seconds are in one minute?', 'Combien de secondes y a-t-il dans une minute?'), a: '60', o: ['100', '30'] },
  { t: L('How many days are in a leap-year February?', 'Combien de jours y a-t-il en février d’une année bissextile?'), a: '29', o: ['28', '30'] },
  { t: L('Which takes the LONGEST?', 'Qu’est-ce qui prend le PLUS de temps?'), a: L('Growing a chili plant', 'Faire pousser un plant de piment'), o: [L('Eating breakfast', 'Manger le déjeuner'), L('Tying your shoes', 'Attacher tes souliers')] },
];
function unitsQ() {
  const f = pick(UNITS());
  return wordQ({
    key: `un-${f.t.slice(0, 30)}`, badge: L('⏱️ Time units!', '⏱️ Les unités de temps!'),
    text: f.t,
    options: shuffle([f.a, ...f.o]), answer: f.a,
    hint: { text: L('60 seconds = 1 minute. 60 minutes = 1 hour. 24 hours = 1 day.', '60 secondes = 1 minute. 60 minutes = 1 heure. 24 heures = 1 jour.') },
  });
}

export default {
  id: 'time3',
  emoji: '⏱️',
  theme: 'clock',
  color: '#c62828',
  get title() { return L('Game Day Schedule', 'L’horaire de la journée sportive'); },
  get skill() { return L('Time & elapsed time', 'Le temps et le temps écoulé'); },
  get blurb() { return L('Read clocks to the minute and find out how long things take!', 'Lis l’heure à la minute près et calcule combien de temps ça dure!'); },
  get intro() {
    return L(`${F} has a big sports day with ${M}: soccer, biking and dance. She needs to read the clock and plan her time!`,
      `${F} a une grosse journée sportive avec ${M} : soccer, vélo et danse. Elle doit lire l’horloge et planifier son temps!`);
  },
  get levels() {
    return {
      mild: { kid: L('Read the clock', 'Lis l’horloge'), parent: 'Reading analog clocks to 5 minutes; a.m. and p.m.' },
      medium: { kid: L('To the minute', 'À la minute près'), parent: 'Reading analog clocks to the nearest minute; a.m./p.m.; units of time (seconds, minutes, hours).' },
      spicy: { kid: L('How long does it last?', 'Combien de temps ça dure?'), parent: 'Elapsed time in minutes; finding an end time given a start and duration; converting time units.' },
    };
  },
  get praise() { return L(['On time! ⏱️', 'Great pacing! 🚴', 'Goal! ⚽'], ['À l’heure! ⏱️', 'Bon rythme! 🚴', 'But! ⚽']); },
  get doneTitles() { return L(['Game day complete! ⚽', 'Time master! ⏱️'], ['Journée sportive terminée! ⚽', 'Maîtresse du temps! ⏱️']); },
  makeQuestion(level, i) {
    const mode = i % 2 ? 'number' : 'choice';
    if (level === 'mild') return pick([() => readClock(true), () => readClock(true), ampm])();
    if (level === 'medium') return pick([() => readClock(false), () => readClock(false), ampm, unitsQ])();
    return pick([() => elapsed(mode), () => elapsed(mode), endTime, unitsQ])();
  },
};
