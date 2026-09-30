/* team: spotlight on hover (mouse) or tap (touch) */
import { $, canHover } from "../lib/dom.js";

export function initTeam() {
  const team = $("#teamPhoto"), whos = [...team.querySelectorAll(".who")];
  const teamName = $("#teamName"), teamRole = $("#teamRole"), info = team.querySelector(".team-info");
  const teamDefault = [teamName.textContent, canHover() ? teamRole.textContent : "Tap on us to say oi"];
  teamRole.textContent = teamDefault[1];
  function spotlight(who) {
    whos.forEach(w => w.setAttribute("aria-pressed", w === who));
    team.classList.toggle("active", !!who);
    if (who) team.style.setProperty("--sx", who.style.getPropertyValue("--cx"));
    const [n, r] = who ? [who.dataset.name, who.dataset.role] : teamDefault;
    if (teamName.textContent === n) return;
    teamName.textContent = n; teamRole.textContent = r;
    info.classList.remove("swap"); void info.offsetWidth; info.classList.add("swap");
  }
  whos.forEach(w => {
    w.setAttribute("aria-pressed", "false");
    w.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") spotlight(w); });
    w.addEventListener("focus", () => spotlight(w));
    w.addEventListener("click", () => spotlight(w.getAttribute("aria-pressed") === "true" && !canHover() ? null : w));
  });
  team.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") spotlight(null); });
  team.addEventListener("focusout", e => { if (!team.contains(e.relatedTarget)) spotlight(null); });
}
