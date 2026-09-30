/* one passive scroll listener; features register a handler, which also runs once straight away */
const handlers = [];
export function onScroll(fn) { handlers.push(fn); fn(); }
addEventListener("scroll", () => handlers.forEach(fn => fn()), { passive: true });
