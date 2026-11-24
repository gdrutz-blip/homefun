// GRADE 3 SOCIAL STUDIES — Communities, rules & helpers: Our Community Helpers 🏘️ / Les héros de notre communauté
import { pick } from '../../../util.js';
import { factQ } from '../../common.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M, baby: G } = FAMILY3;
const BADGES = () => L(['🏘️ Our town!', '🤝 Helping out!', '🗳️ Have your say!', '📜 Fair rules!'], ['🏘️ Notre ville!', '🤝 On s’entraide!', '🗳️ Donne ton avis!', '📜 Des règles justes!']);

const MILD = () => [
  { e: '🏘️', t: L('What is a community?', 'Qu’est-ce qu’une communauté?'), a: L('A group of people who live, work or play in the same place or share something', 'Un groupe de gens qui vivent, travaillent ou jouent au même endroit ou qui partagent quelque chose'), o: [L('One house with one person', 'Une maison avec une seule personne'), L('A kind of weather', 'Un type de météo')], h: L('Your school, your street and your sports team are all communities.', 'Ton école, ta rue et ton équipe sportive sont toutes des communautés.') },
  { e: '🍎', t: L('Which of these is a NEED (you must have it to live)?', 'Lequel de ces éléments est un BESOIN (nécessaire pour vivre)?'), a: L('Food and water', 'De la nourriture et de l’eau'), o: [L('A video game', 'Un jeu vidéo'), L('A new toy', 'Un nouveau jouet')], h: L('Needs: food, water, shelter, clothing, love and safety. Everything else is a want.', 'Besoins : nourriture, eau, abri, vêtements, amour et sécurité. Tout le reste est un désir.') },
  { e: '🚒', t: L('Who helps keep our community safe?', 'Qui aide à garder notre communauté en sécurité?'), a: L('Firefighters, police officers and paramedics', 'Les pompiers, les policiers et les ambulanciers'), o: [L('Only the mayor', 'Seulement le maire'), L('Nobody', 'Personne')], h: L('Community helpers do jobs that keep people safe and healthy.', 'Les travailleurs communautaires font des métiers qui gardent les gens en sécurité et en santé.') },
  { e: '🗑️', t: L('Who picks up the garbage and fixes local roads?', 'Qui ramasse les ordures et répare les rues de la ville?'), a: L('Workers for the town or city (municipal government)', 'Les employés de la municipalité'), o: [L('The school principal', 'La directrice de l’école'), L('The grocery store', 'L’épicerie')], h: L('The municipal government runs garbage pickup, roads, parks and libraries.', 'La municipalité s’occupe des ordures, des rues, des parcs et des bibliothèques.') },
  { e: '📚', t: L('Anyone can borrow books from a public library. Why is that good for a community?', 'N’importe qui peut emprunter des livres à la bibliothèque publique. Pourquoi est-ce bien pour une communauté?'), a: L('Everyone can learn and read, even if they cannot buy books', 'Tout le monde peut apprendre et lire, même sans acheter de livres'), o: [L('Only grown-ups can read', 'Seuls les adultes peuvent lire'), L('Books are free to throw away', 'On peut jeter les livres')], h: L('Public places are shared by everyone.', 'Les lieux publics sont partagés par tout le monde.') },
  { e: '🧤', t: L('A volunteer is someone who…', 'Un bénévole est quelqu’un qui…'), a: L('Helps out without being paid', 'Aide sans être payé'), o: [L('Is paid a lot', 'Est très bien payé'), L('Never helps', 'N’aide jamais')], h: L('Volunteers help at food banks, schools, sports teams and animal shelters.', 'Les bénévoles aident dans les banques alimentaires, les écoles, les équipes sportives et les refuges pour animaux.') },
];

