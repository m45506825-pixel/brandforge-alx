import React, { useMemo, useState } from 'react';
import { PlusCircle, FolderOpen, Sparkles, Copy, Send, X } from 'lucide-react';
import { Project } from '../types';

interface DashboardProps {
	onCreateNew: () => void;
	onOpenProject: (project: Project) => void;
}

// Temporary sample data until real persistence is added
const sampleProjects: Project[] = [
	{
		id: 'p1',
		name: 'Summer Product Shoot',
		lastModified: new Date(),
		template: {
			id: 't1',
			name: 'Instagram Square',
			category: 'social',
			dimensions: { width: 1080, height: 1080 },
			preview: 'https://via.placeholder.com/200?text=Project+1',
			platform: 'instagram'
		},
		thumbnail: 'https://via.placeholder.com/300x300.png?text=Summer'
	},
	{
		id: 'p2',
		name: 'New Product Launch',
		lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
		template: {
			id: 't2',
			name: 'Product Showcase',
			category: 'product',
			dimensions: { width: 1200, height: 800 },
			preview: 'https://via.placeholder.com/200?text=Project+2'
		},
		thumbnail: 'https://via.placeholder.com/300x300.png?text=Launch'
	}
];

export const Dashboard: React.FC<DashboardProps> = ({ onCreateNew, onOpenProject }) => {
	// --- AI Social Media Writeup (modal) state ---
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [platform, setPlatform] = useState<'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'tiktok'>('instagram');
	const [wordLimit, setWordLimit] = useState<number>(80);
	const [brief, setBrief] = useState('');
	const [tone, setTone] = useState<'casual' | 'professional' | 'playful' | 'inspirational'>('casual');
	const [generating, setGenerating] = useState(false);
	const [result, setResult] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const platformHint = useMemo(() => {
		switch (platform) {
			case 'instagram':
				return 'Add 3-5 relevant hashtags and a short CTA.';
			case 'linkedin':
				return 'Keep it professional and value-driven.';
			case 'facebook':
				return 'Conversational tone works well; keep it concise.';
			case 'twitter':
				return 'Aim for brevity and clarity; add 1-2 hashtags.';
			case 'tiktok':
				return 'Fun and catchy, suited for short-form video captions.';
			default:
				return '';
		}
	}, [platform]);

	async function generateWriteup() {
		setErrorMsg('');
		setResult('');
		if (!brief.trim()) {
			setErrorMsg('Please provide a short brief or topic.');
			return;
		}
		if (wordLimit < 20 || wordLimit > 600) {
			setErrorMsg('Word limit should be between 20 and 600.');
			return;
		}

		try {
			setGenerating(true);
			// Call backend endpoint (secrets stay server-side)
			const res = await fetch('/api/social-writeup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ platform, wordLimit, tone, brief }),
			});
			if (!res.ok) {
				const text = await res.text();
				throw new Error(`Backend error ${res.status}: ${text}`);
			}
			const contentType = res.headers.get('content-type') || '';
			if (contentType.includes('application/json')) {
				const data = await res.json();
				const text = data?.text ?? data?.result ?? '';
				setResult(String(text).trim());
			} else {
				const text = await res.text();
				setResult(text.trim());
			}
		} catch (err: any) {
			setErrorMsg(err?.message || 'Failed to generate writeup. Check console for details.');
			// eslint-disable-next-line no-console
			console.error(err);
		} finally {
			setGenerating(false);
		}
	}

	function copyToClipboard() {
		if (!result) return;
		navigator.clipboard.writeText(result).catch(() => {});
	}

	return (
		<div className="p-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-10">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">Your Projects</h1>
						<p className="text-gray-600">Create and manage product visuals, brand assets and social posts.</p>
					</div>
					<button
						onClick={onCreateNew}
						className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:from-purple-700 hover:to-pink-700 transition-colors"
					>
						<PlusCircle className="w-5 h-5" />
						<span>New Project</span>
					</button>
				</div>

				{/* Quick Tools (icon tile) */}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
					<button
						onClick={() => setIsModalOpen(true)}
						className="group bg-white border border-gray-200 rounded-xl p-4 text-left shadow-sm hover:shadow-md transition-all"
					>
						<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
							<Sparkles className="w-5 h-5 text-white" />
						</div>
						<div className="font-semibold text-gray-900 group-hover:text-purple-700">AI Social Writeup</div>
						<div className="text-xs text-gray-500 mt-1">Generate captions with AI</div>
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{sampleProjects.map(project => (
						<button
							key={project.id}
							onClick={() => onOpenProject(project)}
							className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all text-left"
						>
							<div className="aspect-square bg-gray-100 overflow-hidden">
								<img
									src={project.thumbnail}
									alt={project.name}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform"
								/>
							</div>
							<div className="p-4">
								<h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600">{project.name}</h3>
								<p className="text-xs text-gray-500">
									Updated {project.lastModified.toLocaleDateString()}
								</p>
							</div>
							<div className="absolute top-3 left-3 bg-white/80 backdrop-blur px-2 py-1 rounded text-xs font-medium text-gray-700 flex items-center space-x-1">
								<FolderOpen className="w-3 h-3" />
								<span>{project.template.category}</span>
							</div>
						</button>
					))}
				</div>

				{/* Modal: AI Social Media Writeup */}
				{isModalOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						<div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
						<div className="relative bg-white w-full max-w-2xl mx-4 rounded-xl shadow-xl border border-gray-200">
							<div className="flex items-center justify-between p-4 border-b border-gray-200">
								<div className="flex items-center space-x-2">
									<Sparkles className="w-5 h-5 text-purple-600" />
									<h3 className="text-lg font-semibold text-gray-900">AI Social Media Writeup</h3>
								</div>
								<button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
									<X className="w-4 h-4 text-gray-600" />
								</button>
							</div>

							<div className="p-4">
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
										<select
											className="w-full p-2 border border-gray-300 rounded-lg"
											value={platform}
											onChange={(e) => setPlatform(e.target.value as typeof platform)}
										>
											<option value="instagram">Instagram</option>
											<option value="facebook">Facebook</option>
											<option value="linkedin">LinkedIn</option>
											<option value="twitter">Twitter</option>
											<option value="tiktok">TikTok</option>
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Word limit</label>
										<input
											type="number"
											min={20}
											max={600}
											value={wordLimit}
											onChange={(e) => setWordLimit(Number(e.target.value))}
											className="w-full p-2 border border-gray-300 rounded-lg"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
										<select
											className="w-full p-2 border border-gray-300 rounded-lg"
											value={tone}
											onChange={(e) => setTone(e.target.value as typeof tone)}
										>
											<option value="casual">Casual</option>
											<option value="professional">Professional</option>
											<option value="playful">Playful</option>
											<option value="inspirational">Inspirational</option>
										</select>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Brief / topic</label>
									<textarea
										rows={3}
										value={brief}
										onChange={(e) => setBrief(e.target.value)}
										placeholder={`e.g. Announce our new eco-friendly water bottle launch with early-bird discount.`}
										className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									/>
									<p className="text-xs text-gray-500 mt-1">Hint: {platformHint}</p>
								</div>

								<div className="mt-4 flex items-center space-x-3">
									<button
										onClick={generateWriteup}
										disabled={generating}
										className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition-colors ${
											generating ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
										}`}
									>
										<Send className="w-4 h-4" />
										<span>{generating ? 'Generating…' : 'Generate'}</span>
									</button>
									{result && (
										<button
											onClick={copyToClipboard}
											className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
										>
											<Copy className="w-4 h-4" />
											<span>Copy</span>
										</button>
									)}
									{errorMsg && <span className="text-sm text-red-600">{errorMsg}</span>}
								</div>

								{result && (
									<div className="mt-4">
										<label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
										<div className="bg-gray-50 border border-gray-200 rounded-lg p-4 whitespace-pre-wrap text-gray-900">
											{result}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				)}

				{sampleProjects.length === 0 && (
					<div className="text-center py-20">
						<div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
							<PlusCircle className="w-10 h-10 text-purple-500" />
						</div>
						<h2 className="text-xl font-semibold text-gray-800 mb-2">No projects yet</h2>
						<p className="text-gray-600 mb-6">Create your first product crafting project to get started.</p>
						<button
							onClick={onCreateNew}
							className="bg-purple-600 text-white px-5 py-3 rounded-lg font-medium shadow hover:bg-purple-700 transition-colors"
						>
							Start New Project
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;