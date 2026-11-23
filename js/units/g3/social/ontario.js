// GRADE 3 SOCIAL STUDIES — Living and Working in Ontario: Ontario Road Trip 🚗 / Le tour de l'Ontario
import { pick } from '../../../util.js';
import { factQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M, uncle, uncleFr } = FAMILY3;
const BADGES = () => L(['🚗 Road trip!', '🗺️ Map time!', '🍁 Ontario!', '🛶 Cottage country!'], ['🚗 En route!', '🗺️ À la carte!', '🍁 L’Ontario!', '🛶 Au pays des chalets!']);

const MILD = () => [
  { e: '🏙️', t: L('What is the capital city of Ontario?', 'Quelle est la capitale de l’Ontario?'), a: 'Toronto', o: ['Ottawa', L('Montreal', 'Montréal')], h: L('Toronto is Ontario’s capital and its biggest city.', 'Toronto est la capitale de l’Ontario et sa plus grande ville.') },
  { e: '🇨🇦', t: L('Ottawa is in Ontario. What is special about Ottawa?', 'Ottawa est en Ontario. Qu’est-ce qu’Ottawa a de spécial?'), a: L('It is the capital of Canada', 'C’est la capitale du Canada'), o: [L('It is the biggest city in the world', 'C’est la plus grande ville du monde'), L('It is on an island in the ocean', 'C’est une île dans l’océan')], h: L('Canada’s Parliament is in Ottawa.', 'Le Parlement du Canada est à Ottawa.') },
  { e: '🌊', t: L('Which big water falls are on Ontario’s border?', 'Quelles grandes chutes sont à la frontière de l’Ontario?'), a: L('Niagara Falls', 'Les chutes Niagara'), o: [L('Ocean Falls', 'Les chutes de l’océan'), L('Desert Falls', 'Les chutes du désert')], h: L('Niagara Falls is between Lake Erie and Lake Ontario.', 'Les chutes Niagara sont entre le lac Érié et le lac Ontario.') },
  { e: '🏞️', t: L('Ontario touches four of the Great Lakes. Which one is NOT one of them?', 'L’Ontario touche quatre des Grands Lacs. Lequel N’EN fait PAS partie?'), a: L('Lake Michigan', 'Le lac Michigan'), o: [L('Lake Ontario', 'Le lac Ontario'), L('Lake Superior', 'Le lac Supérieur')], h: L('Ontario touches Lakes Superior, Huron, Erie and Ontario. Lake Michigan is only in the U.S.', 'L’Ontario touche les lacs Supérieur, Huron, Érié et Ontario. Le lac Michigan est seulement aux États-Unis.') },
  { e: '🗑️', t: L('Who usually picks up the garbage and fixes the local roads in your town?', 'Qui ramasse les ordures et répare les rues de ta ville?'), a: L('The town or city government', 'La municipalité (la ville)'), o: [L('The school principal', 'La directrice de l’école'), L('The grocery store', 'L’épicerie')], h: L('Your municipal (town or city) government runs garbage pickup, local roads, parks and libraries.', 'La municipalité s’occupe des ordures, des rues, des parcs et des bibliothèques.') },
  { e: '🧭', t: L('Ontario is in which part of Canada?', 'Dans quelle partie du Canada est l’Ontario?'), a: L('The middle (central Canada)', 'Au centre du Canada'), o: [L('The far west coast', 'Sur la côte ouest'), L('The far north, in the Arctic', 'Tout au nord, dans l’Arctique')], h: L('Ontario and Quebec make up central Canada.', 'L’Ontario et le Québec forment le centre du Canada.') },
];

