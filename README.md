# Rafael's WSU ME Transfer Tracker

A single-page tracker for the **BS Mechanical Engineering at Wichita State** (128 credit hours, 2026–27 catalog). Works on phone and laptop. No build step, no server — just `index.html` + `data.js`.

---

## How the percentage works (read this once)

**The percentage is requirement-based, not credit-based.**

The old version did `all credits I ever earned ÷ 128` and reported ~55%. That's the wrong math, and it's why the site disagreed with WSU's transfer portal.

WSU only counts a credit once it **fills a specific degree requirement**. The tracker now does the same thing:

```
progress = Σ (credits filling each requirement bucket, capped at that bucket)  ÷  128
```

The five buckets add up to exactly 128 with no double-counting:

| Bucket | Required | Currently filled |
|---|---|---|
| English & Communication | 9 | 9 ✓ |
| General Education Electives | 18 | 18 ✓ |
| Engineering Math & Natural Sciences | 30 | 18 |
| Engineering Core (ME) | 56 | 3 |
| Technical Electives | 15 | 0 |
| **Total** | **128** | **48** |

**48 ÷ 128 = 38%** — matches the WSU transfer portal exactly.

Two numbers are available via the toggle in the header:

- **Incl. in progress — 38%.** Counts MA 253 Calc III, which you're taking now. This is what WSU's portal shows.
- **Confirmed only — 35%.** Finished and graded credits only.

### Where the missing 20 points went

You've earned **68 credits total**. Only **45** of them fill a BSME requirement. The other **23** are real, accepted credits that fill nothing in this degree:

- IT 100.1 ×3 (12 cr) — WSU Tech technology electives, where the CATIA and Blueprint Reading work landed
- GN 100.1 ×2 (6 cr) — WSU Tech general electives
- BA 110 Intro to Business (3 cr) — counts toward the Business Administration AS, not the BSME
- FW 190 Fitness for Life (2 cr) — no PE requirement in the BSME

They're listed on the page under **"Earned — but doesn't count toward this degree."** They help your GPA and your full-time status. They don't move the degree bar.

---

## Adding classes yourself

Use the **+ Add a class** button in the Course Tracker. You do not need to edit any file or ask Claude.

Fill in the code, title, credits, pick **which requirement it fills**, and set the status. The percentage and the bucket bars update immediately.

- Picking a requirement bucket → the credits count toward the degree.
- Picking **"Fills no requirement"** → the credits are recorded as earned but don't move the percentage. Use this for anything an advisor tells you won't apply.
- Classes you add show an **"added by you"** tag and can be removed with the ✕.

Anything you add — and every check-off — saves in that browser's local storage. It's per-device: adding a class on your phone won't show up on your laptop. To make a change permanent across devices, edit `data.js` and commit.

## Moving a class through its stages

Tap the box on any course. Each tap advances it one stage and loops back around:

```
☐ Still needed  →  🟡 Taking it now  →  ✅ Completed  →  ☐ Still needed
```

- **Still needed** (empty box) — doesn't count toward the percentage.
- **Taking it now** (gold) — counts in the "Incl. in progress" number, not in "Confirmed only". This is exactly how MA 253 Calc III is treated, and it's the 3 credits separating 35% from 38%.
- **Completed** (green) — counts in both.

Tapped one time too many? Keep tapping — it comes back around. The course also moves between the Still Needed / In Progress / Completed tabs as you go, and the bucket bar for its requirement updates at the same time.

---

## Semester Planner

Every remaining credit starts out already assigned to a semester — Fall 2026 through Spring 2033, paced at ~6–8 credits per term. You edit it in place:

- **← →** move a class to the previous or next semester
- **✕** drops it back to **Unplanned** (nothing is lost — it reappears in the pool at the bottom)
- **+ Add a class to…** dropdown puts an unplanned class into that semester
- Click the **semester name or note** to rename it
- **+ Add semester** / **Delete semester** to change the shape of the plan
- **Reset plan to the original** restores the seed in `data.js`

