import React from 'react';
import { PlusCircle, FolderOpen } from 'lucide-react';
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