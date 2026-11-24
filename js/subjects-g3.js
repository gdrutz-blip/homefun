// Farrah's subjects (Grade 3).
import multiply from './units/g3/math/multiply.js';
import divide from './units/g3/math/divide.js';
import addsub from './units/g3/math/addsub.js';
import numbers from './units/g3/math/numbers.js';
import fractions from './units/g3/math/fractions.js';
import money from './units/g3/math/money.js';
import perimeter from './units/g3/math/perimeter.js';
import kitchen from './units/g3/math/kitchen.js';
import time3 from './units/g3/math/time3.js';
import data3 from './units/g3/math/data3.js';
import plants from './units/g3/science/plants.js';
import forces from './units/g3/science/forces.js';
import structures from './units/g3/science/structures.js';
import soils from './units/g3/science/soils.js';
import magnets from './units/g3/science/magnets.js';
import rocks from './units/g3/science/rocks.js';
import provinces from './units/g3/social/provinces.js';
import community from './units/g3/social/community.js';
import ontario from './units/g3/social/ontario.js';
import longago from './units/g3/social/longago.js';
import danse from './units/g3/french/danse.js';
import journal from './units/g3/french/journal.js';
import cuisine from './units/g3/french/cuisine.js';
import histoires from './units/g3/french/histoires.js';
import echo3 from './units/g3/french/echo-farrah.js';

export const SUBJECTS_G3 = [
  {
    id: 'math3', name: 'Math', frName: 'Les maths', emoji: '🔢', color: '#ff7a59', bilingual: true,
    units: [multiply, divide, addsub, numbers, fractions, money, perimeter, kitchen, time3, data3],
  },
  // Always in French (it's French practice!).
  { id: 'french3', name: 'Français', frName: 'Français', emoji: '🥐', color: '#3d7bfd', forceLang: 'fr', units: [danse, journal, cuisine, histoires, echo3] },
  { id: 'science3', name: 'Science', frName: 'Les sciences', emoji: '🔬', color: '#2bb5a0', bilingual: true, units: [plants, forces, structures, soils, magnets, rocks] },
  { id: 'social3', name: 'Social Studies', frName: 'Études sociales', emoji: '🌎', color: '#ffb020', bilingual: true, units: [ontario, longago, provinces, community] },
];
