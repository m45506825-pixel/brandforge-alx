# Reflection: Building with AI Assistance (~500 words)

This capstone was a deliberate exercise in planning with AI as a force multiplier, not an autopilot. I started by scoping the core features (Product Craft studio, Brand Style tools, Social Media Posts, and an AI Social Writeup flow) and then used AI to accelerate repetitive tasks, fill boilerplate, and suggest small ergonomic improvements. The end result is a working React + TypeScript project built with Vite and Tailwind, and a modest but meaningful test suite that validates key interactions.

What worked well
- Structured prompting: Outlining the feature surface and providing constraints (tech stack, test runner, test IDs) produced high-quality code completions. AI proposed consistent component structure, typed props, and tailwind utility patterns that matched the project style.
- Rapid scaffolding: Generating UI shells for components like BrandingTools, ProductCraft, and SocialMediaPosts was fast. AI filled out repetitive patterns (cards, buttons, grids) and wired data-testid attributes so tests could be written quickly.
- Tests-as-guardrails: Writing tests (with Testing Library + Vitest) guided the components’ public interactions and helped prevent regressions during refactors. AI was helpful in stubbing user flows and suggesting accessible selectors.
- API-aware generation: For the AI Social Writeup, I documented the POST /api/social-writeup contract and then used AI to craft a reasonable prompt, validation, and client-side wiring. I also added a Gemini-based service with clear assumptions and warnings on moving inference server-side in production.

What felt limiting
- Hallucinated APIs: AI occasionally referenced non-existent helpers or versions. I mitigated by asking it to prefer first-party libraries already in package.json and to avoid introducing new dependencies unless necessary.
- Overconfident typing: Sometimes AI created overly broad or misaligned types (e.g., inferred unions), which required manual pruning for simplicity and test compatibility.
- Image generation assumptions: Client-side calls to generative image APIs are convenient for demos but risky for production. Documenting those trade-offs and providing a server-proxy pattern was necessary.

Prompting, reviewing, iterating
- I used a consistent cycle: (1) describe the desired outcome and constraints, (2) ask AI for a draft, (3) review for correctness and security, (4) run tests and fix issues, (5) commit with a clear message. When a suggestion was ambiguous, I asked AI for a minimal, typed example and integrated selectively.
- I leaned on AI for docstrings, inline comments, and README segments, but I kept security guidance human-authored and explicit (no client-side key leaks in production, add a dev proxy, etc.).
- For refactors, I requested small deltas—"add a test id", "store a tiny status string"—which avoided broad changes.

Lessons learned
- Give AI just enough context: paths, filenames, acceptance criteria, and examples. This drastically improves relevance.
- Keep tests small and integration-oriented. They provide anchors for AI to generate code that satisfies user flows.
- Treat AI as a senior pair programmer for speed, but retain human judgment on architecture and security.

What I’d do next
- Move AI calls server-side (with a simple Express/Cloud function) and add e2e tests for the end-to-end writeup flow via a dev proxy.
- Add persistence (Supabase is already listed as a dep), feature-flagging for AI features, and a minimal design token system to unify spacing/typography.
- Expand tests to cover error states and edge cases (empty inputs, large payloads, rate limiting).

Overall, AI made the development loop faster and more focused on UX and integration. The key was to keep ownership of requirements and use AI to accelerate—not replace—engineering discipline.
