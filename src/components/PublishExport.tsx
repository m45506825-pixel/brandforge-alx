import React, { useState } from 'react';
import { Download, Share2, Cloud, Printer, Smartphone, Monitor, Instagram, Facebook, Linkedin } from 'lucide-react';
import { ExportPreset } from '../types';

interface PublishExportProps {
  onBack: () => void;
}

export const PublishExport: React.FC<PublishExportProps> = ({ onBack }) => {
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  
  const exportPresets: ExportPreset[] = [
    { id: 'ig-post', name: 'Instagram Post', format: 'jpeg', quality: 95, dimensions: { width: 1080, height: 1080 }, platform: 'Instagram' },
    { id: 'ig-story', name: 'Instagram Story', format: 'jpeg', quality: 95, dimensions: { width: 1080, height: 1920 }, platform: 'Instagram' },
    { id: 'fb-post', name: 'Facebook Post', format: 'jpeg', quality: 90, dimensions: { width: 1200, height: 630 }, platform: 'Facebook' },
    { id: 'linkedin', name: 'LinkedIn Banner', format: 'png', quality: 95, dimensions: { width: 1584, height: 396 }, platform: 'LinkedIn' },
    { id: 'web-hd', name: 'Web (High Quality)', format: 'png', quality: 90, platform: 'Web' },
    { id: 'print-hq', name: 'Print Quality', format: 'pdf', quality: 100, platform: 'Print' },
    { id: 'email', name: 'Email Optimized', format: 'jpeg', quality: 80, platform: 'Email' },
    { id: 'mobile', name: 'Mobile Optimized', format: 'jpeg', quality: 85, platform: 'Mobile' }
  ];

  const togglePreset = (presetId: string) => {
    setSelectedPresets(prev => 
      prev.includes(presetId) 
        ? prev.filter(id => id !== presetId)
        : [...prev, presetId]
    );
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return Instagram;
      case 'Facebook': return Facebook;
      case 'LinkedIn': return Linkedin;
      case 'Web': return Monitor;
      case 'Mobile': return Smartphone;
      case 'Print': return Printer;
      default: return Share2;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Publish & Export</h1>
            <p className="text-gray-600">Export your designs in platform-ready formats</p>
          </div>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Branding
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Export Presets */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Export Presets</h3>
                <p className="text-gray-600">Select the formats you need for your marketing channels</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exportPresets.map((preset) => {
                    const Icon = getPlatformIcon(preset.platform);
                    const isSelected = selectedPresets.includes(preset.id);
                    
                    return (
                      <button
                        key={preset.id}
                        onClick={() => togglePreset(preset.id)}
                        className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className={`w-6 h-6 mt-1 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                          <div className="flex-1">
                            <h4 className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                              {preset.name}
                            </h4>
                            <div className="text-sm text-gray-500 mt-1">
                              {preset.dimensions && (
                                <span>{preset.dimensions.width} × {preset.dimensions.height}px • </span>
                              )}
                              <span>{preset.format.toUpperCase()} • Quality: {preset.quality}%</span>
                            </div>
                            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                              isSelected ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {preset.platform}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Export Summary & Actions */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Your design preview</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Current canvas: 1080 × 1080px</p>
                <p>File size: ~2.3 MB</p>
              </div>
            </div>

            {/* Export Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Selected formats:</span>
                  <span className="font-medium">{selectedPresets.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total file size:</span>
                  <span className="font-medium">~{(selectedPresets.length * 2.1).toFixed(1)} MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Export time:</span>
                  <span className="font-medium">~{Math.max(5, selectedPresets.length * 2)}s</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Export</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download All ({selectedPresets.length})</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors">
                  <Cloud className="w-4 h-4" />
                  <span>Save to Cloud</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share Link</span>
                </button>
              </div>
            </div>

            {/* Platform Publishing */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">Direct Publishing</h3>
              <p className="text-sm text-orange-700 mb-4">Publish directly to your social media accounts</p>
              <button className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                Connect Social Accounts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};