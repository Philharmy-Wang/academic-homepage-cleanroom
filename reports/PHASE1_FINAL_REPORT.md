# Phase 1 Final Report

Status: `WAITING_FOR_CUTOVER_APPROVAL`

## 1. Repository and independence

- Repository: https://github.com/Philharmy-Wang/academic-homepage-cleanroom
- Default branch: `main`
- Site implementation and successful deployment commit: `4bcd0e4652c8e5a384dd21c76bfea83e916dbfcd`
- Visibility: public
- `fork`: `false`
- `parent`: `null`
- `source`: `null`
- Legacy repository: unchanged, public, not archived
- Pull requests created: none

## 2. Git remote safety

- Remote count: one
- Remote name: `origin`
- Fetch URL: `https://github.com/Philharmy-Wang/academic-homepage-cleanroom.git`
- Push URL: `https://github.com/Philharmy-Wang/academic-homepage-cleanroom.git`
- `remote.pushDefault`: `origin`
- `push.default`: `simple`
- `core.hooksPath`: `.githooks`
- Versioned pre-push hook: enabled and executable
- Allowlisted real push: passed
- Non-allowlisted remote test: rejected
- Forced/non-fast-forward updates and remote-main deletion: rejected by policy

## 3. Preview deployment

- Pages URL: https://philharmy-wang.github.io/academic-homepage-cleanroom/
- Pages source: GitHub Actions workflow
- HTTPS enforcement: enabled
- Quality workflow: success — https://github.com/Philharmy-Wang/academic-homepage-cleanroom/actions/runs/29065100167
- Pages deployment workflow: success — https://github.com/Philharmy-Wang/academic-homepage-cleanroom/actions/runs/29065100154
- All fourteen page routes: HTTP 200
- Public portrait, favicon, and generated CSS: HTTP 200
- Legacy root site: HTTP 200 and unchanged

The first deployment attempt used the official Astro Action default of Node 20 and was rejected by Astro 7, which requires Node 22. The workflow was corrected to specify Node 22; the focused fix and subsequent deployment both passed.

## 4. Technical stack

- Astro 7 static output
- Strict TypeScript
- Native CSS with shared design tokens
- npm and committed lockfile
- GitHub Actions and GitHub Pages
- Playwright with system Chrome for local visual and responsive validation
- No React, Vue, Tailwind, Bootstrap, or third-party academic homepage template

## 5. Page inventory

English:

- `/`
- `/research/`
- `/publications/`
- `/projects/`
- `/datasets/`
- `/awards/`
- `/cv/`

Chinese:

- `/zh/`
- `/zh/research/`
- `/zh/publications/`
- `/zh/projects/`
- `/zh/datasets/`
- `/zh/awards/`
- `/zh/cv/`

## 6. Content migration

Migrated and restructured:

- Public profile, bilingual biography, position, affiliation, email, Scholar, and GitHub
- Six research lines organized by problem, method focus, and status
- Education and employment timelines
- Sixteen publication records with structured authors, roles, contributions, selected metrics, and qualified citation notes
- Ten project records without funding amounts or internal identifiers
- Eighteen grant, talent, academic, competition, and other recognition records
- Two verified granted-patent records
- Eight recent updates
- Four resource-status entries
- Public portrait and favicon

Excluded:

- Personal research identifiers and certificate identifiers
- Certificate scans and other certificate team members’ names
- Funding amounts and internal project numbers
- Private workspace links, private storage paths, server locations, and experiment directories
- Legacy theme code, CSS, layouts, includes, scripts, fonts, workflow, CNAME, template license, Git metadata, and commit history

## 7. Build and automated quality results

- `npm ci`: passed; 0 reported vulnerabilities
- `astro check`: 0 errors, 0 warnings, 0 hints
- Static build: passed; 14 pages generated
- Structured-data validation: passed
- Internal link/resource validation: passed; 202 references checked
- Privacy audit: passed
- Remote safety audit: passed
- `git diff --check`: passed

## 8. Visual and responsive validation

- Routes: 14
- Viewports: 1440x1000, 1024x768, 768x1024, 390x844
- Browser assertions: 56/56 passed
- Local screenshots: 56 generated and excluded from Git
- Checked: horizontal overflow, header bounds, mobile menu accessibility, Escape close behavior, language-peer routes, image loading and aspect ratio, buttons, internal response status, console errors, and footer placement
- Representative desktop and mobile screenshots were manually inspected after the automated run

## 9. SEO, accessibility, and print

- Unique title and description on each page
- Canonical and `hreflang` links for English and Chinese peers
- Open Graph metadata
- Public-only Person JSON-LD on both home routes
- Correct `lang`, heading structure, skip link, alt text, keyboard navigation, and `focus-visible`
- A4-friendly print stylesheet for CV pages

## 10. Items awaiting author confirmation

- Venue and final bibliographic details for the UC-Mamba record
- Remaining bibliographic details for “循迹避障智能小车的实验设计”
- Status of the robot path-planning patent record
- Additional official DOI, publisher, PDF, code, dataset, or project links
- Whether journal metrics and author-provided citation counts should be refreshed in a future content update

## 11. Main improvements over the legacy site

- New independent repository and Git history with no fork or upstream relationship
- Original responsive design replacing the legacy blog theme and float layout
- Structured bilingual content and route-preserving language switch
- Structured publication authors instead of embedded author HTML
- Placeholder suppression for unverified metrics
- Dedicated privacy, data, internal-link, remote-safety, and responsive audits
- Permanent pre-push remote allowlist
- Static GitHub Pages deployment with reproducible Actions workflows

## 12. Cutover procedure — not executed

Cutover remains blocked until the user replies with the exact approval phrase `CUTOVER_APPROVED`.

After that approval only:

1. Re-verify the cleanroom build, Pages preview, account, fork metadata, sole origin, clean worktree, and pushed main branch.
2. Rename the legacy repository to `Philharmy-Wang.github.io-legacy-202607` without deleting, archiving, or rewriting it.
3. Rename the cleanroom repository to `Philharmy-Wang.github.io`.
4. Update the local origin, Astro base configuration, and remote allowlist.
5. Re-run all audits and the build.
6. Commit and push the root-site configuration without force push.
7. Confirm root English and Chinese pages and verify `fork=false`, `parent=null`, and `source=null` again.

No cutover action has been performed in Phase 1.
