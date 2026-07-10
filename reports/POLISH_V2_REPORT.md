# Polish v2 Report

Status: `LOCAL_VALIDATION_COMPLETE`

## 1. Goal

Polish v2 refines the existing independent cleanroom preview without changing its restrained white and blue-gray academic identity. It improves hierarchy, visitor-facing content, scholarly metadata traceability, and reproducible public citation data while preserving all repository safety boundaries.

## 2. Homepage layout

- Rebalanced the Hero into a spacious text column and a restrained portrait panel.
- Added clearer spacing between name, position, affiliation, research positioning, and contact actions.
- Added a compact research-focus note below the portrait without filling the right column.
- Constrained biography reading width and increased paragraph and section rhythm.
- Verified desktop and mobile button wrapping, portrait aspect ratio, and horizontal bounds.

## 3. Icon system

- Added `src/components/Icon.astro` with a small original line-icon set.
- Icons inherit `currentColor`, use a unified viewBox, line width, rounded caps, and accessible decorative treatment.
- No icon library, CDN, external font, or runtime request was introduced.

## 4. Research improvements

- Added one semantic icon for each of the six research directions.
- Home cards remain compact; the Research page retains problem, method focus, status, and related-work entry.
- Cards use a single blue-gray visual language rather than per-topic color coding.

## 5. Publication grouping

Public output now has exactly four groups:

1. Selected Publications / 代表性论文
2. First-author Publications / 第一作者论文
3. Co-authored Publications / 合作论文
4. Chinese Publications / 中文论文

`Other Publications / 其他论文` was removed from the public taxonomy. The Multi-Scale Enhanced Contextual Transformer paper was verified and moved to Co-authored Publications.

## 6. Publication images

- Added five local SVG thumbnails for the selected publications.
- Each image has fixed dimensions, bilingual alt text, a stable aspect ratio, and an internal source note.
- All five are original abstract site illustrations; none copy a paper figure, publisher image, PDF screenshot, journal cover, or search-engine image.

## 7. Publication metadata

- Added or normalized DOI fields for 14 records.
- Added publisher URLs where a distinct official landing page was confirmed.
- Corrected abbreviated or incomplete author lists for Trident-YOLO, TRC-YOLO, the D-YOLO vehicle paper, and the Multi-Scale paper.
- Cross-checked Yunnan University as the first-author institution for 13 DOI-resolved records through OpenAlex.
- Full field-by-field evidence is recorded in `reports/ACADEMIC_METADATA_SOURCES.md`.

## 8. Journal indicators

Historical metric values lacked an edition year. They remain in structured data for audit continuity but are no longer rendered publicly. Publication cards only render a metric when both a verified edition year and source are recorded.

## 9. Citation trend

- Added `src/components/CitationTrend.astro` using a static, accessible CSS bar chart.
- Current generated data matches 13 of 16 publications and aggregates 273 OpenAlex citations across the returned yearly series.
- The chart includes a textual summary, OpenAlex snapshot date, source limitation note, and Google Scholar profile link.
- No client-side scholarly API request is made.

## 10. Citation update workflow

- Script: `scripts/update-citations.mjs`
- Data: `src/data/generated/citations.json`
- npm command: `npm run citations:update`
- Workflow: `.github/workflows/update-citations.yml` (`Update citations`)
- Frequency: weekly, Sunday 02:17 UTC, plus manual dispatch
- Matching: DOI first; strict title plus author fallback
- Failure behavior: timeout, retry, pacing, preserve last valid records, never clear data on transient failure
- Write behavior: stable ordering and no file change when citation values are unchanged
- Authentication: repository `GITHUB_TOKEN` only; no PAT; no PR

## 11. Recent updates

The Yunnan Caiyun Postdoctoral Program entries are now distinct:

- intended training support, dated conservatively as 2025;
- Innovation Project funding, dated 2026.06.

## 12. Project corrections

- Border multimodal monitoring: Participant; Completed.
- Yunnan University research innovation records: Completed.
- Added the NSFC General Program multimodal early wildfire project as a participation record since 2025.08; no project number, funding amount, PI, or internal detail was added.
- Edge-intelligent Internet of Vehicles project: 2020.11–2021.11; Completed; Participant; natural English title.

The host-project period conflict for the border project is retained in the metadata source report for author review.

## 13. Award corrections

- Shuwei Cup: First Prize plus Graduate Division category.
- 2022 Huawei Cup: Second Prize plus National Competition category.
- 2021 and 2020 MCM: Honorable Mention / 荣誉奖 plus International Competition category.
- Award outcome and competition category are separate; no unsupported administrative level was invented.

## 14. Chinese name rule

All visitor-facing Chinese routes use `Guanbo Wang` in the header, Hero, biography, CV, publication self-author display, footer, title, description, alt text, and JSON-LD-related name fields. Automated tests reject `王冠博` in generated Chinese pages.

## 15. Removed developer-facing public copy

Removed public explanations about structured author storage, bolding rules, link maintenance, internal fields, certificate handling, private paths, and data-file behavior. Visitor-facing publication notes are limited to corresponding-author notation and citation-source limitations.

## 16. Copyright and asset provenance

- Existing portrait: retained from the accepted Phase 1 public asset.
- New publication thumbnails: original local SVG abstractions.
- Icons: original inline SVG paths in the repository.
- No third-party image CDN, publisher hotlink, PDF extraction, commercial template, external font, or tracking script.

## 17. Local validation

- `astro check`: 0 errors, 0 warnings, 0 hints.
- Structured data validation: 16 publications, 5 selected works, 11 projects, 18 awards, 2 patents, 4 resource groups.
- Static build: 14 pages generated.
- Responsive Playwright: 56/56 passed across 1440x1000, 1024x768, 768x1024, and 390x844.
- Manual screenshot inspection: English/Chinese home and Publications pages checked at 1440px and 390px; no overlap, distortion, chart overflow, or unintended horizontal scroll observed.
- Final `npm ci`, link, privacy, remote-safety, and clean-diff results are recorded before deployment.

## 18. GitHub Actions run IDs

Validation deployment run IDs will be recorded once after the first successful Polish v2 deployment. They will not be repeatedly rewritten to chase report-only workflow runs.

## 19. Online readback

The 14-route online readback will be recorded after the cleanroom Pages deployment succeeds.

## 20. Items awaiting author confirmation

- Final venue and bibliographic details for UC-Mamba before it can enter the public dataset.
- Venue, volume, issue, pages, DOI, and publisher URL for `循迹避障智能小车的实验设计`.
- DOI/OpenAlex matches for `改进 YOLO v4-tiny 的火焰实时检测` and the two other unresolved Chinese records.
- Robot path-planning patent status.
- Border-monitoring participation period conflict between the author record and the current host faculty page.
- Whether the new NSFC participation record should later display the full host-project period 2026.01–2029.12.
- Metric edition years and authoritative sources for any JCR/CAS/JIF badges to be restored publicly.

## 21. Legacy repository

`Philharmy-Wang/Philharmy-Wang.github.io` was not modified.

## 22. Pull requests

No pull request was created.

## 23. Cutover

No cutover action was executed. Repository renaming and formal-site replacement remain prohibited without `CUTOVER_APPROVED`.
