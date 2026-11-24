import { PROFILES, currentProfile, findSubject, findUnit, selectProfile, profileById } from './profiles.js';
import { LEVELS, peppers } from './levels.js';
import { store } from './storage.js';
import { speech } from './speech.js';
import { sound } from './sound.js';
import { runRound } from './engine.js';
import { surpriseUnit, trickyUnit } from './mix.js';
import { esc } from './util.js';
import { weekSummary, summaryText } from './summary.js';
import { avatarOf, avatarHTML, computeTrophies, SLOTS, itemPreview, isUnlocked, familyStars, familyGoals } from './rewards.js';
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
  document.body.dataset.big = store.settings().bigText ? '1' : '0';
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
          <span class="who-avatar">${avatarHTML(avatarOf(p.id), 104)}</span>
          <span class="who-name">${p.name}</span>
          <span class="who-grade">Grade ${p.grade}</span>
        </button>`).join('')}
    </section>
    <button class="btn wide family-btn" data-go="#/family">👨‍👩‍👧‍👧 Family goals · ⭐ ${familyStars()} together</button>`;
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
      <button class="switch-player" data-go="#/who" aria-label="Switch player">${avatarHTML(avatarOf(prof.id), 30)} <span>Switch</span></button>
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
    <section class="mix-row">
      <button class="mix-btn surprise" data-go="#/surprise">
        <span class="mix-emoji">🎲</span><span><b>Surprise me!</b><small>A mix of all your games</small></span>
      </button>
      ${store.tricky().length
        ? `<button class="mix-btn tricky" data-go="#/tricky"><span class="mix-emoji">🧠</span><span><b>Tricky ones</b><small>${store.tricky().length} to beat</small></span></button>`
        : '<div class="mix-btn tricky off"><span class="mix-emoji">🧠</span><span><b>Tricky ones</b><small>None yet — great job!</small></span></div>'}
    </section>
    <nav class="bottom-nav">
      <button class="nav-btn" data-go="#/rewards"><span class="nav-emoji">🏆</span>Rewards</button>
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
    if (store.settings().autoRead) speech.say(isFr() ? 'En français!' : 'In English!', voiceLang());
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

