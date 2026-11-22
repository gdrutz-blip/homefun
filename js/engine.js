// Runs one round of questions for a unit + level.
import { speech } from './speech.js';
import { sound } from './sound.js';
import { store } from './storage.js';
import { confetti } from './confetti.js';
import { levelById, nextLevel, prevLevel, peppers } from './levels.js';
import { esc, pick, orList } from './util.js';
import { awardStickers } from './stickers.js';
import { FAMILY, ROUND_LENGTH } from './config.js';

const PRAISE = ['Great job!', 'You got it!', 'Awesome!', 'Super!', 'Yes!', 'Fantastic!', 'Way to go!', 'Nailed it!'];
const RETRY = ['Not quite. Try again!', 'Oops! Have another try.', 'Almost! Try again.', "Good try! Let's look again."];

export function runRound({ root, subjectId, unit, levelId, onQuit, onPlay }) {
  const lv = levelById(levelId);
  const progressKey = `${subjectId}.${unit.id}.${levelId}`;
  const seen = new Set();
  const results = [];
  let idx = 0;
  let q = null;
  let tries = 0;
  let locked = false;
  let typed = '';

  root.innerHTML = `
    <div class="game">
      <header class="game-top">
        <button class="icon-btn" data-act="quit" aria-label="Stop playing">✖</button>
        <div class="dots">${Array.from({ length: ROUND_LENGTH }, () => '<span class="dot"></span>').join('')}</div>
        <span class="lvl-badge" title="${lv.name}">${peppers(lv.peppers)}</span>
      </header>
      <div class="stage"></div>
    </div>`;
  const game = root.querySelector('.game');
  const stage = root.querySelector('.stage');
  const dots = [...root.querySelectorAll('.dot')];
  const alive = () => game.isConnected;
  game.addEventListener('click', onClick);
  next();

  // ---------- flow ----------
  function next() {
    if (idx >= ROUND_LENGTH) return finish();
    for (let t = 0; t < 40; t++) {
      q = unit.makeQuestion(levelId, idx);
      if (!seen.has(q.key)) break;
    }
    seen.add(q.key);
    if (location.search.includes('selftest')) window.__q = q; // used by automated tests
    tries = 0;
    locked = false;
    typed = '';
    dots.forEach((d, i) => d.classList.toggle('current', i === idx));
    render();
    window.scrollTo({ top: 0 });
    if (store.settings().autoRead) setTimeout(() => alive() && speakQuestion(), 250);
  }

  function render() {
    stage.innerHTML = `
      <section class="prompt-card pop-in">
        ${q.badge ? `<div class="badge">${q.badge}</div>` : ''}
        <div class="prompt-row">
          <p class="prompt-text">${q.text}</p>
          <button class="speak" data-act="say-q" aria-label="Read it to me">🔊</button>
        </div>
        ${q.big ? `<div class="big-eq">${q.big}</div>` : ''}
      </section>
      ${q.visual ? `<div class="visual pop-in">${q.visual}</div>` : ''}
      <div class="hint" hidden></div>
      <div class="answers">${answersHTML()}</div>`;
  }

  function answersHTML() {
    if (q.type === 'number') {
      const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'];
      return `
        <div class="typed" aria-live="polite"><span class="typed-val">&nbsp;</span></div>
        <div class="keypad">
          ${keys.map((k) => k === 'del'
            ? '<button class="key key-del" data-act="del" aria-label="Erase">⌫</button>'
            : k === 'ok'
              ? '<button class="key key-ok" data-act="check" aria-label="Check">✔</button>'
              : `<button class="key" data-act="key" data-k="${k}">${k}</button>`).join('')}
        </div>`;
    }
    return `<div class="choices ${q.choiceStyle || 'word'} n${q.choices.length}">
      ${q.choices.map((c) => `<button class="choice" data-act="choose" data-v="${esc(c.value)}">${c.label}</button>`).join('')}
    </div>`;
  }

  // ---------- input ----------
  function onClick(e) {
    const t = e.target.closest('[data-act]');
    if (!t || !game.contains(t)) return;
    const act = t.dataset.act;
    if (act === 'say-q') return speakQuestion();
    if (act === 'say-hint') return speech.say(t.dataset.text);
    if (act === 'quit') return confirmQuit();
    if (act === 'again') return onPlay(levelId);
    if (act === 'level') return onPlay(t.dataset.level);
    if (act === 'menu') return onQuit();
    if (act === 'next') { idx++; return next(); }
    if (locked) return;
    if (act === 'choose') return choose(t);
    if (act === 'key') { sound.tap(); if (typed.length < 3) typed += t.dataset.k; return showTyped(); }
    if (act === 'del') { typed = typed.slice(0, -1); return showTyped(); }
    if (act === 'check') return checkTyped();
  }

  function speakQuestion() {
    let text = q.say || q.text;
    if (q.sayChoices && q.choices) text += ' Is it ' + orList(q.choices.map((c) => c.say || c.label)) + '?';
    speech.say(text, q.lang);
  }

  function showTyped() {
    const el = stage.querySelector('.typed-val');
    el.innerHTML = typed || '&nbsp;';
    stage.querySelector('.typed').classList.remove('bad');
  }

  function choose(btn) {
    if (btn.disabled) return;
    if (String(btn.dataset.v) === String(q.answer)) correct(btn);
    else wrong(btn);
  }

  function checkTyped() {
    if (!typed) return;
    const box = stage.querySelector('.typed');
    if (Number(typed) === Number(q.answer)) return correct(box);
    box.classList.add('bad');
    typed = '';
    setTimeout(() => alive() && showTyped(), 700);
    wrong(null);
  }

  // ---------- feedback ----------
  function correct(el) {
    locked = true;
    el.classList.add('right');
    sound.correct(unit.sound);
    results.push({ ok: tries === 0, text: q.plain });
    if (!tries) dots[idx].classList.add('done');
    else dots[idx].classList.add('helped');
    const praise = pick([...PRAISE, ...(unit.praise || []), ...(unit.praise || [])]);
    showBanner(`${praise}`, 'good');
    speech.say(praise.replace(/[!]/g, '!'));
    setTimeout(() => { if (alive()) { idx++; next(); } }, 1500);
  }

  function wrong(btn) {
    tries++;
    sound.wrong();
    if (btn) { btn.classList.add('wrong'); btn.disabled = true; }
    const card = stage.querySelector('.answers');
    card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');

    if (tries === 1) {
      const retry = pick(RETRY);
      showHint(retry);
      speech.say(`${retry} ${q.hint?.say || q.hint?.text || ''}`, q.lang);
    } else {
      reveal();
    }
  }

  function showHint(lead) {
    const h = q.hint || {};
    const box = stage.querySelector('.hint');
    const sayText = `${lead} ${h.say || h.text || ''}`;
    box.innerHTML = `
      <div class="hint-card pop-in">
        <div class="hint-row">
          <p><b>${lead}</b> ${h.text || ''}</p>
          <button class="speak small" data-act="say-hint" data-text="${esc(sayText)}" aria-label="Read the hint">🔊</button>
        </div>
        ${h.visual ? `<div class="hint-visual">${h.visual}</div>` : ''}
      </div>`;
    box.hidden = false;
    setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }

  function reveal() {
    const shown = q.revealLabel || String(q.answer);
    if (q.type === 'number') {
      locked = true;
      results.push({ ok: false, text: q.plain });
      dots[idx].classList.add('helped');
      const box = stage.querySelector('.answers');
      box.innerHTML = `
        <div class="reveal-card pop-in">
          <p>The answer is <b class="reveal-ans">${shown}</b>.</p>
          <p class="small">That one was tricky. You'll get the next one!</p>
          <button class="btn primary" data-act="next">Next ➜</button>
        </div>`;
      speech.say(`The answer is ${q.revealSay || shown}. That one was tricky. You'll get the next one!`, q.lang);
      return;
    }
    // choice: glow the right answer and let her tap it
    const right = [...stage.querySelectorAll('.choice')].find((b) => String(b.dataset.v) === String(q.answer));
    right?.classList.add('glow');
    const msg = `Here it is! Tap the glowing answer.`;
    showHint(msg);
    speech.say(`${msg} It's ${q.revealSay || (q.choiceStyle === 'visual' ? 'the glowing one' : shown)}.`, q.lang);
  }

  function showBanner(text, kind) {
    const b = document.createElement('div');
    b.className = `banner ${kind}`;
    b.textContent = text;
    stage.appendChild(b);
  }

  function confirmQuit() {
    if (game.querySelector('.modal')) return;
    const m = document.createElement('div');
    m.className = 'modal';
    m.innerHTML = `
      <div class="modal-card pop-in">
        <p>Stop playing this round?</p>
        <div class="modal-actions">
          <button class="btn primary" data-m="stay">Keep playing</button>
          <button class="btn" data-m="leave">Stop</button>
        </div>
      </div>`;
    m.addEventListener('click', (e) => {
      const b = e.target.closest('[data-m]');
      if (!b) return;
      e.stopPropagation();
      if (b.dataset.m === 'leave') onQuit();
      else m.remove();
    });
    game.appendChild(m);
    speech.say('Stop playing this round?');
  }

  // ---------- end of round ----------
  function finish() {
    const firstTry = results.filter((r) => r.ok).length;
    const stars = firstTry >= ROUND_LENGTH - 1 ? 3 : firstTry >= ROUND_LENGTH - 3 ? 2 : 1;
    store.recordRound(progressKey, {
      stars, firstTry, total: ROUND_LENGTH,
      missed: results.filter((r) => !r.ok).map((r) => r.text),
    });
    const won = awardStickers(stars === 3 ? 2 : 1);
    const up = nextLevel(levelId);
    const down = prevLevel(levelId);
    const title = pick(unit.doneTitles || ['Round complete!']);

    dots.forEach((d) => d.classList.remove('current'));
    stage.innerHTML = `
      <section class="end-card pop-in">
        <h2>${title}</h2>
        <div class="stars">${[1, 2, 3].map((i) => `<span class="star ${i <= stars ? 'on' : ''}" style="--d:${i * 0.25}s">★</span>`).join('')}</div>
        <p class="end-score">${firstTry} out of ${ROUND_LENGTH} on the first try!</p>
        ${won.length ? `
          <div class="new-stickers">
            <p>${won.length > 1 ? 'New stickers!' : 'New sticker!'}</p>
            <div class="sticker-row">${won.map((s) => `<span class="sticker-big">${s.e}</span>`).join('')}</div>
          </div>` : ''}
        <div class="end-actions">
          ${stars >= 2 && up ? `<button class="btn spicy" data-act="level" data-level="${up.id}">Try ${up.name} ${peppers(up.peppers)}</button>` : ''}
          <button class="btn primary" data-act="again">Play again 🔁</button>
          ${stars === 1 && down ? `<button class="btn" data-act="level" data-level="${down.id}">Try ${down.name} ${peppers(down.peppers)}</button>` : ''}
          <button class="btn" data-act="menu">Pick another game</button>
        </div>
      </section>`;
    sound.win();
    confetti();
    const stickerWords = won.length ? ` You got ${won.length > 1 ? 'new stickers' : 'a new sticker'}: ${won.map((s) => s.name).join(' and ')}!` : '';
    speech.say(`${title.replace(/\p{Extended_Pictographic}/gu, '')} ${FAMILY.kid}, you earned ${stars} ${stars === 1 ? 'star' : 'stars'}!${stickerWords}`);
  }
}
