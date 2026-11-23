// The list of subjects and their games. To add a game, write a unit file and add it here.
import adding from './units/math/adding.js';
import subtracting from './units/math/subtracting.js';
import skipcount from './units/math/skipcount.js';
import shapes2d from './units/math/shapes2d.js';
import shapes3d from './units/math/shapes3d.js';
import money2 from './units/math/money2.js';
import numbers200 from './units/math/numbers200.js';
import fractions2 from './units/math/fractions2.js';
import animals from './units/science/animals.js';
import matter from './units/science/matter.js';
import map from './units/social/map.js';
import traditions from './units/social/traditions.js';
import mots from './units/french/mots.js';
import nombres from './units/french/nombres.js';

export const SUBJECTS = [
  {
    id: 'math', name: 'Math', frName: 'Les maths', emoji: '🔢', color: '#ff7a59', bilingual: true,
    units: [adding, subtracting, numbers200, skipcount, money2, fractions2, shapes2d, shapes3d],
  },
  // Always in French (it's French practice!).
  { id: 'french', name: 'Français', frName: 'Français', emoji: '🥐', color: '#3d7bfd', forceLang: 'fr', units: [mots, nombres] },
  { id: 'science', name: 'Science', frName: 'Les sciences', emoji: '🔬', color: '#2bb5a0', bilingual: true, units: [animals, matter] },
  { id: 'social', name: 'Social Studies', frName: 'Études sociales', emoji: '🌎', color: '#ffb020', bilingual: true, units: [map, traditions] },
];

export const findSubject = (id) => SUBJECTS.find((s) => s.id === id);
export const findUnit = (subjectId, unitId) => findSubject(subjectId)?.units.find((u) => u.id === unitId);
