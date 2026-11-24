// SOCIAL STUDIES (Grade 2) — Communities around the world: Around the World with Mia 🌍 / Le tour du monde avec Mia
import { pick } from '../../util.js';
import { factQ } from '../common.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F } = FAMILY;
const BADGES = () => L(['🌍 Around the world!', '🧳 Pack your bag!', '✈️ Next stop!', '🏝️ Jamaica!'], ['🌍 Autour du monde!', '🧳 Fais ta valise!', '✈️ Prochain arrêt!', '🏝️ La Jamaïque!']);

const MILD = () => [
  { e: '🏙️', t: L('A place with tall buildings, lots of people and busy streets is…', 'Un endroit avec de hauts immeubles, beaucoup de gens et des rues achalandées, c’est…'), a: L('A city (urban)', 'Une ville (urbain)'), o: [L('A farm (rural)', 'Une ferme (rural)'), L('A forest', 'Une forêt')], h: L('Urban means city. Many people live close together.', 'Urbain veut dire « de la ville ». Beaucoup de gens vivent proches les uns des autres.') },
  { e: '🌾', t: L('A place with farms, fields and fewer people is…', 'Un endroit avec des fermes, des champs et moins de gens, c’est…'), a: L('Rural', 'Rural'), o: [L('Urban', 'Urbain'), L('Underwater', 'Sous l’eau')], h: L('Rural means the countryside.', 'Rural veut dire « de la campagne ».') },
  { e: '🏠', t: L('What do people in every community around the world need?', 'De quoi les gens de toutes les communautés du monde ont-ils besoin?'), a: L('Food, water and a place to live', 'De la nourriture, de l’eau et un endroit pour vivre'), o: [L('Only video games', 'Seulement des jeux vidéo'), L('Only snow', 'Seulement de la neige')], h: L('Everyone needs food, water and shelter.', 'Tout le monde a besoin de nourriture, d’eau et d’un abri.') },
  { e: '🏝️', t: L('Jamaica is an island in which sea?', 'La Jamaïque est une île dans quelle mer?'), a: L('The Caribbean Sea', 'La mer des Caraïbes'), o: [L('The Arctic Ocean', 'L’océan Arctique'), L('The Great Lakes', 'Les Grands Lacs')], h: L('Jamaica is a warm island in the Caribbean.', 'La Jamaïque est une île chaude dans les Caraïbes.') },
  { e: '☀️', t: L('Is the weather in Jamaica usually warm or cold?', 'Est-ce qu’il fait généralement chaud ou froid en Jamaïque?'), a: L('Warm', 'Chaud'), o: [L('Freezing cold', 'Très froid'), L('Snowy all winter', 'Enneigé tout l’hiver')], h: L('Jamaica is warm and sunny most of the year.', 'La Jamaïque est chaude et ensoleillée presque toute l’année.') },
  { e: '🏡', t: L('Which of these is a kind of home?', 'Lequel est un type de maison?'), a: L('An apartment', 'Un appartement'), o: [L('A bicycle', 'Un vélo'), L('A guitar', 'Une guitare')], h: L('People live in houses, apartments, houseboats and more.', 'Les gens vivent dans des maisons, des appartements, des bateaux-maisons et plus encore.') },
  { e: '🍁', t: L('Which country do we live in?', 'Dans quel pays vivons-nous?'), a: L('Canada', 'Le Canada'), o: [L('Jamaica', 'La Jamaïque'), L('France', 'La France')], h: L('We live in Ontario, in Canada.', 'Nous habitons en Ontario, au Canada.') },
];

