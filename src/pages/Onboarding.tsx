
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { UserRound, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Onboarding = () => {
  const navigate = useNavigate();
  const { setUserType } = useOnboarding();

  const handleUserTypeSelection = (type: 'freelancer' | 'client') => {
    setUserType(type);
    navigate(`/auth/${type}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Freeness</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The premier marketplace connecting talented freelancers with clients in Tunisia.
            Let's get started by choosing how you want to use our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => handleUserTypeSelection('freelancer')}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-border hover:border-primary cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
                <UserRound className="h-10 w-10 text-indigo-600" />
              </div>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-3">I'm a Freelancer</h2>
              <p className="text-muted-foreground mb-6">
                Showcase your skills, create a stunning portfolio, and find great projects to work on.
              </p>
              <Button className="w-full">Join as Freelancer</Button>
            </div>
          </div>

          <div 
            onClick={() => handleUserTypeSelection('client')}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-border hover:border-primary cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 p-6 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
                <Briefcase className="h-10 w-10 text-indigo-600" />
              </div>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-3">I'm Hiring</h2>
              <p className="text-muted-foreground mb-6">
                Post jobs and connect with skilled freelancers to bring your projects to life.
              </p>
              <Button className="w-full">Join as Client</Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="#" className="text-primary hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
