// SCIENCE (Grade 2) — Air & water in the environment: Cottage Weather Station 🌦️ / La station météo du chalet
import { pick } from '../../util.js';
import { factQ } from '../common.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;
const BADGES = () => L(['🌦️ Weather!', '💧 Water drop!', '🌬️ Wind!', '☁️ Cloud watch!'], ['🌦️ La météo!', '💧 Goutte d’eau!', '🌬️ Le vent!', '☁️ Les nuages!']);

const MILD = () => [
  { e: '🧊', t: L('An ice cube is water as a…', 'Un glaçon, c’est de l’eau sous forme de…'), a: L('Solid', 'Solide'), o: [L('Liquid', 'Liquide'), L('Gas', 'Gaz')], h: L('Water can be a solid (ice), a liquid (water) or a gas (water vapour).', 'L’eau peut être solide (glace), liquide (eau) ou gazeuse (vapeur d’eau).') },
  { e: '♨️', t: L('Steam from a hot cup of cocoa is water as a…', 'La vapeur d’un chocolat chaud, c’est de l’eau sous forme de…'), a: L('Gas', 'Gaz'), o: [L('Solid', 'Solide'), L('Sand', 'Sable')], h: L('Steam is water vapour, a gas you cannot easily see.', 'La vapeur est de l’eau à l’état gazeux, difficile à voir.') },
  { e: '🌬️', t: L('When air moves, what do we feel?', 'Quand l’air bouge, qu’est-ce qu’on sent?'), a: L('Wind', 'Du vent'), o: [L('Rain', 'De la pluie'), L('Snow', 'De la neige')], h: L('Wind is moving air.', 'Le vent, c’est de l’air qui bouge.') },
  { e: '☂️', t: L(`It is raining at the cottage. ${M} needs…`, `Il pleut au chalet. ${M} a besoin…`), a: L('An umbrella and rain boots', 'D’un parapluie et de bottes de pluie'), o: [L('Sunglasses and shorts', 'De lunettes de soleil et de shorts'), L('Skis', 'De skis')], h: L('Rain means wet weather. We stay dry with an umbrella.', 'La pluie, c’est un temps mouillé. On reste au sec avec un parapluie.') },
  { e: '🎈', t: L('Is there air inside a balloon?', 'Y a-t-il de l’air dans un ballon gonflé?'), a: L('Yes, air fills it', 'Oui, l’air le remplit'), o: [L('No, it is empty', 'Non, il est vide'), L('Only water', 'Seulement de l’eau')], h: L('Air is all around us and takes up space, even though we cannot see it.', 'L’air est partout autour de nous et prend de la place, même si on ne le voit pas.') },
  { e: '❄️', t: L('Snow and ice are water that is very…', 'La neige et la glace sont de l’eau très…'), a: L('Cold', 'Froide'), o: [L('Hot', 'Chaude'), L('Sticky', 'Collante')], h: L('When water gets cold enough, it freezes into ice.', 'Quand l’eau devient assez froide, elle gèle et devient de la glace.') },
  { e: '🏊', t: L('Where can we find lots of water?', 'Où trouve-t-on beaucoup d’eau?'), a: L('Lakes, rivers and oceans', 'Dans les lacs, les rivières et les océans'), o: [L('In the desert sand', 'Dans le sable du désert'), L('On the moon', 'Sur la lune')], h: L('Most of the Earth is covered by water.', 'La plus grande partie de la Terre est couverte d’eau.') },
];

