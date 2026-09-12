# Business Card — Bly Analytics

Reference doc for reproducing the Bly business card for new collaborators.
This is **marketing collateral, not part of the site codebase** — nothing
here needs to be wired into the Next.js app. It exists so a future session
(or the user) can generate a matching card for anyone new without
re-deriving the design from scratch.

Live example (Liban + Ayan, both languages):
https://claude.ai/code/artifact/acd9e01f-fab3-47e7-bc20-d5451b36b6c5

## Concept

- Standard business card, 3.5in × 2in (336×192px at 96dpi).
- **Two-sided, one language per side**: front = French, back = English.
  Both sides carry the *same* information, just translated — not a
  split "brand side / contact side" layout.
- Layout per side: left half = personal info (logo, name + title,
  phone, email, website), right half = a large QR code (~40% of the
  card width).
- No street address anywhere — Bly has no physical office, and the
  card leans into that as a "digital-first, remote-capable" positioning
  rather than treating it as a gap. A generic "Djibouti · East Africa"
  region line was tried in an earlier iteration and then dropped for a
  cleaner two-column layout.
- The QR encodes a **vCard**, not a link — scanning it prompts
  "Add to Contacts" directly on iPhone and most Android phones. No
  companion web page needed.
- Honorific prefixes the name (`M. Liban Yonis Omar`, `Mme Ayan Yonis
  Omar` / `Mr.` / `Ms.` in English) — not suffixed.

## Colors, fonts, dimensions

Sourced from the site's own design tokens (`app/globals.css` /
`context/ui-context.md`) — don't invent new ones.

| Element | Value |
| --- | --- |
| Card background | `#f9f8f6` |
| Card border | `#e4e2dc` |
| Primary text | `#1a1a1a` |
| Muted text (title line) | `#666` |
| Accent (URL, QR eyes/frame) | `#4059e5` |
| Body font | `DM Sans` (via Google Fonts) |
| Name size / weight | 14px / 700 |
| Title / contact lines | 11px / 400 |
| Website line | 11px / 700, accent color |
| Card padding | 20px |
| Left column width | 140px |
| QR box | 132×132px, 1px `#e4e2dc` border, `#ffffff` background |

## HTML template (one card face)

