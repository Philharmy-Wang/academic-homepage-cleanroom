# Git Remote Safety Policy

## Independence

This repository was created as a new, empty GitHub repository and initialized locally with a new Git history. It was not forked or cloned from a template. The legacy website was downloaded as a ZIP and used only as a read-only content source; its Git metadata, theme code, workflows, and history were not copied.

## Allowlist

- Allowed owner: `Philharmy-Wang`
- Preview-phase repository: `academic-homepage-cleanroom`
- Required remote name: `origin`
- Maximum remote count: one
- Pull requests to any other repository are prohibited.

The active allowlist is stored in `.remote-policy.json`. During the approved cutover only, the repository value must be changed to `Philharmy-Wang.github.io` in the same commit that updates the deployment base path. No cutover change is permitted without the exact approval phrase defined in the migration report.

## Pre-push protection

`.githooks/pre-push` rejects:

- any remote name other than `origin`;
- any URL outside the exact allowlisted owner and repository;
- blocked owners or an upstream-style destination;
- deletion of the remote `main` branch;
- non-fast-forward updates, including forced pushes.

The repository config must point `core.hooksPath` to `.githooks`.

## Verification

Run `npm run safety:remote` before every push. The checker verifies the active GitHub account locally, remote count and URLs, parsed owner/repository, and GitHub API metadata. A safe repository must report `fork=false` with no `parent` and no `source`.

GitHub Actions validates the repository identity from the protected workflow context because its short-lived automation identity is not the human account.
