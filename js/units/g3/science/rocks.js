// GRADE 3 SCIENCE — Rocks & minerals: Rock Detectives 🪨 / Les détectives de roches
import { pick } from '../../../util.js';
import { factQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M, uncle, uncleFr } = FAMILY3;
const BADGES = () => L(['🪨 Rock hunt!', '🔎 Look closer!', '⛰️ Cottage rocks!', '💎 Mineral!'], ['🪨 Chasse aux roches!', '🔎 Regarde de plus près!', '⛰️ Roches du chalet!', '💎 Minéral!']);

const MILD = () => [
  { e: '🪨', t: L('What are rocks made of?', 'De quoi les roches sont-elles faites?'), a: L('Minerals', 'De minéraux'), o: [L('Only water', 'Seulement d’eau'), L('Plastic', 'De plastique')], h: L('Rocks are made of one or more minerals pressed together.', 'Les roches sont faites d’un ou de plusieurs minéraux pressés ensemble.') },
  { e: '🌋', t: L('Scientists sort rocks into three main groups. Which list is correct?', 'Les scientifiques classent les roches en trois groupes. Quelle liste est la bonne?'), a: L('Igneous, sedimentary, metamorphic', 'Ignées, sédimentaires, métamorphiques'), o: [L('Hard, soft, wet', 'Dures, molles, mouillées'), L('Red, blue, green', 'Rouges, bleues, vertes')], h: L('Igneous, sedimentary and metamorphic are the three rock types.', 'Ignées, sédimentaires et métamorphiques sont les trois types de roches.') },
  { e: '🔍', t: L('Which tool helps a rock detective see tiny parts of a rock?', 'Quel outil aide un détective de roches à voir les petites parties d’une roche?'), a: L('A hand lens (magnifying glass)', 'Une loupe'), o: [L('A thermometer', 'Un thermomètre'), L('A ruler only', 'Seulement une règle')], h: L('A hand lens makes small things look bigger.', 'Une loupe agrandit les petites choses.') },
  { e: '🏞️', t: L('A pebble from the river is smooth and round. Why?', 'Un caillou de la rivière est lisse et rond. Pourquoi?'), a: L('The water rubbed it for a long time', 'L’eau l’a frotté longtemps'), o: [L('Someone painted it', 'Quelqu’un l’a peint'), L('It was born round', 'Il est né rond')], h: L('Moving water rubs rocks smooth over many years.', 'L’eau en mouvement polit les roches pendant des années.') },
  { e: '🌈', t: L('Which of these is a PROPERTY of a rock?', 'Lequel de ces mots décrit une PROPRIÉTÉ d’une roche?'), a: L('Colour', 'La couleur'), o: [L('Its favourite song', 'Sa chanson préférée'), L('Its birthday', 'Son anniversaire')], h: L('Rocks can be described by colour, size, shape, hardness and texture.', 'On décrit les roches par leur couleur, leur grosseur, leur forme, leur dureté et leur texture.') },
  { e: '🧱', t: L('Which of these is a rock, not a mineral crystal or a plastic?', 'Lequel de ces objets est une roche?'), a: L('Granite', 'Le granit'), o: [L('A plastic toy', 'Un jouet en plastique'), L('A glass marble', 'Une bille de verre')], h: L('Granite is a rock that forms in nature.', 'Le granit est une roche qui se forme dans la nature.') },
];

