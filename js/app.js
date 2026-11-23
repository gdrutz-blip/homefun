import { PROFILES, currentProfile, findSubject, findUnit, selectProfile, profileById } from './profiles.js';
import { LEVELS, peppers } from './levels.js';
import { store } from './storage.js';
import { speech } from './speech.js';
import { sound } from './sound.js';
import { runRound } from './engine.js';
import { esc } from './util.js';
import { L, isFr, voiceLang, forceLang } from './i18n.js';

const app = document.getElementById('app');
const kidName = () => currentProfile().name;

const speakBtn = (text, cls = '', lang = 'en-CA') =>
  `<button class="speak ${cls}" data-say="${esc(text)}" data-lang="${lang}" aria-label="Read it to me">🔊</button>`;
/** Speak button for game content (follows the English/French switch). */
const gameSpeak = (text, cls = '') => speakBtn(text, cls, voiceLang());

const topBar = (back, title, sayText, lang) => `
  <header class="topbar">
    <button class="icon-btn" data-go="${back}" aria-label="Back">←</button>
    <h1 class="topbar-title">${title}</h1>
    ${sayText ? speakBtn(sayText, '', lang) : '<span class="icon-spacer"></span>'}
  </header>`;

const starRow = (n) => `<span class="mini-stars">${[1, 2, 3].map((i) => `<span class="${i <= n ? 'on' : ''}">★</span>`).join('')}</span>`;

function setTheme(t) {
  document.body.dataset.theme = t || 'home';
  document.body.dataset.profile = currentProfile().look;
}
function autoSay(text, lang) { if (store.settings().autoRead) setTimeout(() => speech.say(text, lang), 200); }

// One click handler for the whole app: 🔊 buttons and navigation.
app.addEventListener('click', (e) => {
  const say = e.target.closest('[data-say]');
  if (say) { speech.say(say.dataset.say, say.dataset.lang); return; }
  const go = e.target.closest('[data-go]');
  if (go) { sound.tap(); location.hash = go.dataset.go; }
});

// ---------------- screens ----------------

function whoScreen() {
  forceLang(null);
  document.body.dataset.theme = 'home';
  document.body.dataset.profile = 'who';
  app.innerHTML = `
    <section class="hero pop-in">
      <div class="hero-row"><h1>Who's playing?</h1>${speakBtn("Who's playing?")}</div>
    </section>
    <section class="who-grid">
      ${PROFILES.map((p) => `
        <button class="who-card" data-pick="${p.id}" style="--c:${p.color}">
          <span class="who-avatar">${p.avatar}</span>
          <span class="who-name">${p.name}</span>
          <span class="who-grade">Grade ${p.grade}</span>
        </button>`).join('')}
    </section>`;
  app.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => {
    selectProfile(b.dataset.pick);
    sound.tap();
    if (location.hash && location.hash !== '#/') location.hash = '#/';
    else home();
  }));
}

