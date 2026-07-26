# Rafael's WSU Mechanical Engineering Transfer Tracker

A calm, phone-friendly dashboard to track progress transferring from **Butler
Community College** to **Wichita State University** for a **BS in Mechanical
Engineering**. No accounts, no backend — just a web page you can pull up anytime.

**Live site:** `https://<your-username>.github.io/wsu-me-tracker/`

---

## What's in here

| File | What it is |
|------|------------|
| `index.html` | The page itself (layout + styling). You rarely touch this. |
| `data.js` | **All your data** — courses, GPA, aid, tasks. This is the one file you edit. |
| `README.md` | This file. |
| `.gitignore` | Tells git to ignore junk files. |

---

## How to update a course (the thing you'll do most)

Two ways:

**Easy way (just for you, on your device):** open the site and **tap a course**
in *Still Needed* or *In Progress*. It fills in green, the progress ring goes up,
and it's remembered on that phone/laptop. Nothing to commit.

**Permanent way (shows up everywhere):** edit `data.js`.

1. Open `data.js`.
2. Find the course, e.g.:
   ```js
   {id:"ph251", status:"needed", code:"PH 251", title:"Physics I + Lab", credits:5, prio:"high", ...}
   ```
3. Change `status:"needed"` to `status:"completed"` and add a grade + term:
   ```js
   {id:"ph251", status:"completed", code:"PH 251", title:"Physics I + Lab", credits:5, grade:"A", term:"Sp 2027"}
   ```
4. Save, then push (below). The site updates in about a minute.

Your **overall progress and credit count update automatically** from whatever is
marked completed.

---

## How to push changes to GitHub

If you have the repo on your computer:

```bash
cd wsu-me-tracker
git add .
git commit -m "Completed Physics I"
git push
```

Or edit `data.js` right in the GitHub website (pencil icon → edit → **Commit
changes**). Either way, GitHub Pages rebuilds automatically in ~1 minute.

---

## How to enable GitHub Pages (one-time setup)

1. Push these files to a GitHub repo named `wsu-me-tracker`.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set **Branch: `main`** and **Folder: `/ (root)`**. Click **Save**.
5. Wait ~1 minute. Your site is live at
   `https://<your-username>.github.io/wsu-me-tracker/`.

Bookmark it on your phone's home screen and you're done.

---

## Quick reference — the numbers

- **129** total credits for the WSU BS Mechanical Engineering
- **68** credits earned so far (~53%)
- **~64** transfer to WSU = **junior standing**
- **3.07** overall GPA (WSU needs 2.0 to transfer ✅)
- KS Systemwide General Education: **complete**

Built to feel like progress, not overwhelm. Keep going. 🚀
