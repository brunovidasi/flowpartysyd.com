/* manifesto writes itself as you scroll */
import { $ } from "../lib/dom.js";
import { onScroll } from "../lib/scroll.js";

export function initManifesto() {
  const man = $("#manifesto");
  [...man.childNodes].forEach(n => {
    if (n.nodeType === 3) n.replaceWith(...n.textContent.split(/(\s+)/).map(t => {
      if (!t.trim()) return document.createTextNode(t);
      const s = document.createElement("span"); s.className = "m"; s.textContent = t; return s;
    }));
    else n.classList.add("m");
  });
  const ms = [...man.querySelectorAll(".m")];
  onScroll(() => {
    const r = man.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .3)));
    ms.forEach((w, i) => w.classList.toggle("on", i / ms.length < p));
  });
}
