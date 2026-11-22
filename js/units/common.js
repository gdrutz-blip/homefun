// Helpers for building questions.
//
// A question is a plain object:
// {
//   key:      unique-ish string so a round doesn't repeat itself
//   badge:    optional small theme label ("🍦 Scoop time!")
//   text:     the question, short and simple (this is what gets read aloud by default)
//   big:      optional big equation, e.g. '4 + 3 = <span class="qbox">?</span>'
//   say:      what the 🔊 button reads (defaults to text)
//   lang:     speech language (defaults to the current game language)
//   visual:   optional HTML picture
//   type:     'choice' (tap an answer) or 'number' (type on a keypad)
//   choices:  [{ label: html, value, say? }]   (for 'choice')
//   choiceStyle: 'num' | 'word' | 'visual' | 'emoji'
//   sayChoices: true to read the word choices aloud after the question
//   answer:   the correct value
//   revealSay: how to say the answer when it's revealed
//   hint:     { text, say?, visual? } shown after a wrong answer
// }
import { numberChoices, stripTags } from '../util.js';
import { L } from '../i18n.js';

export function numberQ({ mode = 'choice', min = 0, max = 999, near, ...q }) {
  const out = { ...q, plain: q.plain || stripTags(`${q.text} ${q.big || ''}`) };
  if (mode === 'number') {
    out.type = 'number';
  } else {
    out.type = 'choice';
    out.choiceStyle = 'num';
    out.choices = numberChoices(q.answer, { min, max, near }).map((v) => ({ label: String(v), value: v }));
  }
  return out;
}

/** options: strings, or { value, label } when the shown word differs from the stored value. */
export function wordQ({ options, ...q }) {
  const opts = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const right = opts.find((o) => String(o.value) === String(q.answer));
  return {
    revealLabel: right?.label,
    revealSay: right?.label,
    ...q,
    plain: q.plain || stripTags(`${q.text} ${q.big || ''}`),
    type: 'choice',
    choiceStyle: 'word',
    sayChoices: true,
    choices: opts.map((o) => ({ label: o.label, value: o.value, say: o.label })),
  };
}

export function visualQ({ options, ...q }) {
  // options: [{ value, html }]
  return {
    ...q,
    plain: q.plain || stripTags(q.text),
    type: 'choice',
    choiceStyle: 'visual',
    choices: options.map((o) => ({ label: o.html, value: o.value })),
  };
}

/** Speak an equation: "34 + 25 = ?" -> "34 plus 25 equals what?" / "34 plus 25 égale combien?" */
export function sayEq(s) {
  return stripTags(s)
    .replace(/\+/g, ' plus ')
    .replace(/[−-]/g, L(' minus ', ' moins '))
    .replace(/=/g, L(' equals ', ' égale '))
    .replace(/\?/g, L(' what? ', ' combien? '));
}
