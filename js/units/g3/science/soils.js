// GRADE 3 SCIENCE — Soils in the Environment: Garden Dirt Detectives 🪱 / Les détectives de la terre
import { pick } from '../../../util.js';
import { factQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M } = FAMILY3;
const BADGES = () => L(['🪱 Dig it!', '🌱 Garden dirt!', '🔍 Soil detective!', '🪴 Plant pot!'], ['🪱 On creuse!', '🌱 La terre du jardin!', '🔍 Détective de la terre!', '🪴 Le pot de fleurs!']);

const MILD = () => [
  { e: '🌱', t: L('What is soil made of?', 'De quoi la terre est-elle faite?'), a: L('Tiny bits of rock, plus dead plants and animals', 'De minuscules morceaux de roche, plus des plantes et des animaux morts'), o: [L('Only water', 'Seulement de l’eau'), L('Only plastic', 'Seulement du plastique')], h: L('Soil is a mix of rock pieces, air, water and decayed living things.', 'La terre est un mélange de morceaux de roche, d’air, d’eau et de restes d’êtres vivants.') },
  { e: '🪱', t: L('Which animal helps make soil healthy by digging tunnels?', 'Quel animal aide à garder la terre en santé en creusant des tunnels?'), a: L('An earthworm', 'Un ver de terre'), o: [L('A goldfish', 'Un poisson rouge'), L('A parrot', 'Un perroquet')], h: L('Worms mix the soil and let air and water get in.', 'Les vers mélangent la terre et laissent entrer l’air et l’eau.') },
  { e: '🍅', t: L(`${F} plants tomatoes in her garden. What does the soil give the plants?`, `${F} plante des tomates dans son jardin. Que donne la terre aux plantes?`), a: L('Water, nutrients and a place to hold their roots', 'De l’eau, des nutriments et un endroit où fixer leurs racines'), o: [L('Sunlight', 'De la lumière du soleil'), L('Music', 'De la musique')], h: L('Roots grow in soil to hold the plant and take in water and nutrients.', 'Les racines poussent dans la terre pour tenir la plante et absorber l’eau et les nutriments.') },
  { e: '🧱', t: L('Which of these is made from soil (clay)?', 'Lequel de ces objets est fait de terre (argile)?'), a: L('A clay pot or brick', 'Un pot ou une brique en argile'), o: [L('A glass window', 'Une fenêtre de verre'), L('A plastic cup', 'Un gobelet en plastique')], h: L('People use clay from the ground to make pottery and bricks.', 'On utilise l’argile du sol pour faire des poteries et des briques.') },
  { e: '🌍', t: L('Where is soil found?', 'Où trouve-t-on de la terre?'), a: L('On the surface of the land', 'À la surface de la terre'), o: [L('Only in space', 'Seulement dans l’espace'), L('Only inside clouds', 'Seulement dans les nuages')], h: L('Soil covers much of the Earth’s land.', 'La terre recouvre une grande partie des terres de la planète.') },
  { e: '🌳', t: L('What do we call the top layer of soil, where plants grow?', 'Comment appelle-t-on la couche du dessus de la terre, où poussent les plantes?'), a: L('Topsoil', 'La terre végétale'), o: [L('Bedrock', 'Le socle rocheux'), L('Sandpaper', 'Le papier sablé')], h: L('Topsoil is dark and full of nutrients.', 'La terre végétale est foncée et pleine de nutriments.') },
];

