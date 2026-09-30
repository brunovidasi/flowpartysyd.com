/* gentle reveals + count-up for [data-to] numbers */
import { $$ } from "../lib/dom.js";
import { lastStriped } from "../lib/markup.js";

function countUp(el) {
  const to = +el.dataset.to, t0 = performance.now();
  const f = t => {
    const k = Math.min(1, (t - t0) / 1200);
    el.innerHTML = lastStriped(Math.round(to * (1 - (1 - k) ** 3)).toLocaleString("en-AU") + (k === 1 && el.hasAttribute("data-plus") ? "+" : ""));
    if (k < 1) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
}

export function initReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    e.target.querySelectorAll("[data-to]").forEach(countUp);
    io.unobserve(e.target);
  }), { threshold: .2 });
  $$(".reveal, h2.fw").forEach(el => io.observe(el));
}