const MEDIUM = () => [
  { e: '🌋', t: L('Igneous rock forms when…', 'Une roche ignée se forme quand…'), a: L('Melted rock (magma or lava) cools and hardens', 'De la roche fondue (magma ou lave) refroidit et durcit'), o: [L('Sand is stirred', 'On remue du sable'), L('Ice melts', 'La glace fond')], h: L('Igneous means “from fire”. Granite and basalt are igneous.', 'Ignée veut dire « venue du feu ». Le granit et le basalte sont des roches ignées.') },
  { e: '🏜️', t: L('Sedimentary rock forms when…', 'Une roche sédimentaire se forme quand…'), a: L('Layers of sand and mud are pressed together over a very long time', 'Des couches de sable et de boue sont pressées ensemble pendant très longtemps'), o: [L('Lava cools quickly', 'De la lave refroidit vite'), L('Water freezes', 'L’eau gèle')], h: L('Sandstone and limestone are sedimentary rocks.', 'Le grès et le calcaire sont des roches sédimentaires.') },
  { e: '🦕', t: L('Which type of rock is the best place to find fossils?', 'Quel type de roche est le meilleur endroit pour trouver des fossiles?'), a: L('Sedimentary rock', 'La roche sédimentaire'), o: [L('Igneous rock', 'La roche ignée'), L('Ice', 'La glace')], h: L('Fossils are pressed into layers of mud and sand that turn to rock.', 'Les fossiles sont pressés dans des couches de boue et de sable qui deviennent de la roche.') },
  { e: '🏛️', t: L('Marble is a rock that was changed by heat and pressure from another rock (limestone). What type is it?', 'Le marbre est une roche transformée par la chaleur et la pression à partir d’une autre roche (le calcaire). Quel type est-ce?'), a: L('Metamorphic', 'Métamorphique'), o: [L('Igneous', 'Ignée'), L('Sedimentary', 'Sédimentaire')], h: L('Metamorphic means “changed form”.', 'Métamorphique veut dire « qui a changé de forme ».') },
  { e: '⛰️', t: L(`The rocky land around ${uncle}'s cottage is part of the Canadian Shield. It is made mostly of…`, `Le terrain rocheux autour du chalet de ${uncleFr} fait partie du Bouclier canadien. Il est fait surtout de…`), a: L('Very old, hard rock like granite', 'Roches très anciennes et dures comme le granit'), o: [L('Soft sand only', 'Sable mou seulement'), L('Fresh volcano lava', 'Lave de volcan toute fraîche')], h: L('The Canadian Shield has some of the oldest rocks on Earth.', 'Le Bouclier canadien a certaines des plus vieilles roches de la Terre.') },
  { e: '💎', t: L('Which of these is a mineral?', 'Lequel de ces matériaux est un minéral?'), a: L('Quartz', 'Le quartz'), o: [L('A brick wall', 'Un mur de briques'), L('A cake', 'Un gâteau')], h: L('Minerals are natural, solid materials like quartz, mica and salt.', 'Les minéraux sont des matériaux solides naturels comme le quartz, le mica et le sel.') },
];

