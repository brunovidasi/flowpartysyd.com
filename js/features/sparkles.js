/* sparkles across the hero: they pop in once the logo has built, twinkle, and drift away from the mouse */
import { $, $$, reduce } from "../lib/dom.js";
import { star } from "../lib/markup.js";

// [x %, y % of the screen, size (fraction of the screen's short side), colour, outline, twinkle seconds]
// kept to the edges and gaps so they never sit on the logo, the tagline or the next-party card
const SPARKLES = [
  [6, 20, .05, "var(--red)", false, 3.2], [14, 60, .03, "var(--ink)", true, 2.6], [27, 12, .035, "var(--ink)", true, 3],
  [20, 92, .03, "var(--ink)", false, 3.4], [74, 40, .05, "var(--yellow)", false, 3.6], [90, 12, .04, "var(--ink)", false, 3.1],
  [86, 70, .045, "var(--t-blue)", true, 3.5], [95, 88, .03, "var(--ink)", false, 2.7],
];

export function initSparkles() {
  $("#sparkles").innerHTML = SPARKLES.map(([x, y, s, c, o, t], i) =>
    star(c, o, `--x:${x}%;--y:${y}%;--s:calc(${s * 1.3} * 100vmin + 8px);--c:${c};--t:${t}s;--d:${(2.9 + (i * 5 % 8) * .12).toFixed(2)}s`)).join("");
  if (reduce) return;

  // stars drift away from the mouse, then spring back
  const hero = $(".hero"), stars = $$("#sparkles .star").map(el => ({ el, x: 0, y: 0, vx: 0, vy: 0 }));
  const mouse = { x: -1e4, y: -1e4 };
  hero.addEventListener("pointermove", e => { if (e.pointerType === "mouse") { mouse.x = e.clientX; mouse.y = e.clientY; } });
  hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -1e4; });
  function frame() {
    for (const s of stars) {
      const r = s.el.getBoundingClientRect(), cx = r.left + r.width / 2 - s.x, cy = r.top + r.height / 2 - s.y;
      const dx = cx - mouse.x, dy = cy - mouse.y, d = Math.hypot(dx, dy) || 1, R = 180;
      let tx = 0, ty = 0;
      if (d < R) { const push = (1 - d / R) ** 2 * 70; tx = dx / d * push; ty = dy / d * push; }
      s.vx = (s.vx + (tx - s.x) * .08) * .82; s.vy = (s.vy + (ty - s.y) * .08) * .82;
      s.x += s.vx; s.y += s.vy;
      s.el.style.translate = `${s.x.toFixed(1)}px ${s.y.toFixed(1)}px`;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