const MEDIUM = () => [
  { e: '☀️', t: L('The sun warms a lake and water rises into the air as vapour. What is this called?', 'Le soleil réchauffe un lac et l’eau monte dans l’air sous forme de vapeur. Comment appelle-t-on ça?'), a: L('Evaporation', 'L’évaporation'), o: [L('Freezing', 'La congélation'), L('Melting', 'La fonte')], h: L('Evaporation is when liquid water turns into a gas.', 'L’évaporation, c’est quand l’eau liquide devient un gaz.') },
  { e: '☁️', t: L('Water vapour cools high in the sky and makes clouds. What is this called?', 'La vapeur d’eau refroidit en haut dans le ciel et forme des nuages. Comment appelle-t-on ça?'), a: L('Condensation', 'La condensation'), o: [L('Evaporation', 'L’évaporation'), L('Melting', 'La fonte')], h: L('Condensation is when a gas cools and turns back into tiny drops of water.', 'La condensation, c’est quand un gaz refroidit et redevient de minuscules gouttes d’eau.') },
  { e: '🌧️', t: L('When clouds get heavy, water falls as rain, snow or hail. What is this called?', 'Quand les nuages deviennent lourds, l’eau tombe en pluie, en neige ou en grêle. Comment appelle-t-on ça?'), a: L('Precipitation', 'Les précipitations'), o: [L('Evaporation', 'L’évaporation'), L('Condensation', 'La condensation')], h: L('Precipitation means water falling from clouds.', 'Les précipitations, c’est de l’eau qui tombe des nuages.') },
  { e: '🔄', t: L('What is the right order for the water cycle?', 'Quel est le bon ordre du cycle de l’eau?'), a: L('Evaporation → clouds → rain → back to the lake', 'Évaporation → nuages → pluie → retour au lac'), o: [L('Rain → clouds → evaporation → desert', 'Pluie → nuages → évaporation → désert'), L('Snow → sand → sun → lake', 'Neige → sable → soleil → lac')], h: L('Water goes up, makes clouds, falls down, and starts again.', 'L’eau monte, forme des nuages, retombe, et recommence.') },
  { e: '🌊', t: L('Which water is salty?', 'Quelle eau est salée?'), a: L('The ocean', 'L’océan'), o: [L('A lake in Ontario', 'Un lac en Ontario'), L('A tap', 'Un robinet')], h: L('Ocean water is salty. Lakes and rivers in Ontario are fresh water.', 'L’eau de l’océan est salée. Les lacs et les rivières de l’Ontario sont de l’eau douce.') },
  { e: '👕', t: L(`${F} hangs wet swimsuits in the sun. After an hour they are dry. Where did the water go?`, `${F} accroche des maillots mouillés au soleil. Après une heure, ils sont secs. Où est allée l’eau?`), a: L('Into the air (evaporated)', 'Dans l’air (elle s’est évaporée)'), o: [L('Into the sun', 'Dans le soleil'), L('It vanished forever', 'Elle a disparu pour toujours')], h: L('Heat turns liquid water into vapour that floats away.', 'La chaleur transforme l’eau liquide en vapeur qui s’envole.') },
  { e: '🚿', t: L('Which of these uses water?', 'Lequel utilise de l’eau?'), a: L('Taking a bath', 'Prendre un bain'), o: [L('Reading a book', 'Lire un livre'), L('Playing a guitar', 'Jouer de la guitare')], h: L('We use water for drinking, washing, cooking and growing food.', 'On utilise l’eau pour boire, se laver, cuisiner et faire pousser la nourriture.') },
];

