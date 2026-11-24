// Mia's say-it game: Le micro de Mia 🎤
import { makeEchoUnit } from './echo.js';
import { FAMILY } from '../../config.js';

const { kid: M, baby: G } = FAMILY;

export default makeEchoUnit({
  id: 'echo',
  emoji: '🎤',
  theme: 'band',
  color: '#2f6fed',
  title: 'Le micro de Mia',
  skill: 'Je parle français',
  blurb: 'Écoute et répète des mots et des phrases comme une vedette!',
  intro: `C’est ton tour au micro, ${M}! Écoute le mot ou la phrase, puis répète-le comme une vraie vedette.`,
  levels: {
    mild: { kid: 'Des mots', parent: 'Listen and repeat single French words (animals, food, colours, school).' },
    medium: { kid: 'Des phrases', parent: 'Listen and repeat short French sentences.' },
    spicy: { kid: 'Des nombres et des virelangues', parent: 'Longer sentences, counting, and tongue twisters.' },
  },
  bank: {
    mild: [
      { t: 'chat', e: '🐈' }, { t: 'chien', e: '🐕' }, { t: 'pomme', e: '🍎' }, { t: 'maison', e: '🏠' }, { t: 'lune', e: '🌙' },
      { t: 'fromage', e: '🧀' }, { t: 'crayon', e: '✏️' }, { t: 'ballon', e: '⚽' }, { t: 'poisson', e: '🐟' }, { t: 'soleil', e: '☀️' },
      { t: 'livre', e: '📚' }, { t: 'chocolat', e: '🍫' }, { t: 'guitare', e: '🎸' },
    ],
    medium: [
      { t: `Bonjour, je m’appelle ${M}.`, e: '👋' }, { t: 'J’aime le chocolat.', e: '🍫' }, { t: 'Je veux une crème glacée.', e: '🍦' },
      { t: 'J’ai un chat noir.', e: '🐈‍⬛' }, { t: 'Il fait beau aujourd’hui.', e: '☀️' }, { t: 'Où est ma guitare?', e: '🎸' },
      { t: 'Je fais de la gymnastique.', e: '🤸‍♀️' }, { t: `Ma petite sœur s’appelle ${G}.`, e: '👶' }, { t: 'Je joue avec mes amis.', e: '🎮' },
    ],
    spicy: [
      { t: 'Un, deux, trois, quatre, cinq', e: '🔢', accept: ['1 2 3 4 5', '1, 2, 3, 4, 5'] },
      { t: 'Dix, vingt, trente, quarante', e: '🔟', accept: ['10 20 30 40', '10, 20, 30, 40'] },
      { t: 'Je mange des crêpes au chocolat.', e: '🥞' }, { t: 'Mon chien court dans le jardin.', e: '🐕' },
      { t: 'Trois petits chats chassent trois gros rats.', e: '🐈' }, { t: 'Les poissons nagent dans la rivière.', e: '🐟' },
      { t: 'Les chaussettes de l’archiduchesse sont-elles sèches?', e: '🧦' },
      { t: `${M} et ${G} jouent dans la neige.`, e: '⛄' },
    ],
  },
});
