# HACT — Human Adversarial Cognitive Tactics

An **ATT&CK-style knowledge base for social engineering**, built from the book
*HACT — Lutter contre l'ingénierie sociale* by Aurélien T. (v2, July 2026).

The site presents the full HACT matrix — **13 tactics (TA-H001 → TA-H013)** and
**57 techniques (TH-xxxx)** — with, for each: the MITRE ATT&CK® equivalent, the
adversary objective, severity / detection / frequency scoring, Indicators of
HUMINT Operation (IoH), and countermeasures. It also covers the CVE→HVE mapping,
the rule of three IoH, AI-augmented threats (voice cloning, deepfake video,
LLM elicitation, AI fake profiles), documented real-world cases, the five
emergency reflexes, the maturity model, and GDPR/NIS2 compliance mapping.

It is a **single static site** — no build step, no dependencies. Open
`index.html` locally, or publish it with GitHub Pages.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `styles.css` | ATT&CK-inspired styling |
| `data.js`    | All HACT data (tactics, techniques, IoH, cases, compliance…) |
| `app.js`     | Matrix rendering, search, detail modals, deep-links |
| `.nojekyll`  | Tells GitHub Pages to serve files as-is |

## Publish on GitHub Pages

### Option A — Web upload (no command line)
1. Create (or open) a repository on github.com.
2. Click **Add file → Upload files**, drag in every file from this folder
   (keep the `.nojekyll` file), then **Commit changes**.
3. Go to **Settings → Pages**, set **Source = Deploy from a branch**,
   branch **main** / folder **/ (root)**, **Save**.
4. Your site appears at `https://<username>.github.io/<repo>/` within a minute.

### Option B — Git command line
```bash
cd hact-attack
git init
git add .
git commit -m "HACT ATT&CK-style matrix"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
# then enable Pages in Settings → Pages (branch: main, folder: /root)
```

## Deep links

You can link directly to a tactic or technique via the URL hash, e.g.
`index.html#TA-H006` (tactic) or `index.html#TH-6005` (technique).

## Disclaimer

HACT is an independent conceptual adaptation inspired by the structure of
MITRE ATT&CK®. It is **not affiliated with, endorsed by, or sponsored by**
The MITRE Corporation. MITRE ATT&CK® is a registered trademark of
The MITRE Corporation. Published for educational and defensive purposes only.
