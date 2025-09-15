import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ProductCraft } from './components/ProductCraft';
import { BrandingTools } from './components/BrandingTools';
import { SocialMediaPosts } from './components/SocialMediaPosts';

type AppView = 'dashboard' | 'craft' | 'branding' | 'social';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [currentStep, setCurrentStep] = useState<string>('craft');

  const handleCreateNew = () => {
    setCurrentView('craft');
    setCurrentStep('craft');
  };

  const handleOpenProject = () => {
    setCurrentView('craft');
    setCurrentStep('craft');
  };

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
    switch (step) {
      case 'craft':
        setCurrentView('craft');
        break;
      case 'brand':
        setCurrentView('branding');
        break;
      case 'social':
        setCurrentView('social');
        break;
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentStep('craft');
  };

  const handleBackToCraft = () => {
    setCurrentView('craft');
    setCurrentStep('craft');
  };

  const handleBackToBranding = () => {
    setCurrentView('branding');
    setCurrentStep('brand');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView !== 'dashboard' && (
        <Header currentStep={currentStep} onStepChange={handleStepChange} />
      )}
      
      {currentView === 'dashboard' && (
        <Dashboard onCreateNew={handleCreateNew} onOpenProject={handleOpenProject} />
      )}
      
      {currentView === 'craft' && (
        <ProductCraft onBack={handleBackToDashboard} />
      )}
      
      {currentView === 'branding' && (
        <BrandingTools onBack={handleBackToCraft} />
      )}
      
      {currentView === 'social' && (
        <SocialMediaPosts onBack={handleBackToBranding} />
      )}
    </div>
  );
}

export default App;