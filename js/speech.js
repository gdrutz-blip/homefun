// Read-aloud using the browser's built-in text-to-speech (free, works offline on Android).
import { store } from './storage.js';

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let voices = [];
let current = null; // keep a reference so Chrome doesn't garbage-collect mid-sentence

function refresh() { if (synth) voices = synth.getVoices(); }
if (synth) {
  refresh();
  synth.addEventListener?.('voiceschanged', refresh);
}

const PREFERRED = {
  en: ['en-ca', 'en-us', 'en-gb', 'en-au'],
  fr: ['fr-ca', 'fr-fr'],
};

function voiceFor(lang) {
  if (!voices.length) refresh();
  const norm = (v) => v.lang.toLowerCase().replace('_', '-');
  const base = lang.toLowerCase().split('-')[0];
  const order = [lang.toLowerCase(), ...(PREFERRED[base] || [])];
  for (const l of order) {
    const pool = voices.filter((v) => norm(v) === l);
    if (pool.length) return pool.find((v) => v.localService) || pool[0];
  }
  return voices.find((v) => norm(v).startsWith(base)) || null;
}

// Emoji get read out as their names ("ice cream emoji") — strip them.
function clean(text) {
  return String(text)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/[\u{1F1E6}-\u{1F1FF}️‍]/gu, '')
    .replace(/−/g, ' minus ')
    .replace(/×/g, ' times ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const speech = {
  supported: !!synth,

  say(text, lang = 'en-CA') {
    if (!synth || !text) return;
    const words = clean(text);
    if (!words) return;
    const wasBusy = synth.speaking || synth.pending;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(words);
    u.lang = lang;
    const v = voiceFor(lang);
    if (v) u.voice = v;
    u.rate = store.settings().slow ? 0.75 : 0.95;
    u.pitch = 1.05;
    current = u;
    // Chrome on Android sometimes drops an utterance queued right after cancel().
    if (wasBusy) setTimeout(() => synth.speak(u), 80);
    else synth.speak(u);
  },

  stop() { if (synth) synth.cancel(); },
};
