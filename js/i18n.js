// Language switch for the games ("Math in English" / "Les maths en français").
import { store } from './storage.js';

// A subject can force a language (the Français subject is always in French).
let forced = null;
export const forceLang = (lang) => { forced = lang; };
export const isFr = () => (forced ? forced === 'fr' : store.settings().lang === 'fr');
/** Pick the English or French version of a string. */
export const L = (en, fr) => (isFr() ? fr : en);
/** Speech voice for the current language. */
export const voiceLang = () => (isFr() ? 'fr-CA' : 'en-CA');

/** "a"/"an" + word (English only). */
export const aAn = (w) => (/^[aeiou]/i.test(w) ? `an ${w}` : `a ${w}`);
export const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);
