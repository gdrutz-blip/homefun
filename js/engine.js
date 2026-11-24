// Runs one round of questions for a unit + level.
import { speech } from './speech.js';
import { sound } from './sound.js';
import { store } from './storage.js';
import { confetti } from './confetti.js';
import { levelById, nextLevel, prevLevel, peppers } from './levels.js';
import { esc, pick, orList } from './util.js';
import { awardStickers } from './stickers.js';
import { ROUND_LENGTH } from './config.js';
import { currentProfile } from './profiles.js';
import { computeTrophies, newlyUnlocked, itemPreview, familyStars } from './rewards.js';
import { L, voiceLang } from './i18n.js';

const PRAISE = () => L(['Great job!', 'You got it!', 'Awesome!', 'Super!', 'Yes!', 'Fantastic!', 'Way to go!', 'Nailed it!'],
  ['Bravo!', 'Tu as trouvé!', 'Génial!', 'Super!', 'Oui!', 'Fantastique!', 'Excellent!', 'Bien joué!']);
const RETRY = () => L(['Not quite. Try again!', 'Oops! Have another try.', 'Almost! Try again.', "Good try! Let's look again."],
  ['Pas tout à fait. Essaie encore!', 'Oups! Essaie encore une fois.', 'Presque! Essaie encore.', 'Bel essai! Regardons encore.']);
// say(): she asked for it (tapped 🔊 or a word). autoSay(): the app speaks by itself — only if "read aloud" is on.
const say = (text, lang) => speech.say(text, lang || voiceLang());
const autoSay = (text, lang) => { if (store.settings().autoRead) say(text, lang); };

/** Wrap each word in a tappable span so a tricky word can be heard on its own. */
function wordify(el) {
  if (!el || !store.settings().tapWords) return;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) if (!walker.currentNode.parentElement.closest('.qbox, .w')) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const parts = node.textContent.split(/(\s+)/);
    if (parts.length === 1 && !/[\p{L}\p{N}]/u.test(parts[0])) continue;
    const frag = document.createDocumentFragment();
    for (const part of parts) {
      if (/[\p{L}\p{N}]/u.test(part)) {
        const span = document.createElement('span');
        span.className = 'w';
        span.textContent = part;
        frag.appendChild(span);
      } else frag.appendChild(document.createTextNode(part));
    }
    node.replaceWith(frag);
  }
}
// ----- listening (speaking games) -----
const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
const normSpeech = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
/** Did she say the target (accents, capitals and small slips don't matter)? */
export function heardOk(alternatives, target, accept = []) {
  const goals = [target, ...accept].map(normSpeech).filter(Boolean);
  return alternatives.some((t) => { const n = normSpeech(t); return goals.some((g) => n === g || lev(n, g) <= Math.floor(g.length * 0.18)); });
}
const canListen = () => !!(SR && store.settings().micOn);

