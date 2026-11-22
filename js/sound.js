// Tiny synthesized sound effects (no audio files needed).
import { store } from './storage.js';

let ctx = null;
function ac() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, start, dur, type = 'sine', vol = 0.15) {
  if (!store.settings().sound) return;
  const c = ac();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  const t = c.currentTime + start;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export const sound = {
  tap() { tone(700, 0, 0.06, 'triangle', 0.05); },
  correct(style) {
    if (style === 'band') {
      // a little power chord
      [110, 165, 220].forEach((f, i) => tone(f, 0, 0.45, 'sawtooth', 0.05 - i * 0.01));
      [147, 220, 294].forEach((f, i) => tone(f, 0.22, 0.5, 'sawtooth', 0.05 - i * 0.01));
      return;
    }
    tone(660, 0, 0.12, 'triangle');
    tone(880, 0.1, 0.12, 'triangle');
    tone(1320, 0.2, 0.22, 'triangle');
  },
  wrong() {
    tone(260, 0, 0.16, 'sine', 0.1);
    tone(200, 0.13, 0.22, 'sine', 0.1);
  },
  win() {
    [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.25, 'triangle', 0.12));
  },
};
