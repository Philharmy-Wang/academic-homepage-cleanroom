# Remote Safety Report

- Allowed owner: `Philharmy-Wang`
- Allowed preview repository: `academic-homepage-cleanroom`
- Required remote: `origin` only
- Allowed URL forms: exact HTTPS or SSH URL for the allowlisted repository
- GitHub API requirement: `fork=false`, `parent=null`, `source=null`
- Local account requirement: active `gh` account must be `Philharmy-Wang`
- Hook: `.githooks/pre-push`
- Hook policy: reject non-origin remotes, non-allowlisted URLs, non-fast-forward updates, and remote-main deletion
- Manual command before every push: `npm run safety:remote`

The active verification output is intentionally generated at runtime rather than storing account tokens or machine-specific paths in this public report.
