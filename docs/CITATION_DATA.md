# Citation Data

The public citation trend is generated from OpenAlex metadata. It is a static snapshot and is not a live Google Scholar counter.

## Data source and update schedule

- Primary source: [OpenAlex Works API](https://docs.openalex.org/api-entities/works)
- Generated file: `src/data/generated/citations.json`
- Scheduled workflow: `Update citations`
- Frequency: weekly, Sunday at 02:17 UTC
- Manual refresh: run `npm run citations:update` locally or dispatch the workflow from GitHub Actions

## Matching logic

1. A normalized DOI is used whenever the publication record has one.
2. DOI results must still have at least 0.90 normalized-title similarity.
3. Records without a DOI use a strict title search. A result is accepted only when title similarity is at least 0.96 and the authorship includes Guanbo Wang or Wang Guanbo.
4. OpenAlex work IDs, match method, total citations, yearly counts, source, and update time are stored for auditability.

## Limitations

OpenAlex coverage and update timing differ from Google Scholar, Semantic Scholar, Crossref, and publisher platforms. Counts may lag, and works that cannot be matched conservatively are omitted rather than guessed. The public chart therefore describes a reproducible OpenAlex snapshot, not an official real-time total.

## Failure fallback

The updater uses timeouts, retries, and paced requests. When a request fails or no strict match is available, the last valid record is preserved. The script never clears existing citation data because of a transient network failure, and the site renders a visitor-facing fallback when no usable trend exists.
