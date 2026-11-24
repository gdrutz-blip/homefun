// SOCIAL STUDIES (Grade 2) — Changes in family and community over time: Grandparents' Time Machine ⏳ / La machine à remonter le temps
import { pick } from '../../util.js';
import { factQ } from '../common.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;
const BADGES = () => L(['⏳ Long ago…', '📻 Then and now!', '🕰️ Time machine!', '📷 Old photo!'], ['⏳ Il y a longtemps…', '📻 Avant et maintenant!', '🕰️ Machine à voyager!', '📷 Vieille photo!']);

const MILD = () => [
  { e: '✉️', t: L('Before phones, how did families keep in touch with people far away?', 'Avant les téléphones, comment les familles gardaient-elles contact avec les gens loin?'), a: L('They wrote letters', 'Elles écrivaient des lettres'), o: [L('They sent text messages', 'Elles envoyaient des textos'), L('They made video calls', 'Elles faisaient des appels vidéo')], h: L('Letters were carried by mail. Texting and video calls came much later.', 'Les lettres étaient transportées par la poste. Les textos et appels vidéo sont venus bien plus tard.') },
  { e: '🐴', t: L('Which is OLDER: a horse and buggy, or a car?', 'Lequel est le plus VIEUX : une voiture à cheval ou une auto?'), a: L('A horse and buggy', 'Une voiture à cheval'), o: [L('A car', 'Une auto'), L('They are the same age', 'Ils ont le même âge')], h: L('People used horses to travel long before cars were invented.', 'Les gens utilisaient des chevaux bien avant l’invention des autos.') },
  { e: '🧊', t: L('Before refrigerators, how did people keep food cold?', 'Avant les réfrigérateurs, comment gardait-on les aliments au froid?'), a: L('In an icebox with a block of ice', 'Dans une glacière avec un bloc de glace'), o: [L('In a freezer', 'Dans un congélateur'), L('In a microwave', 'Dans un four à micro-ondes')], h: L('Ice delivered to the house kept food cold.', 'De la glace livrée à la maison gardait les aliments froids.') },
  { e: '🔥', t: L('How did families cook before electric stoves?', 'Comment les familles cuisinaient-elles avant les cuisinières électriques?'), a: L('On a wood stove or open fire', 'Sur un poêle à bois ou un feu'), o: [L('In a toaster', 'Dans un grille-pain'), L('In a microwave', 'Dans un micro-ondes')], h: L('Wood stoves were used for cooking and keeping the house warm.', 'Les poêles à bois servaient à cuisiner et à chauffer la maison.') },
  { e: '📱', t: L('Which of these is NEW (invented recently)?', 'Lequel est NOUVEAU (inventé récemment)?'), a: L('A tablet', 'Une tablette'), o: [L('A quill pen', 'Une plume d’oie'), L('A candle lantern', 'Une lanterne à chandelle')], h: L('Tablets and smartphones are very new compared to pens and candles.', 'Les tablettes et les téléphones intelligents sont très récents comparés aux plumes et aux chandelles.') },
  { e: '🪧', t: L('Long ago, what did many kids write on at school?', 'Il y a longtemps, sur quoi beaucoup d’enfants écrivaient-ils à l’école?'), a: L('A small slate with chalk', 'Une petite ardoise avec de la craie'), o: [L('A computer', 'Un ordinateur'), L('A tablet', 'Une tablette')], h: L('Paper was expensive, so many students used slates.', 'Le papier coûtait cher, alors beaucoup d’élèves utilisaient des ardoises.') },
  { e: '💡', t: L('Before light bulbs, how did people light their homes at night?', 'Avant les ampoules, comment éclairait-on les maisons le soir?'), a: L('With candles and oil lamps', 'Avec des chandelles et des lampes à l’huile'), o: [L('With flashlights', 'Avec des lampes de poche'), L('With TV screens', 'Avec des écrans de télé')], h: L('Electric lights are newer than candles and lamps.', 'Les lumières électriques sont plus récentes que les chandelles et les lampes.') },
];

