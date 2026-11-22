import { SUBJECTS, findSubject, findUnit } from './subjects.js';
import { LEVELS, peppers } from './levels.js';
import { store } from './storage.js';
import { speech } from './speech.js';
import { sound } from './sound.js';
import { runRound } from './engine.js';
import { FAMILY } from './config.js';
import { STICKERS } from './stickers.js';
import { esc } from './util.js';

const app = document.getElementById('app');
const K = FAMILY.kid;

const speakBtn = (text, cls = '') =>
  `<button class="speak ${cls}" data-say="${esc(text)}" aria-label="Read it to me">🔊</button>`;

const topBar = (back, title, sayText) => `
  <header class="topbar">
    <button class="icon-btn" data-go="${back}" aria-label="Back">←</button>
    <h1 class="topbar-title">${title}</h1>
    ${sayText ? speakBtn(sayText) : '<span class="icon-spacer"></span>'}
  </header>`;

const starRow = (n) => `<span class="mini-stars">${[1, 2, 3].map((i) => `<span class="${i <= n ? 'on' : ''}">★</span>`).join('')}</span>`;

function setTheme(t) { document.body.dataset.theme = t || 'home'; }
function autoSay(text) { if (store.settings().autoRead) setTimeout(() => speech.say(text), 200); }

// One click handler for the whole app: 🔊 buttons and navigation.
app.addEventListener('click', (e) => {
  const say = e.target.closest('[data-say]');
  if (say) { speech.say(say.dataset.say, say.dataset.lang); return; }
  const go = e.target.closest('[data-go]');
  if (go) { sound.tap(); location.hash = go.dataset.go; }
});

// ---------------- screens ----------------

function home() {
  setTheme('home');
  const d = store.data();
  app.innerHTML = `
    <section class="hero pop-in">
      <div class="hero-row">
        <h1>Hi ${K}! 👋</h1>
        ${speakBtn(`Hi ${K}! What do you want to practice today?`)}
      </div>
      <p class="sub">What do you want to practice today?</p>
      <button class="pill" data-go="#/stickers">⭐ ${store.totalStars()} stars &nbsp;·&nbsp; 📒 ${d.stickers.length} stickers</button>
    </section>
    <section class="subject-grid">
      ${SUBJECTS.map((s) => s.comingSoon
        ? `<div class="subject-tile soon" style="--c:${s.color}">
             <span class="tile-emoji">${s.emoji}</span><span class="tile-name">${s.name}</span>
             <span class="soon-tag">Coming soon</span>
           </div>`
        : `<button class="subject-tile" data-go="#/s/${s.id}" style="--c:${s.color}">
             <span class="tile-emoji">${s.emoji}</span><span class="tile-name">${s.name}</span>
             <span class="tile-count">${s.units.length} games</span>
           </button>`).join('')}
    </section>
    <nav class="bottom-nav">
      <button class="nav-btn" data-go="#/stickers"><span class="nav-emoji">📒</span>Stickers</button>
      <button class="nav-btn" data-go="#/settings"><span class="nav-emoji">⚙️</span>Settings</button>
      <button class="nav-btn" data-go="#/grownups"><span class="nav-emoji">🔒</span>Grown-ups</button>
    </nav>`;
}

function subjectScreen(subjectId) {
  const sub = findSubject(subjectId);
  if (!sub || sub.comingSoon) return home();
  setTheme('home');
  app.innerHTML = `
    ${topBar('#/', `${sub.emoji} ${sub.name}`, `${sub.name}! Pick a game.`)}
    <section class="unit-list">
      ${sub.units.map((u) => `
        <div class="unit-card" style="--c:${u.color}" data-go="#/s/${sub.id}/${u.id}" role="button" tabindex="0">
          <span class="unit-emoji">${u.emoji}</span>
          <span class="unit-info">
            <span class="unit-skill">${u.skill}</span>
            <span class="unit-title">${u.title}</span>
            <span class="unit-levels">
              ${LEVELS.map((l) => `<span class="ul">${peppers(l.peppers)}${starRow(store.progress(`${sub.id}.${u.id}.${l.id}`)?.best || 0)}</span>`).join('')}
            </span>
          </span>
          ${speakBtn(`${u.title}. ${u.skill}. ${u.blurb}`, 'small')}
        </div>`).join('')}
    </section>`;
}

