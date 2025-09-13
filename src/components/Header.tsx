import React from 'react';
import { Package, Palette, Share2 } from 'lucide-react';

interface HeaderProps {
  currentStep: string;
  onStepChange: (step: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onStepChange }) => {
  const steps = [
    { id: 'craft', label: 'Product Craft', icon: Package },
    { id: 'brand', label: 'Brand Style', icon: Palette },
    { id: 'social', label: 'Social Posts', icon: Share2 }
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">BrandXProductForge</h1>
          </div>
          
          <nav className="flex items-center space-x-1">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
              
              return (
                <button
                  key={step.id}
                  onClick={() => onStepChange(step.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : isCompleted
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{step.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500">
            Powered by AI Product Intelligence
          </div>
        </div>
      </div>
    </header>
  );
};