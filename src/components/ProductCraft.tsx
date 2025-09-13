import React, { useState, useRef } from 'react';
import { Upload, Move, Scissors, Palette, Type, Package, Sparkles, Undo, Redo, Save, Camera, Layers, Zap, Eye, RotateCcw } from 'lucide-react';
import { EditingTool } from '../types';

interface ProductCraftProps {
  onBack: () => void;
}

export const ProductCraft: React.FC<ProductCraftProps> = ({ onBack }) => {
  const [selectedTool, setSelectedTool] = useState<string>('product');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string>('clean-white');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tools: EditingTool[] = [
    { id: 'product', name: 'Product Focus', icon: 'Package', description: 'AI product detection and enhancement', category: 'product' },
    { id: 'background', name: 'Smart Backgrounds', icon: 'Layers', description: 'Professional product backgrounds', category: 'product' },
    { id: 'lighting', name: 'AI Lighting', icon: 'Zap', description: 'Optimize product lighting', category: 'ai' },
    { id: 'enhance', name: 'Product Enhance', icon: 'Sparkles', description: 'AI-powered product enhancement', category: 'ai' },
    { id: 'crop', name: 'Smart Crop', icon: 'Scissors', description: 'Intelligent product cropping', category: 'basic' },
    { id: 'colors', name: 'Color Match', icon: 'Palette', description: 'Brand color consistency', category: 'ai' },
    { id: 'text', name: 'Product Labels', icon: 'Type', description: 'Add product information', category: 'basic' }
  ];

  const backgrounds = [
    { id: 'clean-white', name: 'Clean White', preview: '#ffffff', category: 'minimal' },
    { id: 'soft-gray', name: 'Soft Gray', preview: '#f8f9fa', category: 'minimal' },
    { id: 'luxury-black', name: 'Luxury Black', preview: '#1a1a1a', category: 'premium' },
    { id: 'warm-beige', name: 'Warm Beige', preview: '#f5f5dc', category: 'natural' },
    { id: 'gradient-blue', name: 'Ocean Gradient', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', category: 'gradient' },
    { id: 'gradient-sunset', name: 'Sunset Gradient', preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', category: 'gradient' },
    { id: 'marble-white', name: 'Marble Texture', preview: '#f8f8f8', category: 'texture' },
    { id: 'wood-natural', name: 'Natural Wood', preview: '#deb887', category: 'texture' }
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
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Package, Layers, Zap, Sparkles, Scissors, Palette, Type, Move
    };
    return iconMap[iconName] || Package;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onBack}
            className="text-purple-600 hover:text-purple-700 font-medium text-sm"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Craft Tools</h2>
          <div className="space-y-2">
            {tools.map((tool) => {
              const Icon = getToolIcon(tool.icon);
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    selectedTool === tool.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-sm opacity-75">{tool.description}</div>
                  </div>
                  {(tool.category === 'ai' || tool.category === 'product') && (
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
          <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors">
            <Save className="w-4 h-4" />
            <span>Save Product</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Product Craft Studio</h1>
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
              <div className="w-80 h-80 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center mb-4 bg-purple-50">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center space-y-3 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Camera className="w-16 h-16" />
                  <span className="text-xl font-medium">Upload Product Photo</span>
                  <span className="text-sm">Click to select or drag & drop your product image</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-gray-600 mb-4">Upload your product photo to start crafting professional visuals</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>✓ AI Background Removal</span>
                <span>✓ Professional Lighting</span>
                <span>✓ Brand Consistency</span>
              </div>
            </div>
          ) : (
            <div className="relative bg-white rounded-lg shadow-lg max-w-2xl">
              <div 
                className="p-8 rounded-lg"
                style={{ 
                  background: backgrounds.find(bg => bg.id === selectedBackground)?.preview?.startsWith('linear-gradient') 
                    ? backgrounds.find(bg => bg.id === selectedBackground)?.preview 
                    : backgrounds.find(bg => bg.id === selectedBackground)?.preview 
                }}
              >
                <img
                  src={uploadedImage}
                  alt="Product"
                  className="max-w-full max-h-[500px] rounded-lg mx-auto"
                  style={{ filter: selectedTool === 'enhance' ? 'contrast(1.1) brightness(1.05) saturate(1.1)' : 'none' }}
                />
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                  AI Enhanced
                </div>
                <button className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Properties</h3>
        
        {selectedTool === 'product' && (
          <div className="space-y-4">
            <button className="w-full bg-purple-50 border border-purple-200 text-purple-700 p-3 rounded-lg hover:bg-purple-100 transition-colors">
              Auto-Detect Product (AI)
            </button>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Remove Background</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Center Product</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Add Drop Shadow</span>
              </label>
            </div>
          </div>
        )}
        
        {selectedTool === 'background' && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Background Styles</h4>
            <div className="grid grid-cols-2 gap-2">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg.id)}
                  className={`aspect-square rounded-lg border-2 transition-colors ${
                    selectedBackground === bg.id ? 'border-purple-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ 
                    background: bg.preview.startsWith('linear-gradient') ? bg.preview : bg.preview 
                  }}
                  title={bg.name}
                >
                  {selectedBackground === bg.id && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full border-2 border-purple-500"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button className="w-full bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              Upload Custom Background
            </button>
          </div>
        )}
        
        {selectedTool === 'lighting' && (
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg hover:from-yellow-100 hover:to-orange-100 transition-colors">
              AI Lighting Optimization
            </button>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brightness</label>
                <input type="range" className="w-full" min="0" max="100" defaultValue="60" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contrast</label>
                <input type="range" className="w-full" min="0" max="100" defaultValue="55" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Warmth</label>
                <input type="range" className="w-full" min="0" max="100" defaultValue="50" />
              </div>
            </div>
          </div>
        )}
        
        {selectedTool === 'enhance' && (
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
              AI Product Enhancement
            </button>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Sharpen Details</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Color Enhancement</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Upscale Quality</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Remove Imperfections</span>
              </label>
            </div>
          </div>
        )}
        
        {selectedTool === 'text' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product name or description..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option>Modern Sans</option>
              <option>Product Display</option>
              <option>Clean Minimal</option>
              <option>Bold Impact</option>
            </select>
            <div className="flex space-x-2">
              <input type="color" className="w-12 h-12 border border-gray-300 rounded" defaultValue="#333333" />
              <div className="flex-1">
                <input type="range" className="w-full" min="16" max="48" defaultValue="28" />
                <div className="text-sm text-gray-600 mt-1">Font Size: 28px</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button className="p-2 border border-gray-300 rounded text-sm hover:bg-gray-50">Left</button>
              <button className="p-2 border border-gray-300 rounded text-sm hover:bg-gray-50 bg-purple-50 border-purple-300">Center</button>
              <button className="p-2 border border-gray-300 rounded text-sm hover:bg-gray-50">Right</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};