// GRADE 3 SCIENCE — Strong and Stable Structures: Cottage Builders 🛖 / Les bâtisseurs du chalet
import { pick } from '../../../util.js';
import { factQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M, baby: G, uncle, uncleFr } = FAMILY3;
const BADGES = () => L(['🛖 Build it!', '🌉 Bridge time!', '🏕️ Tent check!', '🧱 Strong or weak?'], ['🛖 On construit!', '🌉 Un pont!', '🏕️ La tente!', '🧱 Solide ou fragile?']);

const MILD = () => [
  { e: '🦫', t: L('Which of these is a structure made by an ANIMAL?', 'Laquelle de ces structures est faite par un ANIMAL?'), a: L('A beaver dam', 'Un barrage de castors'), o: [L('A bridge', 'Un pont'), L('A tent', 'Une tente')], h: L('Structures can be natural (made by animals) or human-made.', 'Les structures peuvent être naturelles (faites par des animaux) ou faites par les humains.') },
  { e: '🌉', t: L('Which of these is a HUMAN-MADE structure?', 'Laquelle de ces structures est faite par les HUMAINS?'), a: L('A bridge', 'Un pont'), o: [L('A bird’s nest', 'Un nid d’oiseau'), L('A spider web', 'Une toile d’araignée')], h: L('People build bridges, buildings and towers.', 'Les gens construisent des ponts, des bâtiments et des tours.') },
  { e: '🏗️', t: L('What does a STRONG structure do?', 'Que fait une structure SOLIDE?'), a: L('It holds a load without breaking', 'Elle supporte une charge sans se briser'), o: [L('It falls over easily', 'Elle tombe facilement'), L('It is always very small', 'Elle est toujours très petite')], h: L('Strong = does not break or collapse when something is put on it.', 'Solide = ne se brise pas et ne s’effondre pas quand on met quelque chose dessus.') },
  { e: '🧍', t: L('What does a STABLE structure do?', 'Que fait une structure STABLE?'), a: L('It stays balanced and does not tip over', 'Elle reste en équilibre et ne se renverse pas'), o: [L('It wobbles and falls', 'Elle branle et tombe'), L('It floats away', 'Elle s’envole')], h: L('Stable = does not tip or fall over easily.', 'Stable = ne se renverse pas facilement.') },
  { e: '🔺', t: L('Which shape is the STRONGEST for building?', 'Quelle forme est la PLUS SOLIDE pour construire?'), a: L('A triangle', 'Un triangle'), o: [L('A square (without braces)', 'Un carré (sans renfort)'), L('A circle of string', 'Un cercle de ficelle')], h: L('Triangles do not bend out of shape easily. Many bridges use triangles.', 'Les triangles ne se déforment pas facilement. Beaucoup de ponts utilisent des triangles.') },
  { e: '🛶', t: L(`${uncle}'s dock sticks out over the lake. Which is the best base for a stable dock?`, `Le quai de ${uncleFr} s’avance sur le lac. Quelle est la meilleure base pour un quai stable?`), a: L('Wide, flat supports', 'Des supports larges et plats'), o: [L('One thin pole', 'Un seul poteau mince'), L('A pile of loose sand', 'Un tas de sable meuble')], h: L('A wide base makes things more stable.', 'Une base large rend les objets plus stables.') },
  { e: '🏕️', t: L(`${F} and ${M} put up a tent. Why do they push the pegs into the ground?`, `${F} et ${M} montent une tente. Pourquoi enfoncent-elles les piquets dans le sol?`), a: L('To keep the tent stable in the wind', 'Pour que la tente reste stable dans le vent'), o: [L('To make it taller', 'Pour la rendre plus haute'), L('To make it colourful', 'Pour la rendre colorée')], h: L('Pegs anchor a structure so it will not blow away.', 'Les piquets ancrent la structure pour qu’elle ne s’envole pas.') },
];

