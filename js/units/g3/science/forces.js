// GRADE 3 SCIENCE — Forces Causing Movement: Bike Park & Sports Day 🚲 / Le parc à vélo
import { pick } from '../../../util.js';
import { factQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M, baby: G, cousins } = FAMILY3;
const [LO, LA, SY] = cousins;
const BADGES = () => L(['🚲 Bike park!', '⚽ Sports day!', '🤸‍♀️ Gym time!', '🏒 Game on!'], ['🚲 Parc à vélo!', '⚽ Journée sportive!', '🤸‍♀️ Au gymnase!', '🏒 On joue!']);
const PUSH = () => L('A push', 'Une poussée');
const PULL = () => L('A pull', 'Une traction');
const PP_HINT = () => L('A push moves something AWAY from you. A pull moves something TOWARD you.', 'Une poussée éloigne l’objet de toi. Une traction le rapproche de toi.');

const PUSH_PULL = () => [
  { e: '⚽', t: L(`${F} kicks a soccer ball. Is that a push or a pull?`, `${F} botte un ballon de soccer. Est-ce une poussée ou une traction?`), a: PUSH() },
  { e: '🚪', t: L(`${M} opens a door toward herself. Is that a push or a pull?`, `${M} ouvre une porte vers elle. Est-ce une poussée ou une traction?`), a: PULL() },
  { e: '🛷', t: L(`${F} drags ${G} on a sled with a rope. Is that a push or a pull?`, `${F} tire ${G} sur un traîneau avec une corde. Est-ce une poussée ou une traction?`), a: PULL() },
  { e: '🚲', t: L(`${F} presses down on her bike pedals. Is that a push or a pull?`, `${F} appuie sur les pédales de son vélo. Est-ce une poussée ou une traction?`), a: PUSH() },
  { e: '🏀', t: L(`${LA} throws a basketball. Is that a push or a pull?`, `${LA} lance un ballon de basket. Est-ce une poussée ou une traction?`), a: PUSH() },
  { e: '🪢', t: L('Two teams play tug-of-war. Is that a push or a pull?', 'Deux équipes jouent au tir à la corde. Est-ce une poussée ou une traction?'), a: PULL() },
  { e: '🛝', t: L(`${F} pushes ${SY} on the swing. Is that a push or a pull?`, `${F} pousse ${SY} sur la balançoire. Est-ce une poussée ou une traction?`), a: PUSH() },
  { e: '🛏️', t: L(`${F} pulls her sheets tight to make a perfect bed. Is that a push or a pull?`, `${F} tire ses draps pour faire un lit parfait. Est-ce une poussée ou une traction?`), a: PULL() },
];

function pushPull() {
  const f = pick(PUSH_PULL());
  return factQ({ ...f, o: [f.a === PUSH() ? PULL() : PUSH()], h: PP_HINT() }, { badge: pick(BADGES()), prefix: 'pp' });
}

