/* logo-style headings from data-fw */
import { $$ } from "../lib/dom.js";
import { fwMarkup } from "../lib/markup.js";

export function initHeadings() {
  $$("[data-fw]").forEach(el => { el.innerHTML = fwMarkup(el.dataset.fw); el.setAttribute("aria-label", el.dataset.fw); });
}
