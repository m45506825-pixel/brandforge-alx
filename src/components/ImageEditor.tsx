import React, { useState, useRef } from 'react';
import { Upload, Move, Scissors, Palette, Type, Image as ImageIcon, Sparkles, Undo, Redo, Save } from 'lucide-react';
import { EditingTool } from '../types';

interface ImageEditorProps {
  onBack: () => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ onBack }) => {
  const [selectedTool, setSelectedTool] = useState<string>('move');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tools: EditingTool[] = [
    { id: 'move', name: 'Move', icon: 'Move', description: 'Move and resize elements', category: 'basic' },
    { id: 'crop', name: 'Crop', icon: 'Scissors', description: 'Crop and trim images', category: 'basic' },
    { id: 'background', name: 'Background', icon: 'ImageIcon', description: 'Remove or replace background', category: 'ai' },
    { id: 'colors', name: 'Colors', icon: 'Palette', description: 'Auto color correction', category: 'ai' },
    { id: 'text', name: 'Text', icon: 'Type', description: 'Add professional text', category: 'basic' },
    { id: 'enhance', name: 'AI Enhance', icon: 'Sparkles', description: 'Smart image enhancement', category: 'ai' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getToolIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      Move, Scissors, ImageIcon, Palette, Type, Sparkles
    };
    return iconMap[iconName] || Move;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Editing Tools</h2>
          <div className="space-y-2">
            {tools.map((tool) => {
              const Icon = getToolIcon(tool.icon);
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    selectedTool === tool.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-sm opacity-75">{tool.description}</div>
                  </div>
                  {tool.category === 'ai' && (
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 mt-auto border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Undo className="w-4 h-4" />
              <span>Undo</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Redo className="w-4 h-4" />
              <span>Redo</span>
            </button>
          </div>
          <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Save className="w-4 h-4" />
            <span>Save Project</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Image Editor</h1>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Canvas: 1080 × 1080px</span>
              <div className="flex items-center space-x-1">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <span className="text-sm">50%</span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <span className="text-sm">100%</span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <span className="text-sm">Fit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          {!uploadedImage ? (
            <div className="text-center">
              <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center space-y-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Upload className="w-12 h-12" />
                  <span className="text-lg font-medium">Upload Image</span>
                  <span className="text-sm">Click to select or drag & drop</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-gray-600">Upload an image to start editing, or choose from our business templates</p>
            </div>
          ) : (
            <div className="relative bg-white rounded-lg shadow-lg">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="max-w-full max-h-[600px] rounded-lg"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                  AI Processing Ready
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties</h3>
        
        {selectedTool === 'background' && (
          <div className="space-y-4">
            <button className="w-full bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg hover:bg-red-100 transition-colors">
              Remove Background (AI)
            </button>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg cursor-pointer"></div>
              <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-lg cursor-pointer"></div>
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg cursor-pointer"></div>
              <div className="aspect-square bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg cursor-pointer"></div>
            </div>
          </div>
        )}
        
        {selectedTool === 'colors' && (
          <div className="space-y-4">
            <button className="w-full bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg hover:bg-blue-100 transition-colors">
              Auto Color Correction
            </button>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Brightness</label>
              <input type="range" className="w-full" min="0" max="100" defaultValue="50" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contrast</label>
              <input type="range" className="w-full" min="0" max="100" defaultValue="50" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Saturation</label>
              <input type="range" className="w-full" min="0" max="100" defaultValue="50" />
            </div>
          </div>
        )}
        
        {selectedTool === 'text' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option>Business Sans</option>
              <option>Modern Serif</option>
              <option>Clean Display</option>
            </select>
            <div className="flex space-x-2">
              <input type="color" className="w-12 h-12 border border-gray-300 rounded" defaultValue="#000000" />
              <div className="flex-1">
                <input type="range" className="w-full" min="12" max="72" defaultValue="24" />
                <div className="text-sm text-gray-600 mt-1">Font Size: 24px</div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTool === 'enhance' && (
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
              AI Enhance Image
            </button>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Noise Reduction</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Sharpening</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Upscale 2x</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};