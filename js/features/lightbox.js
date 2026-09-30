/* lightbox for photos and placards (delegated, so it works for content rendered later) */
export function initLightbox() {
  const lb = document.createElement("dialog");
  lb.innerHTML = `<img alt=""><button aria-label="Close">✕</button>`;
  document.body.appendChild(lb);
  const big = lb.querySelector("img");
  lb.querySelector("button").onclick = () => lb.close();
  lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
  document.addEventListener("click", e => {
    const b = e.target.closest("#photos button, .placard");
    if (!b) return;
    const img = b.querySelector("img"); big.src = img.src; big.alt = img.alt; lb.showModal();
  });
}
