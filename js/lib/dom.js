export const $ = s => document.querySelector(s);
export const $$ = s => [...document.querySelectorAll(s)];
export const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const canHover = () => matchMedia("(hover: hover)").matches;
