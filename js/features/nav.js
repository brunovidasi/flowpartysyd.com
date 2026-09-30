/* nav: solid background once scrolled, and the mobile menu */
import { $, $$ } from "../lib/dom.js";
import { onScroll } from "../lib/scroll.js";

export function initNav() {
  const nav = $("#nav");
  onScroll(() => nav.classList.toggle("solid", scrollY > 40));

  const menuBtn = $("#menuBtn");
  const setMenu = open => { document.body.classList.toggle("menu-open", open); menuBtn.setAttribute("aria-expanded", open); };
  menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => setMenu(false)));
}
