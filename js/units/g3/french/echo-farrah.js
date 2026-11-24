// Farrah's say-it game: La scène de Farrah 🎤
import { makeEchoUnit } from '../../french/echo.js';
import { FAMILY3 } from '../../../config.js';

const { kid: F, sister: M, baby: G } = FAMILY3;

export default makeEchoUnit({
  id: 'echo3',
  emoji: '🎤',
  theme: 'dance',
  color: '#c2185b',
  title: 'La scène de Farrah',
  skill: 'Je parle français',
  blurb: 'Écoute et répète des phrases, comme une vraie vedette sur la scène!',
  intro: `Les lumières s’allument, ${F}! Écoute chaque phrase, puis répète-la avec ta plus belle voix.`,
  levels: {
    mild: { kid: 'Des phrases courtes', parent: 'Listen and repeat short, everyday French sentences.' },
    medium: { kid: 'Des phrases plus longues', parent: 'Longer French sentences with plural nouns, verbs in -er and time expressions.' },
    spicy: { kid: 'Des nombres et des virelangues', parent: 'Big numbers (soixante-dix, quatre-vingt-dix) and tongue twisters.' },
  },
  bank: {
    mild: [
      { t: `Bonjour, je m’appelle ${F}.`, e: '👋' }, { t: 'J’aime les gaufres.', e: '🧇' }, { t: 'Ma chambre est propre.', e: '🛏️' },
      { t: 'Je fais du vélo.', e: '🚲' }, { t: 'J’ai un chiot.', e: '🐶' }, { t: 'Il pleut aujourd’hui.', e: '🌧️' },
      { t: 'Je danse avec ma cousine.', e: '💃' }, { t: 'Nous mangeons du chili.', e: '🍲' },
    ],
    medium: [
      { t: 'Samedi, nous allons au chalet de mon oncle.', e: '🛶' }, { t: 'Je prépare le déjeuner pour ma famille.', e: '🍳' },
      { t: `Ma sœur ${M} fait du slime vert.`, e: '🟢' }, { t: 'Mon chiot adore courir dans le parc.', e: '🐕' },
      { t: 'Le spectacle de danse commence à sept heures.', e: '💃', accept: ['le spectacle de danse commence a 7 heures', 'le spectacle de danse commence a 7 h'] },
      { t: `${G} mange une banane dans sa chaise haute.`, e: '🍌' }, { t: 'Les saucisses et les œufs sont délicieux.', e: '🍳' },
    ],
    spicy: [
      { t: 'Soixante-dix, quatre-vingts, quatre-vingt-dix', e: '🔢', accept: ['70 80 90', '70, 80, 90', 'soixante-dix quatre-vingt quatre-vingt-dix'] },
      { t: 'Quatre-vingt-dix-neuf', e: '9️⃣', accept: ['99'] },
      { t: 'Trois gros rats gris dans trois trous ronds.', e: '🐀' }, { t: 'Cinq chiens chassent six chats.', e: '🐕' },
      { t: 'Les chaussettes de l’archiduchesse sont-elles sèches, archisèches?', e: '🧦' },
      { t: 'Un chasseur sachant chasser doit savoir chasser sans son chien.', e: '🏹' },
      { t: 'Je veux et j’exige d’exquises excuses.', e: '🗣️' },
    ],
  },
});
