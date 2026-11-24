// GRADE 3 SOCIAL STUDIES — Canada's provinces, territories & capitals: Coast to Coast Road Trip 🍁 / Le grand voyage d'un océan à l'autre
import { pick } from '../../../util.js';
import { factQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M } = FAMILY3;
const BADGES = () => L(['🍁 Coast to coast!', '🗺️ Map check!', '🚆 Next province!', '🏙️ Capital city!'], ['🍁 D’un océan à l’autre!', '🗺️ Vérifie la carte!', '🚆 Prochaine province!', '🏙️ Capitale!']);

const MILD = () => [
  { e: '🏛️', t: L('What is the capital city of Canada?', 'Quelle est la capitale du Canada?'), a: 'Ottawa', o: ['Toronto', L('Montreal', 'Montréal')], h: L('Ottawa, in Ontario, is Canada’s capital. Parliament is there.', 'Ottawa, en Ontario, est la capitale du Canada. Le Parlement y est.') },
  { e: '🏙️', t: L('What is the capital city of Ontario?', 'Quelle est la capitale de l’Ontario?'), a: 'Toronto', o: ['Ottawa', L('Windsor', 'Windsor')], h: L('Toronto is Ontario’s capital and biggest city.', 'Toronto est la capitale et la plus grande ville de l’Ontario.') },
  { e: '🇨🇦', t: L('How many provinces and territories does Canada have?', 'Combien de provinces et de territoires le Canada compte-t-il?'), a: L('10 provinces and 3 territories', '10 provinces et 3 territoires'), o: [L('5 provinces and 1 territory', '5 provinces et 1 territoire'), L('20 provinces', '20 provinces')], h: L('Count them: 10 provinces and 3 territories make 13 in all.', 'Compte : 10 provinces et 3 territoires font 13 en tout.') },
  { e: '🌊', t: L('Which ocean is on Canada’s EAST coast?', 'Quel océan est sur la côte EST du Canada?'), a: L('The Atlantic Ocean', 'L’océan Atlantique'), o: [L('The Pacific Ocean', 'L’océan Pacifique'), L('The Arctic Ocean', 'L’océan Arctique')], h: L('Atlantic = east, Pacific = west, Arctic = north.', 'Atlantique = est, Pacifique = ouest, Arctique = nord.') },
  { e: '🌊', t: L('Which ocean is on Canada’s WEST coast?', 'Quel océan est sur la côte OUEST du Canada?'), a: L('The Pacific Ocean', 'L’océan Pacifique'), o: [L('The Atlantic Ocean', 'L’océan Atlantique'), L('The Arctic Ocean', 'L’océan Arctique')], h: L('British Columbia touches the Pacific Ocean.', 'La Colombie-Britannique touche l’océan Pacifique.') },
  { e: '🧭', t: L('Which country is just south of Canada?', 'Quel pays est juste au sud du Canada?'), a: L('The United States', 'Les États-Unis'), o: [L('Jamaica', 'La Jamaïque'), L('France', 'La France')], h: L('The U.S. shares a long border with Canada.', 'Les États-Unis partagent une longue frontière avec le Canada.') },
];

