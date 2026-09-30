# Flow Party Sydney — Website

The website for FLOW, Sydney's biggest Brazilian queer party — a single-page site introducing the brand, its next party, and its event history.

**Live site:** [flowparty.com.au](https://flowparty.com.au)
**Dev Link:** [brunovidasi.com/sydney](https://brunovidasi.com/sydney/)

## Sections

- **Hero** — animated FLOW logo (letters rise, echo rows unfold, colour pours down the W, top and bottom echoes pulse, sparkles twinkle across the hero), tagline, next-party card
- **Marquee** — scrolling words with a striped last letter, speeds up with scroll
- **Who we are** — manifesto that writes itself as you scroll, what makes FLOW different, the safe-room statement, key numbers
- **Last party** — Queens of Brazil: line-up, photo grid with lightbox, link to the full Google Drive album
- **Placard strips** — small drifting rows of FLOW placards between sections
- **Every edition** — all 17 editions since 2021, newest first, plus our venues
- **The team** — group photo with names on it; hover or tap a person to spotlight them and show their role
- **Partner with us** — reach numbers, a media kit request, and past partners (Follow Us Intercâmbio, Welcome by emen8)
- **Next one?** — mailing list sign-up and contact links

## Design

- Colours come from the rainbow W of the logo (purple, red, orange, yellow, green, blue, navy).
- Headings copy the logo's layout: a cropped echo row above and a mirrored echo below, with the W's stripes in the last letter.
- Menu, buttons and headings use League Gothic; body text uses Inter.
- Motion is gentle and respects `prefers-reduced-motion`.

## Built with

- Plain HTML, CSS and JavaScript — no frameworks, no build step
- Self-hosted fonts: League Gothic and Inter (SIL Open Font License, see `assets/fonts`)
- No external requests

## Structure

```
index.html
data/                  → site content as JSON (see "Updating content")
  next-party.json
  editions.json
  photos.json
  placards.json
  marquee.json
css/
  main.css             → entry stylesheet, imports everything below in order
  base/                → fonts, colour variables, reset, utilities, section layout
  components/          → buttons, logo-style headings, animated logo, lightbox
  sections/            → one file per page section (nav, hero, marquee, about,
                         last-party, placards, editions, team, partners, footer)
js/
  main.js              → entry script (ES module): initialises features, loads data
  lib/                 → shared helpers (DOM, JSON loading, markup, scroll, drift)
  features/            → one module per feature or section
assets/
  fonts/        → League Gothic + Inter (woff2) and their licences
  img/          → logos, banners, event flyers, photos
    flow-logo.webp   → main logo used by the site
    logos-web/       → web-sized edition logos
    queens-of-brazil/→ photos from the last party
    team/            → team photos
    banners-web/     → web-sized placards
  icons/        → favicon PNGs, Apple touch icon, app icons (192, 512)
  favicon.ico   → rainbow W, 16/32/48 px
site.webmanifest → icon and theme colour for phones
legacy/         → the 2023 site (Bootstrap), kept for reference
prototypes/     → design explorations; open prototypes/index.html
```

Each section's responsive (`@media`) and reduced-motion rules live in that section's CSS file.

## Updating content

Everything that changes between parties is in `data/`:

- **Next party** (`next-party.json`): set it to an object to show the party in the hero with a countdown. Set it back to `null` between parties and the card invites people to join the list.
  ```json
  {
    "name": "Flow Halloween",
    "date": "2026-10-31T21:00:00+11:00",
    "details": "Sat 31 Oct · Kinselas, Darlinghurst · 9pm – late",
    "tickets": "https://linktr.ee/flowpartysyd"
  }
  ```
  `date` is the start time with the Sydney offset.
- **Editions** (`editions.json`, oldest first): add an entry after each party.
  - `people`: exact door count where we have one, `~` for estimates, or `null`
  - `logo`: file name in `assets/img/logos-web/` without `.webp`, or `null`
  - `album`: a Facebook album id (the number after `set=a.` in the album link), a full link, or `null` for no photos button
- **Last party photos** (`photos.json`): put web-sized images in `assets/img/queens-of-brazil/` and list them. `size` is `"big"` (2×2), `"tall"` (1×2) or `""` (1×1). Update the "Last party" section in `index.html`, including the album link.
- **Placards** (`placards.json`): add web-sized images to `assets/img/banners-web/` and list them with alt text.
- **Marquee words** (`marquee.json`): the words scrolling under the hero.

## Notes

Static single-page site. Serve the folder with any static host, or run `python3 -m http.server` and open http://localhost:8000. It must be served over HTTP: opening `index.html` directly from disk won't work, because ES modules and the JSON data can't load from `file://`.

- The mailing list form only shows a thank-you message for now; it needs connecting to an email service (e.g. Mailchimp) to store addresses.
- The media kit is sent on request by email; there is no public PDF.
