/* editions archive: cards newest first, with arrow buttons to scroll */
import { $, $$ } from "../lib/dom.js";
import { fwMarkup } from "../lib/markup.js";

// album: a Facebook album id (the number after set=a. in the album link) or a full link
const albumLink = album => album && (/^https?:/.test(album) ? album : `https://www.facebook.com/media/set/?set=a.${album}`);

export function renderEditions(editions) {
  const track = $("#track");
  track.innerHTML = editions.map(({ name, date, people, logo, story, album }, i) => {
    const href = albumLink(album);
    const no = String(i + 1).padStart(2, "0");
    return `<div class="ed">
  <article class="card">
    <div class="head"><span class="fw in" aria-hidden="true">${fwMarkup(no)}</span>${logo ? `<img class="elogo" src="assets/img/logos-web/${logo}.webp" alt="" loading="lazy">` : ""}</div>
    <h4>${name}</h4>
    <p>${story}</p>
    <div class="meta"><span>${date}</span><span>${people ? `<b>${people}</b> people` : ""}</span></div>
  </article>
  <div class="ed-foot">${href ? `<a class="btn ghost album" href="${href}" target="_blank" rel="noopener">Get the photos →</a>` : ""}</div>
  </div>`;
  }).reverse().join("");
}

export function initEditionArrows() {
  $$("#editions [data-slide]").forEach(b => b.addEventListener("click", () => {
    const track = $("#track");
    track.scrollBy({ left: +b.dataset.slide * track.clientWidth * .8, behavior: "smooth" });
  }));
}
