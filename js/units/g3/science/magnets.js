// GRADE 3 SCIENCE — Magnets & static electricity: Magnet Lab 🧲 / Le labo des aimants
import { pick } from '../../../util.js';
import { factQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M } = FAMILY3;
const BADGES = () => L(['🧲 Magnet lab!', '⚡ Static zap!', '🧭 Compass!', '🔬 Test it!'], ['🧲 Labo des aimants!', '⚡ Électricité statique!', '🧭 La boussole!', '🔬 On teste!']);

const MILD = () => [
  { e: '📎', t: L('Which of these will a magnet pick up?', 'Lequel de ces objets un aimant va-t-il attirer?'), a: L('A steel paper clip', 'Un trombone en acier'), o: [L('A plastic spoon', 'Une cuillère en plastique'), L('A wooden block', 'Un bloc de bois')], h: L('Magnets attract things made of iron or steel.', 'Les aimants attirent les objets en fer ou en acier.') },
  { e: '🧲', t: L('The two ends of a magnet, where it is strongest, are called…', 'Les deux bouts d’un aimant, où il est le plus fort, s’appellent…'), a: L('Poles', 'Les pôles'), o: [L('Tips', 'Les pointes'), L('Corners', 'Les coins')], h: L('Every magnet has a north pole and a south pole.', 'Chaque aimant a un pôle nord et un pôle sud.') },
  { e: '🧲', t: L('You bring a north pole close to a south pole. What happens?', 'Tu approches un pôle nord d’un pôle sud. Que se passe-t-il?'), a: L('They attract (pull together)', 'Ils s’attirent'), o: [L('They repel (push apart)', 'Ils se repoussent'), L('Nothing at all', 'Rien du tout')], h: L('Opposite poles attract.', 'Les pôles opposés s’attirent.') },
  { e: '🧲', t: L('You bring two NORTH poles close together. What happens?', 'Tu approches deux pôles NORD. Que se passe-t-il?'), a: L('They repel (push apart)', 'Ils se repoussent'), o: [L('They attract (pull together)', 'Ils s’attirent'), L('They melt', 'Ils fondent')], h: L('Same poles repel.', 'Les pôles identiques se repoussent.') },
  { e: '🧊', t: L('A magnet holds a drawing on the fridge door. What is the fridge door probably made of?', 'Un aimant tient un dessin sur la porte du frigo. De quoi la porte est-elle probablement faite?'), a: L('Steel', 'D’acier'), o: [L('Wood', 'De bois'), L('Glass', 'De verre')], h: L('Magnets stick to steel.', 'Les aimants collent à l’acier.') },
  { e: '🪙', t: L('Which of these is NOT attracted to a magnet?', 'Lequel de ces objets n’est PAS attiré par un aimant?'), a: L('A plastic toy', 'Un jouet en plastique'), o: [L('An iron nail', 'Un clou en fer'), L('A steel screw', 'Une vis en acier')], h: L('Plastic, wood, glass and paper are not magnetic.', 'Le plastique, le bois, le verre et le papier ne sont pas magnétiques.') },
];

const MEDIUM = () => [
  { e: '🧭', t: L('A compass needle is a small magnet. Which way does it point?', 'L’aiguille d’une boussole est un petit aimant. Vers où pointe-t-elle?'), a: L('Toward the north', 'Vers le nord'), o: [L('Toward the nearest tree', 'Vers l’arbre le plus proche'), L('Toward the sun at noon', 'Vers le soleil à midi')], h: L('The Earth is like a giant magnet, so a compass needle points north.', 'La Terre est comme un gros aimant, alors l’aiguille de la boussole pointe vers le nord.') },
  { e: '🌍', t: L('Why does a compass work?', 'Pourquoi une boussole fonctionne-t-elle?'), a: L('The Earth has a magnetic field', 'La Terre a un champ magnétique'), o: [L('The Earth has a battery inside', 'La Terre a une pile à l’intérieur'), L('The needle is hungry', 'L’aiguille a faim')], h: L('Earth acts like a giant bar magnet.', 'La Terre agit comme un gros aimant.') },
  { e: '📄', t: L('Can a magnet pull a paper clip through a sheet of paper?', 'Un aimant peut-il tirer un trombone à travers une feuille de papier?'), a: L('Yes, magnetic force goes through paper', 'Oui, la force magnétique traverse le papier'), o: [L('No, paper blocks it completely', 'Non, le papier la bloque complètement'), L('Only if the paper is wet', 'Seulement si le papier est mouillé')], h: L('Magnetic force can act through paper, cloth and water.', 'La force magnétique agit à travers le papier, le tissu et l’eau.') },
  { e: '🥫', t: L('Which group contains only magnetic materials?', 'Quel groupe contient seulement des matériaux magnétiques?'), a: L('Iron, nickel, cobalt', 'Fer, nickel, cobalt'), o: [L('Wood, glass, rubber', 'Bois, verre, caoutchouc'), L('Plastic, paper, cotton', 'Plastique, papier, coton')], h: L('Iron, nickel and cobalt (and steel, which has iron) are magnetic.', 'Le fer, le nickel et le cobalt (et l’acier, qui contient du fer) sont magnétiques.') },
  { e: '🥤', t: L('A magnet does not pick up an aluminum can. Why?', 'Un aimant ne soulève pas une cannette d’aluminium. Pourquoi?'), a: L('Aluminum is not magnetic', 'L’aluminium n’est pas magnétique'), o: [L('The can is too cold', 'La cannette est trop froide'), L('The magnet is too small', 'L’aimant est trop petit')], h: L('Not every metal is magnetic. Aluminum and copper are not.', 'Tous les métaux ne sont pas magnétiques. L’aluminium et le cuivre ne le sont pas.') },
  { e: '🔊', t: L('Which of these uses magnets?', 'Lequel de ces objets utilise des aimants?'), a: L('A speaker and a fridge door seal', 'Un haut-parleur et un joint de porte de frigo'), o: [L('A wooden spoon', 'Une cuillère en bois'), L('A candle', 'Une chandelle')], h: L('Magnets are inside speakers, latches, toys and compasses.', 'Il y a des aimants dans les haut-parleurs, les loquets, les jouets et les boussoles.') },
];