const MEDIUM = () => [
  { e: '🌲', t: L(`${uncle}'s cottage is surrounded by rocks, pine trees and lakes. Which region is that?`, `Le chalet de ${uncleFr} est entouré de roches, de pins et de lacs. Quelle région est-ce?`), a: L('The Canadian Shield', 'Le Bouclier canadien'), o: [L('The Hudson Bay Lowlands', 'Les basses-terres de la baie d’Hudson'), L('The desert', 'Le désert')], h: L('The Canadian Shield is rocky with lots of lakes and forests. It covers most of Ontario.', 'Le Bouclier canadien est rocheux, avec beaucoup de lacs et de forêts. Il couvre la plus grande partie de l’Ontario.') },
  { e: '🌽', t: L('Southern Ontario has flat land and rich soil near the Great Lakes. What is it great for?', 'Le sud de l’Ontario a des terres plates et un sol riche. C’est idéal pour quoi?'), a: L('Farming', 'L’agriculture'), o: [L('Mining gold', 'Les mines d’or'), L('Skiing on glaciers', 'Le ski sur les glaciers')], h: L('The Great Lakes–St. Lawrence Lowlands have the best farmland in Ontario.', 'Les basses-terres des Grands Lacs et du Saint-Laurent ont les meilleures terres agricoles.') },
  { e: '🐻‍❄️', t: L('Which part of Ontario is flat, wet and swampy, with polar bears near the coast?', 'Quelle partie de l’Ontario est plate et marécageuse, avec des ours polaires près de la côte?'), a: L('The Hudson Bay Lowlands', 'Les basses-terres de la baie d’Hudson'), o: [L('Toronto', 'Toronto'), L('Niagara', 'Niagara')], h: L('The Hudson Bay Lowlands are in the far north of Ontario.', 'Les basses-terres de la baie d’Hudson sont tout au nord de l’Ontario.') },
  { e: '🪵', t: L('Workers cut down trees in northern Ontario to make wood and paper. What is this job called?', 'Des travailleurs coupent des arbres dans le nord pour faire du bois et du papier. Comment s’appelle ce travail?'), a: L('Forestry', 'La foresterie'), o: [L('Fishing', 'La pêche'), L('Farming', 'L’agriculture')], h: L('Forestry uses trees from the forest. Good forestry plants new trees too.', 'La foresterie utilise les arbres de la forêt. Une bonne foresterie replante aussi des arbres.') },
  { e: '⛏️', t: L('People dig gold, nickel and copper out of the rocks in the north. What is this called?', 'On creuse pour trouver de l’or, du nickel et du cuivre dans le nord. Comment s’appelle ce travail?'), a: L('Mining', 'Les mines'), o: [L('Forestry', 'La foresterie'), L('Tourism', 'Le tourisme')], h: L('The rocky Canadian Shield is full of minerals.', 'Le Bouclier canadien rocheux est plein de minéraux.') },
  { e: '🎢', t: L(`${F} and ${M} visit an amusement park, a beach and a cottage. Visitors spending money on fun is called…`, `${F} et ${M} visitent un parc d’attractions, une plage et un chalet. Quand des visiteurs dépensent pour s’amuser, on appelle ça…`), a: L('Tourism', 'Le tourisme'), o: [L('Mining', 'Les mines'), L('Farming', 'L’agriculture')], h: L('Tourism is when people travel for fun. It gives jobs to lots of people.', 'Le tourisme, c’est voyager pour le plaisir. Ça donne du travail à beaucoup de gens.') },
];

