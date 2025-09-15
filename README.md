BrandForge (React + Vite + Tailwind)

Overview
BrandForge is a React + TypeScript app powered by Vite and Tailwind CSS. It helps you craft product visuals, apply brand styles, and generate social media assets. The Dashboard includes a tile to generate AI social media writeups via a secure backend endpoint you provide.

Key features
- Dashboard with recent projects and quick tools
- Product Craft studio (upload, enhance, backgrounds, properties)
- Brand Style tools (colors, logo, templates)
- Social Media Posts (platform presets, canvas preview, captions)
- AI Social Writeup modal (platform, tone, word limit, brief) – calls your backend

Tech stack
- React 18 + TypeScript
- Vite 5 (dev server and build)
- Tailwind CSS 3
- ESLint 9
- Icons: lucide-react

Getting started
Prerequisites
- Node.js 18+ and npm

Install dependencies
```powershell
npm install
```

Run in development
```powershell
npm run dev
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
```

Available scripts
- npm run dev – start Vite dev server
- npm run build – production build
- npm run preview – preview the built app locally
- npm run lint – run ESLint

Styling
- Tailwind CSS utility classes are used throughout. Configuration files: `tailwind.config.js` and `postcss.config.js`.

AI Social Writeup (backend contract)
The frontend displays an “AI Social Writeup” tile on the Dashboard. Clicking it opens a modal with inputs for platform, word limit, tone, and brief. When you click Generate, the app calls your backend endpoint.

Endpoint (you implement)
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

		// Build a single provider prompt (you can switch to Gemini if preferred)
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
- API keys must never be exposed in client code. Keep provider keys (OpenAI/Gemini) on the server.
- Consider rate-limiting and audit logging on your backend.

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
