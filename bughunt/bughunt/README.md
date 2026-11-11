# 🐞 BUG_HUNT — OSCode CIT induction game

Students scan a QR code, pick a name and a language (Python / C / Mixed), and have **60 seconds** to tap the buggy line in as many short programs as they can. Scores go to a live leaderboard on the projector. Highest score wins the chocolate. 🍫

```
bughunt/
├── index.html          ← the game (opens on phones)
├── board.html          ← the projector screen (QR code + live top 10)
├── config.js           ← ⭐ the ONLY file you need to edit
├── questions.js        ← all the buggy code questions (add your own!)
├── api.js, fx.js, theme.css   ← internals, no need to touch
└── supabase-setup.sql  ← paste into Supabase once
```

---

## 0. Try it right now (2 minutes, no accounts)

With `config.js` left empty, it runs in **DEMO MODE**: scores are saved only in your own browser.

1. Open `board.html` in Chrome.
2. Open `index.html` in another tab and play a round.
3. Switch back. Your score appears on the board.

(If the browser blocks it when opened as a file, run `npx serve .` inside the folder and open the link it prints.)

---

## 1. Set up the score database (Supabase, ~5 min, free)

Use your friend's account.

1. Go to **supabase.com** → sign in → **New project** (any name, e.g. `bughunt`; pick region **Mumbai / ap-south-1**; set any DB password).
2. Wait ~1 minute for it to start.
3. Left menu → **SQL Editor** → **New query** → paste everything from `supabase-setup.sql` → **Run**. You should see "Success".
4. Left menu → **Project Settings → API** (or **Connect**). Copy:
   - **Project URL** (looks like `https://abcd1234.supabase.co`)
   - **anon public** key (or the **publishable** key, `sb_publishable_…`). This key is meant to be public, so it's fine in the website.
   - ❌ Never use the `service_role` / secret key.
5. Paste both into `config.js`:

```js
SUPABASE_URL: "https://abcd1234.supabase.co",
SUPABASE_ANON_KEY: "eyJhbGciOi....",
```

Test again locally: the "DEMO MODE" badge disappears and the board pill says **● LIVE**.

---

## 2. Put it online (Vercel, ~5 min, free)

Use your friend's Vercel account. Pick **one** way.

**A) Vercel CLI (fastest)**
```bash
npm i -g vercel
cd bughunt
vercel login      # log in with your friend's account
vercel --prod     # accept the defaults; "no build command", output dir = .
```
It prints a link like `https://bughunt-xyz.vercel.app`.

**B) GitHub → Vercel**
Push the `bughunt` folder to a GitHub repo → vercel.com → **Add New → Project** → import the repo → Framework: **Other** → Deploy.

**C) Backup option, no CLI:** go to **app.netlify.com/drop** and drag the `bughunt` folder in. You get a link in 10 seconds.

Your links:
- **Game:** `https://your-site.vercel.app/`
- **Projector:** `https://your-site.vercel.app/board.html`

The QR code on the board automatically points to your site. You can set a custom URL with `GAME_URL` in `config.js` if needed.

---

## 3. Event day checklist ✅

- [ ] Tonight: play 2–3 rounds on your phone **on mobile data** (not Wi-Fi) to confirm it works for everyone.
- [ ] Before starting: Supabase → SQL Editor → run `delete from public.scores;` to clear the test scores.
- [ ] Open `…/board.html` on the projector laptop → press **F** for full screen.
- [ ] Keep the laptop plugged in and sleep disabled.
- [ ] Announce: "Scan, play 60 seconds, highest score at the end wins chocolate. You can play again; only your best counts."
- [ ] At the end, take a photo of the board, then call #1 up. 🍫

**Keyboard on the board:** `F` = full screen · `R` = clear scores (demo mode only)

---

## Rules (how scoring works)

| Action | Result |
|---|---|
| Tap the correct buggy line | **+10** points |
| 3 correct in a row | **1.5×** points (15) |
| 5+ correct in a row | **2×** points (20) |
| Wrong tap | **−3 seconds**, streak reset, the correct answer is shown |
| Skip | No penalty, streak reset |

The timer pauses while the answer is shown, so players learn something without losing time. Each phone keeps its own **personal best**, and the board shows each player's **best** score only.

---

## Adding / changing questions

Open `questions.js`. Each question looks like:

```js
{ code: ['a = 10', 'print(a'], bug: 1, fix: 'Missing closing bracket )' },
```

- `code` = the lines shown
- `bug` = which line is wrong, **counting from 0** (first line = 0)
- `fix` = the short explanation shown after answering

Make sure only **one** line is clearly wrong.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Board says **RECONNECTING** | Check the URL/key in `config.js`, and that you ran the SQL. |
| Phone says "couldn't reach the leaderboard" | Weak network. They can tap **retry upload**. |
| QR missing on board | The projector laptop needs internet (the QR library loads from a CDN). |
| Someone used a rude name | Supabase → Table Editor → `scores` → delete that row. |
| Changed `config.js` but nothing changed | Redeploy (`vercel --prod`) and hard-refresh the page. |
