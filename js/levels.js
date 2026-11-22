export const LEVELS = [
  { id: 'mild', name: 'Mild', peppers: 1, color: '#2bb5a0' },
  { id: 'medium', name: 'Medium', peppers: 2, color: '#ff9f1a' },
  { id: 'spicy', name: 'Spicy', peppers: 3, color: '#ef3b4f' },
];

export const levelById = (id) => LEVELS.find((l) => l.id === id) || LEVELS[0];
export const peppers = (n) => '🌶️'.repeat(n);

export function nextLevel(id) {
  const i = LEVELS.findIndex((l) => l.id === id);
  return LEVELS[i + 1] || null;
}
export function prevLevel(id) {
  const i = LEVELS.findIndex((l) => l.id === id);
  return i > 0 ? LEVELS[i - 1] : null;
}