const SPICY = () => [
  { e: '🏭', t: L('A new factory wants to build next to a lake. What should the town think about?', 'Une nouvelle usine veut se bâtir près d’un lac. À quoi la ville doit-elle penser?'), a: L('Keeping the water clean and safe', 'Garder l’eau propre et sécuritaire'), o: [L('What colour the factory is', 'La couleur de l’usine'), L('Nothing, factories are always fine', 'Rien, les usines sont toujours correctes')], h: L('Land use can help people (jobs) but can also hurt nature. Communities try to balance both.', 'L’utilisation du territoire peut aider (des emplois) mais aussi nuire à la nature. Il faut trouver un équilibre.') },
  { e: '🌳', t: L('Why do forestry companies plant new trees after cutting old ones?', 'Pourquoi les compagnies forestières plantent-elles de nouveaux arbres?'), a: L('So there will be forests in the future', 'Pour qu’il y ait des forêts dans le futur'), o: [L('To make the roads shorter', 'Pour raccourcir les routes'), L('To hide the mines', 'Pour cacher les mines')], h: L('Replanting keeps forests healthy for animals and people later on.', 'Replanter garde les forêts en santé pour les animaux et les gens plus tard.') },
  { e: '🏘️', t: L('Most people in Ontario live in which part of the province?', 'Où vit la majorité des gens en Ontario?'), a: L('The south, near the Great Lakes', 'Dans le sud, près des Grands Lacs'), o: [L('The far north, near Hudson Bay', 'Tout au nord, près de la baie d’Hudson'), L('In the middle of the lakes', 'Au milieu des lacs')], h: L('The south has a milder climate, good farmland and big cities.', 'Le sud a un climat plus doux, de bonnes terres et de grandes villes.') },
  { e: '🚚', t: L('Food grown on farms in southern Ontario gets to stores in the city by…', 'Les aliments des fermes du sud arrivent aux magasins de la ville par…'), a: L('Trucks and trains', 'Camions et trains'), o: [L('Hot air balloons', 'Montgolfières'), L('Canoes only', 'Canots seulement')], h: L('Highways and railways connect farms, factories and cities.', 'Les autoroutes et les chemins de fer relient les fermes, les usines et les villes.') },
  { e: '🗺️', t: L('On a map, what tells you which way is north?', 'Sur une carte, qu’est-ce qui indique où est le nord?'), a: L('The compass rose', 'La rose des vents'), o: [L('The title', 'Le titre'), L('The scale', 'L’échelle')], h: L('The compass rose shows N, S, E and W.', 'La rose des vents montre N, S, E et O.') },
  { e: '📏', t: L('What part of a map helps you figure out real distances?', 'Quelle partie d’une carte aide à calculer les vraies distances?'), a: L('The scale', 'L’échelle'), o: [L('The legend colours', 'Les couleurs de la légende'), L('The compass rose', 'La rose des vents')], h: L('The scale says how many kilometres one centimetre on the map stands for.', 'L’échelle dit combien de kilomètres vaut un centimètre sur la carte.') },
];

export default {
  id: 'ontario',
  emoji: '🚗',
  theme: 'map',
  color: '#00897b',
  get title() { return L('Ontario Road Trip', 'Le tour de l’Ontario'); },
  get skill() { return L('Living & working in Ontario', 'Vivre et travailler en Ontario'); },
  get blurb() { return L(`From Toronto to ${uncle}'s cottage to the far north!`, `De Toronto au chalet de ${uncleFr}, jusqu’au grand nord!`); },
  get intro() {
    return L(`${F} is going on a road trip across Ontario! Learn about cities, regions, and the jobs people do.`,
      `${F} part en voyage partout en Ontario! Découvre les villes, les régions et les métiers des gens.`);
  },
  get levels() {
    return {
      mild: { kid: L('Cities, lakes and our town', 'Villes, lacs et notre ville'), parent: 'Capitals (Toronto, Ottawa), Great Lakes, Niagara Falls, municipal services.' },
      medium: { kid: L('Regions and jobs', 'Régions et métiers'), parent: 'Physical regions (Canadian Shield, Great Lakes–St. Lawrence Lowlands, Hudson Bay Lowlands) and land use (farming, forestry, mining, tourism).' },
      spicy: { kid: L('Land use choices and maps', 'Utilisation du territoire et cartes'), parent: 'Impact of land use on the environment, where people live and why, transportation, map scale and compass rose.' },
    };
  },
  get praise() { return L(['Road trip pro! 🚗', 'Next stop! 🗺️', 'Ontario expert! 🍁'], ['Pro du voyage! 🚗', 'Prochain arrêt! 🗺️', 'Experte de l’Ontario! 🍁']); },
  get doneTitles() { return L(['Trip complete! 🚗', 'You know Ontario! 🍁'], ['Voyage terminé! 🚗', 'Tu connais l’Ontario! 🍁']); },
  makeQuestion(level) {
    // Each bank mixes in a few neighbours so an 8-question round never repeats.
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(3), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM()];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'on' });
  },
};
