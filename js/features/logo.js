/* animated logo: the real logo image, cut into windows that rise and unfold */
import { $, reduce } from "../lib/dom.js";
import { onScroll } from "../lib/scroll.js";

// [x0, x1] and [y0, y1] as fractions of the logo image, measured from the file
const ROWS = { top: [0, .193], main: [.193, .80], bot: [.80, 1] };
const COLS = { F: [0, .171], L: [.171, .357], O: [.357, .575], FLO: [0, .575], W: [.575, 1] };
const PARTS = [
  // main row letters rise one by one
  ["F", "main", "rise", .15], ["L", "main", "rise", .27], ["O", "main", "rise", .39], ["W", "main", "rise", .51],
  // then the echoes unfold out of the main row
  ["FLO", "top", "rise", 1.05], ["W", "top", "rise", 1.05], ["FLO", "bot", "drop", 1.05], ["W", "bot", "drop", 1.05],
];
// easter egg: after the sparkles pop in, the hero logo glimpses these flags through its letters, one after another
// [flag-filled logo file, seconds after load]
const FLAGS = [["flow-logo-brasil", 6], ["flow-logo-australia", 11]];

const logoSlices = (flags = false) => `<div class="slices">${PARTS.map(([c, r, kind, d]) => {
  const [x0, x1] = COLS[c], [y0, y1] = ROWS[r], isW = c === "W";
  return `<div class="slice ${kind}" data-row="${r}" style="--x0:${x0};--x1:${x1};--y0:${y0};--y1:${y1};--d:${d}s">
    <img src="assets/img/flow-logo.webp" alt="" draggable="false">${isW ? `<img class="wht" src="assets/img/flow-logo.webp" alt="" draggable="false">` : ""}${flags ? FLAGS.map(([f, t]) => `<img class="flag" src="assets/img/${f}.webp" alt="" draggable="false" style="--gd:${t}s">`).join("") : ""}</div>`;
}).join("")}</div>`;

export function initLogo() {
  const logoAnim = $("#logoAnim");
  logoAnim.innerHTML = logoSlices(true);
  if (reduce) return;

  // scrolling away fades the hero logo out; once it's gone, a small copy fades in on the nav and builds itself again
  const navLogo = document.createElement("div");
  navLogo.className = "logo-anim nav-logo";
  navLogo.setAttribute("aria-hidden", "true");
  navLogo.innerHTML = logoSlices();
  $("#nav .mark").after(navLogo);
  $("#nav").classList.add("anim-mark");

  onScroll(() => {
    const p = Math.min(1, Math.max(0, scrollY / (innerHeight * .35)));
    logoAnim.style.opacity = 1 - p;
    const show = p >= 1;
    if (show === navLogo.classList.contains("on")) return;
    navLogo.classList.toggle("on", show);
    if (show) navLogo.innerHTML = logoSlices();  // fresh slices replay the build
  });
}
