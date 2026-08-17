# Rafael's WSU ME Transfer Tracker

Tracks progress toward the **BS Mechanical Engineering at Wichita State** (128 credit hours, 2026–27 catalog). Works on phone and laptop. No build step, no server — plain HTML, CSS and JS.

---

## Pages

| File | What's on it |
|---|---|
| `index.html` | Landing page — progress ring, next semester, requirement bars, key numbers |
| `courses.html` | Course tracker, add-a-class form, and the credits that don't count |
| `planner.html` | Editable semester-by-semester plan through graduation |
| `checklist.html` | FAFSA / scholarship / advising deadlines by term, plus contacts |
| `data.js` | **All your data.** Edit this to change anything permanently. |
| `app.js` | Shared logic — progress math, state, plan helpers |
| `style.css` | Shared styles |

Every page has the same nav bar. State is shared across pages (same local storage key), so checking a class off on Courses updates the ring on Overview.

---

## How the percentage works

**Requirement-based, not credit-based.** An early version did `all credits ever earned ÷ 128` and reported ~55%, which disagreed with WSU's transfer portal. WSU only counts a credit once it **fills a specific degree requirement**:

```
progress = Σ (credits filling each requirement bucket, capped at that bucket) ÷ 128
```

| Bucket | Required | Filled |
|---|---|---|
| English & Communication | 9 | 9 ✓ |
| General Education Electives | 23 | 23 ✓ |
| Engineering Math & Natural Sciences | 30 | 13 |
| Engineering Core (ME) | 48 | 3 |
| Technical Electives | 18 | 0 |
| **Total** | **128** | **48 → 38%** |

Toggle in the header:

- **Incl. in progress — 38%.** Counts MA 253 Calc III. Matches WSU's portal.
- **Confirmed only — 35%.** Graded credits only.

### Where the other 23 credits went

You've earned **68 credits**. Only **45** fill a BSME requirement. The other 23 — IT 100.1 ×3 (12), GN 100.1 ×2 (6), BA 110 (3), HP 190 Fitness for Life (2) — are accepted by WSU but fill nothing in this degree. Your CATIA and Blueprint Reading work is inside that IT 100.1 block; Butler flattened it into generic technology elective credit. Listed on the Courses page.

### Requirement credits vs. classes to enroll in

Two different numbers, both shown:

- **80 requirement credits remain** (128 − 48) — what the percentage tracks.
- **~95 credits of classes are in the plan** — what you'll actually sit through.

The gap is real. WSU's plan lets some courses satisfy two things at once, and several Butler courses run heavier than their WSU equivalents (PH 252 is 5 vs. PHYS 314's 4; the graphics pair is 6 vs. 3). Buckets cap at their requirement, so surplus credit fills the bar and stops counting.

---

## Credit hours — all verified

Checked against WSU's 2026–27 catalog course lists, the ME advising check sheet, Butler's official course outlines (`documents.butlercc.edu`), and the WSU 2026–27 Butler engineering transfer guide.

### Corrections found

| Item | Was | Now | Why |
|---|---|---|---|
| **EN 102 Engineering Graphics 2** | unknown / 0 / 1 | **3 credits, still needed** | Butler's official outline states 3 credit hours. It is **not on your Butler transcript**, so you still need to take it. |
| **CHEM 211 General Chemistry I** | 3 | **5** | Catalog reads "CHEM 211. General Chemistry I (5)" — the lab (CHEM 211L) is a corequisite bundled into those 5 hours, not a separate course. |
| **Open Technical Elective** | 4 | **3** | The catalog PDF renders "43" — that's footnote 4 followed by 3 hours. Technical electives total **18**, not 15. |
| **PH 251 / PH 252** | 4 + separate 1-cr lab | **5 each, lab built in** | Butler's outlines specify 3 hrs lecture + 3 hrs lab per week in a single 5-credit course. There is no separate lab section to register for. |
| **CH 110 College Chemistry I** | — | **5, lab included** | Single course, no separate CH 110L. |
| **Fitness for Life** | FW 190 | **HP 190** | Butler has no FW 190. Credits (2) were right; only the prefix was wrong. Older transcripts show the legacy code. |
| **BS 160 General Psychology** | BS 160 | **PY 160** | Renumbered by Butler. Same course, same 3 credits. |

### Verified correct, no change

All WSU ME core courses (AE 223, AE 333, ECE 282, IME 222 + 222L, ME 250/251/325/335/339/398/439/475/521/522/533/633/659/662, PHIL 385), all WSU math (MATH 242, 243, 344, 555), PHYS 313/314/315, and every Butler course on your transcript.

**PHYS 316 University Physics Lab II exists but is NOT required** for the BSME — PHYS 314 is taken without a lab.

### Butler courses for the ME path

From the official transfer guide: **CH 110, MA 151, MA 152, MA 253, MA 260, PH 251, PH 252, EN 101, EN 102, EN 260 Statics, PL 292 Engineering Ethics.**

EN 260 and PL 292 are the two worth noticing — both transfer (to AE 223 and PHIL 385) and both cost far less at Butler than at WSU. PL 292 has no prerequisites.

---

## Your plan to finish

**At Butler (30 credits):**

```
Fall 2026    MA 253 Calc III                       3 cr   ← now
Spring 2027  PH 251 Physics 1, PL 292 Ethics       8 cr
Summer 2027  MA 260 Differential Equations         3 cr
Fall 2027    PH 252 Physics 2, EN 260 Statics      8 cr
Spring 2028  CH 110 Chemistry, EN 102 Graphics 2   8 cr  · apply to WSU
```

