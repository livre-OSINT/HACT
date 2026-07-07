/* HACT — language switcher (EN/FR) with SVG flags, injected top-right of the header nav. */
(function () {
  "use strict";
  var file = location.pathname.split("/").pop();
  if (!file) file = "index.html";
  var isFR = /-fr\.html$/.test(file);

  function enOf(f) { return f.replace(/-fr\.html$/, ".html"); }
  function frOf(f) { return f === "index.html" ? "index-fr.html" : f.replace(/\.html$/, "-fr.html"); }

  var enHref = isFR ? enOf(file) : file;
  var frHref = isFR ? file : frOf(file);

  var UK = '<svg viewBox="0 0 60 30" width="20" height="12" aria-hidden="true">'
    + '<clipPath id="hact-uks"><path d="M0,0 v30 h60 v-30 z"/></clipPath>'
    + '<clipPath id="hact-ukt"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>'
    + '<g clip-path="url(#hact-uks)">'
    + '<path d="M0,0 v30 h60 v-30 z" fill="#012169"/>'
    + '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>'
    + '<path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#hact-ukt)" stroke="#C8102E" stroke-width="4"/>'
    + '<path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>'
    + '<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>'
    + '</g></svg>';

  var FR = '<svg viewBox="0 0 3 2" width="18" height="12" aria-hidden="true">'
    + '<rect width="3" height="2" fill="#fff"/>'
    + '<rect width="1" height="2" fill="#0055A4"/>'
    + '<rect x="2" width="1" height="2" fill="#EF4135"/>'
    + '</svg>';

  var css = ""
    + ".lang-switch{display:inline-flex;gap:5px;align-items:center;margin-left:12px}"
    + ".lang-switch a,.lang-switch span{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;"
    + "padding:4px 9px;border-radius:14px;text-decoration:none;line-height:1;border:1px solid transparent;font-family:inherit}"
    + ".lang-switch a{color:#cfe0ee;border-color:#2c5578;opacity:.8}"
    + ".lang-switch a:hover{opacity:1;background:#0a2135;color:#fff}"
    + ".lang-switch .active{color:#fff;background:var(--accent,#c8102e);border-color:var(--accent,#c8102e);opacity:1}"
    + ".lang-switch svg{border-radius:2px;display:block;box-shadow:0 0 0 1px rgba(255,255,255,.25)}"
    + ".lang-switch.floating{position:fixed;top:10px;right:12px;z-index:9999;background:rgba(11,35,56,.92);padding:5px 7px;border-radius:16px;margin:0}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var en = isFR
    ? '<a href="' + enHref + '" hreflang="en" title="English version">' + UK + "EN</a>"
    : '<span class="active" aria-current="true">' + UK + "EN</span>";
  var fr = isFR
    ? '<span class="active" aria-current="true">' + FR + "FR</span>"
    : '<a href="' + frHref + '" hreflang="fr" title="Version française">' + FR + "FR</a>";

  var wrap = document.createElement("div");
  wrap.className = "lang-switch";
  wrap.setAttribute("role", "navigation");
  wrap.setAttribute("aria-label", "Language / Langue");
  wrap.innerHTML = en + fr;

  function place() {
    var nav = document.querySelector("header.top nav.links")
      || document.querySelector("header.top nav.hlinks")
      || document.querySelector("header.top .nav");
    if (nav) { nav.appendChild(wrap); }
    else { wrap.className = "lang-switch floating"; document.body.appendChild(wrap); }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", place);
  } else { place(); }
})();