const MEDIUM = () => [
  { e: '🤏', t: L('When a force squeezes or pushes something together, it is called…', 'Quand une force écrase ou pousse quelque chose ensemble, ça s’appelle…'), a: L('Compression', 'La compression'), o: [L('Tension', 'La tension'), L('Magnetism', 'Le magnétisme')], h: L('Compression squeezes. Think of a column holding up a roof.', 'La compression écrase. Pense à un pilier qui soutient un toit.') },
  { e: '🪢', t: L('When a force pulls something apart, it is called…', 'Quand une force tire quelque chose pour l’étirer, ça s’appelle…'), a: L('Tension', 'La tension'), o: [L('Compression', 'La compression'), L('Friction', 'Le frottement')], h: L('Tension stretches. Think of a rope in a tug-of-war.', 'La tension étire. Pense à une corde au tir à la corde.') },
  { e: '📚', t: L(`A shelf holds a stack of books. The weight of the books is called the…`, `Une étagère porte une pile de livres. Le poids des livres s’appelle la…`), a: L('Load', 'Charge'), o: [L('Base', 'Base'), L('Joint', 'Joint')], h: L('A load is the weight or force a structure has to hold.', 'La charge est le poids ou la force qu’une structure doit supporter.') },
  { e: '🧸', t: L('A bridge holds up its own weight and the weight of cars. Which is the “dead load”?', 'Un pont porte son propre poids et le poids des autos. Quelle est la « charge permanente »?'), a: L('The weight of the bridge itself', 'Le poids du pont lui-même'), o: [L('The cars driving over it', 'Les autos qui roulent dessus'), L('The wind', 'Le vent')], h: L('Dead load = the structure’s own weight. Live load = things that move on it.', 'Charge permanente = le poids de la structure. Charge variable = ce qui bouge dessus.') },
  { e: '🚗', t: L('Cars and trucks driving over a bridge are a…', 'Les autos et les camions qui roulent sur un pont sont une…'), a: L('Live load', 'Charge variable'), o: [L('Dead load', 'Charge permanente'), L('Foundation', 'Fondation')], h: L('A live load changes (it moves or comes and goes).', 'Une charge variable change (elle bouge ou va et vient).') },
  { e: '🪵', t: L('Which material is RIGID (does not bend easily)?', 'Quel matériau est RIGIDE (se plie difficilement)?'), a: L('A steel beam', 'Une poutre d’acier'), o: [L('A rubber band', 'Un élastique'), L('A sheet of cloth', 'Un morceau de tissu')], h: L('Rigid materials keep their shape. Flexible materials bend.', 'Les matériaux rigides gardent leur forme. Les matériaux flexibles se plient.') },
  { e: '🎒', t: L('Which material is FLEXIBLE (bends easily)?', 'Quel matériau est FLEXIBLE (se plie facilement)?'), a: L('A rope', 'Une corde'), o: [L('A brick', 'Une brique'), L('A concrete block', 'Un bloc de béton')], h: L('Flexible things bend without breaking, like ropes and rubber.', 'Les objets flexibles se plient sans se briser, comme les cordes et le caoutchouc.') },
  { e: '🔩', t: L('Pieces of a structure are held together at the…', 'Les pièces d’une structure sont tenues ensemble aux…'), a: L('Joints', 'Joints'), o: [L('Colours', 'Couleurs'), L('Shadows', 'Ombres')], h: L('Joints can be nails, screws, glue, or tape. Strong joints make strong structures.', 'Les joints peuvent être des clous, des vis, de la colle ou du ruban. Des joints solides font une structure solide.') },
];

