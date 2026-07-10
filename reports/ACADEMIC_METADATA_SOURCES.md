# Academic Metadata Sources — Polish v2

Verification date: `2026-07-10`

## Method

- DOI and bibliographic metadata were checked against Crossref and DOI-resolved publisher records.
- OpenAlex Works API records were used to cross-check titles, authorship, first-author institutions, work IDs, citation totals, and yearly citation counts.
- Publisher pages were preferred when Crossref and OpenAlex differed in display formatting.
- Google Scholar was not scraped. It remains an external profile and title-search link only.
- Fields that could not be matched conservatively remain empty or are withheld from public display.

## Publication updates

| Record | Fields | Previous value | Polish v2 value | Source | Status / remaining confirmation |
|---|---|---|---|---|---|
| `dpmnet` | DOI; first affiliation | DOI empty; affiliation empty | `10.1109/TCSVT.2024.3462432`; Yunnan University | [DOI](https://doi.org/10.1109/TCSVT.2024.3462432), Crossref, OpenAlex | Verified |
| `rfwnet` | DOI; first affiliation | DOI empty; affiliation empty | `10.1109/TGRS.2024.3412112`; Yunnan University | [DOI](https://doi.org/10.1109/TGRS.2024.3412112), Crossref, OpenAlex | Verified |
| `m4sfwd` | DOI; first affiliation | DOI empty; affiliation empty | `10.1016/j.eswa.2024.123489`; Yunnan University | [DOI](https://doi.org/10.1016/j.eswa.2024.123489), OpenAlex | Verified by DOI; OpenAlex title contains MathML markup, so the updater accepts only the exact resolved DOI plus site-author match |
| `forest-fire-synthetic-images` | DOI; first affiliation | DOI empty; affiliation empty | `10.1016/j.eswa.2024.125620`; Yunnan University | [DOI](https://doi.org/10.1016/j.eswa.2024.125620), Crossref, OpenAlex | Verified |
| `fighting-terrorism-yolov4` | DOI; first affiliation | DOI empty; affiliation empty | `10.1016/j.dsp.2022.103790`; Yunnan University | [DOI](https://doi.org/10.1016/j.dsp.2022.103790), Crossref, OpenAlex | Verified |
| `trident-yolo` | DOI; authors; publisher; first affiliation | DOI/publisher empty; abbreviated authors | `10.1049/ipr2.12340`; Bo Li; Rencan Nie; Wiley/IET page; Yunnan University | [DOI](https://doi.org/10.1049/ipr2.12340), [publisher](https://ietresearch.onlinelibrary.wiley.com/doi/10.1049/ipr2.12340), Crossref, OpenAlex | Verified; publication year remains the volume year 2022 rather than the 2021 online date |
| `trc-yolo` | DOI; authors; publisher; first affiliation | DOI/publisher empty; abbreviated authors | `10.1049/cvi2.12072`; Zhijun Yang; Bo Li; Yihao Wang; Liyong Bao; Wiley/IET page; Yunnan University | [DOI](https://doi.org/10.1049/cvi2.12072), [publisher](https://ietresearch.onlinelibrary.wiley.com/doi/10.1049/cvi2.12072), Crossref, OpenAlex | Verified; publication year remains the volume year 2022 rather than the 2021 online date |
| `scale-aware-rgbt-tracking` | DOI; first affiliation | DOI empty; affiliation empty | `10.1109/TMM.2025.3623526`; Yunnan University | [DOI](https://doi.org/10.1109/TMM.2025.3623526), Crossref, OpenAlex | Verified |
| `scdfuse` | DOI; first affiliation | DOI empty; affiliation empty | `10.1016/j.knosys.2025.113262`; Yunnan University | [DOI](https://doi.org/10.1016/j.knosys.2025.113262), Crossref, OpenAlex | Verified |
| `cross-modal-tracking` | DOI; first affiliation | DOI empty; affiliation empty | `10.1016/j.asoc.2025.113719`; Yunnan University | [DOI](https://doi.org/10.1016/j.asoc.2025.113719), Crossref, OpenAlex | Verified |
| `dpsnet` | DOI; first affiliation | DOI empty; affiliation empty | `10.1109/TIM.2025.3612628`; Yunnan University | [DOI](https://doi.org/10.1109/TIM.2025.3612628), Crossref, OpenAlex | Verified; the existing article number is retained from the author record |
| `non-motorized-d-yolo` | DOI; authors; publisher; first affiliation | Initial-only author list omitted Peng Hu | `10.1007/s11042-023-14385-2`; Yushan Li, Hongwei Ding, Peng Hu, Zhijun Yang, Guanbo Wang; Springer page; Yunnan University | [DOI](https://doi.org/10.1007/s11042-023-14385-2), [publisher](https://link.springer.com/article/10.1007/s11042-023-14385-2), Crossref, OpenAlex | Verified; 2024 retained as volume publication year |
| `multi-scale-contextual-transformer` | group; title casing; authors; venue; year; volume; article number; DOI; publisher; contribution; first affiliation | Other Publications; abbreviated authors; 2025; volume empty; DOI empty | Co-authored Publications; Changhui Ding, Haiyan Li, Yajie Liu, Bingbing He, Xun Lang, Guanbo Wang; Digital Signal Processing; 2026; 172; 105850; `10.1016/j.dsp.2025.105850`; Yunnan University | [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1051200425008668), [DOI](https://doi.org/10.1016/j.dsp.2025.105850), Crossref, OpenAlex | Fully verified for requested bibliographic fields; Guanbo Wang is sixth author; public publisher page reports writing—review and editing |
| `improved-yolov4-flame` | DOI structure | DOI existed only in generic link array | `10.16208/j.issn1000-7024.2022.05.021` in DOI field | Existing public DOI record | DOI retained; OpenAlex strict match unavailable |

### Unresolved publication records

- `flame-yolov4-tiny`: no DOI or strict OpenAlex match was confirmed.
- `improved-yolov4-flame`: DOI retained, but OpenAlex did not return a strict usable match during this run.
- `intelligent-car`: venue, volume, issue, pages, DOI, and publisher URL remain unconfirmed.
- UC-Mamba remains outside the public publication dataset because final venue and bibliographic details are still unconfirmed.

## Citation data

- Source: [OpenAlex Works API](https://docs.openalex.org/api-entities/works).
- Matching: DOI first; strict normalized-title plus site-author fallback.
- Current result: 13 of 16 public records matched; 273 total OpenAlex citations in the generated snapshot.
- Annual aggregate currently covers 2022–2026 as returned by OpenAlex.
- Citation numbers are not described as real-time or as Google Scholar counts.
- Legacy author-provided citation numbers were removed from publication records so the page has one auditable citation source.

## Project verification

| Project | Change | Source | Status / conflict |
|---|---|---|---|
| Border multimodal monitoring | Role Participant; status Completed | Author instruction; [Yunnan University faculty page](https://www.ise.ynu.edu.cn/faculty/54/) confirms the project title | The faculty page lists a 2023.01–2026.12 host-project period, while the author-maintained record has 2022.08–2025.08 and the user explicitly states Completed. The public page follows the user-provided participation record; the period conflict remains for confirmation. |
| Multilevel multimodal early wildfire detection | Added as an NSFC General Program participation record; participating since 2025.08 | [Yunnan University faculty page](https://www.ise.ynu.edu.cn/faculty/54/) confirms title, program type, and host-project period 2026.01–2029.12; participation date is author-provided | No project number, PI, funding amount, or internal details published. Confirm whether the public page should later show the full host-project period. |
| Edge-intelligent Internet of Vehicles | Period 2020.11–2021.11; Completed; Participant; natural English title | Author instruction | No sufficiently specific independent public record found; no identifier or additional details added. |

## Award classification sources

- Shuwei Cup: the [official competition site](https://nmmcm.org.cn/Competition/) and [competition rules](https://www.nmmcm.org.cn/News/167.html) distinguish a Graduate Division. The site uses `Graduate Division / 研究生组`, not an invented administrative level.
- Huawei Cup China Graduate Mathematical Modeling Competition: the [official national graduate innovation competition platform](https://cpipc.acge.org.cn/cw/hp/4/) identifies the event as a nationwide graduate competition. The site uses `National Competition / 全国性赛事`.
- Mathematical Contest in Modeling: [COMAP](https://www.comap.com/contests/mcm-icm) describes MCM/ICM as international contests. The site uses `International Competition / 国际赛事` and translates Honorable Mention as `荣誉奖`.
- Award outcomes and years remain author-provided. No certificate numbers, scans, or other team-member names were used.

## Journal indicators

The migrated journal badges did not contain their metric edition year. Because no open, authoritative source was available for every JCR/CAS/JIF value in this pass, the raw historical values remain in the data for audit continuity but are withheld from public cards. A badge is rendered only when both `verifiedYear` and `source` are present.

## Publication image rights

Five selected-publication thumbnails are original abstract SVG illustrations created for this site. They contain only generic diagram elements and concepts derived from titles and bibliographic abstracts. No publisher figure, PDF screenshot, journal cover, Google image result, or third-party raster asset was copied.
