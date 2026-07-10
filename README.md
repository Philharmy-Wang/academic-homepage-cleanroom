# Guanbo Wang / 王冠博 — Academic Homepage

An independent bilingual academic homepage built with Astro, strict TypeScript, native CSS, and static GitHub Pages deployment.

## Local development

```sh
npm ci
npm run dev
```

## Quality and safety

```sh
npm run audit:all
npm run safety:remote
npm run citations:update
```

The versioned pre-push hook and remote policy allow pushes only to the approved repository owned by `Philharmy-Wang`. This repository is intentionally independent and must never be connected to an upstream template or used to open pull requests against another repository.

See [SECURITY_REMOTE_POLICY.md](SECURITY_REMOTE_POLICY.md) for the complete remote-safety design.

## Citation data

Publication citation snapshots are generated from OpenAlex and stored locally for static rendering. The updater prefers DOI matches, applies a strict title-and-author fallback, and preserves the last valid data when an API request fails. See [docs/CITATION_DATA.md](docs/CITATION_DATA.md) for the matching rules, weekly workflow, limitations, and manual refresh process.