const MEDIUM = () => [
  { e: '📜', t: L('Why do communities have rules and laws?', 'Pourquoi les communautés ont-elles des règles et des lois?'), a: L('To keep people safe and treat everyone fairly', 'Pour garder les gens en sécurité et traiter tout le monde équitablement'), o: [L('To make life boring', 'Pour rendre la vie ennuyante'), L('So nobody can have fun', 'Pour que personne ne s’amuse')], h: L('Rules help people get along and stay safe.', 'Les règles aident les gens à bien s’entendre et à rester en sécurité.') },
  { e: '🎩', t: L('Who is the leader of a town or city’s government?', 'Qui est le chef du gouvernement d’une ville?'), a: L('The mayor', 'Le maire (ou la mairesse)'), o: [L('The principal', 'La directrice'), L('The coach', 'L’entraîneur')], h: L('The mayor and city councillors make decisions for the city.', 'Le maire et les conseillers municipaux prennent les décisions pour la ville.') },
  { e: '💰', t: L('Taxes that people pay help to build and run…', 'Les taxes que les gens paient servent à construire et à faire fonctionner…'), a: L('Roads, parks, libraries and garbage pickup', 'Les rues, les parcs, les bibliothèques et le ramassage des ordures'), o: [L('Only video games', 'Seulement des jeux vidéo'), L('Private swimming pools', 'Des piscines privées')], h: L('Shared money pays for shared services.', 'L’argent mis en commun paie pour les services partagés.') },
  { e: '🗳️', t: L('The class votes: 8 kids pick the park, 6 kids pick the pool. What happens?', 'La classe vote : 8 enfants choisissent le parc, 6 choisissent la piscine. Que se passe-t-il?'), a: L('The park wins (more votes)', 'Le parc gagne (plus de votes)'), o: [L('The pool wins', 'La piscine gagne'), L('Nobody can decide', 'Personne ne peut décider')], h: L('In a vote, the choice with the most votes wins.', 'Dans un vote, le choix qui a le plus de votes gagne.') },
  { e: '✋', t: L('Which is a RESPONSIBILITY of a community member?', 'Laquelle est une RESPONSABILITÉ d’un membre de la communauté?'), a: L('Putting garbage in the bin', 'Mettre ses déchets à la poubelle'), o: [L('Having fun all day', 'S’amuser toute la journée'), L('Having free candy', 'Avoir des bonbons gratuits')], h: L('A responsibility is something you should do to help others.', 'Une responsabilité est quelque chose que tu dois faire pour aider les autres.') },
  { e: '⚖️', t: L('Which is a RIGHT that every kid has?', 'Lequel est un DROIT que tous les enfants ont?'), a: L('The right to go to school and be safe', 'Le droit d’aller à l’école et d’être en sécurité'), o: [L('The right to skip all rules', 'Le droit d’ignorer toutes les règles'), L('The right to be the boss', 'Le droit d’être le chef')], h: L('Rights come with responsibilities, like following safety rules.', 'Les droits viennent avec des responsabilités, comme suivre les règles de sécurité.') },
];

