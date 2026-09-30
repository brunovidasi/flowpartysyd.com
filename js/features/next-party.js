/* next party card: shows the announced party with a countdown, or invites people to join the list */
import { $ } from "../lib/dom.js";
import { lastStriped } from "../lib/markup.js";

export function renderNextParty(party) {
  if (!party || new Date(party.date) <= Date.now()) return;
  $("#nextTitle").innerHTML = lastStriped(party.name);
  $("#nextDetails").textContent = party.details;
  const btn = $("#nextBtn");
  btn.href = party.tickets; btn.textContent = "Get tickets →";
  const count = $("#count"), target = new Date(party.date);
  count.hidden = false;
  const tick = () => {
    const s = Math.max(0, (target - Date.now()) / 1000);
    const u = { d: s / 86400, h: s / 3600 % 24, m: s / 60 % 60, s: s % 60 };
    for (const k in u) count.querySelector(`[data-u=${k}]`).textContent = String(Math.floor(u[k])).padStart(2, "0");
  };
  tick(); setInterval(tick, 1000);
}
