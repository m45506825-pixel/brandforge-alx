BrandForge (React + Vite + Tailwind)

Overview
BrandForge is a React + TypeScript app powered by Vite and Tailwind CSS. It helps you craft product visuals, apply brand styles, and generate social media assets. The Dashboard includes a tile to generate AI social media writeups via a secure backend endpoint you provide or via Gemini if configured.

Features implemented
- Dashboard with recent projects and quick tools (AI Social Writeup modal)
- Product Craft studio (upload, enhance, backgrounds, properties, AI edit/filter/adjust/remove-bg)
- Brand Style tools (colors, logo upload, social/marketing templates)
- Social Media Posts (platform presets, canvas preview, captions, hashtag helpers, actions)
- Unit tests for core user interactions (BrandingTools, ProductCraft, SocialMediaPosts)

Technologies used
- React 18 + TypeScript
- Vite 5 (dev server and build)
- Tailwind CSS 3
- ESLint 9
- Vitest + Testing Library (React, JSDOM)
- Icons: lucide-react

Setup
Prerequisites
- Node.js 18+ and npm

Environment variables
- Copy `.env.example` to `.env` and fill in values as needed.

Local development
```powershell
npm install
npm run dev
```

Run tests
```powershell
npm run test
```

Build for production
```powershell
npm run build
```

Preview production build locally
```powershell
npm run preview
```

Project structure (abridged)
```
brandforge/
	src/
		App.tsx
		index.css
		main.tsx
		components/
			Dashboard.tsx          # Dashboard with AI Social Writeup modal
			ProductCraft.tsx
			BrandingTools.tsx
			SocialMediaPosts.tsx
		types/
			index.ts
	index.html
	package.json
	tailwind.config.js
	vite.config.ts
	tsconfig*.json
	docs/ai-workflows.md      # Evidence of AI workflows used in development
	reflection.md             # Reflection on AI’s impact
```

Styling
- Tailwind CSS utility classes are used throughout. Configuration files: `tailwind.config.js` and `postcss.config.js`.

AI usage (tools and contexts)
- IDE assistant: GitHub Copilot in VS Code to scaffold components, write tests, and refactor.
- API-aware prompting: Designed and documented the `/api/social-writeup` spec, then generated a typed client function and prompts for Gemini in `src/services/aiService.ts`.
- AI image operations: `src/services/imageEditingService.ts` uses Google Gemini via `@google/genai` for edit/filter/adjust/enhance/background removal. All calls require a valid `VITE_GEMINI_API_KEY` and run client-side for demos only. For production, move API calls server-side.
- AI-powered code review: Used assistant passes to suggest small improvements (types, test IDs, status markers). See `docs/ai-workflows.md` for examples.

AI Social Writeup (backend contract)
The frontend displays an “AI Social Writeup” tile on the Dashboard. Clicking it opens a modal with inputs for platform, word limit, tone, and brief. When you click Generate, the app calls your backend endpoint or the Gemini helper from `aiService.ts`.

Endpoint (you implement server-side)
- Method: POST
- Path: `/api/social-writeup`
- Request body (JSON):
	- `platform`: "instagram" | "facebook" | "linkedin" | "twitter" | "tiktok"
	- `wordLimit`: number (20–600)
	- `tone`: "casual" | "professional" | "playful" | "inspirational"
	- `brief`: string (short description of what to write)
- Response (recommended):
	- JSON: `{ "text": string }` (or `{ "result": string }`)
	- Alternatively, return plain text in the response body
- Status codes: 200 on success; 4xx/5xx with a helpful error message on failure

Basic Express example (optional)
```ts
// server.ts (example only — do not commit secrets)
import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

app.post('/api/social-writeup', async (req, res) => {
	try {
		const { platform, wordLimit, tone, brief } = req.body || {};
		if (!brief || !platform || !wordLimit || !tone) {
			return res.status(400).send('Missing required fields');
		}

		const prompt = `You are an expert social media copywriter. Write a ${tone} ${platform} caption about: "${brief}". ` +
			`Strictly keep it under ${wordLimit} words.`;

		const openaiApiKey = process.env.OPENAI_API_KEY!; // set securely
		const r = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${openaiApiKey}`,
			},
			body: JSON.stringify({
				model: 'gpt-4o-mini',
				temperature: 0.7,
				messages: [
					{ role: 'system', content: 'You write concise, impactful social media copy.' },
					{ role: 'user', content: prompt },
				],
			}),
		});
		if (!r.ok) return res.status(r.status).send(await r.text());
		const data = await r.json();
		const text = data?.choices?.[0]?.message?.content?.trim() || '';
		return res.json({ text });
	} catch (e: any) {
		return res.status(500).send(e?.message || 'Failed to generate');
	}
});

app.listen(3000, () => console.log('API on http://localhost:3000'));
```

Vite dev proxy (optional)
If your backend runs on a different port in development, you can proxy `/api` to it by editing `vite.config.ts`:

```ts
// vite.config.ts (snippet)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			},
		},
	},
});
```

Security
- API keys must never be exposed in client code. Keep provider keys (OpenAI/Gemini) on the server where possible.
- For demo purposes this project can call Gemini from the browser with `VITE_GEMINI_API_KEY`, but production deployments should proxy via a server to avoid key exposure.
- Consider rate-limiting and audit logging on your backend.

Version control & commits
- Keep commits focused and well-labeled (Conventional Commits are recommended).
- Label AI-assisted changes using a tag in the subject or body, e.g., `[AI-assist]`.
- See `CONTRIBUTING.md` for examples.

Troubleshooting
- Browserslist warning: update the db (optional)
	```powershell
	npx update-browserslist-db@latest
	```
- Vulnerabilities: review and auto-fix where possible
	```powershell
	npm audit
	npm audit fix
	```

License
- TBD