const SPICY = () => [
  { e: '🌳', t: L('A town wants to build a new parking lot where trees grow. What should leaders think about?', 'Une ville veut construire un nouveau stationnement là où poussent des arbres. À quoi les dirigeants devraient-ils penser?'), a: L('The good and bad effects on people and nature', 'Les effets positifs et négatifs sur les gens et la nature'), o: [L('Only how fast it can be built', 'Seulement la vitesse de construction'), L('Nothing', 'Rien')], h: L('Good decisions look at benefits and costs for everyone.', 'Les bonnes décisions regardent les avantages et les coûts pour tout le monde.') },
  { e: '♿', t: L('How can a community include everyone, including people who use wheelchairs?', 'Comment une communauté peut-elle inclure tout le monde, y compris les gens en fauteuil roulant?'), a: L('Build ramps and wide doorways', 'Construire des rampes et de larges portes'), o: [L('Only build stairs', 'Construire seulement des escaliers'), L('Keep some people out', 'Laisser certaines personnes dehors')], h: L('An inclusive community makes sure everyone can take part.', 'Une communauté inclusive s’assure que tout le monde peut participer.') },
  { e: '🛝', t: L('Many kids in a neighbourhood have no safe place to play. Which is the BEST way to solve it?', 'Beaucoup d’enfants d’un quartier n’ont pas d’endroit sûr pour jouer. Quelle est la MEILLEURE solution?'), a: L('Ask the community what they want, then build a playground together', 'Demander à la communauté ce qu’elle veut, puis construire un parc ensemble'), o: [L('Ignore the problem', 'Ignorer le problème'), L('Tell kids to stay inside forever', 'Dire aux enfants de rester à l’intérieur pour toujours')], h: L('Listening to many voices makes fair, lasting solutions.', 'Écouter beaucoup de voix mène à des solutions justes et durables.') },
  { e: '👂', t: L('Why is it important to listen to different opinions before making a decision?', 'Pourquoi est-il important d’écouter différentes opinions avant de décider?'), a: L('It helps make a fair decision that works for more people', 'Ça aide à prendre une décision juste qui convient à plus de gens'), o: [L('It makes meetings longer for no reason', 'Ça allonge les réunions pour rien'), L('Opinions do not matter', 'Les opinions n’ont pas d’importance')], h: L('Different people notice different problems.', 'Des gens différents remarquent des problèmes différents.') },
  { e: '🍲', t: L('After a big storm, neighbours bring food and blankets to families who need them. This shows…', 'Après une grosse tempête, les voisins apportent de la nourriture et des couvertures aux familles qui en ont besoin. Ça montre…'), a: L('A community helping each other', 'Une communauté qui s’entraide'), o: [L('A community with no rules', 'Une communauté sans règles'), L('Wasting food', 'Du gaspillage de nourriture')], h: L('Strong communities take care of their members.', 'Les communautés fortes prennent soin de leurs membres.') },
  { e: '♻️', t: L('A city starts a recycling and compost program. Who benefits?', 'Une ville lance un programme de recyclage et de compostage. Qui en profite?'), a: L('Everyone, including nature and future kids', 'Tout le monde, y compris la nature et les enfants de demain'), o: [L('Only the mayor', 'Seulement le maire'), L('Nobody', 'Personne')], h: L('Less garbage in landfills is good for the whole community and the planet.', 'Moins de déchets dans les dépotoirs est bon pour toute la communauté et la planète.') },
  { e: '👶', t: L(`${F} and ${M} babysit ${G} while her parents are at a community meeting. What role does ${F} play?`, `${F} et ${M} gardent ${G} pendant que ses parents sont à une réunion communautaire. Quel rôle ${F} joue-t-elle?`), a: L('A helper who supports her community', 'Une aide qui soutient sa communauté'), o: [L('A mayor', 'Une mairesse'), L('A tourist', 'Une touriste')], h: L('Helping out, even at home, is a way of contributing.', 'Aider, même à la maison, est une façon de contribuer.') },
];

export default {
  id: 'community',
  emoji: '🏘️',
  theme: 'party',
  color: '#00897b',
  get title() { return L('Our Community Helpers', 'Les héros de notre communauté'); },
  get skill() { return L('Communities, rules & helping', 'Communautés, règles et entraide'); },
  get blurb() { return L('Meet the helpers, make fair rules, and have your say!', 'Rencontre les travailleurs, fais des règles justes et donne ton avis!'); },
  get intro() {
    return L(`${F} is helping her neighbourhood! She learns who keeps the community running and how people make fair decisions together.`,
      `${F} aide son quartier! Elle apprend qui fait fonctionner la communauté et comment les gens prennent des décisions justes ensemble.`);
  },
  get levels() {
    return {
      mild: { kid: L('Who helps in a community?', 'Qui aide dans une communauté?'), parent: 'What a community is; needs vs. wants; community helpers and volunteers; municipal services.' },
      medium: { kid: L('Rules, rights and voting', 'Règles, droits et votes'), parent: 'Why we have rules; the mayor and city council; taxes; voting; rights and responsibilities.' },
      spicy: { kid: L('Fair decisions', 'Des décisions justes'), parent: 'Weighing benefits and costs of decisions, inclusion, listening to many opinions, community problem-solving.' },
    };
  },
  get praise() { return L(['Community hero! 🤝', 'Fair and square! ⚖️', 'Great helper! 🏘️'], ['Héroïne de la communauté! 🤝', 'Juste et équitable! ⚖️', 'Super aide! 🏘️']); },
  get doneTitles() { return L(['Neighbourhood saved! 🏘️', 'Community leader! 🤝'], ['Quartier sauvé! 🏘️', 'Chef de communauté! 🤝']); },
  makeQuestion(level) {
    const bank = level === 'mild' ? [...MILD(), ...MILD(), ...MEDIUM().slice(0, 3)]
      : level === 'medium' ? [...MEDIUM(), ...MEDIUM(), ...MILD().slice(3), ...SPICY().slice(0, 2)]
        : [...SPICY(), ...SPICY(), ...MEDIUM().slice(3)];
    return factQ(pick(bank), { badge: pick(BADGES()), prefix: 'cm' });
  },
};
