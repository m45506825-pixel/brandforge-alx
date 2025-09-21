# Contributing & Commit Guidelines

## Commit style
Use Conventional Commits:
- feat: a new feature
- fix: a bug fix
- docs: documentation only changes
- test: adding or updating tests
- chore: tooling, configs, non-prod code changes

Examples:
- feat(productcraft): add AI filter action and status display
- test(social): cover caption edit and actions
- docs: expand README with setup and AI usage

When changes are AI-assisted, consider adding a tag to the subject or body:
- feat(branding): add color swatches [AI-assist]

## Pull requests
- Keep PRs focused and small.
- Include a summary of the change and screenshots for UI changes.
- Link to any related issues or docs.

## Development
- Install deps: `npm install`
- Run dev server: `npm run dev`
- Run tests: `npm run test`
- Lint: `npm run lint`

## Security
- Never commit secrets. Use `.env` and avoid exposing provider keys in client code. For production deployments, add a server proxy to handle API calls to LLM providers.
