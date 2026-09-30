/* last-party photo grid; photos appear one by one as the grid scrolls into view */
import { $ } from "../lib/dom.js";
import { onScroll } from "../lib/scroll.js";

// size: "big" 2x2, "tall" 1x2, "" 1x1
export function renderPhotos(photos) {
  const grid = $("#photos");
  grid.innerHTML = photos.map(({ file, size, alt }) =>
    `<button class="${size}" aria-label="Open photo: ${alt}"><img src="assets/img/queens-of-brazil/qob-${file}.webp" alt="${alt}" loading="lazy"></button>`).join("");
  const els = [...grid.querySelectorAll("button")];
  onScroll(() => {
    const r = grid.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .9 - r.top) / (r.height * .85)));
    els.forEach((el, i) => el.classList.toggle("on", i / els.length < p));
  });
}
