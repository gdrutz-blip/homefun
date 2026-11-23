// GRADE 3 SOCIAL STUDIES — Communities in Canada, 1780–1850: Time Travel to Upper Canada ⏳ / Voyage dans le temps
import { pick } from '../../../util.js';
import { factQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M } = FAMILY3;
const BADGES = () => L(['⏳ Time travel!', '🕯️ Long ago…', '🛶 Back in time!', '🏡 Pioneer days!'], ['⏳ Voyage dans le temps!', '🕯️ Il y a longtemps…', '🛶 Retour dans le passé!', '🏡 Au temps des pionniers!']);

const MILD = () => [
  { e: '🕯️', t: L('Long ago, before electricity, how did families light their homes at night?', 'Il y a longtemps, sans électricité, comment les familles éclairaient-elles la maison?'), a: L('Candles and oil lamps', 'Des bougies et des lampes à l’huile'), o: [L('Light bulbs', 'Des ampoules'), L('Flashlights', 'Des lampes de poche')], h: L('There was no electricity in the 1800s.', 'Il n’y avait pas d’électricité dans les années 1800.') },
  { e: '🪵', t: L('What kind of house did many settlers build when they first arrived?', 'Quelle sorte de maison les colons construisaient-ils en arrivant?'), a: L('A log cabin', 'Une cabane en bois rond'), o: [L('An apartment tower', 'Une tour d’appartements'), L('A glass house', 'Une maison de verre')], h: L('Settlers cut down trees to clear land and used the logs to build.', 'Les colons coupaient des arbres pour défricher et utilisaient les troncs pour construire.') },
  { e: '🛶', t: L('How did people travel on rivers and lakes long ago?', 'Comment voyageait-on sur les rivières et les lacs autrefois?'), a: L('By canoe', 'En canot'), o: [L('By airplane', 'En avion'), L('By car', 'En auto')], h: L('First Nations peoples built light, fast birchbark canoes. Settlers used them too.', 'Les Premières Nations construisaient des canots d’écorce légers et rapides. Les colons les utilisaient aussi.') },
  { e: '🪣', t: L('Pioneer homes had no taps. Where did they get water?', 'Les maisons des pionniers n’avaient pas de robinet. Où trouvaient-ils de l’eau?'), a: L('From a well, a stream or a lake', 'D’un puits, d’un ruisseau ou d’un lac'), o: [L('From a water bottle store', 'D’un magasin de bouteilles'), L('From the fridge', 'Du réfrigérateur')], h: L('Children often had the chore of carrying buckets of water.', 'Les enfants devaient souvent transporter des seaux d’eau.') },
  { e: '🥚', t: L(`${F} loves chores like making beds. Which chore would a pioneer kid do?`, `${F} aime faire des tâches comme les lits. Quelle tâche un enfant pionnier faisait-il?`), a: L('Collect eggs from the chickens', 'Ramasser les œufs des poules'), o: [L('Load the dishwasher', 'Remplir le lave-vaisselle'), L('Vacuum the carpet', 'Passer l’aspirateur')], h: L('Pioneer kids fed animals, collected eggs, carried water and helped in the garden.', 'Les enfants pionniers nourrissaient les animaux, ramassaient les œufs, portaient l’eau et aidaient au jardin.') },
  { e: '📚', t: L('What was school like for many pioneer children?', 'Comment était l’école pour beaucoup d’enfants pionniers?'), a: L('One room for all ages, writing on slates', 'Une seule classe pour tous, on écrivait sur des ardoises'), o: [L('Big schools with computers', 'De grandes écoles avec des ordinateurs'), L('School on tablets at home', 'L’école sur tablette à la maison')], h: L('One teacher taught all the grades together in a one-room schoolhouse.', 'Un seul enseignant enseignait à toutes les années dans une école d’une seule classe.') },
];