const SPICY = () => [
  { e: '🌬️', t: L('Wind, water and ice slowly break rocks into smaller pieces. What is this called?', 'Le vent, l’eau et la glace brisent lentement les roches en petits morceaux. Comment appelle-t-on ça?'), a: L('Weathering', 'L’altération (érosion)'), o: [L('Evaporation', 'L’évaporation'), L('Compost', 'Le compost')], h: L('Weathering breaks rocks down. Over time it helps make soil.', 'L’altération brise les roches. Avec le temps, elle aide à faire du sol.') },
  { e: '🧊', t: L('Water gets into a crack in a rock and freezes. What happens next?', 'L’eau entre dans une fissure d’une roche et gèle. Que se passe-t-il ensuite?'), a: L('The ice pushes and makes the crack bigger', 'La glace pousse et agrandit la fissure'), o: [L('The crack closes', 'La fissure se referme'), L('The rock turns into gold', 'La roche devient de l’or')], h: L('Water expands when it freezes. That is why roads get potholes in spring!', 'L’eau prend de l’expansion en gelant. C’est pourquoi les routes ont des nids-de-poule au printemps!') },
  { e: '🏖️', t: L('Where does the sand on a beach mostly come from?', 'D’où vient surtout le sable d’une plage?'), a: L('Rocks broken into tiny pieces by waves and weather', 'De roches brisées en petits morceaux par les vagues et le climat'), o: [L('Crushed candy', 'De bonbons écrasés'), L('Dried-up snow', 'De neige séchée')], h: L('Waves and weathering grind rocks into sand over a very long time.', 'Les vagues et l’altération transforment les roches en sable en très longtemps.') },
  { e: '🛣️', t: L('Which is a way people use rocks?', 'Laquelle est une façon dont les gens utilisent les roches?'), a: L('Crushed rock (gravel) to build roads', 'La roche concassée (gravier) pour construire des routes'), o: [L('To make ice cream', 'Pour faire de la crème glacée'), L('To breathe', 'Pour respirer')], h: L('People use rocks for roads, buildings, counters and jewellery.', 'On utilise les roches pour les routes, les bâtiments, les comptoirs et les bijoux.') },
  { e: '✏️', t: L('The “lead” in a pencil is really a soft mineral. What is it called?', 'La « mine » d’un crayon est en fait un minéral mou. Comment s’appelle-t-il?'), a: L('Graphite', 'Le graphite'), o: [L('Granite', 'Le granit'), L('Quartz', 'Le quartz')], h: L('Graphite is soft, so it leaves marks on paper.', 'Le graphite est mou, alors il laisse des traces sur le papier.') },
  { e: '🪙', t: L('A harder mineral can scratch a softer mineral. Which can scratch which?', 'Un minéral plus dur peut rayer un minéral plus mou. Lequel peut rayer lequel?'), a: L('A diamond can scratch quartz', 'Un diamant peut rayer le quartz'), o: [L('Chalk can scratch quartz', 'La craie peut rayer le quartz'), L('Talc can scratch a diamond', 'Le talc peut rayer un diamant')], h: L('Diamond is the hardest mineral. Talc is very soft.', 'Le diamant est le minéral le plus dur. Le talc est très mou.') },
  { e: '🌱', t: L(`${F}'s garden soil has tiny bits of rock in it. Where did they come from?`, `La terre du jardin de ${F} contient de minuscules morceaux de roche. D’où viennent-ils?`), a: L('Bigger rocks that weathered over time', 'De plus grosses roches altérées avec le temps'), o: [L('They fell from the moon', 'Ils sont tombés de la lune'), L('Worms made them', 'Les vers les ont faits')], h: L('Soil is made of weathered rock plus humus from dead plants.', 'Le sol est fait de roche altérée et d’humus de plantes mortes.') },
];

export default {
  id: 'rocks',
  emoji: '🪨',
  theme: 'history',
  color: '#757575',
  get title() { return L('Rock Detectives', 'Les détectives de roches'); },
  get skill() { return L('Rocks & minerals', 'Les roches et les minéraux'); },
  get blurb() { return L('Hunt for granite, fossils and sparkly minerals!', 'Pars à la chasse au granit, aux fossiles et aux minéraux brillants!'); },
  get intro() {
    return L(`${F} and ${M} are rock detectives at ${uncle}'s cottage. The Canadian Shield is full of clues!`,
      `${F} et ${M} sont détectives de roches au chalet de ${uncleFr}. Le Bouclier canadien est plein d’indices!`);
  },
  get levels() {
    return {
      mild: { kid: L('What rocks are', 'Ce que sont les roches'), parent: 'What rocks are made of; three rock types; describing rocks; hand lens; smooth river pebbles.' },
      medium: { kid: L('Three kinds of rock', 'Trois sortes de roches'), parent: 'Igneous, sedimentary and metamorphic rocks; fossils; the Canadian Shield; minerals.' },
      spicy: { kid: L('Weathering and uses', 'Altération et usages'), parent: 'Weathering (wind, water, ice), how sand and soil form, uses of rocks and minerals, mineral hardness.' },
    };
  },
  get praise() { return L(['Rock solid! 🪨', 'Gem of an answer! 💎', 'You rock! 🤘'], ['Solide comme le roc! 🪨', 'Une réponse en or! 💎', 'Tu es géniale! 🤘']); },
  get doneTitles() { return L(['Case cracked! 🔎', 'Rock expert! 🪨'], ['Affaire résolue! 🔎', 'Experte des roches! 🪨']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(3), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM().slice(2)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'rk' });
  },
};
