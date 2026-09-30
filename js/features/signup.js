/* mailing list (front end only until it's connected to an email service) */
import { $ } from "../lib/dom.js";

export function initSignup() {
  $("#signup").addEventListener("submit", e => {
    e.preventDefault();
    e.target.innerHTML = `<p style="margin:auto;font-weight:700">You're on the list 🌈</p>`;
  });
}
