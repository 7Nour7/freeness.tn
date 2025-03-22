
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import LocationStep from '@/components/onboarding/freelancer/LocationStep';
import SkillsStep from '@/components/onboarding/freelancer/SkillsStep';
import ProfileStep from '@/components/onboarding/freelancer/ProfileStep';
import PortfolioProjectsStep from '@/components/onboarding/freelancer/PortfolioProjectsStep';
import ServiceOfferingsStep from '@/components/onboarding/freelancer/ServiceOfferingsStep';
import ReviewStep from '@/components/onboarding/freelancer/ReviewStep';

const steps = [
  { name: 'Location', component: LocationStep },
  { name: 'Skills', component: SkillsStep },
  { name: 'Profile', component: ProfileStep },
  { name: 'Portfolio Projects', component: PortfolioProjectsStep },
  { name: 'Service Offerings', component: ServiceOfferingsStep },
  { name: 'Review', component: ReviewStep },
];

const FreelancerPortfolio = () => {
  const navigate = useNavigate();
  const { portfolioStep, setPortfolioStep, portfolioData, updatePortfolioData } = useOnboarding();
  const [saving, setSaving] = useState(false);

  const CurrentStep = steps[portfolioStep - 1]?.component;
  const progress = Math.round((portfolioStep / steps.length) * 100);

  const handleNext = () => {
    if (portfolioStep < steps.length) {
      setPortfolioStep(portfolioStep + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (portfolioStep > 1) {
      setPortfolioStep(portfolioStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/auth/freelancer');
    }
  };

  const handleSaveAsDraft = () => {
    setSaving(true);
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile saved as draft');
    }, 1000);
  };

  const handleSubmit = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast.success('Your profile has been published!');
      navigate('/freelancer/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Create Your Profile</h1>
            <Button 
              variant="outline" 
              onClick={handleSaveAsDraft}
              disabled={saving}
            >
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Step {portfolioStep} of {steps.length}</span>
              <span>{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">{steps[portfolioStep - 1]?.name}</h2>
            
            {CurrentStep && (
              <CurrentStep 
                data={portfolioData} 
                updateData={updatePortfolioData} 
              />
            )}
            
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={saving}
                className="flex items-center"
              >
                {portfolioStep === steps.length ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Publish Profile
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FreelancerPortfolio;
