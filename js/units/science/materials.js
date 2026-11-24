// SCIENCE (Grade 2) — Materials & objects: Mia's Slime Lab 🫧 / Le labo de slime de Mia
import { pick } from '../../util.js';
import { factQ } from '../common.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;
const BADGES = () => L(['🧪 Lab time!', '🫧 Squish it!', '🔍 Test it!', '🧸 Materials!'], ['🧪 Au labo!', '🫧 On écrase!', '🔍 On teste!', '🧸 Les matériaux!']);

const MILD = () => [
  { e: '🪟', t: L('Which material is see-through, like a window?', 'Quel matériau est transparent, comme une fenêtre?'), a: L('Glass', 'Le verre'), o: [L('Wood', 'Le bois'), L('Metal', 'Le métal')], h: L('Glass lets light through, so you can see through it.', 'Le verre laisse passer la lumière, alors on voit à travers.') },
  { e: '🧸', t: L('Which material is soft and cuddly?', 'Quel matériau est doux et câlin?'), a: L('Fabric (like a teddy bear)', 'Le tissu (comme un toutou)'), o: [L('Rock', 'La roche'), L('Metal', 'Le métal')], h: L('Soft materials squish when you press them.', 'Les matériaux doux s’écrasent quand on appuie.') },
  { e: '🪨', t: L('Which material is HARD?', 'Quel matériau est DUR?'), a: L('A rock', 'Une roche'), o: [L('A marshmallow', 'Une guimauve'), L('Play dough', 'La pâte à modeler')], h: L('Hard materials do not squish when you press them.', 'Les matériaux durs ne s’écrasent pas quand on appuie.') },
  { e: '🌂', t: L('A raincoat must keep water out. What should it be?', 'Un imperméable doit empêcher l’eau d’entrer. Comment doit-il être?'), a: L('Waterproof', 'Imperméable'), o: [L('Absorbent', 'Absorbant'), L('See-through', 'Transparent')], h: L('Waterproof materials do not let water through.', 'Les matériaux imperméables ne laissent pas passer l’eau.') },
  { e: '🥄', t: L('Which of these is made of metal?', 'Lequel de ces objets est fait de métal?'), a: L('A key', 'Une clé'), o: [L('A paper plate', 'Une assiette en papier'), L('A cotton sock', 'Un bas en coton')], h: L('Metal is hard and shiny. Keys, coins and spoons are often metal.', 'Le métal est dur et brillant. Les clés, les pièces de monnaie et les cuillères sont souvent en métal.') },
  { e: '🌲', t: L('A wooden table is made from…', 'Une table en bois est faite à partir…'), a: L('Trees', 'D’arbres'), o: [L('Sand', 'De sable'), L('Water', 'D’eau')], h: L('Wood comes from trees.', 'Le bois vient des arbres.') },
];

const MEDIUM = () => [
  { e: '🧽', t: L('A sponge soaks up spilled juice. What is a sponge?', 'Une éponge absorbe le jus renversé. Comment est une éponge?'), a: L('Absorbent', 'Absorbante'), o: [L('Waterproof', 'Imperméable'), L('Magnetic', 'Magnétique')], h: L('Absorbent materials soak up liquid.', 'Les matériaux absorbants prennent le liquide.') },
  { e: '🧲', t: L('A magnet sticks to which material?', 'Un aimant colle à quel matériau?'), a: L('Steel (like a paper clip)', 'L’acier (comme un trombone)'), o: [L('Wood', 'Le bois'), L('Plastic', 'Le plastique')], h: L('Magnets stick to iron and steel, not wood or plastic.', 'Les aimants collent au fer et à l’acier, pas au bois ni au plastique.') },
  { e: '🎀', t: L(`${M}'s ribbon bends and curls easily. How would you describe it?`, `Le ruban de ${M} se plie et se courbe facilement. Comment le décrirais-tu?`), a: L('Flexible', 'Flexible'), o: [L('Rigid', 'Rigide'), L('Heavy', 'Lourd')], h: L('Flexible means it bends without breaking.', 'Flexible veut dire qui se plie sans se casser.') },
  { e: '🏏', t: L('A baseball bat does not bend. How would you describe it?', 'Un bâton de baseball ne plie pas. Comment le décrirais-tu?'), a: L('Rigid (stiff)', 'Rigide (raide)'), o: [L('Flexible', 'Flexible'), L('Absorbent', 'Absorbant')], h: L('Rigid materials keep their shape.', 'Les matériaux rigides gardent leur forme.') },
  { e: '🫧', t: L('Slime is stretchy and squishy. Which word describes it?', 'Le slime est étirable et mou. Quel mot le décrit?'), a: L('Stretchy', 'Étirable'), o: [L('Brittle', 'Cassant'), L('Rigid', 'Rigide')], h: L('Slime can stretch without breaking, like a stretchy toy.', 'Le slime peut s’étirer sans se casser.') },
  { e: '🪵', t: L('Which of these will FLOAT in water?', 'Lequel de ces objets va FLOTTER dans l’eau?'), a: L('A wooden block', 'Un bloc de bois'), o: [L('A coin', 'Une pièce de monnaie'), L('A rock', 'Une roche')], h: L('Wood is light for its size, so it floats. Metal coins and rocks sink.', 'Le bois est léger pour sa taille, alors il flotte. Les pièces et les roches coulent.') },
];