const MEDIUM = () => [
  { e: '🌽', t: L('The Haudenosaunee grew corn, beans and squash together. What are these crops called?', 'Les Haudenosaunee cultivaient le maïs, les haricots et la courge ensemble. Comment appelle-t-on ces plantes?'), a: L('The Three Sisters', 'Les Trois Sœurs'), o: [L('The Three Brothers', 'Les Trois Frères'), L('The Three Lakes', 'Les Trois Lacs')], h: L('The Three Sisters help each other grow: corn is a pole for beans, squash leaves shade the soil.', 'Les Trois Sœurs s’entraident : le maïs sert de tuteur aux haricots, et les feuilles de courge protègent le sol.') },
  { e: '🪵', t: L('The Haudenosaunee lived in long homes where many related families lived together. What were they called?', 'Les Haudenosaunee vivaient dans de longues maisons où plusieurs familles habitaient ensemble. Comment s’appelaient-elles?'), a: L('Longhouses', 'Des maisons longues'), o: [L('Igloos', 'Des igloos'), L('Castles', 'Des châteaux')], h: L('Longhouses were made of wooden poles covered in bark.', 'Les maisons longues étaient faites de poteaux de bois couverts d’écorce.') },
  { e: '🍁', t: L('Which food did First Nations peoples teach settlers to make from tree sap?', 'Quel aliment les Premières Nations ont-elles appris aux colons à faire avec la sève des arbres?'), a: L('Maple syrup', 'Le sirop d’érable'), o: [L('Chocolate', 'Le chocolat'), L('Ice cream', 'La crème glacée')], h: L('Sap from maple trees is boiled down to make syrup.', 'On fait bouillir la sève d’érable pour faire du sirop.') },
  { e: '🗺️', t: L('Between 1791 and 1841, what was the area that is now southern Ontario called?', 'Entre 1791 et 1841, comment s’appelait la région qui est maintenant le sud de l’Ontario?'), a: L('Upper Canada', 'Le Haut-Canada'), o: [L('New France', 'La Nouvelle-France'), L('Atlantis', 'L’Atlantide')], h: L('Upper Canada was “upper” because it was farther up the St. Lawrence River.', 'On disait « Haut » parce que c’était plus haut sur le fleuve Saint-Laurent.') },
  { e: '🛷', t: L('How did pioneer families travel over snow in winter?', 'Comment les familles pionnières voyageaient-elles sur la neige en hiver?'), a: L('By horse-drawn sleigh or snowshoes', 'En traîneau tiré par un cheval ou en raquettes'), o: [L('By snowmobile', 'En motoneige'), L('By bus', 'En autobus')], h: L('Snowshoes were a First Nations invention that settlers learned to use.', 'Les raquettes sont une invention des Premières Nations que les colons ont adoptée.') },
  { e: '🧺', t: L('Pioneers could not buy most things at a store. How did they get clothes?', 'Les pionniers ne pouvaient pas tout acheter au magasin. Comment avaient-ils des vêtements?'), a: L('They made them by hand from wool and flax', 'Ils les fabriquaient à la main avec de la laine et du lin'), o: [L('They ordered them online', 'Ils les commandaient en ligne'), L('They never wore clothes', 'Ils ne portaient pas de vêtements')], h: L('Families sheared sheep, spun wool and sewed their own clothes.', 'Les familles tondaient les moutons, filaient la laine et cousaient leurs vêtements.') },
];

