// Weekly progress summary for grown-ups (built from the activity log).
import { store } from './storage.js';

const DAY = 24 * 60 * 60 * 1000;

function unitInfo(prof, key) {
  const [sid, uid] = key.split('.');
  if (sid === 'mix') return { title: uid === 'tricky' ? 'Tricky ones' : 'Surprise me', subject: 'Mixed rounds' };
  const sub = prof.subjects.find((s) => s.id === sid);
  const u = sub?.units.find((x) => x.id === uid);
  return { title: u ? u.title : key, subject: sub ? sub.name : 'Other' };
}

/** Numbers for the last `days` days. Call with the language forced to English so names read well. */
export function weekSummary(prof, { days = 7, now = Date.now() } = {}) {
  const all = store.profileData(prof.id).log || [];
  const inWeek = all.filter((e) => e.t >= now - days * DAY);
  const recent = all.filter((e) => e.t >= now - 14 * DAY);
  const sum = (list, f) => list.reduce((n, e) => n + (e[f] || 0), 0);
  const pct = (list) => (sum(list, 'n') ? Math.round((100 * sum(list, 'f')) / sum(list, 'n')) : null);

  const bySubject = {};
  for (const e of inWeek) { const s = unitInfo(prof, e.k).subject; bySubject[s] = (bySubject[s] || 0) + 1; }

  const byUnit = {};
  for (const e of recent) {
    const { title } = unitInfo(prof, e.k);
    const u = (byUnit[title] = byUnit[title] || { title, rounds: 0, f: 0, n: 0 });
    u.rounds += 1; u.f += e.f; u.n += e.n;
  }
  const rated = Object.values(byUnit).filter((u) => u.rounds >= 2 && u.n).map((u) => ({ ...u, pct: Math.round((100 * u.f) / u.n) }));
  const going = rated.filter((u) => u.pct >= 80).sort((a, b) => b.pct - a.pct).slice(0, 3);
  const practice = rated.filter((u) => u.pct < 70).sort((a, b) => a.pct - b.pct).slice(0, 3);

  return {
    name: prof.name, grade: prof.grade,
    rounds: inWeek.length,
    days: new Set(inWeek.map((e) => new Date(e.t).toDateString())).size,
    minutes: Math.round(sum(inWeek, 'ms') / 60000),
    firstTry: pct(inWeek),
    bySubject: Object.entries(bySubject).sort((a, b) => b[1] - a[1]),
    going, practice,
    tricky: (store.profileData(prof.id).tricky || []).length,
  };
}

/** Plain text for pasting into a note or message. */
export function summaryText(summaries, now = Date.now()) {
  const fmt = (t) => new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const lines = [`Weekly review summary (${fmt(now - 6 * DAY)} – ${fmt(now)})`, ''];
  for (const s of summaries) {
    if (!s.rounds) { lines.push(`${s.name} (Grade ${s.grade}): no rounds played this week.`, ''); continue; }
    lines.push(`${s.name} (Grade ${s.grade}): ${s.rounds} rounds on ${s.days} ${s.days === 1 ? 'day' : 'days'}, about ${s.minutes} min, ${s.firstTry}% right on the first try.`);
    if (s.bySubject.length) lines.push(`  Practised: ${s.bySubject.map(([n, c]) => `${n} (${c})`).join(', ')}`);
    if (s.going.length) lines.push(`  Going well: ${s.going.map((u) => `${u.title} (${u.pct}%)`).join(', ')}`);
    if (s.practice.length) lines.push(`  Could use practice: ${s.practice.map((u) => `${u.title} (${u.pct}%)`).join(', ')}`);
    if (s.tricky) lines.push(`  Tricky questions waiting: ${s.tricky}`);
    lines.push('');
  }
  return lines.join('\n').trim();
}
