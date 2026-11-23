// Farrah's subjects (Grade 3).
import multiply from './units/g3/math/multiply.js';
import divide from './units/g3/math/divide.js';
import addsub from './units/g3/math/addsub.js';
import numbers from './units/g3/math/numbers.js';
import fractions from './units/g3/math/fractions.js';
import money from './units/g3/math/money.js';

export const SUBJECTS_G3 = [
  {
    id: 'math3', name: 'Math', frName: 'Les maths', emoji: '🔢', color: '#ff7a59', bilingual: true,
    units: [multiply, divide, addsub, numbers, fractions, money],
  },
  { id: 'french3', name: 'Français', emoji: '🥐', color: '#3d7bfd', comingSoon: true, units: [] },
  { id: 'science3', name: 'Science', emoji: '🔬', color: '#2bb5a0', comingSoon: true, units: [] },
  { id: 'social3', name: 'Social Studies', emoji: '🌎', color: '#ffb020', comingSoon: true, units: [] },
];