**At WSU (65 credits),** Fall 2028 through Spring 2033 at 6–7 credits per term, ending with ME 662 Senior Capstone.

If an advisor lets CH 106 substitute for CH 110, Spring 2028 drops to 3 credits and everything downstream can pull forward.

---

## Using the site

**Moving a class along** — tap its box on the Courses page:

```
☐ Still needed  →  🟡 Taking it now  →  ✅ Completed  →  ☐ back to start
```

**Adding a class** — the *+ Add a class* button on Courses. Pick which requirement it fills, or "Fills no requirement" for something an advisor says won't apply.

**Planning** — on the Planner page: **← →** move a class between semesters, **✕** drops it to Unplanned, the dropdown adds one in, click a semester name to rename it. Load pills flag *light* (≤4), *sustainable* (5–8), *heavy* (9–11), *too much part-time* (12+). **Reset plan** restores the seed in `data.js`.

---

## Viewing on your phone / sharing

GitHub Pages hosts this free:

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch** → `main` → `/ (root)` → **Save**
3. About a minute later: `https://fallen-master.github.io/wsu-me-tracker/`

On iPhone, Safari → Share → **Add to Home Screen** for an icon and fullscreen. Android: Chrome menu → **Add to Home screen**.

### Limitations worth knowing

**Nothing syncs.** Check-offs, added classes and planner edits live in *that browser's* local storage. Your laptop and phone keep separate copies, and anyone you share the link with sees only what's committed in `data.js`. To change what everyone sees, edit `data.js` and push.

**Caching.** If a change doesn't appear, hard-refresh (Ctrl+Shift+R). The `?v=` on the script and stylesheet tags exists for this — **bump it in all four HTML files whenever you change `data.js`, `app.js` or `style.css`.**

**Privacy.** A public repo means the Pages URL exposes your name, GPA, full course history and advisor contacts to anyone who finds it. Private repos still serve Pages on personal accounts.

---

## Editing `data.js`

```js
{id:"ph251", bucket:"mathsci", status:"needed", applies:true,
 code:"PH 251", title:"Physics 1", wsu:"PHYS 313 + PHYS 315 lab (5 cr)",
 credits:5, prio:"high", verify:true, notes:"…"}
```

- `bucket` — `englcomm` | `gened` | `mathsci` | `engcore` | `techelec`
- `status` — `completed` | `progress` | `needed`
- `applies` — `true` fills a requirement; `false` is earned credit that counts for nothing
- `wsu` — the WSU equivalent, shown in blue
- `prio` — `high` | `med` | `low`; `verify: true` adds a "Verify w/ advisor" tag

**Invariants:** the five bucket `req` values must sum to `totalCredits` (128), and every id in `planSeed` must exist in `courses`.

---

## Open questions for your advisor

1. **CH 106 vs CH 110 — ask first.** WSU applied CH 106 to the gen-ed science bucket; the engineering guide requires CH 110 for ME. If CH 106 substitutes, you drop a 5-credit class.
2. **EN 102.** Butler lists it at 3 credits and it's not on your transcript, but WSU's portal reports the EN 101 / EN 102 pair as 4 credits transferred. Something doesn't line up — confirm whether you still need it.
3. **Gen Ed.** Transcript says *KS Systemwide GE Completed* — confirm that closes buckets 3–7.
4. **Engineering+.** 3 of 7 activities, chair approval, 0 credits, still required to graduate.
5. **MA 260.** Confirm it's the right Differential Equations course for the ME track.

---

## Sources

- [WSU Catalog — BS in Mechanical Engineering](https://catalog.wichita.edu/undergraduate/engineering/mechanical-engineering/mechanical-engineering-bs/)
- [WSU ME Advising Check Sheet](https://www.wichita.edu/academics/engineering/advising/_documents/ME-UG-Check-Sheet_FA24_PLAN_A.pdf)
- [WSU 2026–27 Butler CC Engineering Transfer Guide](https://www.wichita.edu/admissions/transferguide/butler/guides/ENGR_2026-27_ButlerCC.pdf)
- WSU catalog course lists: [ME](https://catalog.wichita.edu/undergraduate/courses/me/me.pdf) · [AE](https://catalog.wichita.edu/undergraduate/courses/ae/ae.pdf) · [ECE](https://catalog.wichita.edu/undergraduate/courses/ece/ece.pdf) · [IME](https://catalog.wichita.edu/undergraduate/courses/ime/ime.pdf) · [MATH](https://catalog.wichita.edu/undergraduate/courses/math/math.pdf) · [PHYS](https://catalog.wichita.edu/undergraduate/courses/phys/phys.pdf) · [CHEM](https://catalog.wichita.edu/undergraduate/courses/chem/chem.pdf) · [PHIL](https://catalog.wichita.edu/undergraduate/courses/phil/phil.pdf)
- Butler official course outlines at `documents.butlercc.edu` — [EN 102](https://documents.butlercc.edu/outline/STEM/EN_Eng%20Technology%20and%20Math/022223%20New%20Div%20Title%20FA23/EN102NFoutline202480.pdf), [EN 260](https://documents.butlercc.edu/outline/STEM/EN_Eng%20Technology%20and%20Math/022223%20New%20Div%20Title%20FA23/EN260NFoutline202380.pdf), [PH 251](https://documents.butlercc.edu/outline/STEM/PH_Physics/022323%20New%20Div%20Title%20FA23/PH251NFoutline202380.pdf), [CH 110](https://documents.butlercc.edu/outline/STEM/CH_Chemistry/022223%20New%20Div%20Title%20FA23/CH110NFoutline202280.pdf), and others
- Butler CC unofficial transcript — 68 credits earned, overall GPA 3.07