Duplicate this once per person per language. Swap the bracketed values;
everything else — logo, layout, colors — stays identical.

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; }
  a { color: #4059e5; text-decoration: none; }
</style>
</head>
<body>
<div style="width:336px;height:192px;background:#f9f8f6;border:1px solid #e4e2dc;padding:20px;display:flex;flex-direction:row;align-items:stretch;justify-content:space-between;gap:16px;font-family:'DM Sans',-apple-system,sans-serif;">
  <div style="width:140px;flex-shrink:0;display:flex;flex-direction:column;justify-content:space-between;">
    <svg width="90" height="16.8" viewBox="0 0 482 90" xmlns="http://www.w3.org/2000/svg">
      <g fill="#1a1a1a" transform="matrix(4.819276813107115,0,0,4.819276813107115,61.17277666796423,-5.771082311893281)"><path d="M6.54 9.00C7.46 8.65 8.06 7.83 8.06 6.76C8.06 5.31 6.96 4.31 5.42 4.31L1.02 4.31L1.02 14L5.85 14C7.38 14 8.47 12.96 8.47 11.45C8.47 10.19 7.70 9.27 6.54 9.00ZM6.57 7.06C6.57 7.90 5.96 8.51 5.12 8.51L2.55 8.51L2.55 5.64L5.12 5.64C5.96 5.64 6.57 6.23 6.57 7.06ZM5.47 12.67L2.55 12.67L2.55 9.73L5.47 9.73C6.30 9.73 6.92 10.35 6.92 11.20C6.92 12.05 6.30 12.67 5.47 12.67ZM11.51 12.64L11.51 4.31L9.98 4.31L9.98 14L16.30 14L16.30 12.64ZM23.93 4.31L22.20 4.31L19.43 8.67L16.65 4.31L14.92 4.31L18.68 9.98L18.68 14L20.20 14L20.20 9.94ZM35.71 14L37.37 14L33.60 4.31L31.75 4.31L28.00 14L29.64 14L30.41 11.91L34.94 11.91ZM30.87 10.65L32.68 5.80L34.48 10.65ZM41.94 6.99C40.99 6.99 40.22 7.41 39.77 8.15L39.77 7.11L38.35 7.11L38.35 14L39.77 14L39.77 9.97C39.77 8.86 40.46 8.13 41.52 8.13C42.56 8.13 43.23 8.86 43.23 9.97L43.23 14L44.67 14L44.67 9.77C44.67 8.11 43.53 6.99 41.94 6.99ZM51.83 7.11L51.83 8.11C51.23 7.41 50.34 6.99 49.32 6.99C47.38 6.99 45.95 8.48 45.95 10.56C45.95 12.63 47.38 14.13 49.32 14.13C50.34 14.13 51.23 13.71 51.83 13.01L51.83 14L53.26 14L53.26 7.11ZM49.62 12.88C48.34 12.88 47.42 11.91 47.42 10.56C47.42 9.21 48.34 8.23 49.62 8.23C50.90 8.23 51.83 9.21 51.83 10.56C51.83 11.91 50.90 12.88 49.62 12.88ZM55.02 4.31L55.02 14L56.45 14L56.45 4.31ZM63.27 7.11L61.14 11.80L58.98 7.11L57.46 7.11L60.47 13.23L58.67 16.76L60.19 16.76L64.76 7.11ZM69.43 7.11L67.87 7.11L67.87 5.33L66.43 5.33L66.43 7.11L65.16 7.11L65.16 8.32L66.43 8.32L66.43 14L67.87 14L67.87 8.32L69.43 8.32ZM72.16 5.25C72.16 4.75 71.78 4.41 71.25 4.41C70.70 4.41 70.34 4.75 70.34 5.25C70.34 5.74 70.70 6.09 71.25 6.09C71.78 6.09 72.16 5.74 72.16 5.25ZM70.53 7.11L70.53 14L71.96 14L71.96 7.11ZM80.57 11.14L79.13 11.14C78.92 12.15 78.06 12.88 76.99 12.88C75.70 12.88 74.77 11.91 74.77 10.56C74.77 9.21 75.70 8.23 76.99 8.23C78.05 8.23 78.92 8.97 79.11 9.97L80.57 9.97C80.36 8.25 78.86 6.99 76.99 6.99C74.86 6.99 73.30 8.48 73.30 10.56C73.30 12.63 74.86 14.13 76.99 14.13C78.86 14.13 80.36 12.88 80.57 11.14ZM84.46 6.99C82.85 6.99 81.76 7.81 81.76 9.06C81.76 10.68 83.40 10.99 84.43 11.14C85.22 11.28 85.90 11.40 85.90 12.11C85.90 12.68 85.33 13.06 84.53 13.06C83.68 13.06 83.06 12.63 83.03 11.97L81.63 11.97C81.65 13.24 82.82 14.13 84.49 14.13C86.14 14.13 87.32 13.27 87.32 12.03C87.32 10.37 85.58 10.08 84.60 9.90C83.80 9.74 83.17 9.63 83.17 8.92C83.17 8.40 83.71 8.04 84.43 8.04C85.23 8.04 85.78 8.46 85.81 9.07L87.15 9.07C87.15 7.84 86.03 6.99 84.46 6.99Z"></path></g>
      <g stroke="none" fill="#1a1a1a" transform="matrix(2.8125,0,0,2.8125,-21.194407999515533,0)"><path d="M18.396 26.495L7.807 15.905 18.432 5.28l.707.707-9.918 9.918 9.882 9.883z"></path><path d="M23.194 1v4.194H19V1h4.194m1-1H18v6.194h6.194V0zM23.194 26.806V31H19v-4.194h4.194m1-1H18V32h6.194v-6.194z"></path></g>
    </svg>
    <div>
      <div style="font-size:14px;font-weight:700;color:#1a1a1a;">[HONORIFIC] [FULL NAME]</div>
      <div style="font-size:11px;color:#666;margin-top:2px;">[TITLE]</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:3px;">
      <div style="font-size:11px;color:#1a1a1a;">[PHONE — (+253) XX XX XX XX]</div>
      <div style="font-size:11px;color:#1a1a1a;">[email]</div>
      <div style="font-size:11px;font-weight:700;color:#4059e5;">blyanalytics.com</div>
    </div>
  </div>
  <div style="width:132px;height:132px;border:1px solid #e4e2dc;border-radius:2px;overflow:hidden;flex-shrink:0;background:#ffffff;align-self:center;">
    <img src="[name]-qr-blue.svg" alt="QR" style="width:100%;height:100%;display:block;"/>
  </div>
</div>
</body>
</html>
```

FR/EN copy pairs used so far:

| Field | French | English |
| --- | --- | --- |
| Tagline (not currently shown — dropped in final layout, kept here for reference) | Conseil digital & analyse de données. | Digital consultancy & data analytics. |
| Liban's title | Co-fondateur & développeur full-stack | Co-founder & full-stack developer |
| Ayan's title | Chargée de mission | Mission officer |
| Honorific | M. / Mme | Mr. / Ms. |

## QR generation (vCard + brand-colored eyes/frame)

The plain `qrcode` npm package can't color individual modules (finder
"eyes" vs. data), so this script reads the raw module matrix and
hand-renders an SVG: data modules black (max scan contrast), the three
7×7 finder "eyes" in the accent blue, plus a decorative rounded blue
frame in the quiet zone. Verified by rasterizing and decoding with
`jsqr` after generation — always re-verify after editing, since a
miscolored/misaligned finder pattern can silently break scanning.

```js
// gen-qr.mjs — npm install qrcode
import QRCode from "qrcode";
import fs from "fs";

const ACCENT = "#4059e5";
const MODULE = 10;
const MARGIN = 4; // quiet zone, in modules

function inFinder(row, col, size) {
  const isTop = row < 7;
  const isBottom = row >= size - 7;
  const isLeft = col < 7;
  const isRight = col >= size - 7;
  return (isTop && isLeft) || (isTop && isRight) || (isBottom && isLeft);
}

function drawEye(x0, y0) {
  const m = MODULE;
  return `
    <rect x="${x0}" y="${y0}" width="${7 * m}" height="${7 * m}" fill="${ACCENT}"/>
    <rect x="${x0 + m}" y="${y0 + m}" width="${5 * m}" height="${5 * m}" fill="#ffffff"/>
    <rect x="${x0 + 2 * m}" y="${y0 + 2 * m}" width="${3 * m}" height="${3 * m}" fill="${ACCENT}"/>
  `;
}

async function build(vcard, outFile) {
  const qr = QRCode.create(vcard, { errorCorrectionLevel: "M" });
  const size = qr.modules.size;
  const total = (size + 2 * MARGIN) * MODULE;

  let cells = "";
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (inFinder(row, col, size)) continue;
      if (qr.modules.get(row, col)) {
        const x = (col + MARGIN) * MODULE;
        const y = (row + MARGIN) * MODULE;
        cells += `<rect x="${x}" y="${y}" width="${MODULE}" height="${MODULE}" fill="#000000"/>`;
      }
    }
  }

  const eyeTL = drawEye(MARGIN * MODULE, MARGIN * MODULE);
  const eyeTR = drawEye((MARGIN + size - 7) * MODULE, MARGIN * MODULE);
  const eyeBL = drawEye(MARGIN * MODULE, (MARGIN + size - 7) * MODULE);

  const frameInset = (MARGIN * MODULE) / 2;
  const frameSize = total - frameInset * 2;
  const frameRadius = frameSize * 0.08;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${total}" height="${total}" viewBox="0 0 ${total} ${total}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${total}" height="${total}" fill="#ffffff"/>
  ${cells}
  ${eyeTL}
  ${eyeTR}
  ${eyeBL}
  <rect x="${frameInset}" y="${frameInset}" width="${frameSize}" height="${frameSize}" rx="${frameRadius}" ry="${frameRadius}" fill="none" stroke="${ACCENT}" stroke-width="${MODULE * 0.9}"/>
