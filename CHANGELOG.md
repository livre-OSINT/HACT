# Changelog — HACT (Human Adversarial Cognitive Tactics)

All notable changes to the HACT framework are recorded here. The framework
follows [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH): a new
MAJOR marks a change that reclassifies tactics/techniques or breaks existing
mappings, MINOR adds techniques, indicators or countermeasures, and PATCH fixes
wording, sources or errata.

MITRE ATT&CK® is a registered trademark of The MITRE Corporation. HACT is an
independent work inspired by the structure of MITRE ATT&CK®; it is not
affiliated with, endorsed by, or sponsored by The MITRE Corporation.
Educational and defensive use only.

---

## [1.0.0] — 2026-07-13

First stable, versioned release of the framework.

### Changed
- **Detection model reworked — weighted IoH score.** The former fixed
  "rule of three IoH" is replaced by a **weighted score**: each observed
  indicator is weighted by diagnostic strength (Critical 3 / High 2 /
  Moderate 1 / Weak 0.5) and accumulated over a 90-day window, with three
  decision bands — Baseline (0–2), Elevated (3–4) and Suspend (≥ 5). This
  fixes the two failure modes of pure counting:
  - a single decisive signal can now trigger action — a **kill-switch** fires
    whenever one Critical indicator isolates or refuses the verification
    channel, whatever the total;
  - correlated signals on the same tactic no longer over-trigger — the
    **diversity rule** scores additional same-tactic indicators at half weight.
  The four weight levels reuse the labels already attached to every
  AI-threat indicator table (Critical / High / Moderate / Weak).
- **Evidence base refreshed to 2024 sources.** Headline statistics now cite:
  - Verizon 2024 Data Breach Investigations Report (17th ed.): 68% of breaches
    involve a non-malicious human element; median 21 s for a user to click a
    phishing link;
  - FBI IC3 2024 Internet Crime Report: a record USD 16.6 billion in reported
    losses (+33% year over year) and USD 2.77 billion in Business Email
    Compromise (BEC) losses.
  Bibliography updated with the 2024 DBIR and the 2024 IC3 report.

### Framework baseline (carried from the pre-1.0 working versions)
- 13 tactics (TA-H001 – TA-H013), each mapped to a MITRE ATT&CK® tactic.
- 57 techniques (TH-xxxx) across the tactics.
- HVE — Human Vulnerabilities & Exploits (the human counterpart of CVE).
- IoH — Indicators of HUMINT Operation (the human counterpart of IoC).
- CM-Hxxx countermeasure catalogue, per-tactic detection scoring, the five
  emergency reflexes, the N1–N5 organizational maturity model, and a
  GDPR / NIS2 regulatory mapping.
- Companion views: matrix, mind map, flowchart, response playbooks, and the
  red-team arsenal by tactic.

---

*Maintained by Aurélien T. · https://livre-osint.github.io/HACT/*
