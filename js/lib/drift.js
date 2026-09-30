/* the word marquee and the placard strips drift steadily, and speed up and lean with scroll */
import { reduce } from "./dom.js";

const drifters = [];
let lastScroll = scrollY, vel = 0, lastT = performance.now();

// el: the track to move; speed in px/s; dir: -1 left, 1 right; lean: how much it skews with scroll
export function addDrifter(el, { speed, dir = -1, lean = 1 }) {
  const d = { el, x: 0, speed, dir, lean, paused: false };
  drifters.push(d);
  return d;
}

function frame(now) {
  const dt = Math.min(.05, (now - lastT) / 1000); lastT = now;
  const dy = scrollY - lastScroll; lastScroll = scrollY;
  vel += (dy - vel) * .12;
  const skew = Math.max(-12, Math.min(12, -vel * .5));
  for (const d of drifters) {
    if (d.paused) continue;
    d.x += d.dir * (d.speed + Math.abs(vel) * 40) * dt;
    const half = d.el.scrollWidth / 2;
    if (d.x <= -half) d.x += half;
    if (d.x > 0) d.x -= half;
    d.el.style.transform = `translateX(${d.x}px) skewX(${skew * d.lean}deg)`;
  }
  requestAnimationFrame(frame);
}
if (!reduce) requestAnimationFrame(frame);
