// The kids who play. Each has her own grade, games, stickers, look and starting settings.
import { SUBJECTS } from './subjects.js';
import { SUBJECTS_G3 } from './subjects-g3.js';
import { STICKERS, STICKERS_FARRAH } from './stickers.js';
import { store } from './storage.js';

export const PROFILES = [
  {
    id: 'mia', name: 'Mia', grade: 2, avatar: '🎸', color: '#7b4dff', look: 'mia',
    subjects: SUBJECTS, stickers: STICKERS,
    defaults: { autoRead: true },
  },
  {
    id: 'farrah', name: 'Farrah', grade: 3, avatar: '🐶', color: '#0f8b8d', look: 'farrah',
    subjects: SUBJECTS_G3, stickers: STICKERS_FARRAH,
    defaults: { autoRead: false },
    // Farrah chooses to turn the voice on herself (Settings → Read out loud). Reset it once if it was on.
    migrations: { voiceOptIn: (settings) => { settings.autoRead = false; } },
  },
];

export const profileById = (id) => PROFILES.find((p) => p.id === id);
export const currentProfile = () => profileById(store.currentId()) || PROFILES[0];
export const findSubject = (id) => currentProfile().subjects.find((s) => s.id === id);
export const findUnit = (subjectId, unitId) => findSubject(subjectId)?.units.find((u) => u.id === unitId);
export function selectProfile(id) {
  const p = profileById(id);
  if (!p) return;
  store.setCurrent(p.id, p.defaults);
  // One-time default changes (keyed so they only run once per profile).
  for (const [key, fn] of Object.entries(p.migrations || {})) store.migrateOnce(p.id, key, fn);
}