function home() {
  setTheme('home');
  const d = store.data();
  const prof = currentProfile();
  const K = prof.name;
  app.innerHTML = `
    <section class="hero pop-in">
      <button class="switch-player" data-go="#/who" aria-label="Switch player">${prof.avatar} <span>Switch</span></button>
      <div class="hero-row">
        <h1>Hi ${K}! 👋</h1>
        ${speakBtn(`Hi ${K}! What do you want to practice today?`)}
      </div>
      <p class="sub">What do you want to practice today?</p>
      <button class="pill" data-go="#/stickers">⭐ ${store.totalStars()} stars &nbsp;·&nbsp; 📒 ${d.stickers.length} stickers</button>
    </section>
    <section class="subject-grid">
      ${prof.subjects.map((s) => s.comingSoon
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
    ${topBar('#/', `${sub.emoji} ${L(sub.name, sub.frName || sub.name)}`, L(`${sub.name}! Pick a game.`, 'Choisis un jeu!'), voiceLang())}
    ${sub.bilingual ? `
      <div class="lang-switch" role="group" aria-label="Language">
        <button class="lang-btn ${isFr() ? '' : 'on'}" data-lang-set="en">English</button>
        <button class="lang-btn ${isFr() ? 'on' : ''}" data-lang-set="fr">Français</button>
      </div>` : ''}
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
          ${gameSpeak(`${u.title}. ${u.skill}. ${u.blurb}`, 'small')}
        </div>`).join('')}
    </section>`;
  app.querySelectorAll('[data-lang-set]').forEach((b) => b.addEventListener('click', () => {
    store.setSetting('lang', b.dataset.langSet);
    sound.tap();
    subjectScreen(subjectId);
    speech.say(isFr() ? 'En français!' : 'In English!', voiceLang());
  }));
}

function levelScreen(subjectId, unitId) {
  const unit = findUnit(subjectId, unitId);
  if (!unit) return home();
  setTheme(unit.theme);
  app.innerHTML = `
    ${topBar(`#/s/${subjectId}`, unit.skill, unit.intro, voiceLang())}
    <section class="intro-card pop-in">
      <div class="intro-emoji">${unit.emoji}</div>
      <h2>${unit.title}</h2>
      <p>${unit.intro}</p>
    </section>
    <h3 class="pick-label">${L('How spicy?', 'Quel niveau?')} ${gameSpeak(L('How spicy do you want it? Mild, medium, or spicy?', 'Quel niveau veux-tu? Doux, moyen ou piquant?'), 'small')}</h3>
    <section class="level-list">
      ${LEVELS.map((l) => {
        const best = store.progress(`${subjectId}.${unit.id}.${l.id}`)?.best || 0;
        return `
        <div class="level-btn" style="--lc:${l.color}" data-go="#/play/${subjectId}/${unit.id}/${l.id}" role="button" tabindex="0">
          <span class="level-peppers">${peppers(l.peppers)}</span>
          <span class="level-text"><b>${L(l.name, l.fr)}</b><span>${unit.levels[l.id].kid}</span></span>
          ${starRow(best)}
          ${gameSpeak(`${L(l.name, l.fr)}. ${unit.levels[l.id].kid}.`, 'small')}
        </div>`;
      }).join('')}
    </section>`;
  autoSay(unit.intro, voiceLang());
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
  const STICKERS = currentProfile().stickers;
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
    ${topBar('#/', `⚙️ ${kidName()}'s Settings`, 'Settings')}
    <section class="settings">
      ${toggle('autoRead', 'Read questions out loud by itself', '🗣️')}
      ${toggle('tapWords', 'Tap a word to hear it', '👆')}
      ${toggle('slow', 'Read slowly', '🐢')}
      ${toggle('sound', 'Sound effects', '🔔')}
      <button class="setting ${isFr() ? 'on' : ''}" data-lang-toggle>
        <span class="setting-emoji">🇫🇷</span>
        <span class="setting-label">Games in French (Math, Science, Social Studies)</span>
        <span class="switch"><span></span></span>
      </button>
      <button class="btn primary wide" data-test-voice>🔊 Test the voice</button>
      ${speech.supported ? '' : '<p class="note">This browser can’t read out loud. Try Chrome.</p>'}
    </section>`;
  app.querySelectorAll('[data-setting]').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.setting;
    store.setSetting(k, !store.settings()[k]);
    b.classList.toggle('on', store.settings()[k]);
    sound.tap();
  }));
  app.querySelector('[data-lang-toggle]').addEventListener('click', (e) => {
    store.setSetting('lang', isFr() ? 'en' : 'fr');
    e.currentTarget.classList.toggle('on', isFr());
    sound.tap();
  });
  const K = kidName();
  app.querySelector('[data-test-voice]').addEventListener('click', () => speech.say(isFr()
    ? `Bonjour ${K}! Je vais te lire les questions. Touche le haut-parleur pour les entendre encore.`
    : `Hi ${K}! I will read the questions to you. Tap the speaker any time to hear it again.`, voiceLang()));
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
  const unitCard = (prof, sub, u) => {
    const prog = (l) => store.profileData(prof.id).progress[`${sub.id}.${u.id}.${l.id}`];
    const missed = LEVELS.flatMap((l) => (prog(l)?.missed || []).map((m) => `${peppers(l.peppers)} ${esc(m)}`));
    return `
      <div class="parent-unit">
        <h3>${u.emoji} ${u.skill} <small>· ${u.title}</small></h3>
        <table>
          <thead><tr><th>Level</th><th>Best</th><th>Rounds</th><th>First try</th><th>Last</th></tr></thead>
          <tbody>
            ${LEVELS.map((l) => {
              const p = prog(l);
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
        ${missed.length ? `<details><summary>Recent tricky questions (${missed.length})</summary><ul class="missed">${missed.map((m) => `<li>${m}</li>`).join('')}</ul></details>` : ''}
      </div>`;
  };
  // Show unit names in English here, whatever language the kids picked.
  forceLang('en');
  const html = PROFILES.map((prof) => `
    <details class="parent-kid" ${prof.id === currentProfile().id ? 'open' : ''}>
      <summary><span>${prof.avatar} ${prof.name}</span> <small>Grade ${prof.grade}</small></summary>
      ${prof.subjects.filter((s) => !s.comingSoon).map((sub) => `<h4 class="parent-subject">${sub.emoji} ${sub.name}</h4>${sub.units.map((u) => unitCard(prof, sub, u)).join('')}`).join('')}
      <button class="btn danger wide" data-reset="${prof.id}">Reset ${prof.name}'s progress &amp; stickers</button>
    </details>`).join('');
  forceLang(null);
  app.innerHTML = `
    ${topBar('#/', '📊 Grown-ups')}
    <section class="parent">
      <p class="note">Progress is saved on this device only. "First try" means right without a hint.</p>
      ${html}
    </section>`;
  app.querySelectorAll('[data-reset]').forEach((b) => b.addEventListener('click', () => {
    const p = profileById(b.dataset.reset);
    if (confirm(`Erase all of ${p.name}'s stars and stickers on this device?`)) { store.resetProfile(p.id); grownups(); }
  }));
}

// ---------------- router ----------------
function route() {
  speech.stop();
  window.scrollTo({ top: 0 });
  const [a, b, c, d] = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  // The Français subject is always in French; everything else follows the switch.
  forceLang((a === 's' || a === 'play') ? (findSubject(b)?.forceLang || null) : null);
  if (a === 's' && b && c) return levelScreen(b, c);
  if (a === 's' && b) return subjectScreen(b);
  if (a === 'play') return play(b, c, d);
  if (a === 'stickers') return stickersScreen();
  if (a === 'settings') return settingsScreen();
  if (a === 'grownups') return grownups();
  if (a === 'who') return whoScreen();
  return home();
}

window.addEventListener('hashchange', route);
// Shared phone: opening the app fresh always asks who's playing.
if (!location.hash || location.hash === '#/' || !store.currentId()) whoScreen();
else route();

// Offline support / install to home screen.
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