const MEDIUM = () => [
  { e: '🚌', t: L('Long ago many families travelled by horse and wagon. How do many people get around today?', 'Il y a longtemps, beaucoup de familles voyageaient en charrette. Comment les gens se déplacent-ils aujourd’hui?'), a: L('By cars, buses, trains and planes', 'En auto, en autobus, en train et en avion'), o: [L('Only by horse', 'Seulement à cheval'), L('Only by canoe', 'Seulement en canot')], h: L('Inventions changed how we travel and how far we can go.', 'Les inventions ont changé notre façon de voyager et la distance qu’on peut parcourir.') },
  { e: '🏘️', t: L('Why did some small towns grow into big cities?', 'Pourquoi certains petits villages sont-ils devenus de grandes villes?'), a: L('More people moved there for jobs and homes', 'Plus de gens y sont venus pour le travail et les maisons'), o: [L('The houses got smaller', 'Les maisons sont devenues plus petites'), L('Everyone moved away', 'Tout le monde est parti')], h: L('When there are jobs, schools and stores, more families come to live there.', 'Quand il y a du travail, des écoles et des magasins, plus de familles viennent y vivre.') },
  { e: '🚿', t: L('How are many homes different from homes 100 years ago?', 'En quoi beaucoup de maisons sont-elles différentes d’il y a 100 ans?'), a: L('They have electricity and running water', 'Elles ont l’électricité et l’eau courante'), o: [L('They have no roofs', 'Elles n’ont pas de toit'), L('They are all log cabins', 'Ce sont toutes des cabanes en bois rond')], h: L('Many homes long ago had no electricity and no indoor taps.', 'Beaucoup de maisons d’autrefois n’avaient ni électricité ni robinets à l’intérieur.') },
  { e: '🏫', t: L(`How is school different from when ${M}'s grandparents were kids?`, `En quoi l’école est-elle différente de l’époque où les grands-parents de ${M} étaient enfants?`), a: L('Many classrooms now use computers and tablets', 'Beaucoup de classes utilisent maintenant des ordinateurs et des tablettes'), o: [L('There are no teachers now', 'Il n’y a plus d’enseignants'), L('Kids never read books', 'Les enfants ne lisent jamais de livres')], h: L('Tools for learning have changed, but kids still learn from teachers and books.', 'Les outils ont changé, mais les enfants apprennent encore avec des enseignants et des livres.') },
  { e: '📷', t: L('Which helps a family remember the past?', 'Qu’est-ce qui aide une famille à se souvenir du passé?'), a: L('Photo albums and stories from grandparents', 'Des albums photo et des histoires des grands-parents'), o: [L('A broken toy', 'Un jouet brisé'), L('Tomorrow’s weather', 'La météo de demain')], h: L('Photos, letters and stories tell us how life used to be.', 'Les photos, les lettres et les histoires nous racontent comment était la vie.') },
  { e: '🎲', t: L('Which game could kids play long ago without electricity?', 'À quel jeu les enfants pouvaient-ils jouer autrefois sans électricité?'), a: L('Marbles or skipping rope', 'Aux billes ou à la corde à danser'), o: [L('A video game', 'À un jeu vidéo'), L('A tablet game', 'À un jeu sur tablette')], h: L('Kids have always loved to play — with different toys!', 'Les enfants ont toujours aimé jouer — avec des jouets différents!') },
];