</svg>`;

  fs.writeFileSync(outFile, svg);
  console.log("wrote", outFile, "size", size, "x", size);
}

// --- Add one entry per collaborator here ---
const PEOPLE = [
  {
    slug: "liban",
    vcard: [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Omar;Liban;Yonis;;",
      "FN:Liban Yonis Omar",
      "ORG:Bly Analytics",
      "TITLE:Co-fondateur & developpeur full-stack",
      "TEL;TYPE=CELL:+25377164132",
      "EMAIL:liban.yonis@blyanalytics.com",
      "URL:https://www.blyanalytics.com",
      "END:VCARD",
    ].join("\r\n"),
  },
  {
    slug: "ayan",
    vcard: [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Omar;Ayan;Yonis;;",
      "FN:Ayan Yonis Omar",
      "ORG:Bly Analytics",
      "TITLE:Chargee de mission",
      "TEL;TYPE=CELL:+25377815430",
      "EMAIL:ayan.yonis@blyanalytics.com",
      "URL:https://www.blyanalytics.com",
      "END:VCARD",
    ].join("\r\n"),
  },
  // { slug: "new-person", vcard: [...].join("\r\n") },
];

for (const p of PEOPLE) {
  await build(p.vcard, `${p.slug}-qr-blue.svg`);
}
```

Notes on the vCard fields:
- Accented characters were stripped from `TITLE` (`developpeur` not
  `développeur`) to avoid any risk of mojibake on older/OEM Android
  vCard parsers. Everything else can use normal UTF-8.
- Phone in `TEL` is E.164 (`+253...`, no spaces); the human-readable
  `(+253) 77 16 41 32` format is only used in the visible card text.

## Adding a new collaborator

1. Gather: full name, honorific (M./Mme, Mr./Ms.), title in both
   languages, phone in `(+253) XX XX XX XX)` format, email
   (`firstname.lastname@blyanalytics.com` convention).
2. Add an entry to `PEOPLE` in the QR script above, run it
   (`npm install qrcode` once, then `node gen-qr.mjs`) — produces
   `<slug>-qr-blue.svg`.
3. **Verify the QR before using it** — rasterize and decode with
   `jsqr`/`pngjs` (or any QR reader) to confirm it still resolves to
   the exact vCard. Don't skip this: a hand-edited or corrupted QR is
   worse than none.
4. Duplicate the HTML template above twice (French + English), filling
   in their name/title/phone/email and QR filename.
5. If continuing in the design-canvas / Claude Design workflow this was
   originally built in, ask Claude to add the new person's two faces as
   artboards on the shared canvas (see the live example link above for
   the existing canvas to extend).