const SPICY = () => [
  { e: '🤝', t: L('How did First Nations peoples help the early settlers survive?', 'Comment les Premières Nations ont-elles aidé les premiers colons à survivre?'), a: L('They shared knowledge about food, plants and travel', 'Elles ont partagé leurs connaissances sur la nourriture, les plantes et les déplacements'), o: [L('They gave them cell phones', 'Elles leur ont donné des téléphones'), L('They did not meet them', 'Elles ne les ont jamais rencontrés')], h: L('Settlers learned about local plants, canoes, snowshoes and maple syrup from First Nations peoples.', 'Les colons ont appris les plantes, les canots, les raquettes et le sirop d’érable grâce aux Premières Nations.') },
  { e: '🌲', t: L('When settlers cleared forests for farms, how did it change things for First Nations peoples?', 'Quand les colons coupaient les forêts pour faire des fermes, qu’est-ce que ça changeait pour les Premières Nations?'), a: L('It took away land they used for hunting and living', 'Ça enlevait des terres qu’elles utilisaient pour chasser et vivre'), o: [L('Nothing changed for them', 'Rien ne changeait pour elles'), L('It gave them more forest', 'Ça leur donnait plus de forêt')], h: L('Settlement changed the land a lot, and First Nations communities lost much of their land.', 'La colonisation a beaucoup changé le territoire, et les Premières Nations ont perdu beaucoup de terres.') },
  { e: '⏳', t: L('Which job is the SAME now as it was long ago?', 'Quel travail est le MÊME aujourd’hui qu’il y a longtemps?'), a: L('Farmer growing food', 'Fermier qui cultive la nourriture'), o: [L('Video game designer', 'Créateur de jeux vidéo'), L('Airplane pilot', 'Pilote d’avion')], h: L('Some jobs, like farming, baking and teaching, existed long ago too.', 'Certains métiers, comme fermier, boulanger et enseignant, existaient aussi autrefois.') },
  { e: '🧸', t: L('What toys might a pioneer child play with?', 'Avec quels jouets un enfant pionnier jouait-il?'), a: L('A cornhusk doll or a wooden top', 'Une poupée en feuilles de maïs ou une toupie en bois'), o: [L('A video game console', 'Une console de jeux vidéo'), L('A plastic slime kit', 'Une trousse de slime en plastique')], h: L('Toys were made by hand from things they had: wood, cloth and corn husks.', 'Les jouets étaient faits à la main avec du bois, du tissu et des feuilles de maïs.') },
  { e: '🛶', t: L('Why did early communities often grow up beside rivers and lakes?', 'Pourquoi les premières communautés s’installaient-elles près des rivières et des lacs?'), a: L('For water, food and travel by boat', 'Pour l’eau, la nourriture et voyager en bateau'), o: [L('To be far from water', 'Pour être loin de l’eau'), L('Because the land was made of sand', 'Parce que la terre était du sable')], h: L('Water was needed for drinking, fishing, mills and travel.', 'L’eau servait à boire, pêcher, faire tourner les moulins et voyager.') },
  { e: '📜', t: L(`${M} asks why some families came to Upper Canada in the 1780s. What is one reason?`, `${M} demande pourquoi des familles sont venues au Haut-Canada vers 1780. Quelle est une raison?`), a: L('They were looking for land and a new home', 'Elles cherchaient des terres et une nouvelle maison'), o: [L('To go to an amusement park', 'Pour aller au parc d’attractions'), L('To watch hockey on TV', 'Pour regarder le hockey à la télé')], h: L('Loyalists and other settlers came for land to farm and a safe place to live.', 'Les loyalistes et d’autres colons venaient chercher des terres et un endroit sûr pour vivre.') },
];

export default {
  id: 'longago',
  emoji: '⏳',
  theme: 'history',
  color: '#6d4c41',
  get title() { return L('Time Travel to Upper Canada', 'Voyage au Haut-Canada'); },
  get skill() { return L('Communities long ago', 'Les communautés d’autrefois'); },
  get blurb() { return L('Visit 1800s Ontario: log cabins, canoes and the Three Sisters!', 'Visite l’Ontario des années 1800 : cabanes, canots et les Trois Sœurs!'); },
  get intro() {
    return L(`${F} found a time machine! She travels back to Ontario around the year 1800 to see how First Nations peoples and settlers lived.`,
      `${F} a trouvé une machine à voyager dans le temps! Elle retourne en Ontario vers l’an 1800 pour voir comment vivaient les Premières Nations et les colons.`);
  },
  get levels() {
    return {
      mild: { kid: L('Daily life long ago', 'La vie d’autrefois'), parent: 'Homes, light, water, travel, chores and school in pioneer times.' },
      medium: { kid: L('First Nations and settlers', 'Premières Nations et colons'), parent: 'Haudenosaunee longhouses and the Three Sisters, maple syrup, snowshoes, Upper Canada, making clothes.' },
      spicy: { kid: L('How communities changed', 'Comment les communautés ont changé'), parent: 'Interactions between First Nations and settlers, impact of settlement on the land, why communities formed near water, then vs. now.' },
    };
  },
  get praise() { return L(['Time traveller! ⏳', 'History hero! 📜', 'Way back when! 🕯️'], ['Voyageuse du temps! ⏳', 'Héroïne de l’histoire! 📜', 'Comme dans le temps! 🕯️']); },
  get doneTitles() { return L(['Back to the present! ⏳', 'History expert! 📜'], ['Retour au présent! ⏳', 'Experte en histoire! 📜']); },
  makeQuestion(level) {
    // Each bank mixes in a few neighbours so an 8-question round never repeats.
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(3), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM()];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'la' });
  },
};