const SPICY = () => [
  { e: '⏳', t: L('Which list is in order from OLDEST to NEWEST?', 'Quelle liste va du PLUS VIEUX au PLUS NOUVEAU?'), a: L('Letter → telephone → text message', 'Lettre → téléphone → texto'), o: [L('Text message → letter → telephone', 'Texto → lettre → téléphone'), L('Telephone → text message → letter', 'Téléphone → texto → lettre')], h: L('Letters came first. Telephones came next. Text messages are the newest.', 'Les lettres sont venues d’abord, puis les téléphones. Les textos sont les plus récents.') },
  { e: '🚗', t: L('Which list is in order from OLDEST to NEWEST?', 'Quelle liste va du PLUS VIEUX au PLUS NOUVEAU?'), a: L('Horse and buggy → car → airplane', 'Voiture à cheval → auto → avion'), o: [L('Airplane → car → horse and buggy', 'Avion → auto → voiture à cheval'), L('Car → airplane → horse and buggy', 'Auto → avion → voiture à cheval')], h: L('Horses came first, then cars, then airplanes.', 'Les chevaux sont venus d’abord, puis les autos, puis les avions.') },
  { e: '👨‍👩‍👧‍👧', t: L('What has stayed the SAME for families, then and now?', 'Qu’est-ce qui est resté PAREIL pour les familles, avant et maintenant?'), a: L('Families care for each other and celebrate together', 'Les familles prennent soin les unes des autres et célèbrent ensemble'), o: [L('Everyone uses the same phone', 'Tout le monde utilise le même téléphone'), L('Everyone lives in a log cabin', 'Tout le monde vit dans une cabane')], h: L('Some things change, but love, helping and celebrating stay the same.', 'Certaines choses changent, mais l’amour, l’entraide et les fêtes restent pareils.') },
  { e: '💡', t: L('Why do communities change over time?', 'Pourquoi les communautés changent-elles avec le temps?'), a: L('New inventions, new ideas and people moving in', 'De nouvelles inventions, de nouvelles idées et l’arrivée de nouvelles personnes'), o: [L('Because buildings get bored', 'Parce que les bâtiments s’ennuient'), L('They never change', 'Elles ne changent jamais')], h: L('People invent things, move around and build new places.', 'Les gens inventent des choses, déménagent et construisent de nouveaux endroits.') },
  { e: '🏺', t: L('An old object from the past, like a photograph or a toy, is called…', 'Un vieil objet du passé, comme une photo ou un jouet, s’appelle…'), a: L('An artifact', 'Un artéfact'), o: [L('A souvenir of tomorrow', 'Un souvenir de demain'), L('A weather report', 'Un bulletin météo')], h: L('Artifacts help us learn about people from long ago.', 'Les artéfacts nous aident à connaître les gens d’autrefois.') },
  { e: '🔍', t: L('How can we find out how our community used to be?', 'Comment peut-on savoir comment était notre communauté autrefois?'), a: L('Look at old photos and maps, and talk to older people', 'Regarder de vieilles photos et cartes, et parler avec des aînés'), o: [L('Guess', 'Deviner'), L('Ask a stranger on the street to tell us a secret', 'Demander à un inconnu de nous dire un secret')], h: L('Photos, maps and stories are clues about the past.', 'Les photos, les cartes et les histoires sont des indices sur le passé.') },
  { e: '🧓', t: L(`${F} wants to learn how life was when her grandparents were kids. What is a good question to ask them?`, `${F} veut savoir comment était la vie quand ses grands-parents étaient enfants. Quelle bonne question leur poser?`), a: L('“What did you do for fun when you were my age?”', '« Qu’est-ce que tu faisais pour t’amuser à mon âge? »'), o: [L('“What is my favourite colour?”', '« Quelle est ma couleur préférée? »'), L('“What will the weather be tomorrow?”', '« Quel temps fera-t-il demain? »')], h: L('Good questions ask about the person’s own memories.', 'Les bonnes questions portent sur les souvenirs de la personne.') },
];

export default {
  id: 'thennow',
  emoji: '⏳',
  theme: 'history',
  color: '#8d6e63',
  get title() { return L('Grandparents’ Time Machine', 'La machine à remonter le temps'); },
  get skill() { return L('Then & now', 'Avant et maintenant'); },
  get blurb() { return L('Travel to the past and see how families and towns have changed!', 'Voyage dans le passé et vois comment les familles et les villes ont changé!'); },
  get intro() {
    return L(`${M} and ${G} climb into a time machine to visit their grandparents’ childhood! How was life different long ago?`,
      `${M} et ${G} montent dans une machine à voyager dans le temps pour visiter l’enfance de leurs grands-parents! Comment la vie était-elle différente?`);
  },
  get levels() {
    return {
      mild: { kid: L('Old things and new things', 'Vieilles choses et nouvelles choses'), parent: 'Comparing past and present objects: letters, icebox, wood stove, slates, candles vs. today.' },
      medium: { kid: L('How life has changed', 'Comment la vie a changé'), parent: 'Changes in transportation, homes, school and communities; how families remember the past.' },
      spicy: { kid: L('Timelines and why things change', 'Lignes du temps et pourquoi ça change'), parent: 'Ordering by age, what stays the same, why communities change, artifacts and sources of information.' },
    };
  },
  get praise() { return L(['Time traveller! ⏳', 'History hero! 📜', 'Great memory! 🕰️'], ['Voyageuse du temps! ⏳', 'Héroïne de l’histoire! 📜', 'Bonne mémoire! 🕰️']); },
  get doneTitles() { return L(['Back to today! ⏳', 'History expert! 📜'], ['Retour à aujourd’hui! ⏳', 'Experte en histoire! 📜']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(3), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM().slice(2)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'tn' });
  },
};