function levelScreen(subjectId, unitId) {
  const unit = findUnit(subjectId, unitId);
  if (!unit) return home();
  setTheme(unit.theme);
  app.innerHTML = `
    ${topBar(`#/s/${subjectId}`, unit.skill, unit.intro)}
    <section class="intro-card pop-in">
      <div class="intro-emoji">${unit.emoji}</div>
      <h2>${unit.title}</h2>
      <p>${unit.intro}</p>
    </section>
    <h3 class="pick-label">How spicy? ${speakBtn('How spicy do you want it? Mild, medium, or spicy?', 'small')}</h3>
    <section class="level-list">
      ${LEVELS.map((l) => {
        const best = store.progress(`${subjectId}.${unit.id}.${l.id}`)?.best || 0;
        return `
        <div class="level-btn" style="--lc:${l.color}" data-go="#/play/${subjectId}/${unit.id}/${l.id}" role="button" tabindex="0">
          <span class="level-peppers">${peppers(l.peppers)}</span>
          <span class="level-text"><b>${l.name}</b><span>${unit.levels[l.id].kid}</span></span>
          ${starRow(best)}
          ${speakBtn(`${l.name}. ${unit.levels[l.id].kid}.`, 'small')}
        </div>`;
      }).join('')}
    </section>`;
  autoSay(unit.intro);
}

function play(subjectId, unitId, levelId) {
  const unit = findUnit(subjectId, unitId);
  if (!unit || !LEVELS.some((l) => l.id === levelId)) return home();
  setTheme(unit.theme);
  runRound({
    root: app, subjectId, unit, levelId,
    onQuit: () => { location.hash = `#/s/${subjectId}/${unitId}`; },
    onPlay: (lv) => {
      const h = `#/play/${subjectId}/${unitId}/${lv}`;
      if (location.hash === h) play(subjectId, unitId, lv);
      else location.hash = h;
    },
  });
}

function stickersScreen() {
  setTheme('home');
  const have = store.data().stickers.length;
  app.innerHTML = `
    ${topBar('#/', '📒 Sticker Book', `You have ${have} out of ${STICKERS.length} stickers! Finish a game to win more.`)}
    <p class="center sub">You have <b>${have}</b> of ${STICKERS.length} stickers!<br>Finish a game to win more.</p>
    <section class="sticker-grid">
      ${STICKERS.map((s) => store.hasSticker(s.id)
        ? `<button class="sticker" data-say="${esc(s.name)}" aria-label="${esc(s.name)}">${s.e}</button>`
        : '<span class="sticker locked">?</span>').join('')}
    </section>`;
}

function settingsScreen() {
  setTheme('home');
  const s = store.settings();
  const toggle = (key, label, emoji) => `
    <button class="setting ${s[key] ? 'on' : ''}" data-setting="${key}">
      <span class="setting-emoji">${emoji}</span>
      <span class="setting-label">${label}</span>
      <span class="switch"><span></span></span>
    </button>`;
  app.innerHTML = `
    ${topBar('#/', '⚙️ Settings', 'Settings')}
    <section class="settings">
      ${toggle('autoRead', 'Read questions out loud by itself', '🗣️')}
      ${toggle('slow', 'Read slowly', '🐢')}
      ${toggle('sound', 'Sound effects', '🔔')}
      <button class="btn primary wide" data-test-voice>🔊 Test the voice</button>
      ${speech.supported ? '' : '<p class="note">This browser can’t read out loud. Try Chrome.</p>'}
    </section>`;
  app.querySelectorAll('[data-setting]').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.setting;
    store.setSetting(k, !store.settings()[k]);
    b.classList.toggle('on', store.settings()[k]);
    sound.tap();
  }));
  app.querySelector('[data-test-voice]').addEventListener('click', () =>
    speech.say(`Hi ${K}! I will read the questions to you. Tap the speaker any time to hear it again.`));
}