const SPICY = () => [
  { e: '🎈', t: L('You blow into a balloon and it gets bigger. What does this show?', 'Tu souffles dans un ballon et il grossit. Qu’est-ce que ça montre?'), a: L('Air takes up space', 'L’air prend de la place'), o: [L('Air is heavy like rocks', 'L’air est lourd comme des roches'), L('Air does not exist', 'L’air n’existe pas')], h: L('The air you blow in needs room, so it stretches the balloon.', 'L’air que tu souffles a besoin de place, alors il étire le ballon.') },
  { e: '🪥', t: L('Why should we turn off the tap while brushing our teeth?', 'Pourquoi fermer le robinet en se brossant les dents?'), a: L('To save water', 'Pour économiser l’eau'), o: [L('To make our teeth shine', 'Pour que les dents brillent'), L('Because the tap is hungry', 'Parce que le robinet a faim')], h: L('Clean water is precious. We should not waste it.', 'L’eau propre est précieuse. On ne doit pas la gaspiller.') },
  { e: '🌳', t: L('Which gas in the air do people and animals need to breathe?', 'Quel gaz de l’air les gens et les animaux ont-ils besoin de respirer?'), a: L('Oxygen', 'L’oxygène'), o: [L('Smoke', 'La fumée'), L('Steam', 'La vapeur')], h: L('Plants make oxygen, and we breathe it in.', 'Les plantes fabriquent de l’oxygène et nous le respirons.') },
  { e: '🏖️', t: L('How can we keep lakes and rivers clean?', 'Comment garder les lacs et les rivières propres?'), a: L('Put garbage in the garbage bin', 'Mettre les déchets à la poubelle'), o: [L('Throw garbage in the water', 'Jeter les déchets dans l’eau'), L('Pour paint in the lake', 'Verser de la peinture dans le lac')], h: L('Clean water is important for fish, plants and people.', 'L’eau propre est importante pour les poissons, les plantes et les gens.') },
  { e: '🌬️', t: L('Which of these uses moving air (wind) to work?', 'Lequel utilise l’air en mouvement (le vent) pour fonctionner?'), a: L('A kite', 'Un cerf-volant'), o: [L('A flashlight', 'Une lampe de poche'), L('A book', 'Un livre')], h: L('Kites, sailboats and wind turbines all use wind.', 'Les cerfs-volants, les voiliers et les éoliennes utilisent le vent.') },
  { e: '🥶', t: L(`It is freezing at ${G}'s birthday party outside. What should everyone wear?`, `Il fait un froid glacial à la fête de ${G} dehors. Que devraient porter tout le monde?`), a: L('Warm coats, hats and mittens', 'Des manteaux, des tuques et des mitaines'), o: [L('Swimsuits', 'Des maillots'), L('Sandals', 'Des sandales')], h: L('We dress for the weather to stay safe and warm.', 'On s’habille selon la météo pour rester au chaud et en sécurité.') },
  { e: '🌡️', t: L('What tool tells us how hot or cold it is outside?', 'Quel outil nous dit s’il fait chaud ou froid dehors?'), a: L('A thermometer', 'Un thermomètre'), o: [L('A ruler', 'Une règle'), L('A scale', 'Une balance')], h: L('A thermometer measures temperature.', 'Un thermomètre mesure la température.') },
];

export default {
  id: 'weather',
  emoji: '🌦️',
  theme: 'weather',
  color: '#0288d1',
  get title() { return L('Cottage Weather Station', 'La station météo du chalet'); },
  get skill() { return L('Air & water', 'L’air et l’eau'); },
  get blurb() { return L('Clouds, rain, wind and the water cycle at the cottage!', 'Nuages, pluie, vent et cycle de l’eau au chalet!'); },
  get intro() {
    return L(`${M} and ${F} set up a weather station at Uncle Aaron's cottage! Let's learn about air and water.`,
      `${M} et ${F} installent une station météo au chalet de l’oncle Aaron! Apprenons des choses sur l’air et l’eau.`);
  },
  get levels() {
    return {
      mild: { kid: L('Water, air and wind', 'L’eau, l’air et le vent'), parent: 'Water as solid/liquid/gas; air is all around; wind; dressing for weather.' },
      medium: { kid: L('The water cycle', 'Le cycle de l’eau'), parent: 'Evaporation, condensation, precipitation and the order of the water cycle; fresh vs. salt water; uses of water.' },
      spicy: { kid: L('Air takes up space; protect water', 'L’air prend de la place; protéger l’eau'), parent: 'Air takes up space; oxygen; saving and cleaning water; wind uses; measuring temperature.' },
    };
  },
  get praise() { return L(['Splash! 💧', 'Weather wizard! 🌦️', 'Wind-erful! 🌬️'], ['Plouf! 💧', 'Experte de la météo! 🌦️', 'Ça souffle! 🌬️']); },
  get doneTitles() { return L(['Forecast complete! 🌦️', 'Weather expert! ☁️'], ['Prévision terminée! 🌦️', 'Experte de la météo! ☁️']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 2)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(4)]
        : [...SPICY(), ...SPICY(), ...MEDIUM().slice(3)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'wx' });
  },
};
