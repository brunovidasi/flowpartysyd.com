/* shared markup: striped last letters, logo-style headings, sparkles */

// wrap the last letter or digit of a string in the W's stripes
export function lastStriped(text) {
  const s = text.toUpperCase(), k = s.replace(/[^A-Z0-9ÃÇÉ]+$/, "").length - 1;
  return `${s.slice(0, k)}<span class="w">${s[k]}</span>${s.slice(k + 1)}`;
}

// logo-style heading: echo above, mirrored echo below, striped last letter
export function fwMarkup(text) {
  const line = lastStriped(text);
  return `<span class="row ghost top" aria-hidden="true"><span>${line}</span></span><span class="row main"><span>${line}</span></span><span class="row ghost bot" aria-hidden="true"><span>${line}</span></span>`;
}

const STAR_PATH = "M12 0C12.8 7 17 11.2 24 12 17 12.8 12.8 17 12 24 11.2 17 7 12.8 0 12 7 11.2 11.2 7 12 0Z";
export const star = (colour, outline = false, extra = "") =>
  `<svg class="star${outline ? " outline" : ""}" viewBox="-1 -1 26 26" aria-hidden="true" style="color:${colour};${extra}"><path d="${STAR_PATH}"/></svg>`;
