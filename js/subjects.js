// The list of subjects and their games. To add a game, write a unit file and add it here.
import adding from './units/math/adding.js';
import subtracting from './units/math/subtracting.js';
import skipcount from './units/math/skipcount.js';
import shapes2d from './units/math/shapes2d.js';
import shapes3d from './units/math/shapes3d.js';

export const SUBJECTS = [
  {
    id: 'math', name: 'Math', emoji: '🔢', color: '#ff7a59',
    units: [adding, subtracting, skipcount, shapes2d, shapes3d],
  },
  { id: 'french', name: 'Français', emoji: '🥐', color: '#3d7bfd', comingSoon: true, units: [] },
  { id: 'science', name: 'Science', emoji: '🔬', color: '#2bb5a0', comingSoon: true, units: [] },
  { id: 'social', name: 'Social Studies', emoji: '🌎', color: '#ffb020', comingSoon: true, units: [] },
];

export const findSubject = (id) => SUBJECTS.find((s) => s.id === id);
export const findUnit = (subjectId, unitId) => findSubject(subjectId)?.units.find((u) => u.id === unitId);
