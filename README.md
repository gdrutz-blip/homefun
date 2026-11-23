# Mia's Grade 2 Review 🍦🎸🤸‍♀️🧙‍♀️

Fun review games for an Ontario Grade 2 student (French Immersion). They're built for a phone (Pixel/Chrome) and run as a plain website with no build step, no accounts and no tracking.

## What's in it

| Game | Skill | 🌶️ Mild | 🌶️🌶️ Medium | 🌶️🌶️🌶️ Spicy |
|---|---|---|---|---|
| 🍦 Ice Cream Shop | Adding | Sums to 20 with pictures, doubles, make 10 | 2-digit, no regrouping | Regrouping to 100, missing addends, 3 addends |
| 👶 Babysitting Gemma | Subtracting | Within 20 with pictures | 2-digit, no regrouping | Regrouping, "how many more", mystery numbers |
| 🎸 Garage Band | Skip counting & patterns | By 2s, 5s, 10s; AB patterns | Missing numbers, ABC patterns, "count by what?" | Backwards, by 20s/25s, from odd starts, to 200 |
| 🧙‍♀️ Potion Class | 2D shapes | Name the shapes | Sides & vertices, rotated shapes | Riddles, wobbly (irregular) shapes, quadrilaterals |
| 🤸‍♀️ Gymnastics Meet | 3D shapes | Name solids, real-world objects | Roll/stack, faces, face shapes | Edges, vertices, riddles |

**Science**

| Game | Topic | 🌶️ | 🌶️🌶️ | 🌶️🌶️🌶️ |
|---|---|---|---|---|
| 🐣 Gemma's Animal Book | Growth & changes in animals | Baby animal names, eggs vs. born alive | Life cycles, fur/feathers/scales | Herbivore/carnivore/omnivore, animal needs |
| 🍫 Mia's Chocolate Kitchen | Solids & liquids | Solid or liquid? | Melting, freezing, pouring | Sink/float, dissolving |

**Social Studies**

| Game | Topic | 🌶️ | 🌶️🌶️ | 🌶️🌶️🌶️ |
|---|---|---|---|---|
| 🗺️ World Tour | Maps & global communities | N/S/E/W on a grid map | Routes, the 7 continents | Oceans, map legends, equator & poles |
| 🎉 Family Celebrations | Traditions | Match celebrations to symbols | Seasons and months | Family tree words, then & now |

**Français** (always in French)

| Game | Topic | 🌶️ | 🌶️🌶️ | 🌶️🌶️🌶️ |
|---|---|---|---|---|
| 🎮 Super Mots | Vocabulary | Picture ↔ word, colours | un/une, le/la | Odd one out, missing letters |
| 🥞 Le café des crêpes | Numbers | Hear/read 0–20 | 20–69 | 60–100 (soixante-dix, quatre-vingts…) |

How it works:
- **English / Français switch:** at the top of the Math, Science and Social Studies screens (also in ⚙️ Settings). Every game, hint, praise message and the read-aloud voice switches to French. Stars are shared between the two languages.
- **Read-aloud:** the 🔊 button reads any question, hint or menu. Under ⚙️ Settings you can turn on automatic reading and a slower voice. It uses the phone's built-in voice, which works offline.
- **Rounds:** each round has 8 questions. A wrong answer brings up a hint with a picture (base-ten blocks, crossed-out items, numbered corners). A second wrong answer shows her the right one. No timers.
- **Rewards:** she earns 1–3 stars per round and stickers for her Sticker Book.
- **Grown-ups area:** the 🔒 button opens it. The gate question is 7 × 8. It shows stars, first-try %, what each level covers and recent tricky questions.

Progress is saved **on the device** (browser storage). Clearing site data resets it.

## Putting it on her phone

1. Turn on GitHub Pages for this repo: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**. Pick the branch and the `/ (root)` folder, then Save.
2. After a minute the site is live at `https://<your-github-username>.github.io/miagrade2/`.
3. Open that link in Chrome on the Pixel, tap **⋮ → Add to Home screen** (or **Install app**). It now opens full-screen like an app and works offline.

## Trying it on a computer

Any static file server works. For example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Changing names

Edit `js/config.js`.

## Adding a new game or subject

1. Create a unit file such as `js/units/math/money.js`. Copy the shape of an existing one, like `adding.js`. A unit exports `id`, `title`, `skill`, `emoji`, `theme`, `color`, `blurb`, `intro`, `levels` (kid and parent descriptions) and a `makeQuestion(level, index)` function.
2. Add it to `js/subjects.js`. For French, Science or Social Studies, put the units in that subject's `units` list and remove `comingSoon`.
3. Questions are plain objects (documented in `js/units/common.js`). For text that should follow the English/French switch, write `L('English', 'Français')` (from `js/i18n.js`). The read-aloud voice follows the switch automatically.
4. Add the new file to the `CORE` list in `sw.js` so it works offline.

## Files

```
index.html            page shell
css/styles.css        all styling (themes per game)
js/app.js             screens + navigation
js/engine.js          plays a round: questions, hints, stars, stickers
js/speech.js          read-aloud
js/units/math/*.js    the games
js/shapes2d.js        2D shape drawings
js/shapes3d.js        3D shape drawings
js/visuals.js         counting pictures, base-ten blocks, number sequences
sw.js, manifest.json  offline + "install as app"
```
