// SCIENCE (Grade 2) — Movement & simple machines: Playground Machines 🛝 / Les machines du terrain de jeux
import { pick } from '../../util.js';
import { factQ } from '../common.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;
const BADGES = () => L(['🛝 Playground!', '🤸‍♀️ Gym time!', '⚙️ Machines!', '🚲 Wheels!'], ['🛝 Au parc!', '🤸‍♀️ Au gymnase!', '⚙️ Les machines!', '🚲 Les roues!']);

const MOVES = () => ({
  bf: L('Back and forth', 'D’avant en arrière'), rr: L('Round and round', 'En rond'), down: L('Down', 'Vers le bas'),
  ud: L('Up and down', 'De haut en bas'), zig: L('In a zigzag', 'En zigzag'), straight: L('In a straight line', 'En ligne droite'),
});
function movesBank() {
  const m = MOVES();
  const o = (a) => Object.values(m).filter((x) => x !== a).slice(0, 2);
  return [
    { e: '🛝', t: L(`${G} sits at the top of the slide. Which way does she move?`, `${G} est en haut de la glissade. Dans quelle direction bouge-t-elle?`), a: m.down, o: o(m.down), h: L('A slide takes you down, pulled by gravity.', 'Une glissade te fait descendre, tirée par la gravité.') },
    { e: '🪁', t: L(`${F} pushes ${G} on the swing. How does the swing move?`, `${F} pousse ${G} sur la balançoire. Comment la balançoire bouge-t-elle?`), a: m.bf, o: o(m.bf), h: L('A swing goes forward, then back, again and again.', 'La balançoire va vers l’avant, puis vers l’arrière, encore et encore.') },
    { e: '🎠', t: L('A merry-go-round spins. How does it move?', 'Un manège tourne. Comment bouge-t-il?'), a: m.rr, o: o(m.rr), h: L('A circle motion goes round and round.', 'Un mouvement circulaire tourne en rond.') },
    { e: '🤸‍♀️', t: L(`${M} jumps on the trampoline. How does she move?`, `${M} saute sur le trampoline. Comment bouge-t-elle?`), a: m.ud, o: o(m.ud), h: L('A trampoline sends you up, then gravity brings you back down.', 'Le trampoline te lance vers le haut, puis la gravité te ramène en bas.') },
    { e: '⛷️', t: L('A skier turns left, right, left, right down the hill. How is she moving?', 'Une skieuse tourne à gauche, à droite, à gauche, à droite dans la pente. Comment bouge-t-elle?'), a: m.zig, o: o(m.zig), h: L('Zigzag means sharp turns, back and forth.', 'Zigzag veut dire des virages serrés, d’un côté à l’autre.') },
    { e: '🚀', t: L('A rocket shoots straight up into the sky. How does it move?', 'Une fusée monte tout droit dans le ciel. Comment bouge-t-elle?'), a: m.straight, o: o(m.straight), h: L('Straight means no turns.', 'En ligne droite, c’est sans virage.') },
  ];
}

const SPEED = () => [
  { e: '🐇', t: L('Which animal moves the FASTEST?', 'Quel animal bouge le PLUS VITE?'), a: L('A rabbit', 'Un lapin'), o: [L('A snail', 'Un escargot'), L('A turtle', 'Une tortue')], h: L('Rabbits sprint. Snails and turtles are slow.', 'Les lapins courent vite. Les escargots et les tortues sont lents.') },
  { e: '🐌', t: L('Which animal moves the SLOWEST?', 'Quel animal bouge le PLUS LENTEMENT?'), a: L('A snail', 'Un escargot'), o: [L('A dog', 'Un chien'), L('A horse', 'Un cheval')], h: L('A snail glides very slowly.', 'Un escargot glisse très lentement.') },
  { e: '🚲', t: L(`${F} pedals her bike harder and harder. What happens to her speed?`, `${F} pédale de plus en plus fort. Que devient sa vitesse?`), a: L('It gets faster', 'Elle augmente'), o: [L('It gets slower', 'Elle diminue'), L('It stays at zero', 'Elle reste à zéro')], h: L('A bigger push makes things move faster.', 'Une plus grosse poussée fait bouger plus vite.') },
];

