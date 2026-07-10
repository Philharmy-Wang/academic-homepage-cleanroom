# Polish v2.2 Final Report

Report date: 2026-07-10

## 1–9. Reconciliation and computed counts

1. Google Scholar items identified: **20**.
2. Existing public-site records before this round: **16**.
3. Independent formal publications added: **2** (`uc-mamba`, `aibdf-forest-fire`).
4. Duplicate/version rows merged: **2** (English/Chinese metadata pairs for the YOLO v4-tiny flame paper and intelligent-car paper). Online/final year differences for DPMNet, Scale-Aware RGBT Tracking, and the contextual-transformer paper were also normalized without creating extra records.
5. Final DOI/title-deduplicated formal publications: **18**.
6. Sole-first-author publications: **10**, computed from author order and co-first flags.
7. CAS Zone 1 publications: **6**.
8. CAS TOP-journal publications: **8**.
9. Both CAS Zone 1 and TOP: **6**.

## 10. Zone 1 / TOP publication list

Zone 1 and TOP:

- DPMNet — IEEE TCSVT
- RFWNet — IEEE TGRS
- M4SFWD — Expert Systems with Applications
- Fighting against Forest Fire — Expert Systems with Applications
- Scale-Aware Attention and Multi-Modal Prompt Learning… — IEEE Transactions on Multimedia (co-authored)
- SCDFuse — Knowledge-Based Systems (co-authored)

Additional TOP publications:

- Cross-Modal Deep Interaction… — Applied Soft Computing (CAS Zone 2, co-authored)
- DPSNET — IEEE Transactions on Instrumentation and Measurement (CAS Zone 2, co-authored)

The complete 18-row audit is in `reports/CAS_ZONE_TOP_AUDIT.md`.

## 11. Google Scholar snapshot

- Total citations: **362**
- h-index: **9**
- i10-index: **8**
- Snapshot: **2026-07** (read-only capture on 2026-07-10)

## 12. Google Scholar and OpenAlex scopes

Public profile totals, h-index, i10-index, and per-work citations come only from `src/data/manual/google-scholar-snapshot.json`. OpenAlex data remains in `src/data/generated/citations.json` as an independent annual-trend cross-check. The page labels the chart as OpenAlex and does not present its aggregate as a Google Scholar total. No Scholar annual curve was fabricated because visible annual values were unavailable.

## 13. Metric editions and sources

- CAS Zone/TOP: current LetPub pages, visible `2026-03 新锐期刊分区表`, checked 2026-07-10.
- IEEE JCR/JIF: IEEE Title List, January 2026; explicitly based on the 2024 JCR study released June 2025.
- Other JIF values: official publisher journal pages. Where the page did not expose a metric year, `jifYear` remains null.
- Lookup date and metric year are stored separately; no value is labelled “2026 IF”.

## 14. Unable to verify

Current CAS/JCR screenshots remain useful for *Multimedia Tools and Applications* and *Computers in Biology and Medicine*. Their current LetPub entries did not provide a usable 2026 CAS record, so public zone/TOP/JIF values were withheld rather than guessed. Scholar annual citation values were not visible and remain absent from the manual snapshot.

## 15. Resources page

The resources page now uses four horizontal cards with an icon, title, one-sentence description, status, and email contact. Narrow-column and character-by-character layout risks were removed. Desktop, tablet, and 390 px mobile assertions check horizontal writing mode, normal word breaking, minimum title width, overflow, console errors, and 404 responses.

## 16. CV Highlights

The print-friendly CV now includes a concise Highlights / 精选成果 section covering the current appointment, three major funding/talent items, representative venues, Google Scholar metrics, and dynamically computed CAS Zone 1/TOP counts.

## 17. Research icon files to add manually

The component uses each custom file when present and otherwise falls back without a request or 404:

- `public/images/research/primate-vision.svg`
- `public/images/research/macaque-identification.svg`
- `public/images/research/pose-behavior.svg`
- `public/images/research/multiview-monitoring.svg`
- `public/images/research/edge-deployment.svg`
- `public/images/research/remote-sensing-fire.svg`

## 18. Publication main images to add manually

The five selected-paper cards prefer these files when present and otherwise retain the existing original-site SVG illustrations with `object-fit: contain`:

- `public/images/publications/dpmnet-main.png`
- `public/images/publications/rfwnet-main.png`
- `public/images/publications/m4sfwd-main.png`
- `public/images/publications/forest-fire-main.png`
- `public/images/publications/terrorism-yolov4-main.png`

## 19. Tests

The required sequence passed on 2026-07-10:

- `npm ci`: 277 packages installed; 0 vulnerabilities.
- `npm run check`: 53 files; 0 errors, 0 warnings, 0 hints.
- `npm run validate:data`: 18 publications, 5 selected papers, 11 projects, 18 awards, 2 patents, 4 resource categories.
- `npm run check:links`: 14 pages and 216 internal links/resources passed.
- `npm run privacy:audit`: no credential, private-network, private-path, or prohibited identifier finding.
- `npm run safety:remote`: passed for the sole `origin` and permitted cleanroom repository.
- `npm run build`: 14 static pages built.
- `npm run test:responsive`: **56/56 passed** across desktop, laptop, tablet, and mobile.

The responsive suite asserts dynamic Scholar data, co-authored CAS/TOP inclusion, Chinese identity, horizontal resource titles, both image-fallback systems, Scholar/OpenAlex source separation, no overflow, no console errors, and no internal 404 responses. Desktop/mobile screenshots for the Chinese resources, publications, and home pages were also inspected visually.

## 20. GitHub Actions

- Implementation commit: `d548049b3498b63d55c86c40c3445679a5387cd6`.
- Quality run ID: **29083145030** — success.
- Deploy to GitHub Pages run ID: **29083144951** — success.
- Online readback: all 14 English/Chinese routes returned HTTP 200. The deployed HTML contains the unified Chinese appointment, Scholar items 20, Scholar citations 362, UC-Mamba, the AIBDF paper, four resource cards, and the explicitly labelled OpenAlex trend.

## 21–23. Safety declarations

21. Pull Request created: **No**.
22. Old formal repository `Philharmy-Wang/Philharmy-Wang.github.io` modified: **No**.
23. Cutover executed: **No**.
