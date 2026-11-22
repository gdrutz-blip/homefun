export const rand = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick `n` distinct items from `arr`, always including `must` if given. */
export function sample(arr, n, must) {
  const rest = shuffle(arr.filter((x) => x !== must));
  const out = must === undefined ? rest.slice(0, n) : [must, ...rest.slice(0, n - 1)];
  return shuffle(out);
}

/** Believable wrong answers near the right one (off by one, off by ten, digits swapped). */
export function numberChoices(answer, { count = 4, min = 0, max = 999, near = [1, -1, 10, -10, 2, -2] } = {}) {
  const set = new Set([answer]);
  const candidates = shuffle(near.map((d) => answer + d));
  if (answer >= 12 && answer < 100 && answer % 10 !== 0 && answer % 11 !== 0) {
    const s = String(answer);
    candidates.unshift(Number(s[1] + s[0]));
  }
  for (const c of candidates) {
    if (set.size >= count) break;
    if (c >= min && c <= max) set.add(c);
  }
  let guard = 0;
  while (set.size < count && guard++ < 200) {
    const c = answer + rand(-6, 6);
    if (c >= min && c <= max) set.add(c);
  }
  return shuffle([...set]);
}

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const stripTags = (s) => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

/** "Is it A, B, or C?" */
export function orList(words) {
  if (words.length <= 1) return words.join('');
  return `${words.slice(0, -1).join(', ')}, or ${words[words.length - 1]}`;
}

export const QBOX = '<span class="qbox">?</span>';