const MACHINES = () => {
  const lev = L('a lever', 'un levier'), ram = L('a ramp', 'une rampe'), whe = L('a wheel and axle', 'une roue et un essieu'), pul = L('a pulley', 'une poulie');
  const o = (a) => [lev, ram, whe, pul].filter((x) => x !== a).slice(0, 2);
  return [
    { e: '⚖️', t: L('A seesaw tips up and down on a middle point. It is a kind of…', 'Une bascule monte et descend autour d’un point au milieu. C’est une sorte de…'), a: lev, o: o(lev), h: L('A lever is a bar that rests on a point called the fulcrum.', 'Un levier est une barre qui repose sur un point appelé le pivot.') },
    { e: '🛝', t: L('A slide is a slope that helps you go down. It is a kind of…', 'Une glissade est une pente qui aide à descendre. C’est une sorte de…'), a: ram, o: o(ram), h: L('A ramp is a flat slope. It makes it easier to move things up or down.', 'Une rampe est une pente. Elle rend plus facile de monter ou descendre des objets.') },
    { e: '🚲', t: L(`${F}'s bike rolls on wheels that turn on a rod. This is…`, `Le vélo de ${F} roule sur des roues qui tournent autour d’une tige. C’est…`), a: whe, o: o(whe), h: L('The wheel turns around the axle (the rod in the middle).', 'La roue tourne autour de l’essieu (la tige au centre).') },
    { e: '🚩', t: L('A rope goes over a wheel at the top of a flagpole so you can raise the flag. This is…', 'Une corde passe sur une roue en haut du mât pour hisser le drapeau. C’est…'), a: pul, o: o(pul), h: L('A pulley is a wheel with a rope that helps lift things.', 'Une poulie est une roue avec une corde qui aide à lever des objets.') },
    { e: '🛒', t: L(`${G} rides in a wagon. What helps the wagon roll easily?`, `${G} se promène dans un wagon. Qu’est-ce qui aide le wagon à rouler facilement?`), a: whe, o: o(whe), h: L('Wheels and axles let things roll instead of drag.', 'Les roues et les essieux font rouler les objets au lieu de les traîner.') },
    { e: '🪣', t: L('A bucket is lifted up a well with a rope and a turning wheel. It uses…', 'Un seau monte d’un puits avec une corde et une roue qui tourne. Ça utilise…'), a: pul, o: o(pul), h: L('A pulley helps you lift by pulling down on a rope.', 'Une poulie t’aide à lever en tirant la corde vers le bas.') },
  ];
};