const MEDIUM = () => [
  { e: '🌴', t: L('In hot places, people often wear…', 'Dans les endroits chauds, les gens portent souvent…'), a: L('Light clothes like shorts and T-shirts', 'Des vêtements légers comme des shorts et des t-shirts'), o: [L('Snowsuits', 'Des habits de neige'), L('Big winter boots', 'De grosses bottes d’hiver')], h: L('Clothes help people stay comfortable in their weather.', 'Les vêtements aident à être bien selon la météo.') },
  { e: '🏠', t: L('Houses in places with heavy snow often have…', 'Les maisons dans les endroits avec beaucoup de neige ont souvent…'), a: L('Steep roofs so the snow slides off', 'Des toits à pic pour que la neige glisse'), o: [L('No roofs', 'Pas de toit'), L('Roofs made of ice cream', 'Des toits en crème glacée')], h: L('People build homes to fit the weather.', 'Les gens construisent leurs maisons selon la météo.') },
  { e: '🛖', t: L('In some places near rivers, houses are built on tall poles (stilts). Why?', 'Dans certains endroits près des rivières, des maisons sont construites sur de hauts poteaux. Pourquoi?'), a: L('To stay dry when the water rises', 'Pour rester au sec quand l’eau monte'), o: [L('To look like trees', 'Pour ressembler à des arbres'), L('To be closer to the moon', 'Pour être plus près de la lune')], h: L('Stilt houses keep families safe from floods.', 'Les maisons sur pilotis protègent les familles des inondations.') },
  { e: '🇯🇲', t: L('What is the capital city of Jamaica?', 'Quelle est la capitale de la Jamaïque?'), a: 'Kingston', o: ['Toronto', L('Paris', 'Paris')], h: L('Kingston is Jamaica’s capital and biggest city.', 'Kingston est la capitale et la plus grande ville de la Jamaïque.') },
  { e: '🎶', t: L('Which kind of music started in Jamaica?', 'Quel genre de musique est né en Jamaïque?'), a: L('Reggae', 'Le reggae'), o: [L('Polka', 'La polka'), L('Opera', 'L’opéra')], h: L('Reggae music, with its relaxed beat, comes from Jamaica.', 'Le reggae, avec son rythme détendu, vient de la Jamaïque.') },
  { e: '🍗', t: L('Which food is famous in Jamaica?', 'Quel aliment est célèbre en Jamaïque?'), a: L('Jerk chicken and patties', 'Le poulet jerk et les pâtés jamaïcains'), o: [L('Maple taffy', 'La tire d’érable'), L('Poutine', 'La poutine')], h: L('Jamaican food is full of flavour and spice.', 'La cuisine jamaïcaine est pleine de saveurs et d’épices.') },
  { e: '❄️', t: L('Which place has cold, snowy winters?', 'Quel endroit a des hivers froids et enneigés?'), a: L('Canada', 'Le Canada'), o: [L('Jamaica', 'La Jamaïque'), L('A tropical island', 'Une île tropicale')], h: L('Canada has four seasons, including snowy winters.', 'Le Canada a quatre saisons, dont un hiver enneigé.') },
  { e: '🗣️', t: L('Most people in Jamaica speak English. Many also speak a language mixed from English and African languages. What is it called?', 'La plupart des gens en Jamaïque parlent anglais. Beaucoup parlent aussi une langue mélangée à partir de l’anglais et de langues africaines. Comment s’appelle-t-elle?'), a: L('Jamaican Patois', 'Le patois jamaïcain'), o: [L('Klingon', 'Le klingon'), L('Latin', 'Le latin')], h: L('Jamaican Patois is spoken at home, in songs and with friends.', 'Le patois jamaïcain se parle à la maison, dans les chansons et entre amis.') },
];