// ---- grown-ups ----
let unlocked = false;
function grownups() {
  setTheme('home');
  if (!unlocked) {
    app.innerHTML = `
      ${topBar('#/', '🔒 Grown-ups')}
      <section class="gate pop-in">
        <p>Grown-ups only! What is <b>7 × 8</b>?</p>
        <input id="gate" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" aria-label="Answer">
        <button class="btn primary" id="gate-go">Enter</button>
      </section>`;
    const input = app.querySelector('#gate');
    const check = () => { if (input.value.trim() === '56') { unlocked = true; grownups(); } else { input.value = ''; input.classList.add('bad'); } };
    app.querySelector('#gate-go').addEventListener('click', check);
    input.addEventListener('keydown', (e) => e.key === 'Enter' && check());
    return;
  }
  const fmtDate = (t) => (t ? new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '—');
  app.innerHTML = `
    ${topBar('#/', '📊 Grown-ups')}
    <section class="parent">
      <p class="note">Progress is saved on this device only. "First try" means right without a hint.</p>
      ${SUBJECTS.filter((s) => !s.comingSoon).map((sub) => sub.units.map((u) => `
        <div class="parent-unit">
          <h3>${u.emoji} ${u.skill} <small>· ${u.title}</small></h3>
          <table>
            <thead><tr><th>Level</th><th>Best</th><th>Rounds</th><th>First try</th><th>Last</th></tr></thead>
            <tbody>
              ${LEVELS.map((l) => {
                const p = store.progress(`${sub.id}.${u.id}.${l.id}`);
                return `<tr>
                  <td>${peppers(l.peppers)}</td>
                  <td>${p ? starRow(p.best) : '—'}</td>
                  <td>${p?.plays || 0}</td>
                  <td>${p?.total ? Math.round((100 * p.firstTry) / p.total) + '%' : '—'}</td>
                  <td>${fmtDate(p?.last)}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
          <details>
            <summary>What each level covers</summary>
            <ul>${LEVELS.map((l) => `<li><b>${l.name}:</b> ${u.levels[l.id].parent}</li>`).join('')}</ul>
          </details>
          ${(() => {
            const missed = LEVELS.flatMap((l) => (store.progress(`${sub.id}.${u.id}.${l.id}`)?.missed || []).map((m) => `${peppers(l.peppers)} ${esc(m)}`));
            return missed.length ? `<details><summary>Recent tricky questions (${missed.length})</summary><ul class="missed">${missed.map((m) => `<li>${m}</li>`).join('')}</ul></details>` : '';
          })()}
        </div>`).join('')).join('')}
      <button class="btn danger wide" id="reset">Reset all progress &amp; stickers</button>
    </section>`;
  app.querySelector('#reset').addEventListener('click', () => {
    if (confirm(`Erase all of ${K}'s stars and stickers on this device?`)) { store.resetProgress(); grownups(); }
  });
}

// ---------------- router ----------------
function route() {
  speech.stop();
  window.scrollTo({ top: 0 });
  const [a, b, c, d] = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (a === 's' && b && c) return levelScreen(b, c);
  if (a === 's' && b) return subjectScreen(b);
  if (a === 'play') return play(b, c, d);
  if (a === 'stickers') return stickersScreen();
  if (a === 'settings') return settingsScreen();
  if (a === 'grownups') return grownups();
  return home();
}

window.addEventListener('hashchange', route);
route();

// Offline support / install to home screen.
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