const SPICY = () => [
  { e: '⛵', t: L(`${M} wants to build a toy boat that floats. Which material is best for the hull?`, `${M} veut construire un bateau jouet qui flotte. Quel matériau est le meilleur pour la coque?`), a: L('Plastic foam', 'La mousse de plastique'), o: [L('A steel bolt', 'Un boulon d’acier'), L('A glass marble', 'Une bille de verre')], h: L('Choose a material that is light and keeps water out.', 'Choisis un matériau léger qui garde l’eau dehors.') },
  { e: '🧤', t: L('Which material is best for an oven mitt to protect your hand?', 'Quel matériau est le meilleur pour une mitaine de four afin de protéger ta main?'), a: L('Thick cloth', 'Un tissu épais'), o: [L('Thin metal foil', 'Une mince feuille de métal'), L('Plain paper', 'Du papier ordinaire')], h: L('Thick cloth does not let heat through quickly.', 'Le tissu épais ne laisse pas passer la chaleur rapidement.') },
  { e: '🟣', t: L('Play dough left open on the table gets hard and dry. What happened?', 'La pâte à modeler laissée ouverte sur la table devient dure et sèche. Qu’est-ce qui s’est passé?'), a: L('The water in it dried up into the air', 'L’eau qu’elle contient s’est évaporée dans l’air'), o: [L('It grew a tail', 'Elle a poussé une queue'), L('It turned into metal', 'Elle est devenue du métal')], h: L('Keep play dough in a closed container so the water stays in.', 'Garde la pâte à modeler dans un contenant fermé pour que l’eau reste dedans.') },
  { e: '♻️', t: L('Which of these can be recycled in the blue bin?', 'Lequel de ces objets peut aller au bac de recyclage bleu?'), a: L('A clean plastic bottle', 'Une bouteille en plastique propre'), o: [L('A banana peel', 'Une pelure de banane'), L('A greasy pizza box', 'Une boîte à pizza graisseuse')], h: L('Clean paper, plastic bottles, cans and glass go in recycling. Food waste goes in the green bin.', 'Le papier propre, les bouteilles en plastique, les cannettes et le verre vont au recyclage. Les restes de table vont au bac vert.') },
  { e: '🔦', t: L('Which material is OPAQUE (you cannot see through it at all)?', 'Quel matériau est OPAQUE (on ne voit pas du tout à travers)?'), a: L('Wood', 'Le bois'), o: [L('Clear glass', 'Le verre clair'), L('Clear plastic wrap', 'La pellicule plastique transparente')], h: L('Transparent = see-through. Opaque = light cannot get through.', 'Transparent = on voit à travers. Opaque = la lumière ne passe pas.') },
  { e: '🧪', t: L('To test which paper towel soaks up the most water, what must stay the SAME?', 'Pour tester quel papier essuie-tout absorbe le plus d’eau, quoi doit rester PAREIL?'), a: L('The amount of water we pour', 'La quantité d’eau qu’on verse'), o: [L('The brand of paper towel', 'La marque du papier'), L('Nothing', 'Rien')], h: L('A fair test changes one thing (the paper towel) and keeps the rest the same.', 'Un test équitable change une seule chose (le papier) et garde le reste pareil.') },
  { e: '🛠️', t: L(`${F} is building a doghouse for Biscuit. Which material would keep the rain out best?`, `${F} construit une niche pour Biscuit. Quel matériau garderait le mieux la pluie dehors?`), a: L('Wood covered with waterproof paint', 'Du bois recouvert de peinture imperméable'), o: [L('Paper', 'Du papier'), L('A sponge', 'Une éponge')], h: L('The best material for a job has the right properties for it.', 'Le meilleur matériau pour un travail a les bonnes propriétés.') },
];

export default {
  id: 'materials',
  emoji: '🫧',
  theme: 'slime',
  color: '#7e57c2',
  get title() { return L(`${M}'s Slime Lab`, `Le labo de slime de ${M}`); },
  get skill() { return L('Materials & objects', 'Les matériaux et les objets'); },
  get blurb() { return L('Squish, stretch and test slime, sponges and more!', 'Écrase, étire et teste du slime, des éponges et plus!'); },
  get intro() {
    return L(`${M} has a slime lab! She tests different materials to see which are soft, hard, stretchy, or waterproof. ${G} wants to help!`,
      `${M} a un labo de slime! Elle teste différents matériaux pour voir lesquels sont doux, durs, étirables ou imperméables. ${G} veut aider!`);
  },
  get levels() {
    return {
      mild: { kid: L('What things are made of', 'De quoi sont faits les objets'), parent: 'Naming everyday materials (glass, wood, metal, fabric) and simple properties (hard, soft, see-through, waterproof).' },
      medium: { kid: L('Properties', 'Les propriétés'), parent: 'Absorbent, waterproof, flexible, rigid, magnetic; floating; describing materials.' },
      spicy: { kid: L('Best material for the job', 'Le meilleur matériau pour le travail'), parent: 'Choosing materials for a purpose, transparent/opaque, recycling, fair testing.' },
    };
  },
  get praise() { return L(['Squishy good! 🫧', 'Lab genius! 🧪', 'Nice test! 🔍'], ['Super gluant! 🫧', 'Génie du labo! 🧪', 'Beau test! 🔍']); },
  get doneTitles() { return L(['Lab report done! 🧪', 'Materials expert! 🫧'], ['Rapport de labo terminé! 🧪', 'Experte des matériaux! 🫧']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(3), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM().slice(3)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'mt' });
  },
};