const FORCES = () => {
  const G_ = L('Gravity', 'La gravité'), FR = L('Friction', 'Le frottement'), MAG = L('Magnetism', 'Le magnétisme'), ST = L('Static electricity', 'L’électricité statique');
  const all = [G_, FR, MAG, ST];
  const o = (a) => all.filter((x) => x !== a).slice(0, 2);
  return [
    { e: '🍎', t: L('An apple falls from a tree to the ground. Which force pulls it down?', 'Une pomme tombe de l’arbre jusqu’au sol. Quelle force la tire vers le bas?'), a: G_, o: o(G_), h: L('Gravity pulls everything down toward the Earth.', 'La gravité attire tout vers la Terre.') },
    { e: '🤸‍♀️', t: L(`${F} jumps on the trampoline. Which force brings her back down?`, `${F} saute sur le trampoline. Quelle force la ramène en bas?`), a: G_, o: o(G_), h: L('Gravity pulls everything down toward the Earth.', 'La gravité attire tout vers la Terre.') },
    { e: '🚲', t: L(`${F} squeezes her bike brakes and the bike slows down. Which force is that?`, `${F} serre les freins de son vélo et elle ralentit. Quelle force est-ce?`), a: FR, o: o(FR), h: L('Friction happens when two surfaces rub together. It slows things down.', 'Le frottement se produit quand deux surfaces frottent ensemble. Il ralentit les objets.') },
    { e: '🧦', t: L(`${M} slides across the kitchen floor in socks, then stops. What stopped her?`, `${M} glisse sur le plancher en bas, puis s’arrête. Qu’est-ce qui l’a arrêtée?`), a: FR, o: o(FR), h: L('Friction happens when two surfaces rub together. It slows things down.', 'Le frottement se produit quand deux surfaces frottent ensemble. Il ralentit les objets.') },
    { e: '🧲', t: L('A fridge magnet picks up a paper clip without touching it. Which force is that?', 'Un aimant attire un trombone sans le toucher. Quelle force est-ce?'), a: MAG, o: o(MAG), h: L('Magnets pull on things made of iron or steel.', 'Les aimants attirent les objets en fer ou en acier.') },
    { e: '🎈', t: L(`${LO} rubs a balloon on her hair and it sticks to the wall. Which force is that?`, `${LO} frotte un ballon sur ses cheveux et il colle au mur. Quelle force est-ce?`), a: ST, o: o(ST), h: L('Rubbing a balloon builds up static electricity.', 'Frotter un ballon crée de l’électricité statique.') },
  ];
};

function whichForce() {
  return factQ(pick(FORCES()), { badge: pick(BADGES()), prefix: 'wf' });
}

const SPICY = () => [
  { e: '🚲', t: L('Where would a bike be HARDEST to pedal fast?', 'Où serait-il le plus DIFFICILE de pédaler vite?'), a: L('On thick grass', 'Sur du gazon épais'), o: [L('On a smooth path', 'Sur un sentier lisse'), L('On a flat road', 'Sur une route plate')], h: L('Rough surfaces make more friction, and friction slows you down.', 'Les surfaces rugueuses font plus de frottement, et le frottement ralentit.') },
  { e: '🛝', t: L('Which slide would be the FASTEST?', 'Quelle glissade serait la plus RAPIDE?'), a: L('A smooth, steep slide', 'Une glissade lisse et à pic'), o: [L('A bumpy, flat slide', 'Une glissade bosselée et plate'), L('A slide covered in sand', 'Une glissade couverte de sable')], h: L('Smooth means less friction. Steep means gravity pulls harder down the slide.', 'Lisse veut dire moins de frottement. À pic, la gravité tire plus fort.') },
  { e: '🧲', t: L('Which one will a magnet pick up?', 'Lequel un aimant va-t-il attirer?'), a: L('A steel paper clip', 'Un trombone en acier'), o: [L('A wooden block', 'Un bloc de bois'), L('A plastic spoon', 'Une cuillère en plastique')], h: L('Magnets attract iron and steel. Not wood, plastic or glass.', 'Les aimants attirent le fer et l’acier, pas le bois, le plastique ou le verre.') },
  { e: '🏒', t: L('A hockey puck slides a long way on ice but stops quickly on carpet. Why?', 'Une rondelle glisse loin sur la glace mais s’arrête vite sur un tapis. Pourquoi?'), a: L('Carpet has more friction', 'Le tapis a plus de frottement'), o: [L('Ice has more gravity', 'La glace a plus de gravité'), L('The carpet is magnetic', 'Le tapis est magnétique')], h: L('Ice is smooth (little friction). Carpet is rough (lots of friction).', 'La glace est lisse (peu de frottement). Le tapis est rugueux (beaucoup de frottement).') },
  { e: '⚽', t: L('A rolling soccer ball hits a wall and bounces back. What did the force change?', 'Un ballon roule, frappe un mur et rebondit. Qu’est-ce que la force a changé?'), a: L('Its direction', 'Sa direction'), o: [L('Its colour', 'Sa couleur'), L('Its size forever', 'Sa taille pour toujours')], h: L('Forces can make things start, stop, speed up, slow down or change direction.', 'Une force peut faire démarrer, arrêter, accélérer, ralentir ou changer de direction.') },
  { e: '🟣', t: L(`${M} squeezes a ball of play dough. What does the force change?`, `${M} écrase une boule de pâte à modeler. Qu’est-ce que la force change?`), a: L('Its shape', 'Sa forme'), o: [L('Its colour', 'Sa couleur'), L('Its smell', 'Son odeur')], h: L('A push or a squeeze can change an object’s shape.', 'Une poussée ou un écrasement peut changer la forme d’un objet.') },
  { e: '🧲', t: L('Two magnets push each other away. What do we call that?', 'Deux aimants se repoussent. Comment appelle-t-on ça?'), a: L('They repel', 'Ils se repoussent'), o: [L('They attract', 'Ils s’attirent'), L('They melt', 'Ils fondent')], h: L('Same poles (N–N or S–S) repel. Opposite poles (N–S) attract.', 'Les mêmes pôles (N–N ou S–S) se repoussent. Les pôles opposés (N–S) s’attirent.') },
  { e: '🪂', t: L('Which force is a NON-contact force (it works without touching)?', 'Quelle force agit SANS contact (sans toucher)?'), a: L('Gravity', 'La gravité'), o: [L('Kicking a ball', 'Botter un ballon'), L('Friction from brakes', 'Le frottement des freins')], h: L('Gravity, magnetism and static electricity can act from a distance.', 'La gravité, le magnétisme et l’électricité statique agissent à distance.') },
];

