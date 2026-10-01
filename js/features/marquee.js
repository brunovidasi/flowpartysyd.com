/* marquee: words with a striped last letter, and stars that differ from each other */
import { $$ } from "../lib/dom.js";
import { lastStriped, star } from "../lib/markup.js";
import { addDrifter } from "../lib/drift.js";

const STAR_STYLES = [["var(--red)", false], ["var(--ink)", true], ["var(--yellow)", false], ["var(--green)", false],
  ["var(--orange)", true], ["var(--t-blue)", false], ["var(--t-purple)", false], ["var(--yellow)", true]];

export function renderMarquee(words) {
  const html = [...words, ...words, ...words, ...words].map((w, i) => {
    const [c, o] = STAR_STYLES[i % STAR_STYLES.length];
    return `<span${i % 3 === 1 ? ' class="o"' : ""}>${lastStriped(w)}</span>${star(c, o, `transform:rotate(${(i * 17) % 45}deg) scale(${[1, .8, 1.15, .9][i % 4]})`)}`;
  }).join("");
  // every marquee on the page shares the words; data-dir="1" drifts right instead of left
  for (const mq of $$(".marquee-track")) {
    mq.innerHTML = html;
    addDrifter(mq, { speed: 60, dir: Number(mq.dataset.dir) || -1, lean: 1 });
  }
}