const USES = () => [
  { e: '📦', t: L(`${M} needs to get a heavy box up into a truck. What helps the most?`, `${M} doit monter une lourde boîte dans un camion. Qu’est-ce qui aide le plus?`), a: L('A ramp', 'Une rampe'), o: [L('A balloon', 'Un ballon'), L('A feather', 'Une plume')], h: L('Pushing a box up a ramp is easier than lifting it straight up.', 'Pousser une boîte sur une rampe est plus facile que la soulever.') },
  { e: '🛷', t: L('A toy car rolls down two ramps. One is steep, one is gentle. Which makes the car go faster?', 'Une auto jouet descend deux rampes. L’une est à pic, l’autre est douce. Laquelle fait aller l’auto plus vite?'), a: L('The steep ramp', 'La rampe à pic'), o: [L('The gentle ramp', 'La rampe douce'), L('They are always the same', 'C’est toujours pareil')], h: L('The steeper the ramp, the faster things roll down.', 'Plus la rampe est à pic, plus les objets descendent vite.') },
  { e: '🧦', t: L(`${F} slides across the floor in socks. ${M} tries on a carpet. Who slides farther?`, `${F} glisse sur le plancher en bas. ${M} essaie sur un tapis. Qui glisse le plus loin?`), a: L('On the smooth floor', 'Sur le plancher lisse'), o: [L('On the carpet', 'Sur le tapis'), L('Both the same', 'Pareil pour les deux')], h: L('Rough surfaces slow things down (friction). Smooth ones let things slide.', 'Les surfaces rugueuses ralentissent (frottement). Les surfaces lisses laissent glisser.') },
  { e: '🛒', t: L('Why does a shopping cart have wheels?', 'Pourquoi un panier d’épicerie a-t-il des roues?'), a: L('So it rolls easily', 'Pour rouler facilement'), o: [L('To make it look nice', 'Pour être beau'), L('To make it heavier', 'Pour être plus lourd')], h: L('Wheels turn, so you do not have to drag the cart.', 'Les roues tournent, alors on n’a pas à traîner le panier.') },
  { e: '🚪', t: L('Opening a door by pushing it is…', 'Ouvrir une porte en la poussant, c’est…'), a: L('A push', 'Une poussée'), o: [L('A pull', 'Une traction'), L('A magnet', 'Un aimant')], h: L('A push moves something away from you. A pull moves it toward you.', 'Une poussée éloigne l’objet. Une traction le rapproche.') },
  { e: '🏋️', t: L('Which is the BEST way to move a very heavy rock?', 'Quelle est la MEILLEURE façon de bouger une très grosse roche?'), a: L('Use a lever to pry it up', 'Utiliser un levier pour la soulever'), o: [L('Blow on it', 'Souffler dessus'), L('Tickle it', 'La chatouiller')], h: L('A long bar used as a lever makes lifting much easier.', 'Une longue barre utilisée comme levier rend la levée beaucoup plus facile.') },
];

export default {
  id: 'machines',
  emoji: '🛝',
  theme: 'playground',
  color: '#ef6c00',
  get title() { return L('Playground Machines', 'Les machines du terrain de jeux'); },
  get skill() { return L('Movement & machines', 'Le mouvement et les machines'); },
  get blurb() { return L('Swings, slides, seesaws and wheels — how things move!', 'Balançoires, glissades, bascules et roues — comment les choses bougent!'); },
  get intro() {
    return L(`${M} and ${G} are at the playground! Everything here moves in a different way. Let's find out how.`,
      `${M} et ${G} sont au terrain de jeux! Tout bouge d’une façon différente. Découvrons comment.`);
  },
  get levels() {
    return {
      mild: { kid: L('How things move', 'Comment les choses bougent'), parent: 'Ways objects move (back and forth, round and round, zigzag, straight, up and down); fast and slow.' },
      medium: { kid: L('Simple machines', 'Les machines simples'), parent: 'Naming simple machines: lever (seesaw), ramp (slide), wheel and axle (bike), pulley (flagpole).' },
      spicy: { kid: L('Which machine helps?', 'Quelle machine aide?'), parent: 'Using machines to solve problems; steeper ramps are faster; smooth vs. rough surfaces (friction); push and pull.' },
    };
  },
  get praise() { return L(['Whee! 🛝', 'Full speed! 🚲', 'Great machine! ⚙️'], ['Youpi! 🛝', 'À toute vitesse! 🚲', 'Super machine! ⚙️']); },
  get doneTitles() { return L(['Playground champion! 🛝', 'Machine expert! ⚙️'], ['Championne du terrain de jeux! 🛝', 'Experte des machines! ⚙️']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...movesBank(), ...movesBank(), ...SPEED()]
      : level === 'medium' ? [...MACHINES(), ...MACHINES(), ...movesBank().slice(0, 2)]
        : [...USES(), ...USES(), ...MACHINES().slice(0, 3)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'mc' });
  },
};
