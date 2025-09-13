import React, { useState } from 'react';
import { Palette, Upload, Zap, Download, Eye } from 'lucide-react';

interface BrandingToolsProps {
  onBack: () => void;
}

export const BrandingTools: React.FC<BrandingToolsProps> = ({ onBack }) => {
  const [brandColors, setBrandColors] = useState(['#3B82F6', '#10B981', '#F59E0B']);
  const [logo, setLogo] = useState<string | null>(null);

  const socialPlatforms = [
    { name: 'Instagram Post', size: '1080×1080', template: 'square' },
    { name: 'Instagram Story', size: '1080×1920', template: 'story' },
    { name: 'Facebook Post', size: '1200×630', template: 'facebook' },
    { name: 'LinkedIn Banner', size: '1584×396', template: 'linkedin' },
    { name: 'Twitter Header', size: '1500×500', template: 'twitter' },
    { name: 'YouTube Thumbnail', size: '1280×720', template: 'youtube' }
  ];

  const marketingMaterials = [
    { name: 'Business Flyer', size: 'A4', template: 'flyer' },
    { name: 'Product Catalog', size: 'A4', template: 'catalog' },
    { name: 'Business Card', size: '3.5×2"', template: 'card' },
    { name: 'Email Header', size: '600×200', template: 'email' },
    { name: 'Web Banner', size: '728×90', template: 'banner' },
    { name: 'Poster', size: 'A3', template: 'poster' }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Your Content</h1>
            <p className="text-gray-600">Apply consistent branding across all your marketing materials</p>
          </div>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Editor
          </button>
        </div>

        {/* Brand Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Brand Colors</h3>
            </div>
            <div className="space-y-3">
              {brandColors.map((color, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      const newColors = [...brandColors];
                      newColors[index] = e.target.value;
                      setBrandColors(newColors);
                    }}
                    className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <span className="font-mono text-sm text-gray-600">{color}</span>
                </div>
              ))}
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                + Add Color
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Upload className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold">Brand Logo</h3>
            </div>
            {logo ? (
              <div className="text-center">
                <img src={logo} alt="Brand logo" className="w-24 h-24 mx-auto mb-3 object-contain" />
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Replace Logo
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Upload Logo
                </button>
                <p className="text-sm text-gray-500 mt-1">PNG, SVG recommended</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">AI Suggestions</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-purple-800 text-sm font-medium">Recommended</p>
                <p className="text-purple-700 text-sm">Use high contrast colors for better readability</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm font-medium">Tip</p>
                <p className="text-blue-700 text-sm">Your logo works best on light backgrounds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Template Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Social Media Templates</h3>
              <p className="text-gray-600 mt-1">Platform-optimized templates with your branding</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {socialPlatforms.map((platform) => (
                  <button
                    key={platform.template}
                    className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-3 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded opacity-80"></div>
                    </div>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                      {platform.name}
                    </h4>
                    <p className="text-sm text-gray-500">{platform.size}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Marketing Materials</h3>
              <p className="text-gray-600 mt-1">Professional print and digital marketing assets</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {marketingMaterials.map((material) => (
                  <button
                    key={material.template}
                    className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-3 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded opacity-80"></div>
                    </div>
                    <h4 className="font-medium text-gray-900 group-hover:text-green-600">
                      {material.name}
                    </h4>
                    <p className="text-sm text-gray-500">{material.size}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center space-x-4">
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            <Eye className="w-4 h-4" />
            <span>Preview All</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Generate Templates</span>
          </button>
        </div>
      </div>
    </div>
  );
};