const SPICY = () => [
  { e: '🌎', t: L('Why do homes and clothes look different in different parts of the world?', 'Pourquoi les maisons et les vêtements sont-ils différents dans différentes régions du monde?'), a: L('Because of weather, land and culture', 'À cause du climat, du territoire et de la culture'), o: [L('Because people do not need homes', 'Parce que les gens n’ont pas besoin de maison'), L('Because they are all the same', 'Parce qu’ils sont tous pareils')], h: L('People use what they have nearby and what suits the weather.', 'Les gens utilisent ce qu’ils ont près d’eux et ce qui convient au climat.') },
  { e: '🤝', t: L('A community in Canada and a community in Jamaica are far apart. How are they SIMILAR?', 'Une communauté du Canada et une de la Jamaïque sont très éloignées. En quoi sont-elles SEMBLABLES?'), a: L('Both have schools, markets and celebrations', 'Les deux ont des écoles, des marchés et des fêtes'), o: [L('Both have snowy winters', 'Les deux ont des hivers enneigés'), L('Both are on the same street', 'Les deux sont sur la même rue')], h: L('All communities have places to learn, shop and celebrate.', 'Toutes les communautés ont des endroits pour apprendre, acheter et fêter.') },
  { e: '🎣', t: L('A community by the ocean might have jobs in…', 'Une communauté au bord de l’océan peut avoir des emplois dans…'), a: L('Fishing and tourism', 'La pêche et le tourisme'), o: [L('Mountain skiing only', 'Seulement le ski en montagne'), L('Desert mining only', 'Seulement les mines dans le désert')], h: L('Jobs depend on what is around: ocean, farmland, forests or mountains.', 'Les emplois dépendent de ce qui est autour : océan, fermes, forêts ou montagnes.') },
  { e: '🚜', t: L('Which job is most common in a RURAL community?', 'Quel emploi est le plus courant dans une communauté RURALE?'), a: L('Farmer', 'Fermier'), o: [L('Subway driver', 'Conducteur de métro'), L('Skyscraper window washer', 'Laveur de vitres de gratte-ciel')], h: L('Rural areas have lots of farmland.', 'Les régions rurales ont beaucoup de terres agricoles.') },
  { e: '🚇', t: L('Which is more common in an URBAN community?', 'Quoi est plus courant dans une communauté URBAINE?'), a: L('Subways, buses and tall buildings', 'Des métros, des autobus et de hauts immeubles'), o: [L('Big open fields with few people', 'De grands champs ouverts avec peu de gens'), L('Wild forests with no roads', 'Des forêts sauvages sans routes')], h: L('Cities have many people, so they need lots of transportation and buildings.', 'Les villes ont beaucoup de gens, alors il y a beaucoup de transport et d’immeubles.') },
  { e: '🌍', t: L(`${M} and ${F} have a pen pal in another country. What is a good way to learn about her community?`, `${M} et ${F} ont une correspondante dans un autre pays. Quelle est une bonne façon de découvrir sa communauté?`), a: L('Ask her questions and look at photos and maps', 'Lui poser des questions et regarder des photos et des cartes'), o: [L('Guess', 'Deviner'), L('Assume it is exactly like ours', 'Supposer que c’est exactement comme chez nous')], h: L('Asking and listening helps us understand different communities.', 'Poser des questions et écouter aide à comprendre d’autres communautés.') },
  { e: '🧭', t: L('Which tool helps us find where Jamaica is?', 'Quel outil nous aide à trouver où est la Jamaïque?'), a: L('A world map or globe', 'Une carte du monde ou un globe'), o: [L('A thermometer', 'Un thermomètre'), L('A clock', 'Une horloge')], h: L('Maps and globes show where places are in the world.', 'Les cartes et les globes montrent où sont les endroits dans le monde.') },
];

export default {
  id: 'world',
  emoji: '🌍',
  theme: 'map',
  color: '#00897b',
  get title() { return L('Around the World with Mia', 'Le tour du monde avec Mia'); },
  get skill() { return L('Communities of the world', 'Les communautés du monde'); },
  get blurb() { return L('Visit cities, farms and a sunny island — and learn how people live!', 'Visite des villes, des fermes et une île ensoleillée — et découvre comment les gens vivent!'); },
  get intro() {
    return L(`${M} is going on a trip around the world! She will visit cities, farms and even Jamaica. Let's find out how communities are alike and different.`,
      `${M} part en voyage autour du monde! Elle visitera des villes, des fermes et même la Jamaïque. Découvrons en quoi les communautés se ressemblent et diffèrent.`);
  },
  get levels() {
    return {
      mild: { kid: L('City, countryside and Jamaica', 'Ville, campagne et Jamaïque'), parent: 'Urban vs. rural; what all communities need; basic facts about Jamaica; types of homes.' },
      medium: { kid: L('Homes, weather and culture', 'Maisons, climat et culture'), parent: 'How climate shapes homes and clothing; stilt houses; Jamaican capital, music, food and language; comparing with Canada.' },
      spicy: { kid: L('Alike and different', 'Pareil et différent'), parent: 'Why communities differ (climate, land, culture); similarities (schools, markets, celebrations); jobs in rural/urban communities; using maps.' },
    };
  },
  get praise() { return L(['Bon voyage! ✈️', 'Globe-trotter! 🌍', 'Irie! 🏝️'], ['Bon voyage! ✈️', 'Globe-trotteuse! 🌍', 'Super! 🏝️']); },
  get doneTitles() { return L(['Trip complete! 🌍', 'World explorer! 🧳'], ['Voyage terminé! 🌍', 'Exploratrice du monde! 🧳']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(3), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM().slice(0, 4)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'wd' });
  },
};
