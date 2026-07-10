# Google Scholar Reconciliation — Polish v2.2

- Profile: <https://scholar.google.com/citations?user=Np7b_CQAAAAJ&hl=zh-TW>
- Read-only capture: 2026-07-10
- Snapshot month used by the site: `2026-07`
- Scholar items observed: **20**
- Existing site records before reconciliation: **16**
- Independent formal publications added: **2**
- Duplicate metadata/version entries merged: **2**
- Final deduplicated public-site publications: **18**

No material was present under `manual-input/google-scholar-2026-07/`. One low-frequency, read-only profile access was used; no crawler, CAPTCHA bypass, or repeated retry was performed. The visible profile totals were 362 citations, h-index 9, and i10-index 8. Annual Scholar values were not legible, so none were invented; the existing annual chart remains explicitly labelled as OpenAlex.

## Item-level reconciliation

| # | Scholar title | Year shown | Citations | Site record | Classification | Resolution |
|---:|---|---:|---:|---|---|---|
| 1 | Fighting against terrorism: A real-time CCTV autonomous weapons detection based on improved YOLO v4 | 2023 | 69 | `fighting-terrorism-yolov4` | already-listed | DOI/title match. |
| 2 | M4SFWD: A multi-faceted synthetic dataset for remote sensing forest wildfires detection | 2024 | 68 | `m4sfwd` | already-listed | DOI/title match. |
| 3 | TRC-YOLO: A real-time detection method for lightweight targets based on mobile devices | 2022 | 59 | `trc-yolo` | already-listed | DOI/title match. |
| 4 | Trident-YOLO: Improving the precision and speed of mobile device object detection | 2022 | 43 | `trident-yolo` | already-listed | DOI/title match. |
| 5 | RFWNet: A multiscale remote sensing forest wildfire detection network… | 2024 | 36 | `rfwnet` | already-listed | DOI/title match. |
| 6 | Fighting against forest fire: A lightweight real-time detection approach… | 2025 | 27 | `forest-fire-synthetic-images` | already-listed | DOI/title match. |
| 7 | DPMNet: A remote sensing forest fire real-time detection network… | 2024 | 25 | `dpmnet` | already-listed | Scholar uses the online year; final volume is 2025. Counted once. |
| 8 | SCDFuse: A semantic complementary distillation framework… | 2025 | 15 | `scdfuse` | already-listed | DOI/title match. |
| 9 | Scale-aware attention and multi-modal prompt learning… | 2025 | 9 | `scale-aware-rgbt-tracking` | already-listed | Scholar uses the online year; final volume is 2026. Counted once. |
| 10 | Real-time detection algorithm for non-motorized vehicles based on D-YOLO model | 2024 | 5 | `non-motorized-d-yolo` | already-listed | DOI/title match. |
| 11 | DPSNET: A dual-path lightweight network… | 2025 | 2 | `dpsnet` | already-listed | DOI/title match. |
| 12 | Multi-scale enhanced contextual transformer network for forest fire detection | 2025 | 1 | `multi-scale-contextual-transformer` | already-listed | Scholar uses the online year; final volume is 2026. Counted once. |
| 13 | Cross-modal deep interaction and modal-aware aggregation network… | 2025 | 1 | `cross-modal-tracking` | already-listed | DOI/title match. |
| 14 | Real-time flame detection with improved YOLO v4-tiny | 2022 | 1 | `flame-yolov4-tiny` | duplicate-version | English metadata version of item 15; one public record and one citation value. |
| 15 | 改进 YOLO v4-tiny 的火焰实时检测 | 2022 | 1 | `flame-yolov4-tiny` | already-listed | Chinese formal record retained. |
| 16 | Multi-scale Frequency-domain Reconstruction and Multi-dimensional Collaborative Attention Network… | 2025 | — | `aibdf-forest-fire` | missing-formal-publication | Added after DOI `10.1109/AIBDF67964.2025.11440841` verified authors, proceedings, year, and pages 799–803. |
| 17 | UC-Mamba: Adaptive Cross-Level Fusion Network… | 2025 | — | `uc-mamba` | missing-formal-publication | Added after DOI/publisher verification: *Computers in Biology and Medicine* 196(C), article 110869. |
| 18 | 改进 YOLOv4 的火焰图像实时检测 | 2022 | — | `improved-yolov4-flame` | already-listed | DOI/title match. |
| 19 | Experimental Design of Tracking and Obstacle Avoidance Intelligent Car | 2021 | — | `intelligent-car` | duplicate-version | English metadata version of item 20; counted once. |
| 20 | 循迹避障智能小车的实验设计 | 2021 | — | `intelligent-car` | already-listed | Chinese formal record retained. |

## Counting decision

The profile contains 20 rows, but rows 14/15 and 19/20 are two metadata-language representations of the same works. DOI-first and normalized-title fallback deduplication therefore produces 18 independent formal publications. There were no remaining `preprint-version`, `incomplete-metadata`, `not-for-public-site`, or `needs-author-confirmation` items after publisher/Crossref verification.

## Source separation

`src/data/manual/google-scholar-snapshot.json` is the sole public source for profile totals, h-index, i10-index, and per-work citation counts. `src/data/generated/citations.json` remains OpenAlex-only and is used solely for the independently labelled annual trend cross-check.
