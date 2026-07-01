/* HACT ATT&CK-style matrix — rendering & interaction */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));

  const sevClass = s => ({ HIGH: "high", MEDIUM: "medium", LOW: "low" }[s] || "ghost");
  const lvlClass = s => { s = (s || "").toLowerCase(); if (s.indexOf("crit") > -1) return "crit"; if (s.indexOf("high") > -1 || s.indexOf("élev") > -1) return "high"; if (s.indexOf("mod") > -1) return "medium"; return "ghost"; };
  const techByTactic = {};
  TACTICS.forEach(t => t.techniques.forEach(th => techByTactic[th.id] = { th, t }));

  /* ---------- Header meta ---------- */
  $("#brand-sub").textContent = HACT_META.longName + " · " + HACT_META.version;

  /* ---------- Stats ---------- */
  const statsBox = $("#stats");
  STATS.forEach(([n, l, s]) => {
    const d = el("div", "stat");
    d.innerHTML = `<b>${esc(n)}</b><span>${esc(l)}</span><i>${esc(s)}</i>`;
    statsBox.appendChild(d);
  });

  /* ---------- Matrix ---------- */
  const totalTech = TACTICS.reduce((a, t) => a + t.techniques.length, 0);
  $("#count-tactics").textContent = TACTICS.length;
  $("#count-tech").textContent = totalTech;

  const thead = $("#matrix thead tr");
  const tbody = $("#matrix tbody tr");
  const maxRows = Math.max(...TACTICS.map(t => t.techniques.length));

  TACTICS.forEach(t => {
    const th = el("th");
    th.innerHTML =
      `<span class="tid">${esc(t.id)} <span class="cnt">${t.techniques.length}</span></span>` +
      `<span class="tname">${esc(t.name)}</span>` +
      `<span class="teq">↔ ${esc(t.attack)}</span>`;
    th.style.cursor = "pointer";
    th.title = "View tactic detail";
    th.addEventListener("click", () => openTactic(t.id));
    thead.appendChild(th);
  });

  TACTICS.forEach(t => {
    const td = el("td");
    for (let i = 0; i < maxRows; i++) {
      const th = t.techniques[i];
      if (!th) { td.appendChild(el("div", "cell dim", "&nbsp;")); continue; }
      const cell = el("div", "cell" + (th.ai ? " ai" : ""));
      cell.dataset.q = (th.id + " " + th.name + " " + th.desc + " " + t.name + " " + t.id).toLowerCase();
      cell.innerHTML =
        `<span class="cid">${esc(th.id)}</span>` +
        `<span class="cname">${esc(th.name)}${th.ai ? '<span class="aitag">AI</span>' : ""}</span>`;
      cell.addEventListener("click", () => openTechnique(th.id));
      td.appendChild(cell);
    }
    tbody.appendChild(td);
  });

  /* ---------- Search filter ---------- */
  const search = $("#search");
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    document.querySelectorAll("#matrix .cell").forEach(c => {
      if (c.classList.contains("dim")) return;
      const hit = !q || c.dataset.q.indexOf(q) > -1;
      c.style.opacity = hit ? "1" : "0.12";
      c.style.pointerEvents = hit ? "auto" : "none";
    });
  });

  /* ---------- Modal ---------- */
  const back = $("#modal-back");
  const modal = $("#modal");
  function open(html) { modal.innerHTML = html; back.classList.add("open"); modal.scrollTop = 0; bindClose(); }
  function close() { back.classList.remove("open"); }
  function bindClose() { const c = $(".close", modal); if (c) c.addEventListener("click", close); }
  back.addEventListener("click", e => { if (e.target === back) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  function aiFor(id) { return AI_THREATS.find(a => a.id === id); }

  function openTechnique(id) {
    const rec = techByTactic[id]; if (!rec) return;
    const { th, t } = rec; const ai = aiFor(id);
    let h = head(th.id, th.name + (th.ai ? ' <span class="aitag">AI</span>' : ""),
      "Tactic: " + t.id + " · " + t.name + "  ↔  " + t.attack);
    h += `<div class="m-body">`;
    h += `<h4>Description</h4><p>${esc(th.desc)}</p>`;
    if (ai) {
      h += `<h4>Threat summary</h4><p>${esc(ai.summary)}</p>`;
      h += `<h4>Specific indicators (IoH)</h4><table class="data"><tr><th>Indicator</th><th>Signal</th><th>Level</th></tr>`;
      ai.ioh.forEach(r => h += `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td><span class="chip ${lvlClass(r[2])}">${esc(r[2])}</span></td></tr>`);
      h += `</table>`;
      h += `<h4>Countermeasure</h4><div class="callout blue">${esc(ai.cm)}</div>`;
    }
    h += `<h4>Parent tactic — scoring</h4>`;
    h += scorebar(t);
    h += `<p style="margin-top:12px"><a href="#" data-open="${t.id}">→ View full tactic ${esc(t.id)} (${esc(t.name)})</a></p>`;
    h += `</div>`;
    open(h);
    const lnk = modal.querySelector('[data-open]');
    if (lnk) lnk.addEventListener("click", e => { e.preventDefault(); openTactic(t.id); });
  }

  function openTactic(id) {
    const t = TACTICS.find(x => x.id === id); if (!t) return;
    let h = head(t.id, t.name, "MITRE ATT&CK® equivalent  ↔  " + t.attack);
    h += `<div class="m-body">`;
    h += `<h4>Adversary objective</h4><p>${esc(t.objective)}</p>`;
    h += `<h4>Scoring</h4>${scorebar(t)}`;
    h += `<h4>Techniques (${t.techniques.length})</h4><ul class="tech-list">`;
    t.techniques.forEach(th => {
      h += `<li class="${th.ai ? "ai" : ""}"><span class="tid">${esc(th.id)}${th.ai ? " · AI" : ""}</span><b>${esc(th.name)}</b><span>${esc(th.desc)}</span></li>`;
    });
    h += `</ul>`;
    h += `<h4>Indicators of HUMINT Operation (IoH)</h4><ul>`;
    t.ioh.forEach(x => h += `<li>${esc(x)}</li>`);
    h += `</ul>`;
    h += `<h4>Priority countermeasures</h4><ul>`;
    t.countermeasures.forEach(x => h += `<li>${esc(x)}</li>`);
    h += `</ul></div>`;
    open(h);
    modal.querySelectorAll(".tech-list li").forEach((li, i) => {
      li.style.cursor = "pointer";
      li.addEventListener("click", () => openTechnique(t.techniques[i].id));
    });
  }

  function head(id, name, eq) {
    return `<div class="m-head"><span class="close">&times;</span>` +
      `<span class="mid">${esc(id)}</span><h3>${name}</h3><span class="eq">${esc(eq)}</span></div>`;
  }
  function scorebar(t) {
    return `<div class="scorebar">` +
      `<div class="sb"><b>Severity</b><span class="chip ${sevClass(t.severity)}">${esc(t.severity)}</span></div>` +
      `<div class="sb"><b>Detection difficulty</b>${esc(t.detection)}</div>` +
      `<div class="sb"><b>Frequency</b>${esc(t.frequency)}</div></div>`;
  }
  window.__openTactic = openTactic;
  window.__openTechnique = openTechnique;

  /* ---------- Reference sections ---------- */
  // Architecture table
  fillTable("#tbl-arch", ["Level", "MITRE ATT&CK® (cyber)", "HACT (human)"], ARCHITECTURE);
  fillTable("#tbl-hve", ["Cyber domain", "HACT human equivalent"], CVE_HVE);
  fillTable("#tbl-scoring", ["Detection score", "Interpretation"], SCORING.detection);
  fillTable("#tbl-targets", ["Profile", "Targeting rate", "Main reason"], TARGETS);
  fillTable("#tbl-maturity", ["Level", "Name", "Characteristics"], MATURITY);
  fillTable("#tbl-reg", ["Tactic", "GDPR", "NIS2"], REGULATORY);
  fillTable("#tbl-sanctions", ["Standard", "Maximum sanctions"], SANCTIONS);

  // PPSE cards
  const ppse = $("#ppse");
  PPSE.forEach(([k, v]) => { const c = el("div", "card acc"); c.innerHTML = `<h3>${esc(k)}</h3><p style="color:var(--muted);font-size:13.5px;margin:0">${esc(v)}</p>`; ppse.appendChild(c); });

  // AI threats cards
  const aibox = $("#ai-threats");
  AI_THREATS.forEach(a => {
    const c = el("div", "card acc");
    c.innerHTML = `<span class="tid">${esc(a.id)}</span><h3>${esc(a.name)} <span class="aitag" style="background:var(--ai)">AI</span></h3>` +
      `<p style="color:var(--muted);font-size:13px;margin:6px 0 0">${esc(a.summary.slice(0, 160))}…</p>`;
    c.style.cursor = "pointer";
    c.addEventListener("click", () => a.id === "AI-PROFILE" ? openAiProfile(a) : openTechnique(a.id));
    aibox.appendChild(c);
  });
  function openAiProfile(a) {
    let h = head(a.id, a.name + ' <span class="aitag">AI</span>', "Tactic: " + a.tacticId);
    h += `<div class="m-body"><h4>Threat summary</h4><p>${esc(a.summary)}</p>`;
    h += `<h4>Specific indicators (IoH)</h4><table class="data"><tr><th>Indicator</th><th>Signal</th><th>Level</th></tr>`;
    a.ioh.forEach(r => h += `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td><span class="chip ${lvlClass(r[2])}">${esc(r[2])}</span></td></tr>`);
    h += `</table><h4>Countermeasure</h4><div class="callout blue">${esc(a.cm)}</div></div>`;
    open(h);
  }

  // Cases
  const cbox = $("#cases");
  CASES.forEach(c => {
    const d = el("div", "card acc");
    const tags = c.tactics.map(id => `<span class="chip ghost" style="cursor:pointer" data-t="${id}">${id}</span>`).join(" ");
    d.innerHTML = `<h3>${esc(c.title)}</h3><p style="margin:0 0 6px"><span class="chip high">Loss: ${esc(c.loss)}</span></p>` +
      `<p style="color:var(--muted);font-size:13.5px">${esc(c.text)}</p><p style="margin-top:8px">${tags}</p>`;
    cbox.appendChild(d);
  });
  cbox.addEventListener("click", e => { const s = e.target.closest("[data-t]"); if (s) openTactic(s.dataset.t); });

  // Reflexes
  const rbox = $("#reflexes");
  REFLEXES.forEach(([k, v], i) => { const c = el("div", "card acc"); c.innerHTML = `<h3>${i + 1}. ${esc(k)}</h3><p style="color:var(--muted);font-size:13.5px;margin:0">${esc(v)}</p>`; rbox.appendChild(c); });

  // Rule of 3 IoH + insider
  $("#three-ioh").textContent = THREE_IOH_RULE;
  $("#insider-title").textContent = INSIDER.title;
  $("#insider-text").textContent = INSIDER.text;

  // Bibliography
  const bib = $("#biblio");
  BIBLIO.forEach(b => bib.appendChild(el("li", null, esc(b))));

  function fillTable(sel, headers, rows) {
    const tbl = $(sel); if (!tbl) return;
    let h = "<tr>" + headers.map(x => `<th>${esc(x)}</th>`).join("") + "</tr>";
    rows.forEach(r => { h += "<tr>" + r.map((c, i) => `<td class="${i === 0 ? "k" : ""}">${esc(c)}</td>`).join("") + "</tr>"; });
    tbl.innerHTML = h;
  }

  // Tabs
  document.querySelectorAll(".tabs").forEach(group => {
    group.querySelectorAll(".tab").forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.pane;
        group.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === tab));
        const wrap = group.parentElement;
        wrap.querySelectorAll(".pane").forEach(p => p.classList.toggle("active", p.id === target));
      });
    });
  });

  // Deep-link from hash (#TA-H006 or #TH-6005)
  function fromHash() {
    const id = decodeURIComponent(location.hash.replace("#", ""));
    if (/^TA-H\d+$/.test(id)) openTactic(id);
    else if (techByTactic[id]) openTechnique(id);
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
