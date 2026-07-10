# Privacy Audit

## Public-data policy

All tracked files are treated as public internet content. The cleanroom contains only public academic profile information, a public contact email, public scholarly profile links, selected publication/project/award facts, and one public portrait.

## Excluded material

- [policy-only] BRID and other personal research identifiers
- [policy-only] Certificate-number fields and certificate scans
- Other certificate team members’ names
- Funding amounts and internal project identifiers
- Private workspace URLs, server locations, experiment directories, and local paths
- Credentials, access keys, private network addresses, and unpublished dataset locations

Automated scanning runs through `npm run privacy:audit` and fails on sensitive assignments, private network addresses, private paths, and prohibited identifier fields.
