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

/** Give `n` stickers she doesn't have yet. Returns the new stickers. */
export function awardStickers(n) {
  const missing = shuffle(STICKERS.filter((s) => !store.hasSticker(s.id)));
  const won = missing.slice(0, n);
  won.forEach((s) => store.addSticker(s.id));
  return won;
}