function spicyQ() {
  return factQ(pick(SPICY()), { badge: pick(BADGES()), prefix: 'sf' });
}

export default {
  id: 'forces',
  emoji: '🚲',
  theme: 'bike',
  color: '#1565c0',
  get title() { return L('Bike Park & Sports Day', 'Le parc à vélo et la journée sportive'); },
  get skill() { return L('Forces & movement', 'Les forces et le mouvement'); },
  get blurb() { return L('Pushes, pulls, gravity and friction on bikes, slides and trampolines!', 'Poussées, tractions, gravité et frottement à vélo et au trampoline!'); },
  get intro() {
    return L(`${F} is spending the day biking and playing sports with her cousins. Everything that moves needs a force!`,
      `${F} passe la journée à faire du vélo et du sport avec ses cousins. Tout ce qui bouge a besoin d’une force!`);
  },
  get levels() {
    return {
      mild: { kid: L('Push or pull?', 'Poussée ou traction?'), parent: 'Identifying pushes and pulls in everyday actions.' },
      medium: { kid: L('Gravity, friction and magnets', 'Gravité, frottement et aimants'), parent: 'Naming forces: gravity, friction, magnetism, static electricity.' },
      spicy: { kid: L('Forces in action', 'Les forces en action'), parent: 'Friction on different surfaces, magnetic materials, attract/repel, how forces change speed, direction and shape; contact vs non-contact.' },
    };
  },
  get praise() { return L(['Full speed! 🚲', 'Goal! ⚽', 'Stuck the landing! 🤸‍♀️'], ['À toute vitesse! 🚲', 'Buuut! ⚽', 'Atterrissage parfait! 🤸‍♀️']); },
  get doneTitles() { return L(['Gold medal day! 🥇', 'Force master! 💪'], ['Journée médaille d’or! 🥇', 'Championne des forces! 💪']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([pushPull, pushPull, pushPull, whichForce])();
    if (level === 'medium') return pick([whichForce, whichForce, pushPull, spicyQ])();
    return pick([spicyQ, spicyQ, spicyQ, whichForce])();
  },
};