const MEDIUM = () => [
  { e: '🌲', t: L('What is the capital city of British Columbia?', 'Quelle est la capitale de la Colombie-Britannique?'), a: 'Victoria', o: [L('Vancouver', 'Vancouver'), 'Calgary'], h: L('Victoria is on Vancouver Island. Vancouver is the biggest city but not the capital.', 'Victoria est sur l’île de Vancouver. Vancouver est la plus grande ville, mais pas la capitale.') },
  { e: '🐎', t: L('What is the capital city of Alberta?', 'Quelle est la capitale de l’Alberta?'), a: 'Edmonton', o: ['Calgary', 'Regina'], h: L('Edmonton is Alberta’s capital. Calgary is famous for the Stampede.', 'Edmonton est la capitale de l’Alberta. Calgary est célèbre pour son Stampede.') },
  { e: '🌾', t: L('What is the capital city of Saskatchewan?', 'Quelle est la capitale de la Saskatchewan?'), a: 'Regina', o: ['Saskatoon', 'Winnipeg'], h: L('Regina is the capital. Saskatoon is the biggest city.', 'Regina est la capitale. Saskatoon est la plus grande ville.') },
  { e: '🦬', t: L('What is the capital city of Manitoba?', 'Quelle est la capitale du Manitoba?'), a: 'Winnipeg', o: ['Brandon', 'Regina'], h: L('Winnipeg is Manitoba’s capital and biggest city.', 'Winnipeg est la capitale et la plus grande ville du Manitoba.') },
  { e: '⚜️', t: L('What is the capital city of Quebec?', 'Quelle est la capitale du Québec?'), a: L('Quebec City', 'Québec'), o: [L('Montreal', 'Montréal'), 'Ottawa'], h: L('Quebec City is the capital. Montreal is the biggest city.', 'La ville de Québec est la capitale. Montréal est la plus grande ville.') },
  { e: '🦞', t: L('What is the capital city of Nova Scotia?', 'Quelle est la capitale de la Nouvelle-Écosse?'), a: 'Halifax', o: ['Fredericton', 'Charlottetown'], h: L('Halifax is on the Atlantic coast.', 'Halifax est sur la côte atlantique.') },
  { e: '🥔', t: L('What is the capital city of Prince Edward Island?', 'Quelle est la capitale de l’Île-du-Prince-Édouard?'), a: 'Charlottetown', o: ['Halifax', 'Summerside'], h: L('Charlottetown is PEI’s capital.', 'Charlottetown est la capitale de l’Île-du-Prince-Édouard.') },
  { e: '🐟', t: L('What is the capital city of Newfoundland and Labrador?', 'Quelle est la capitale de Terre-Neuve-et-Labrador?'), a: L('St. John’s', 'St. John’s'), o: ['Halifax', 'Fredericton'], h: L('St. John’s is in the far east of Canada.', 'St. John’s est tout à l’est du Canada.') },
];

