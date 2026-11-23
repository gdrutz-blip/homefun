import { store } from './storage.js';
import { shuffle } from './util.js';

export const STICKERS = [
  // treats
  { id: 'icecream', e: '🍦', name: 'Ice cream' },
  { id: 'choc', e: '🍫', name: 'Chocolate bar' },
  { id: 'jar', e: '🫙', name: 'Choco-hazelnut jar' },
  { id: 'cupcake', e: '🧁', name: 'Cupcake' },
  { id: 'donut', e: '🍩', name: 'Donut' },
  { id: 'strawberry', e: '🍓', name: 'Strawberry' },
  { id: 'cookie', e: '🍪', name: 'Cookie' },
  { id: 'lolly', e: '🍭', name: 'Lollipop' },
  { id: 'pancakes', e: '🥞', name: 'Pancakes' },
  // music
  { id: 'guitar', e: '🎸', name: 'Guitar' },
  { id: 'drum', e: '🥁', name: 'Drums' },
  { id: 'mic', e: '🎤', name: 'Microphone' },
  { id: 'keys', e: '🎹', name: 'Keyboard' },
  { id: 'phones', e: '🎧', name: 'Headphones' },
  { id: 'rock', e: '🤘', name: 'Rock on' },
  { id: 'blueheart', e: '💙', name: 'Blue heart' },
  { id: 'shades', e: '🕶️', name: 'Cool glasses' },
  // gymnastics
  { id: 'cartwheel', e: '🤸‍♀️', name: 'Cartwheel' },
  { id: 'medal', e: '🏅', name: 'Medal' },
  { id: 'gold', e: '🥇', name: 'Gold medal' },
  { id: 'trophy', e: '🏆', name: 'Trophy' },
  { id: 'ribbon', e: '🎀', name: 'Ribbon' },
  // magic
  { id: 'witch', e: '🧙‍♀️', name: 'Young witch' },
  { id: 'wand', e: '🪄', name: 'Magic wand' },
  { id: 'owl', e: '🦉', name: 'Owl' },
  { id: 'bolt', e: '⚡', name: 'Lightning bolt' },
  { id: 'broom', e: '🧹', name: 'Broomstick' },
  { id: 'crystal', e: '🔮', name: 'Crystal ball' },
  { id: 'dragon', e: '🐉', name: 'Dragon' },
  { id: 'unicorn', e: '🦄', name: 'Unicorn' },
  // games
  { id: 'controller', e: '🎮', name: 'Game controller' },
  { id: 'alien', e: '👾', name: 'Space critter' },
  { id: 'joystick', e: '🕹️', name: 'Joystick' },
  { id: 'mushroom', e: '🍄', name: 'Mushroom' },
  { id: 'star', e: '🌟', name: 'Glowing star' },
  // family & fun
  { id: 'baby', e: '👶', name: 'Baby' },
  { id: 'bottle', e: '🍼', name: 'Baby bottle' },
  { id: 'teddy', e: '🧸', name: 'Teddy bear' },
  { id: 'sisters', e: '👭', name: 'Sisters' },
  { id: 'bubbles', e: '🫧', name: 'Bubbles' },
  { id: 'gem', e: '💎', name: 'Gem' },
  { id: 'rainbow', e: '🌈', name: 'Rainbow' },
  { id: 'puppy', e: '🐶', name: 'Puppy' },
  { id: 'kitten', e: '🐱', name: 'Kitten' },
  { id: 'butterfly', e: '🦋', name: 'Butterfly' },
  { id: 'rocket', e: '🚀', name: 'Rocket' },
  { id: 'crown', e: '👑', name: 'Crown' },
  { id: 'moon', e: '🌙', name: 'Moon' },
];

// Farrah's sticker book.
export const STICKERS_FARRAH = [
  { id: 'f-worm', e: '🪱', name: 'Gummy worm' },
  { id: 'f-candy', e: '🍬', name: 'Candy' },
  { id: 'f-waffle', e: '🧇', name: 'Waffles' },
  { id: 'f-egg', e: '🍳', name: 'Fried egg' },
  { id: 'f-bacon', e: '🥓', name: 'Breakfast sizzle' },
  { id: 'f-cereal', e: '🥣', name: 'Cereal bowl' },
  { id: 'f-chili', e: '🌶️', name: 'Chili pepper' },
  { id: 'f-pizza', e: '🍕', name: 'Pizza' },
  { id: 'f-puppy', e: '🐶', name: 'Puppy' },
  { id: 'f-poodle', e: '🐩', name: 'Fancy poodle' },
  { id: 'f-guide', e: '🦮', name: 'Good dog' },
  { id: 'f-paw', e: '🐾', name: 'Paw prints' },
  { id: 'f-bone', e: '🦴', name: 'Dog bone' },
  { id: 'f-dance', e: '💃', name: 'Dancer' },
  { id: 'f-moon', e: '🕺', name: 'Dance moves' },
  { id: 'f-glove', e: '🧤', name: 'Sparkly glove' },
  { id: 'f-hat', e: '🎩', name: 'Fancy hat' },
  { id: 'f-music', e: '🎶', name: 'Music notes' },
  { id: 'f-mic', e: '🎤', name: 'Microphone' },
  { id: 'f-cart', e: '🤸‍♀️', name: 'Cartwheel' },
  { id: 'f-medal', e: '🥇', name: 'Gold medal' },
  { id: 'f-trophy', e: '🏆', name: 'Trophy' },
  { id: 'f-bike', e: '🚲', name: 'Bike' },
  { id: 'f-soccer', e: '⚽', name: 'Soccer ball' },
  { id: 'f-basket', e: '🏀', name: 'Basketball' },
  { id: 'f-hockey', e: '🏒', name: 'Hockey stick' },
  { id: 'f-book', e: '📖', name: 'Good book' },
  { id: 'f-pencil', e: '✏️', name: 'Doodle pencil' },
  { id: 'f-bed', e: '🛏️', name: 'Perfectly made bed' },
  { id: 'f-box', e: '🗃️', name: 'Organized box' },
  { id: 'f-wand', e: '🪄', name: 'Magic wand' },
  { id: 'f-owl', e: '🦉', name: 'Owl' },
  { id: 'f-broom', e: '🧹', name: 'Broomstick' },
  { id: 'f-coaster', e: '🎢', name: 'Roller coaster' },
  { id: 'f-wheel', e: '🎡', name: 'Ferris wheel' },
  { id: 'f-palm', e: '🌴', name: 'Palm tree' },
  { id: 'f-cabin', e: '🛶', name: 'Cottage canoe' },
  { id: 'f-baby', e: '👶', name: 'Baby' },
  { id: 'f-kids', e: '🧒', name: 'Cousin' },
  { id: 'f-play', e: '▶️', name: 'Play button' },
  { id: 'f-heart', e: '💜', name: 'Purple heart' },
  { id: 'f-star', e: '🌟', name: 'Star' },
];

/** Give `n` stickers from `list` she doesn't have yet. Returns the new stickers. */
export function awardStickers(n, list = STICKERS) {
  const missing = shuffle(list.filter((s) => !store.hasSticker(s.id)));
  const won = missing.slice(0, n);
  won.forEach((s) => store.addSticker(s.id));
  return won;
}
