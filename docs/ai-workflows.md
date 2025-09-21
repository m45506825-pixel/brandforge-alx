# AI Workflows Evidence

This document captures concrete examples of how AI was used throughout the build.

## 1) API-aware prompting and client generation
- Defined a backend contract for `POST /api/social-writeup` in README.
- Prompted AI to generate a minimal client function using `fetch` and to construct a robust prompt for the LLM.
- Implemented `generateSocialWriteup()` in `src/services/aiService.ts` using Gemini for local demos.

## 2) In-IDE scaffolding (components, styles, tests)
- Used AI to scaffold React components with Tailwind classes and consistent `data-testid`s.
- Asked AI to propose a small test suite using Vitest + Testing Library. Tests live in `src/__tests__/` and target happy-path interactions:
  - BrandingTools: add color and logo upload interaction
  - ProductCraft: select background and trigger undo/redo/save
  - SocialMediaPosts: select platform/post type, edit caption, and trigger actions

## 3) AI-powered reviews and changelogs
- Requested AI to scan for missing test ids and unify naming (`pc-`, `bt-`, `sm-`).
- Asked AI to draft commit messages and a changelog summary for key milestones (see examples below).

Example commit messages (AI-assisted):
- `feat(productcraft): add AI edit/filter/adjust/remove-bg actions`
- `test: add interaction tests for branding and social posts`
- `docs: document API contract and AI workflows`
- `chore: add .env.example and tighten types`

## 4) Documentation and prompts
- AI generated the initial README sections. I curated security notes and production recommendations.
- Wrote reflection and this AI workflows document with AI as a drafting assistant.

## 5) Next steps suggested by AI
- Move AI requests server-side and enable Vite dev proxy.
- Add e2e tests for `/api/social-writeup`.
- Integrate Supabase for persistence and auth.