const SPICY = () => [
  { e: '🏔️', t: L('Banff National Park, with its mountains and turquoise lakes, is in which province?', 'Le parc national Banff, avec ses montagnes et ses lacs turquoise, est dans quelle province?'), a: 'Alberta', o: ['Ontario', 'Manitoba'], h: L('Banff is in the Rocky Mountains of Alberta.', 'Banff est dans les montagnes Rocheuses de l’Alberta.') },
  { e: '🌊', t: L('Niagara Falls is on the border between Ontario and which U.S. state?', 'Les chutes Niagara sont à la frontière entre l’Ontario et quel État américain?'), a: 'New York', o: ['Florida', 'Texas'], h: L('Niagara Falls is on the Niagara River, between Ontario and New York.', 'Les chutes Niagara sont sur la rivière Niagara, entre l’Ontario et l’État de New York.') },
  { e: '🗼', t: L('The CN Tower, in the middle of a big city, is in…', 'La tour CN, au cœur d’une grande ville, est à…'), a: 'Toronto', o: ['Vancouver', 'Halifax'], h: L('The CN Tower is in downtown Toronto, Ontario.', 'La tour CN est au centre-ville de Toronto, en Ontario.') },
  { e: '🥖', t: L('Which province has French as its main official language?', 'Quelle province a le français comme principale langue officielle?'), a: L('Quebec', 'Le Québec'), o: ['Alberta', L('British Columbia', 'La Colombie-Britannique')], h: L('Quebec is where most people speak French. Many French speakers also live in Ontario and New Brunswick.', 'C’est au Québec que la plupart des gens parlent français. Beaucoup de francophones vivent aussi en Ontario et au Nouveau-Brunswick.') },
  { e: '❄️', t: L('Iqaluit is the capital of which territory?', 'Iqaluit est la capitale de quel territoire?'), a: 'Nunavut', o: ['Yukon', L('Northwest Territories', 'Les Territoires du Nord-Ouest')], h: L('Nunavut’s capital is Iqaluit. Yukon’s is Whitehorse. The NWT’s is Yellowknife.', 'La capitale du Nunavut est Iqaluit, celle du Yukon est Whitehorse et celle des T.N.-O. est Yellowknife.') },
  { e: '🚂', t: L('Which list goes in order from WEST to EAST?', 'Quelle liste va de l’OUEST vers l’EST?'), a: L('British Columbia → Manitoba → Ontario', 'Colombie-Britannique → Manitoba → Ontario'), o: [L('Ontario → Manitoba → British Columbia', 'Ontario → Manitoba → Colombie-Britannique'), L('Manitoba → British Columbia → Ontario', 'Manitoba → Colombie-Britannique → Ontario')], h: L('Think of the map: the Pacific coast is on the left, the Atlantic on the right.', 'Pense à la carte : la côte du Pacifique est à gauche, celle de l’Atlantique à droite.') },
  { e: '🏝️', t: L('Which province is a small island famous for red soil and Anne of Green Gables?', 'Quelle province est une petite île célèbre pour son sol rouge et Anne… la maison aux pignons verts?'), a: L('Prince Edward Island', 'L’Île-du-Prince-Édouard'), o: ['Alberta', 'Ontario'], h: L('PEI is Canada’s smallest province.', 'L’Île-du-Prince-Édouard est la plus petite province du Canada.') },
  { e: '🗺️', t: L(`${F} and ${M} drive from Toronto to Ottawa. Which direction are they mostly going?`, `${F} et ${M} voyagent de Toronto à Ottawa. Dans quelle direction vont-elles surtout?`), a: L('East', 'Vers l’est'), o: [L('West', 'Vers l’ouest'), L('South', 'Vers le sud')], h: L('Ottawa is northeast of Toronto.', 'Ottawa est au nord-est de Toronto.') },
];

export default {
  id: 'provinces',
  emoji: '🍁',
  theme: 'map',
  color: '#c62828',
  get title() { return L('Coast to Coast Road Trip', 'Le grand voyage d’un océan à l’autre'); },
  get skill() { return L('Provinces & capitals', 'Provinces et capitales'); },
  get blurb() { return L('Drive across Canada: provinces, capitals and landmarks!', 'Traverse le Canada : provinces, capitales et monuments!'); },
  get intro() {
    return L(`${F} and ${M} are taking a dream road trip across Canada, from the Atlantic to the Pacific! Let's learn the provinces and capitals.`,
      `${F} et ${M} font un voyage de rêve à travers le Canada, de l’Atlantique au Pacifique! Apprenons les provinces et les capitales.`);
  },
  get levels() {
    return {
      mild: { kid: L('Canada and our province', 'Le Canada et notre province'), parent: 'Capital of Canada and Ontario; 10 provinces and 3 territories; the three oceans; neighbouring country.' },
      medium: { kid: L('Provincial capitals', 'Les capitales provinciales'), parent: 'Capitals of BC, Alberta, Saskatchewan, Manitoba, Quebec, Nova Scotia, PEI, Newfoundland and Labrador.' },
      spicy: { kid: L('Landmarks and directions', 'Monuments et directions'), parent: 'Landmarks, territories and their capitals, languages, east–west ordering, map directions.' },
    };
  },
  get praise() { return L(['Next stop! 🍁', 'Canada expert! 🗺️', 'On the right road! 🚗'], ['Prochain arrêt! 🍁', 'Experte du Canada! 🗺️', 'Sur la bonne route! 🚗']); },
  get doneTitles() { return L(['Coast to coast! 🍁', 'Capital champion! 🏛️'], ['D’un océan à l’autre! 🍁', 'Championne des capitales! 🏛️']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MILD().slice(0, 2), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM().slice(0, 3)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'pv' });
  },
};

