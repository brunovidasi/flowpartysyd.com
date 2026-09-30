/* FLOW Party Sydney: entry script */
import { loadData } from "./lib/data.js";
import { initHeadings } from "./features/headings.js";
import { initLogo } from "./features/logo.js";
import { initSparkles } from "./features/sparkles.js";
import { initNav } from "./features/nav.js";
import { initManifesto } from "./features/manifesto.js";
import { initEditionArrows, renderEditions } from "./features/editions.js";
import { initLightbox } from "./features/lightbox.js";
import { initTeam } from "./features/team.js";
import { initSignup } from "./features/signup.js";
import { initReveal } from "./features/reveal.js";
import { renderNextParty } from "./features/next-party.js";
import { renderMarquee } from "./features/marquee.js";
import { renderPhotos } from "./features/photos.js";
import { renderPlacards } from "./features/placards.js";

// page structure first: none of this waits on data
initHeadings();
initLogo();
initSparkles();
initNav();
initManifesto();
initEditionArrows();
initLightbox();
initTeam();
initSignup();
initReveal();

// content from /data; each section renders on its own so one failing file doesn't blank the rest
const sections = [
  ["next-party", renderNextParty],
  ["marquee", renderMarquee],
  ["photos", renderPhotos],
  ["placards", renderPlacards],
  ["editions", renderEditions],
];
for (const [name, render] of sections) loadData(name).then(render).catch(err => console.error(err));
