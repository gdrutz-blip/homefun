// Read-aloud using the browser's built-in text-to-speech (free, works offline on Android).
import { store } from './storage.js';

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let voices = [];
let current = null; // keep a reference so Chrome doesn't garbage-collect mid-sentence
let timers = [];     // follow-along timers (used when the voice doesn't report word boundaries)
let endCb = null;

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
// "count by 2s" should be read "count by twos", not "count by 2 S".
const PLURAL_NUMS = {
  2: 'twos', 3: 'threes', 4: 'fours', 5: 'fives', 6: 'sixes', 10: 'tens',
  20: 'twenties', 25: 'twenty-fives', 50: 'fifties', 100: 'hundreds',
};

function clean(text, lang = 'en') {
  const fr = lang.startsWith('fr');
  return String(text)
    .replace(/\b(\d+)'?s\b/g, (m, n) => (!fr && PLURAL_NUMS[n]) || m)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/[\u{1F1E6}-\u{1F1FF}️‍]/gu, '')
    .replace(/−/g, fr ? ' moins ' : ' minus ')
    .replace(/×/g, fr ? ' fois ' : ' times ')
    .replace(/\s+/g, ' ')
    .trim();
}

function clearTimers() { timers.forEach(clearTimeout); timers = []; }
function finish() { clearTimers(); const cb = endCb; endCb = null; cb?.(); }

export const speech = {
  supported: !!synth,

  /**
   * Speak `text`. Options:
   *   onWord(index, word) — called as each word is spoken (for follow-along highlighting)
   *   onEnd() — called when speech ends or is cut off
   */
  say(text, lang = 'en-CA', { onWord = null, onEnd = null } = {}) {
    if (!synth || !text) return;
    const words = clean(text, lang);
    if (!words) return;
    const wasBusy = synth.speaking || synth.pending;
    synth.cancel();
    finish(); // end any earlier follow-along
    endCb = onEnd;

    const u = new SpeechSynthesisUtterance(words);
    u.lang = lang;
    const v = voiceFor(lang);
    if (v) u.voice = v;
    const rate = store.settings().slow ? 0.75 : 0.95;
    u.rate = rate;
    u.pitch = 1.05;
    current = u;

    if (onWord) {
      const list = [...words.matchAll(/\S+/g)].map((m) => ({ start: m.index, end: m.index + m[0].length, word: m[0] }));
      let gotBoundary = false;
      let last = -1;
      const emit = (i) => { if (i !== last && list[i]) { last = i; onWord(i, list[i].word); } };
      u.onboundary = (e) => {
        if (e.name && e.name !== 'word') return;
        gotBoundary = true;
        clearTimers();
        const i = list.findIndex((w) => e.charIndex >= w.start && e.charIndex < w.end + 1);
        if (i >= 0) emit(i);
      };
      // Many Android voices don't report boundaries. If none arrive, estimate the timing.
      u.onstart = () => {
        timers.push(setTimeout(() => {
          if (gotBoundary) return;
          let t = 0;
          const msPerChar = 72 / (rate / 0.95);
          list.forEach((w, i) => {
            timers.push(setTimeout(() => emit(i), Math.max(0, t - 450)));
            t += (w.word.length + 1.2) * msPerChar + (/[.,!?;:]$/.test(w.word) ? 220 : 0);
          });
        }, 450));
      };
    }
    u.onend = finish;
    u.onerror = finish;

    // Chrome on Android sometimes drops an utterance queued right after cancel().
    if (wasBusy) setTimeout(() => synth.speak(u), 80);
    else synth.speak(u);
  },

  stop() { if (synth) synth.cancel(); finish(); },
};