const MEDIUM = () => [
  { e: '🏖️', t: L('Sand has big pieces. What happens when you pour water on sand?', 'Le sable a de gros grains. Que se passe-t-il quand on verse de l’eau sur du sable?'), a: L('Water drains through quickly', 'L’eau passe vite à travers'), o: [L('Water stays on top forever', 'L’eau reste dessus pour toujours'), L('The sand turns into clay', 'Le sable devient de l’argile')], h: L('Sand has big gaps between its pieces, so water flows through fast.', 'Le sable a de grands espaces entre ses grains, alors l’eau passe vite.') },
  { e: '🟤', t: L('Clay has very tiny pieces packed close together. What happens to water on clay?', 'L’argile a de très petits grains serrés. Que fait l’eau sur l’argile?'), a: L('It drains slowly and stays in puddles', 'Elle s’écoule lentement et forme des flaques'), o: [L('It drains faster than sand', 'Elle s’écoule plus vite que dans le sable'), L('It disappears at once', 'Elle disparaît tout de suite')], h: L('Clay has tiny gaps, so water moves through slowly.', 'L’argile a de minuscules espaces, alors l’eau passe lentement.') },
  { e: '🍂', t: L('Dead leaves and plants break down and make dark, rich material in soil. What is it called?', 'Les feuilles et plantes mortes se décomposent et forment un matériau foncé et riche dans la terre. Comment s’appelle-t-il?'), a: L('Humus', 'L’humus'), o: [L('Gravel', 'Le gravier'), L('Pebbles', 'Les cailloux')], h: L('Humus is full of nutrients that help plants grow.', 'L’humus est plein de nutriments qui aident les plantes à pousser.') },
  { e: '🪨', t: L('Which layer of soil is under the topsoil and has more rocks?', 'Quelle couche de terre est sous la terre végétale et contient plus de roches?'), a: L('Subsoil', 'Le sous-sol'), o: [L('Sky layer', 'La couche du ciel'), L('Cloud layer', 'La couche des nuages')], h: L('Layers from top to bottom: topsoil, subsoil, then bedrock.', 'Les couches, de haut en bas : terre végétale, sous-sol, puis socle rocheux.') },
  { e: '🌻', t: L('Which soil is BEST for growing a garden?', 'Quelle terre est la MEILLEURE pour faire pousser un jardin?'), a: L('Dark soil with lots of humus', 'Une terre foncée avec beaucoup d’humus'), o: [L('Pure sand', 'Du sable pur'), L('Hard-packed gravel', 'Du gravier tassé')], h: L('Good garden soil holds some water and has lots of nutrients.', 'Une bonne terre de jardin retient un peu d’eau et a beaucoup de nutriments.') },
  { e: '🔬', t: L('You rub a pinch of soil between your fingers. It feels gritty. What is probably in it?', 'Tu frottes une pincée de terre entre tes doigts. C’est granuleux. Qu’y a-t-il probablement dedans?'), a: L('Sand', 'Du sable'), o: [L('Only water', 'Seulement de l’eau'), L('Only humus', 'Seulement de l’humus')], h: L('Sand feels gritty. Clay feels sticky. Silt feels smooth, like flour.', 'Le sable est granuleux. L’argile est collante. Le limon est lisse, comme de la farine.') },
  { e: '🧺', t: L(`${M} wants soil that holds water well for her potted plant. Which should she pick?`, `${M} veut une terre qui retient bien l’eau pour sa plante en pot. Laquelle choisir?`), a: L('A mix with humus and clay', 'Un mélange avec de l’humus et de l’argile'), o: [L('Pure sand', 'Du sable pur'), L('Gravel only', 'Seulement du gravier')], h: L('Humus and clay hold water. Sand lets it drain away.', 'L’humus et l’argile retiennent l’eau. Le sable la laisse s’écouler.') },
];