Each term shows a credit-load pill — *light* (≤4), *sustainable* (5–8), *heavy* (9–11), *too much part-time* (12+). The banner at the top projects your graduation term from the last semester that still has unfinished work, and warns if any class isn't placed anywhere.

Completing a class strikes it through in the plan and removes its credits from that term's load, so the plan thins out as you go.

The starting plan lives in `DATA.planSeed` in `data.js`. Your edits are saved on your device and override it.

## Viewing on your phone / sharing it

The repo is a plain static site, so **GitHub Pages** will host it free:

1. Go to the repo → **Settings** → **Pages**
2. Under *Source*, pick **Deploy from a branch** → branch `main`, folder `/ (root)` → **Save**
3. Wait ~1 minute. Your URL: `https://fallen-master.github.io/wsu-me-tracker/`

That link works on any phone or computer, and it's the link to share.

On iPhone, open it in Safari → Share → **Add to Home Screen**. It gets an icon and opens fullscreen like an app. Android: Chrome menu → **Add to Home screen**.

### Important limitation when sharing

Check-offs, added classes, and planner edits are stored in **that browser's** local storage. They do **not** sync.

- Your laptop and your phone keep separate copies.
- Anyone you share the link with sees whatever is committed in `data.js` — not your personal edits.

So to make a change everyone sees, edit `data.js` and push. The on-site editing is your fast scratch layer; `data.js` is the shared source of truth.

**If the repo is public,** anyone with the URL can see your name, GPA, full course history, and your advisors' contact info. Making the repo **private** still allows GitHub Pages on a personal account, and the Pages URL stays shareable — worth considering.

## Files

- **`index.html`** — layout, styling, and all rendering logic. You shouldn't need to touch this.
- **`data.js`** — every course, requirement bucket, roadmap term, and checklist item. Edit this to bake a change into the repo permanently.
- **`README.md`** — this file.

### Editing `data.js`

Each course looks like:

```js
{id:"ph251", bucket:"mathsci", status:"needed", applies:true,
 code:"PH 251", title:"Physics I (Scientists)", wsu:"PHYS 313 Physics for Scientists I",
 credits:4, prio:"high", notes:"Gates Statics, Physics II, and most of the ME core."}
```

- `bucket` — which requirement it fills (`englcomm`, `gened`, `mathsci`, `engcore`, `techelec`)
- `status` — `"completed"` | `"progress"` | `"needed"`
- `applies` — `true` if it fills a requirement, `false` if it's earned credit that counts for nothing
- `wsu` — the WSU course it transfers in as (optional, shown in blue)
- `prio` — `"high"` | `"med"` | `"low"` (only meaningful on `needed` courses)
- `verify: true` — adds a "Verify w/ advisor" tag

If you change a bucket's `req`, make sure all five still sum to `totalCredits` (128), or the percentage will be wrong.

---

## Open questions for your advisor

These are flagged on the site and in the Fall 2026 checklist:

1. **CH 106 → CHEM 211.** WSU's portal already applied it to the science requirement. Get it confirmed in writing.
2. **EN 102.** WSU's portal shows 4 graphics credits; your Butler transcript has 3. Ask whether EN 101 alone satisfies IME 222 + 222L.
3. **Gen Ed.** Your transcript says *KS Systemwide GE Completed* — confirm that closes the gen-ed bucket entirely.
4. **Engineering+ requirement.** 3 of 7 activities, chair approval, 0 credits — but still required to graduate.

---

## Sources

- [WSU Catalog — BS in Mechanical Engineering](https://catalog.wichita.edu/undergraduate/engineering/mechanical-engineering/mechanical-engineering-bs/)
- [WSU ME Undergraduate Check Sheet](https://www.wichita.edu/academics/engineering/advising/_documents/ME-UG-Check-Sheet_FA24_PLAN_A.pdf)
- WSU Transfer Major Detail portal export (Mechanical Engineering) — 49 credits apply, 25 may apply, 38%
- Butler CC unofficial transcript — 68 credits earned, overall GPA 3.07