const SPICY = () => [
  { e: '🪑', t: L(`${F} wants a taller tower that does NOT tip over. What should she do?`, `${F} veut une tour plus haute qui NE se renverse PAS. Que devrait-elle faire?`), a: L('Make the base wider and put heavy parts at the bottom', 'Élargir la base et mettre les parties lourdes en bas'), o: [L('Make the base narrower', 'Rétrécir la base'), L('Put heavy parts at the top', 'Mettre les parties lourdes en haut')], h: L('A wide base and a low centre of gravity make a structure more stable.', 'Une base large et un centre de gravité bas rendent la structure plus stable.') },
  { e: '📄', t: L('You roll a sheet of paper into a tube. Why can it hold more weight than the flat sheet?', 'Tu roules une feuille de papier en tube. Pourquoi peut-elle supporter plus de poids que la feuille plate?'), a: L('The shape makes it stronger', 'La forme la rend plus solide'), o: [L('Rolling adds more paper', 'Rouler ajoute du papier'), L('Tubes are magic', 'Les tubes sont magiques')], h: L('Folding or rolling a material changes its strength. Tubes and folds resist bending.', 'Plier ou rouler un matériau change sa solidité. Les tubes et les plis résistent à la flexion.') },
  { e: '🌉', t: L('Which bridge shape uses a big curve to carry its load?', 'Quel type de pont utilise une grande courbe pour porter sa charge?'), a: L('An arch bridge', 'Un pont en arc'), o: [L('A flat board bridge', 'Un pont avec une simple planche'), L('A rope-only bridge with no supports', 'Un pont de corde sans supports')], h: L('An arch pushes the load outward and down into its supports.', 'Un arc répartit la charge vers l’extérieur et vers le bas dans ses appuis.') },
  { e: '🧪', t: L('To test which bridge design is strongest, what must stay the SAME each time?', 'Pour tester quel pont est le plus solide, quoi doit rester PAREIL chaque fois?'), a: L('The materials and the weight we add', 'Les matériaux et le poids qu’on ajoute'), o: [L('Everything must be different', 'Tout doit être différent'), L('The person who tests', 'La personne qui teste')], h: L('A fair test changes just one thing and keeps the rest the same.', 'Un test équitable change une seule chose et garde le reste pareil.') },
  { e: '🛏️', t: L(`${F} makes a perfect bed. Which shape on a bunk bed frame makes it stronger?`, `${F} fait un lit parfait. Quelle forme sur le cadre d’un lit superposé le rend plus solide?`), a: L('Diagonal braces forming triangles', 'Des renforts en diagonale qui font des triangles'), o: [L('No braces at all', 'Aucun renfort'), L('Round rubber bands', 'Des élastiques ronds')], h: L('Diagonal braces stop a square frame from wobbling.', 'Les renforts en diagonale empêchent un cadre carré de branler.') },
  { e: '🌲', t: L('Which of these helps a tall tree stay stable in the wind?', 'Lequel aide un grand arbre à rester stable dans le vent?'), a: L('Deep, wide roots', 'De longues racines étalées'), o: [L('Thin, short roots', 'De courtes racines minces'), L('No roots', 'Aucune racine')], h: L('Roots anchor the tree, like pegs hold a tent.', 'Les racines ancrent l’arbre, comme les piquets tiennent une tente.') },
  { e: '🏠', t: L('Why do builders use a strong FOUNDATION under a house?', 'Pourquoi les bâtisseurs utilisent-ils de solides FONDATIONS sous une maison?'), a: L('To give it a strong, stable base', 'Pour lui donner une base solide et stable'), o: [L('To make it look pretty', 'Pour qu’elle soit jolie'), L('To hide the doors', 'Pour cacher les portes')], h: L('The foundation carries the weight of the whole building.', 'La fondation porte le poids de tout le bâtiment.') },
];

export default {
  id: 'structures',
  emoji: '🛖',
  theme: 'build',
  color: '#6d4c41',
  get title() { return L('Cottage Builders', 'Les bâtisseurs du chalet'); },
  get skill() { return L('Strong & stable structures', 'Structures solides et stables'); },
  get blurb() { return L('Build docks, tents and bridges that stay up!', 'Construis des quais, des tentes et des ponts qui tiennent!'); },
  get intro() {
    return L(`${F} and ${M} are building a dock, a tent and a bridge at ${uncle}'s cottage. They need strong, stable structures!`,
      `${F} et ${M} construisent un quai, une tente et un pont au chalet de ${uncleFr}. Il leur faut des structures solides et stables!`);
  },
  get levels() {
    return {
      mild: { kid: L('Strong and stable', 'Solide et stable'), parent: 'Natural vs. human-made structures; meaning of strong and stable; strong shapes (triangle); wide bases; anchoring.' },
      medium: { kid: L('Forces, loads and materials', 'Forces, charges et matériaux'), parent: 'Compression and tension; dead and live loads; rigid vs. flexible materials; joints.' },
      spicy: { kid: L('Make it better', 'Améliore-la'), parent: 'Improving stability (wider base, lower centre of gravity); how shape changes strength (tubes, braces, arches); fair testing; foundations.' },
    };
  },
  get praise() { return L(['Built to last! 🛖', 'Solid work! 🔨', 'Rock steady! 🧱'], ['Fait pour durer! 🛖', 'Du solide! 🔨', 'Stable comme le roc! 🧱']); },
  get doneTitles() { return L(['Cottage complete! 🛖', 'Master builder! 🔨'], ['Chalet terminé! 🛖', 'Maître bâtisseuse! 🔨']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(3), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM().slice(3)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'st' });
  },
};