const bareWord = (w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');

export function runRound({ root, subjectId, unit, levelId, onQuit, onPlay, length = ROUND_LENGTH, mixed = false }) {
  const N = length;
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
        <div class="dots">${Array.from({ length: N }, () => '<span class="dot"></span>').join('')}</div>
        <span class="lvl-badge" title="${lv.name}">${mixed ? unit.emoji : peppers(lv.peppers)}</span>
      </header>
      <div class="stage"></div>
    </div>`;
  const game = root.querySelector('.game');
  const stage = root.querySelector('.stage');
  const dots = [...root.querySelectorAll('.dot')];
  const alive = () => game.isConnected;
  game.addEventListener('click', onClick);
  next();

  // ---------- tricky questions: remember misses, forget them once she nails it ----------
  function trackTricky(ok) {
    const sub = q._subject || subjectId, uid = q._unit || unit.id;
    const id = `${sub}|${uid}|${q.key}`;
    if (ok) return store.removeTricky(id);
    const { _subject, _unit, _level, ...plainQ } = q;
    store.addTricky({ id, subjectId: sub, unitId: uid, levelId: _level || levelId, q: { ...plainQ, lang: q.lang || voiceLang() } });
  }

  // ---------- flow ----------
  function next() {
    if (idx >= N) return finish();
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
    if (store.settings().autoRead || q.listen) setTimeout(() => alive() && speakQuestion(), 250);
  }

  function render() {
    stage.innerHTML = `
      <section class="prompt-card pop-in">
        ${q.badge ? `<div class="badge">${q.badge}</div>` : ''}
        <div class="prompt-row">
          <p class="prompt-text">${q.text}</p>
          <button class="speak" data-act="say-q" aria-label="${L('Read it to me', 'Lis-le-moi')}">🔊</button>
        </div>
        ${q.big ? `<div class="big-eq">${q.big}</div>` : ''}
      </section>
      ${q.visual ? `<div class="visual pop-in">${q.visual}</div>` : ''}
      <div class="hint" hidden></div>
      <div class="answers">${answersHTML()}</div>`;
    wordify(stage.querySelector('.prompt-text'));
  }

  function answersHTML() {
    if (q.type === 'speak') {
      const mic = canListen();
      return `<div class="speak-zone">
        ${mic ? `<button class="mic" data-act="mic" aria-label="${L('Say it', 'Dis-le')}">🎤</button>
          <p class="mic-status" aria-live="polite">${L('Tap the mic and say it!', 'Touche le micro et dis-le!')}</p>
          <button class="btn said small" data-act="said">✅ ${L('Mic not working? I said it', 'Le micro ne marche pas? Je l’ai dit')}</button>`
    : `<p class="mic-status" aria-live="polite">${L('Say it out loud, then tap ✅.', 'Dis-le à voix haute, puis touche ✅.')}</p>
          <button class="btn primary said" data-act="said">✅ ${L('I said it!', 'Je l’ai dit!')}</button>`}
      </div>`;
    }
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

  /** Read `text` aloud and light up each word in `container` as it is spoken (if "follow along" is on). */
  function sayFollow(text, lang, container) {
    const spans = container ? [...container.querySelectorAll('.w')] : [];
    if (!store.settings().followAlong || !spans.length) return say(text, lang);
    let ptr = 0, prev = null;
    const norm = (s) => bareWord(s).toLowerCase();
    const clear = () => { prev?.classList.remove('speaking'); prev = null; };
    speech.say(text, lang || voiceLang(), {
      onWord: (_, word) => {
        const target = norm(word);
        for (let k = ptr; k < Math.min(spans.length, ptr + 4); k++) {
          if (norm(spans[k].textContent) === target) { clear(); spans[k].classList.add('speaking'); prev = spans[k]; ptr = k + 1; return; }
        }
      },
      onEnd: clear,
    });
  }

  // ---------- input ----------
  function onClick(e) {
    const w = e.target.closest('.w');
    if (w && game.contains(w)) {
      const word = bareWord(w.textContent);
      if (word) {
        say(word, q?.lang);
        w.classList.add('lit');
        setTimeout(() => w.classList.remove('lit'), 900);
      }
      return;
    }
    const t = e.target.closest('[data-act]');
    if (!t || !game.contains(t)) return;
    const act = t.dataset.act;
    if (act === 'say-q') return speakQuestion();
    if (act === 'say-hint') return sayFollow(t.dataset.text, undefined, stage.querySelector('.hint-row p'));
    if (act === 'quit') return confirmQuit();
    if (act === 'again') return onPlay(levelId);
    if (act === 'level') return onPlay(t.dataset.level);
    if (act === 'menu') return onQuit();
    if (act === 'next') { idx++; return next(); }
    if (locked) return;
    if (act === 'choose') return choose(t);
    if (act === 'mic') return listen(t);
    if (act === 'said') return correct(t);
    if (act === 'key') { sound.tap(); if (typed.length < 4) typed += t.dataset.k; return showTyped(); }
    if (act === 'del') { typed = typed.slice(0, -1); return showTyped(); }
    if (act === 'check') return checkTyped();
  }

  let listening = false;
  function listen(btn) {
    if (listening || !SR) return;
    const status = (msg) => { const el = stage.querySelector('.mic-status'); if (el) el.textContent = msg; };
    speech.stop();
    const rec = new SR();
    rec.lang = q.lang || 'fr-CA';
    rec.interimResults = false;
    rec.maxAlternatives = 5;
    rec.continuous = false;
    listening = true;
    btn.classList.add('listening');
    status(L('Listening…', 'Je t’écoute…') + ' 🎧');
    let handled = false;
    let timer = null;
    const done = () => { clearTimeout(timer); listening = false; btn.classList.remove('listening'); };
    // If the phone's recognizer never answers, stop waiting after a while so she can try again.
    timer = setTimeout(() => {
      if (handled) return;
      handled = true;
      try { rec.abort(); } catch { /* ignore */ }
      done();
      status(L('I did not hear anything. Try again, or tap ✅ after you say it.', 'Je n’ai rien entendu. Essaie encore, ou touche ✅ après l’avoir dit.'));
    }, 12000);
    rec.onresult = (e) => {
      handled = true; done();
      if (!alive() || locked) return;
      const alts = [...(e.results[0] || [])].map((r) => r.transcript);
      if (heardOk(alts, q.target, q.accept)) return correct(btn);
      status(L(`I heard: “${alts[0] || '…'}”. Try again!`, `J’ai entendu : « ${alts[0] || '…'} ». Essaie encore!`));
      wrong(null);
    };
    rec.onerror = (e) => {
      handled = true; done();
      status(e.error === 'not-allowed' || e.error === 'service-not-allowed'
        ? L('The microphone is blocked. Ask a grown-up, or tap ✅ after you say it.', 'Le micro est bloqué. Demande à un adulte, ou touche ✅ après l’avoir dit.')
        : e.error === 'network'
          ? L('No connection to listen. Tap ✅ after you say it.', 'Pas de connexion pour écouter. Touche ✅ après l’avoir dit.')
          : L('I did not hear anything. Try again!', 'Je n’ai rien entendu. Essaie encore!'));
    };
    rec.onend = () => { if (!handled) { done(); status(L('I did not hear anything. Try again!', 'Je n’ai rien entendu. Essaie encore!')); } };
    try { rec.start(); } catch { done(); status(L('Tap ✅ after you say it.', 'Touche ✅ après l’avoir dit.')); }
  }

  function speakQuestion() {
    let text = q.say || q.text;
    if (q.sayChoices && q.choices) {
      const words = q.choices.map((c) => c.say || c.label);
      text += L(` Is it ${orList(words)}?`, ` Est-ce ${words.slice(0, -1).join(', ')} ou ${words[words.length - 1]}?`);
    }
    sayFollow(text, q.lang, stage.querySelector('.prompt-text'));
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
    trackTricky(tries === 0);
    if (!tries) dots[idx].classList.add('done');
    else dots[idx].classList.add('helped');
    const praise = pick([...PRAISE(), ...(unit.praise || []), ...(unit.praise || [])]);
    showBanner(`${praise}`, 'good');
    autoSay(praise);
    setTimeout(() => { if (alive()) { idx++; next(); } }, 1500);
  }

  function wrong(btn) {
    tries++;
    sound.wrong();
    if (btn) { btn.classList.add('wrong'); btn.disabled = true; }
    const card = stage.querySelector('.answers');
    card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');

    if (tries === 1) {
      const retry = pick(RETRY());
      showHint(retry);
      if (store.settings().autoRead) sayFollow(`${retry} ${q.hint?.say || q.hint?.text || ''}`, q.lang, stage.querySelector('.hint-row p'));
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
    wordify(box.querySelector('.hint-row p'));
    box.hidden = false;
    setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }

  function reveal() {
    if (q.type === 'speak') {
      locked = true;
      results.push({ ok: false, text: q.plain });
      trackTricky(false);
      dots[idx].classList.add('helped');
      stage.querySelector('.answers').innerHTML = `
        <div class="reveal-card pop-in">
          <p>${L('Say it with me:', 'Dis-le avec moi :')} <b class="reveal-ans small-ans">${q.target}</b></p>
          <p class="small">${L('Practice makes perfect! You will get the next one.', 'C’est en pratiquant qu’on apprend! Tu vas réussir la prochaine.')}</p>
          <button class="btn" data-act="say-q">🔊 ${L('Listen again', 'Écouter encore')}</button>
          <button class="btn primary" data-act="next">${L('Next', 'Suivant')} ➜</button>
        </div>`;
      say(q.target, q.lang);
      return;
    }
    const shown = q.revealLabel || String(q.answer);
    if (q.type === 'number') {
      locked = true;
      results.push({ ok: false, text: q.plain });
      trackTricky(false);
      dots[idx].classList.add('helped');
      const box = stage.querySelector('.answers');
      box.innerHTML = `
        <div class="reveal-card pop-in">
          <p>${L('The answer is', 'La réponse est')} <b class="reveal-ans">${shown}</b>.</p>
          <p class="small">${L("That one was tricky. You'll get the next one!", 'Celle-là était difficile. Tu vas réussir la prochaine!')}</p>
          <button class="btn primary" data-act="next">${L('Next', 'Suivant')} ➜</button>
        </div>`;
      autoSay(L(`The answer is ${q.revealSay || shown}. That one was tricky. You'll get the next one!`,
        `La réponse est ${q.revealSay || shown}. Celle-là était difficile. Tu vas réussir la prochaine!`), q.lang);
      return;
    }
    // choice: glow the right answer and let her tap it
    const right = [...stage.querySelectorAll('.choice')].find((b) => String(b.dataset.v) === String(q.answer));
    right?.classList.add('glow');
    const msg = L('Here it is! Tap the glowing answer.', 'La voici! Touche la réponse qui brille.');
    showHint(msg);
    const it = q.revealSay || (q.choiceStyle === 'visual' ? L('the glowing one', 'celle qui brille') : shown);
    autoSay(`${msg} ${L(`It's ${it}.`, `C'est ${it}.`)}`, q.lang);
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
        <p>${L('Stop playing this round?', 'Arrêter cette partie?')}</p>
        <div class="modal-actions">
          <button class="btn primary" data-m="stay">${L('Keep playing', 'Continuer à jouer')}</button>
          <button class="btn" data-m="leave">${L('Stop', 'Arrêter')}</button>
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
    autoSay(L('Stop playing this round?', 'Arrêter cette partie?'));
  }

  // ---------- end of round ----------
  function finish() {
    const firstTry = results.filter((r) => r.ok).length;
    const stars = firstTry >= N - 1 ? 3 : firstTry >= N - 3 ? 2 : 1;
    const starsBefore = store.totalStars();
    const famBefore = familyStars();
    const trophiesBefore = new Set(computeTrophies().filter((t) => t.earned).map((t) => t.id));
    store.recordRound(progressKey, {
      stars, firstTry, total: N,
      missed: results.filter((r) => !r.ok).map((r) => r.text),
    });
    if (mixed && unit.id === 'surprise') store.bump('surprise');
    const newItems = newlyUnlocked(starsBefore, store.totalStars(), famBefore, familyStars());
    const newTrophies = computeTrophies().filter((t) => t.earned && !trophiesBefore.has(t.id));
    const won = awardStickers(stars === 3 ? 2 : 1, currentProfile().stickers);
    const up = mixed ? null : nextLevel(levelId);
    const down = mixed ? null : prevLevel(levelId);
    const title = pick(unit.doneTitles || [L('Round complete!', 'Partie terminée!')]);
    const lvName = (l) => L(l.name, l.fr);

    dots.forEach((d) => d.classList.remove('current'));
    stage.innerHTML = `
      <section class="end-card pop-in">
        <h2>${title}</h2>
        <div class="stars">${[1, 2, 3].map((i) => `<span class="star ${i <= stars ? 'on' : ''}" style="--d:${i * 0.25}s">★</span>`).join('')}</div>
        <p class="end-score">${L(`${firstTry} out of ${N} on the first try!`, `${firstTry} sur ${N} du premier coup!`)}</p>
        ${won.length ? `
          <div class="new-stickers">
            <p>${won.length > 1 ? L('New stickers!', 'Nouveaux autocollants!') : L('New sticker!', 'Nouvel autocollant!')}</p>
            <div class="sticker-row">${won.map((s) => `<span class="sticker-big">${s.e}</span>`).join('')}</div>
          </div>` : ''}
        ${newTrophies.length ? `
          <div class="new-trophies">
            <p>🏆 ${newTrophies.length > 1 ? 'New trophies!' : 'New trophy!'}</p>
            ${newTrophies.map((t) => `<span class="trophy-chip">${t.e} ${esc(t.name)}</span>`).join('')}
          </div>` : ''}
        ${newItems.length ? `
          <div class="new-items">
            <p>🎁 ${newItems.length > 1 ? 'New things for your closet!' : 'New thing for your closet!'}</p>
            <div class="sticker-row">${newItems.map((i) => `<span class="closet-new" title="${i.fam ? 'Family unlock' : ''}">${itemPreview(i.slot, i)}${i.fam ? '<small class="fam-tag">👨‍👩‍👧‍👧</small>' : ''}</span>`).join('')}</div>
            <button class="btn" data-go="#/closet">Dress up 👗</button>
          </div>` : ''}
        <div class="end-actions">
          ${stars >= 2 && up ? `<button class="btn spicy" data-act="level" data-level="${up.id}">${L('Try', 'Essaie')} ${lvName(up)} ${peppers(up.peppers)}</button>` : ''}
          <button class="btn primary" data-act="again">${L('Play again', 'Rejouer')} 🔁</button>
          ${stars === 1 && down ? `<button class="btn" data-act="level" data-level="${down.id}">${L('Try', 'Essaie')} ${lvName(down)} ${peppers(down.peppers)}</button>` : ''}
          <button class="btn" data-act="menu">${L('Pick another game', 'Choisir un autre jeu')}</button>
        </div>
      </section>`;
    sound.win();
    confetti();
    const stickerWords = won.length
      ? L(` You got ${won.length > 1 ? 'new stickers' : 'a new sticker'}!`, ` Tu as gagné ${won.length > 1 ? 'de nouveaux autocollants' : 'un nouvel autocollant'}!`)
      : '';
    autoSay(`${title} ${L(`${currentProfile().name}, you earned ${stars} ${stars === 1 ? 'star' : 'stars'}!`, `${currentProfile().name}, tu as gagné ${stars} ${stars === 1 ? 'étoile' : 'étoiles'}!`)}${stickerWords}`);
  }
}