const SPICY = () => [
  { e: '🎈', t: L(`${M} rubs a balloon on her hair and it sticks to the wall. What is this?`, `${M} frotte un ballon sur ses cheveux et il colle au mur. Qu’est-ce que c’est?`), a: L('Static electricity', 'De l’électricité statique'), o: [L('Magnetism', 'Du magnétisme'), L('Gravity', 'De la gravité')], h: L('Rubbing builds up a charge, called static electricity.', 'Frotter accumule une charge, appelée électricité statique.') },
  { e: '⚡', t: L('Lightning in a thunderstorm is a huge spark of…', 'Un éclair pendant un orage est une énorme étincelle d’…'), a: L('Static electricity', 'électricité statique'), o: [L('Magnetism', 'aimantation'), L('Friction heat only', 'chaleur de friction seulement')], h: L('Static charge builds up in clouds and jumps as lightning. Stay indoors during storms!', 'La charge statique s’accumule dans les nuages et saute sous forme d’éclair. Reste à l’intérieur pendant un orage!') },
  { e: '🧦', t: L('You shuffle across a carpet in socks and get a zap from the doorknob. What caused it?', 'Tu glisses sur un tapis en bas et tu reçois un petit choc en touchant la poignée. Qu’est-ce qui l’a causé?'), a: L('Static electricity', 'L’électricité statique'), o: [L('A magnet in the door', 'Un aimant dans la porte'), L('Gravity', 'La gravité')], h: L('Rubbing your socks on the carpet builds up a charge that zaps when you touch metal.', 'Frotter tes bas sur le tapis accumule une charge qui fait un petit choc au contact du métal.') },
  { e: '🧪', t: L('To find which magnet is strongest, ' + `${F} counts the paper clips each one lifts. What must stay the SAME?`, 'Pour trouver l’aimant le plus fort, ' + `${F} compte les trombones que chacun soulève. Quoi doit rester PAREIL?`), a: L('The size and kind of paper clips', 'La grosseur et le type de trombones'), o: [L('The magnet', 'L’aimant'), L('Nothing', 'Rien')], h: L('A fair test changes one thing (the magnet) and keeps everything else the same.', 'Un test équitable change une seule chose (l’aimant) et garde le reste pareil.') },
  { e: '📎', t: L('You rub a steel nail along a magnet many times. What can happen to the nail?', 'Tu frottes un clou d’acier sur un aimant plusieurs fois. Que peut-il arriver au clou?'), a: L('It can become a weak magnet', 'Il peut devenir un faible aimant'), o: [L('It turns to plastic', 'Il devient du plastique'), L('It disappears', 'Il disparaît')], h: L('Rubbing steel with a magnet lines up its tiny magnetic parts.', 'Frotter l’acier avec un aimant aligne ses minuscules parties magnétiques.') },
  { e: '🔋', t: L('An electromagnet is a magnet that works only when…', 'Un électroaimant est un aimant qui fonctionne seulement quand…'), a: L('Electricity flows through a wire coil', 'L’électricité circule dans une bobine de fil'), o: [L('It is very cold', 'Il fait très froid'), L('It is shaken', 'On le secoue')], h: L('Turn the electricity off and the magnet turns off too. Junkyard cranes use them!', 'Coupe l’électricité et l’aimant s’éteint. Les grues de cour à ferraille en utilisent!') },
];

export default {
  id: 'magnets',
  emoji: '🧲',
  theme: 'bike',
  color: '#d32f2f',
  get title() { return L('Magnet Lab', 'Le labo des aimants'); },
  get skill() { return L('Magnets & static', 'Aimants et électricité statique'); },
  get blurb() { return L('Attract, repel, zap and find north with a compass!', 'Attire, repousse, fais des étincelles et trouve le nord!'); },
  get intro() {
    return L(`${F} and ${M} set up a magnet lab at the cottage. Let's find out what magnets and static electricity can do!`,
      `${F} et ${M} installent un labo des aimants au chalet. Découvrons ce que les aimants et l’électricité statique peuvent faire!`);
  },
  get levels() {
    return {
      mild: { kid: L('Poles and what sticks', 'Les pôles et ce qui colle'), parent: 'Magnetic vs. non-magnetic materials; poles; attract and repel.' },
      medium: { kid: L('Compasses and magnetic metals', 'Boussoles et métaux magnétiques'), parent: 'Compass and Earth\'s magnetic field; iron, nickel, cobalt; magnetic force through materials; uses of magnets.' },
      spicy: { kid: L('Static, lightning and fair tests', 'Électricité statique, éclairs et tests'), parent: 'Static electricity (balloon, doorknob zap, lightning), making a magnet, electromagnets, fair testing.' },
    };
  },
  get praise() { return L(['Attractive answer! 🧲', 'Zap! ⚡', 'Spot on! 🧭'], ['Une réponse attirante! 🧲', 'Zap! ⚡', 'Pile dans le mille! 🧭']); },
  get doneTitles() { return L(['Lab complete! 🧲', 'Magnet master! ⚡'], ['Labo terminé! 🧲', 'Maîtresse des aimants! ⚡']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(4), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM().slice(2)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'mg' });
  },
};
