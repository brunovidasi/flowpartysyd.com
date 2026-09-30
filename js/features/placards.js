/* placards: small strips drifting between sections */
import { $$ } from "../lib/dom.js";
import { addDrifter } from "../lib/drift.js";

const placard = ({ file, alt }, i) =>
  `<button class="placard" style="--r:${[-4, 3, -2, 5, -3, 2][i % 6]}deg" aria-label="Open placard: ${alt}"><img src="assets/img/banners-web/${file}.webp" alt="${alt}" loading="lazy" draggable="false"></button>`;

// every strip shows all the placards, each starting on a different one and drifting the opposite way
// to the strip before it; doubled so it loops seamlessly
export function renderPlacards(placards) {
  $$(".placard-strip").forEach((strip, r) => {
    const k = (r * 4) % placards.length, list = [...placards.slice(k), ...placards.slice(0, k)];
    strip.querySelector(".placard-row").innerHTML = `<div class="placard-track">${[...list, ...list].map(placard).join("")}</div>`;
    const d = addDrifter(strip.querySelector(".placard-track"), { speed: 40, dir: r % 2 ? 1 : -1, lean: .6 });
    strip.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") d.paused = true; });
    strip.addEventListener("pointerleave", () => d.paused = false);
  });
}