const SPICY = () => [
  { e: '🌧️', t: L('Heavy rain washes soil off a bare hill. What is this called?', 'Une forte pluie emporte la terre d’une colline dénudée. Comment appelle-t-on ça?'), a: L('Erosion', 'L’érosion'), o: [L('Evaporation', 'L’évaporation'), L('Compost', 'Le compost')], h: L('Erosion is when wind or water carries soil away.', 'L’érosion, c’est quand le vent ou l’eau emporte la terre.') },
  { e: '🌿', t: L('How can plants and trees help stop erosion?', 'Comment les plantes et les arbres aident-ils à arrêter l’érosion?'), a: L('Their roots hold the soil in place', 'Leurs racines retiennent la terre en place'), o: [L('They wash the soil away', 'Ils emportent la terre'), L('They turn soil into water', 'Ils transforment la terre en eau')], h: L('Roots act like nets under the ground.', 'Les racines agissent comme des filets sous terre.') },
  { e: '♻️', t: L('Banana peels and leaves are put in a compost bin. What do they turn into?', 'Des pelures de banane et des feuilles sont mises au compost. En quoi se transforment-elles?'), a: L('Rich soil for gardens', 'Une terre riche pour les jardins'), o: [L('Plastic', 'Du plastique'), L('Sand', 'Du sable')], h: L('Compost is decayed plants and food that help soil.', 'Le compost est fait de plantes et de nourriture décomposées qui nourrissent la terre.') },
  { e: '🚜', t: L('Why do farmers care about keeping their soil healthy?', 'Pourquoi les fermiers tiennent-ils à garder leur terre en santé?'), a: L('So crops can grow well', 'Pour que les récoltes poussent bien'), o: [L('So it will be bigger', 'Pour qu’elle soit plus grande'), L('So it can fly', 'Pour qu’elle vole')], h: L('Healthy soil means healthy food.', 'Une bonne terre donne de bons aliments.') },
  { e: '🏗️', t: L('Why do builders test the soil before they build a house?', 'Pourquoi les bâtisseurs testent-ils la terre avant de construire une maison?'), a: L('To make sure the ground can support the building', 'Pour s’assurer que le sol peut soutenir le bâtiment'), o: [L('To check its colour for fun', 'Pour regarder sa couleur par plaisir'), L('To find buried toys', 'Pour trouver des jouets enterrés')], h: L('Soft or soggy soil could make a house sink or tilt.', 'Une terre molle ou détrempée pourrait faire s’enfoncer ou pencher une maison.') },
  { e: '🧪', t: L('To test which soil drains water fastest, what must stay the SAME?', 'Pour tester quelle terre laisse passer l’eau le plus vite, quoi doit rester PAREIL?'), a: L('The amount of soil and the amount of water', 'La quantité de terre et la quantité d’eau'), o: [L('The kind of soil', 'Le type de terre'), L('Nothing', 'Rien')], h: L('A fair test changes only one thing: the kind of soil.', 'Un test équitable change seulement une chose : le type de terre.') },
  { e: '🐛', t: L('Which living things in the soil help break down dead plants?', 'Quels êtres vivants dans la terre aident à décomposer les plantes mortes?'), a: L('Worms, insects and tiny microbes', 'Les vers, les insectes et les microbes minuscules'), o: [L('Only birds in the sky', 'Seulement les oiseaux dans le ciel'), L('Only fish', 'Seulement les poissons')], h: L('Tiny living things turn dead plants into nutrients.', 'De minuscules êtres vivants transforment les plantes mortes en nutriments.') },
];

export default {
  id: 'soils',
  emoji: '🪱',
  theme: 'garden',
  color: '#795548',
  get title() { return L('Garden Dirt Detectives', 'Les détectives de la terre'); },
  get skill() { return L('Soils', 'Les sols'); },
  get blurb() { return L('Dig into sand, clay and humus in the chili garden!', 'Creuse dans le sable, l’argile et l’humus au potager!'); },
  get intro() {
    return L(`${F} and ${M} are detectives! They are digging in the garden to find out all about soil.`,
      `${F} et ${M} sont des détectives! Elles creusent dans le jardin pour tout découvrir sur la terre.`);
  },
  get levels() {
    return {
      mild: { kid: L('What soil is and does', 'Ce qu’est la terre et à quoi elle sert'), parent: 'What soil is made of; living things in soil; what soil gives plants; uses of clay; topsoil.' },
      medium: { kid: L('Sand, clay and humus', 'Sable, argile et humus'), parent: 'Components of soil; how water moves through sand vs. clay; humus; soil layers; choosing soil for plants.' },
      spicy: { kid: L('Erosion, compost and testing', 'Érosion, compost et tests'), parent: 'Erosion and how roots help; compost; why farmers and builders care about soil; fair testing; decomposers.' },
    };
  },
  get praise() { return L(['Dig it! 🪱', 'Soil-id work! 🌱', 'Dirt-ectively smart! 🔍'], ['On creuse! 🪱', 'Du solide! 🌱', 'Détective de talent! 🔍']); },
  get doneTitles() { return L(['Case closed! 🔍', 'Soil expert! 🌱'], ['Affaire classée! 🔍', 'Experte des sols! 🌱']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(2), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM().slice(2)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'so' });
  },
};