function playMix(kind) {
  setTheme('home');
  const unit = kind === 'tricky' ? trickyUnit() : surpriseUnit();
  if (kind === 'tricky' && !unit.count) return home();
  runRound({
    root: app, subjectId: 'mix', unit, levelId: 'medium', mixed: true,
    length: kind === 'tricky' ? unit.count : undefined,
    onQuit: () => { location.hash = '#/'; },
    onPlay: () => { if (location.hash === `#/${kind}`) playMix(kind); else location.hash = `#/${kind}`; },
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

function rewardsScreen() {
  setTheme('home');
  const prof = currentProfile();
  const stars = store.totalStars();
  const all = computeTrophies(prof);
  const got = all.filter((t) => t.earned).length;
  const card = (t) => `
    <button class="trophy ${t.earned ? 'earned' : 'locked'}" data-say="${esc(t.earned ? `${t.name}. ${t.how}.` : `Locked. ${t.how}.`)}">
      <span class="t-emoji">${t.earned ? t.e : '🔒'}</span>
      <span class="t-name">${esc(t.name)}</span>
      ${t.earned ? '' : `<span class="t-how">${esc(t.how)}</span>`}
    </button>`;
  app.innerHTML = `
    ${topBar('#/', '🏆 My Rewards', `You have ${got} of ${all.length} trophies.`)}
    <section class="rewards-hero pop-in">
      ${avatarHTML(avatarOf(prof.id), 140)}
      <p class="sub"><b>${prof.name}</b> · ⭐ ${stars} stars · 🏆 ${got} / ${all.length}</p>
      <button class="btn primary" data-go="#/closet">Dress up 👗</button>
      <button class="btn" data-go="#/stickers">Sticker book 📒</button>
      <button class="btn" data-go="#/family">Family goals 👨‍👩‍👧‍👧</button>
    </section>
    <h3 class="trophy-title">Milestones</h3>
    <section class="trophy-grid">${all.filter((t) => t.cat === 'milestone').map(card).join('')}</section>
    <h3 class="trophy-title">Game crowns 👑 <small>3 stars on every level</small></h3>
    <section class="trophy-grid">${all.filter((t) => t.cat === 'game').map(card).join('')}</section>`;
}

function familyScreen() {
  setTheme('home');
  const fam = familyStars();
  const goals = familyGoals();
  const next = goals.find((g) => g.fam > fam);
  const top = goals[goals.length - 1].fam;
  const pct = Math.min(100, Math.round((100 * fam) / top));
  app.innerHTML = `
    ${topBar('#/rewards', '👨‍👩‍👧‍👧 Family Goals', `Together you have ${fam} stars!`)}
    <section class="family-hero pop-in">
      <div class="family-avatars">${PROFILES.map((p) => `<span class="fam-kid">${avatarHTML(avatarOf(p.id), 70)}<b>${p.name}</b></span>`).join('<span class="fam-plus">+</span>')}</div>
      <p class="family-total">⭐ ${fam} family stars</p>
      <div class="meter" role="img" aria-label="${pct}% to the last goal"><span style="width:${pct}%"></span></div>
      <p class="note">${next ? `Next goal at ${next.fam} stars — ${next.fam - fam} to go!` : 'You unlocked every family goal!'}</p>
      <p class="note">Every star either of you earns counts. Unlocked items can be worn by both of you.</p>
    </section>
    <section class="goal-list">
      ${goals.map((g) => `<div class="goal ${fam >= g.fam ? 'done' : ''}"><span class="goal-pic">${fam >= g.fam ? itemPreview(g.slot, g) : '🔒'}</span><span class="goal-text"><b>${g.fam} stars</b><small>${SLOTS[g.slot].label}</small></span><span class="goal-state">${fam >= g.fam ? '✅' : ''}</span></div>`).join('')}
    </section>`;
}

function closetScreen(tab = 'buddy') {
  setTheme('home');
  const prof = currentProfile();
  const stars = store.totalStars();
  const av = avatarOf(prof.id);
  const slot = SLOTS[tab];
  const fam = familyStars();
  const costs = Object.values(SLOTS).flatMap((s) => s.list.map((i) => i.cost)).filter((c) => c > stars);
  const nextCost = costs.length ? Math.min(...costs) : null;
  app.innerHTML = `
    ${topBar('#/rewards', '👗 Dress-up', 'Pick your buddy, hat and more!')}
    <section class="closet-preview">${avatarHTML(av, 150)}
      <p class="note">⭐ ${stars} stars ${nextCost ? `· something new at ⭐ ${nextCost}` : '· you unlocked everything!'}</p></section>
    <div class="tabs">${Object.entries(SLOTS).map(([k, v]) => `<button class="tab ${k === tab ? 'on' : ''}" data-tab="${k}">${v.label}</button>`).join('')}</div>
    <section class="closet-grid">
      ${slot.list.map((it) => {
        const ok = isUnlocked(it, stars, fam);
        const costTxt = it.fam ? `👨‍👩‍👧‍👧 ${it.fam}` : `⭐ ${it.cost}`;
        return `<button class="closet-item ${av[tab] === it.id ? 'sel' : ''} ${ok ? '' : 'locked'}" data-item="${it.id}" ${ok ? '' : 'disabled'} aria-label="${ok ? esc(it.name || it.id) : `Unlocks at ${it.fam ? it.fam + ' family' : it.cost} stars`}">
          <span class="ci-pic">${ok ? itemPreview(tab, it) : '🔒'}</span>${ok ? (it.fam ? '<span class="fam-badge">👨‍👩‍👧‍👧</span>' : '') : `<span class="ci-cost">${costTxt}</span>`}</button>`;
      }).join('')}
    </section>`;
  app.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => { sound.tap(); closetScreen(b.dataset.tab); }));
  app.querySelectorAll('[data-item]').forEach((b) => b.addEventListener('click', () => {
    sound.tap();
    store.setAvatar({ [tab]: b.dataset.item });
    closetScreen(tab);
  }));
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
      ${toggle('autoRead', 'Read out loud by itself (questions, hints and cheers)', '🗣️')}
      ${toggle('followAlong', 'Highlight each word as it is read', '🖍️')}
      ${toggle('tapWords', 'Tap a word to hear it', '👆')}
      ${toggle('bigText', 'Bigger text', '🔠')}
      ${toggle('micOn', 'Let the speaking games listen (microphone)', '🎤')}
      ${toggle('slow', 'Read slowly', '🐢')}
      ${toggle('sound', 'Sound effects', '🔔')}
      <button class="setting ${isFr() ? 'on' : ''}" data-lang-toggle>
        <span class="setting-emoji">🇫🇷</span>
        <span class="setting-label">Games in French (Math, Science, Social Studies)</span>
        <span class="switch"><span></span></span>
      </button>
      <p class="note">🎤 Off = the speaking games use the honor system (say it out loud, tap ✅). On = the phone listens and checks. Voice recognition is done by Chrome/Google, so leave it off if you would rather not.</p>
      <p class="note">With “read out loud by itself” off, nothing is spoken until you tap a 🔊 button or a word.</p>
      <button class="btn primary wide" data-test-voice>🔊 Test the voice</button>
      ${speech.supported ? '' : '<p class="note">This browser can’t read out loud. Try Chrome.</p>'}
    </section>`;
  app.querySelectorAll('[data-setting]').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.setting;
    if (k === 'micOn' && !store.settings().micOn && !confirm('Grown-ups: this lets the French speaking games listen through the microphone. Chrome sends what is said to Google to turn it into words. Turn it on?')) return;
    store.setSetting(k, !store.settings()[k]);
    b.classList.toggle('on', store.settings()[k]);
    document.body.dataset.big = store.settings().bigText ? '1' : '0';
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
  const summaries = PROFILES.map((prof) => weekSummary(prof));
  const weekCard = (sm) => `
    <div class="week-card">
      <h4>📅 This week</h4>
      ${sm.rounds ? `
        <div class="week-stats"><span><b>${sm.rounds}</b>rounds</span><span><b>${sm.days}</b>${sm.days === 1 ? 'day' : 'days'}</span><span><b>${sm.minutes}</b>min</span><span><b>${sm.firstTry}%</b>first try</span></div>
        ${sm.bySubject.length ? `<p>Practised: ${sm.bySubject.map(([n, c]) => `${esc(n)} (${c})`).join(', ')}</p>` : ''}
        ${sm.going.length ? `<p>👍 Going well: ${sm.going.map((u) => `${esc(u.title)} (${u.pct}%)`).join(', ')}</p>` : ''}
        ${sm.practice.length ? `<p>🔁 Could use practice: ${sm.practice.map((u) => `${esc(u.title)} (${u.pct}%)`).join(', ')}</p>` : ''}
        ${sm.tricky ? `<p>🧠 Tricky questions waiting: ${sm.tricky}</p>` : ''}`
    : '<p class="note">No rounds played in the last 7 days.</p>'}
    </div>`;
  const summaryPlain = summaryText(summaries);
  const html = PROFILES.map((prof, pi) => `
    <details class="parent-kid" ${prof.id === currentProfile().id ? 'open' : ''}>
      <summary><span>${prof.avatar} ${prof.name}</span> <small>Grade ${prof.grade}</small></summary>
      ${weekCard(summaries[pi])}
      ${prof.subjects.filter((s) => !s.comingSoon).map((sub) => {
        const rounds = sub.units.reduce((n, u) => n + LEVELS.reduce((m, l) => m + (store.profileData(prof.id).progress[`${sub.id}.${u.id}.${l.id}`]?.plays || 0), 0), 0);
        return `<details class="parent-subject-box"><summary>${sub.emoji} ${sub.name} <small>${sub.units.length} games · ${rounds} rounds played</small></summary>${sub.units.map((u) => unitCard(prof, sub, u)).join('')}</details>`;
      }).join('')}
      <button class="btn danger wide" data-reset="${prof.id}">Reset ${prof.name}'s progress &amp; stickers</button>
    </details>`).join('');
  forceLang(null);
  app.innerHTML = `
    ${topBar('#/', '📊 Grown-ups')}
    <section class="parent">
      <p class="note">Progress is saved on this device only. "First try" means right without a hint. The weekly numbers count rounds finished since this feature was added.</p>
      <button class="btn primary wide" id="copy-summary">📋 Copy this week's summary</button>
      <p class="note" id="summary-msg" role="status"></p>
      ${html}
      <details class="parent-kid backup">
        <summary><span>💾 Backup &amp; restore</span></summary>
        <p class="note">To move progress to another phone: copy this code, then paste it into “Restore” on the other phone (Grown-ups page).</p>
        <textarea id="backup-out" readonly rows="3" aria-label="Backup code"></textarea>
        <button class="btn" id="backup-copy">Copy backup code</button>
        <p class="note">Restore replaces everything on <b>this</b> phone with the code you paste.</p>
        <textarea id="backup-in" rows="3" placeholder="Paste a backup code here" aria-label="Paste backup code"></textarea>
        <button class="btn danger" id="backup-restore">Restore from code</button>
        <p class="note" id="backup-msg" role="status"></p>
      </details>
    </section>`;
  app.querySelector('#copy-summary').addEventListener('click', async () => {
    const m = app.querySelector('#summary-msg');
    try { await navigator.clipboard.writeText(summaryPlain); m.textContent = 'Copied! Paste it into a note, email or message.'; } catch { m.textContent = 'Could not copy automatically — here it is:\n\n' + summaryPlain; m.style.whiteSpace = 'pre-wrap'; }
  });
  const out = app.querySelector('#backup-out');
  out.value = store.exportCode();
  const msg = app.querySelector('#backup-msg');
  app.querySelector('#backup-copy').addEventListener('click', async () => {
    out.select();
    try { await navigator.clipboard.writeText(out.value); msg.textContent = 'Copied! Paste it into a note or message to yourself.'; } catch { document.execCommand?.('copy'); msg.textContent = 'Selected — press and hold to copy.'; }
  });
  app.querySelector('#backup-restore').addEventListener('click', () => {
    const code = app.querySelector('#backup-in').value;
    if (!code.trim()) { msg.textContent = 'Paste a backup code first.'; return; }
    if (!confirm('Replace ALL progress on this phone with this backup?')) return;
    if (store.importCode(code)) { msg.textContent = 'Restored! Reloading…'; setTimeout(() => location.reload(), 600); }
    else msg.textContent = 'That code did not work. Make sure you copied all of it.';
  });
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
  if (a === 'rewards') return rewardsScreen();
  if (a === 'closet') return closetScreen();
  if (a === 'family') return familyScreen();
  if (a === 'surprise' || a === 'tricky') return playMix(a);
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
