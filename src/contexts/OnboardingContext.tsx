
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserType = 'freelancer' | 'client' | null;

interface OnboardingContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  portfolioStep: number;
  setPortfolioStep: (step: number) => void;
  portfolioData: any;
  updatePortfolioData: (data: any) => void;
  clientJobData: any;
  updateClientJobData: (data: any) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [portfolioStep, setPortfolioStep] = useState(1);
  const [portfolioData, setPortfolioData] = useState({});
  const [clientJobData, setClientJobData] = useState({});

  const updatePortfolioData = (data: any) => {
    setPortfolioData(prev => ({ ...prev, ...data }));
  };

  const updateClientJobData = (data: any) => {
    setClientJobData(prev => ({ ...prev, ...data }));
  };

  const resetOnboarding = () => {
    setUserType(null);
    setIsAuthenticated(false);
    setPortfolioStep(1);
    setPortfolioData({});
    setClientJobData({});
  };

  return (
    <OnboardingContext.Provider
      value={{
        userType,
        setUserType,
        isAuthenticated,
        setIsAuthenticated,
        portfolioStep,
        setPortfolioStep,
        portfolioData,
        updatePortfolioData,
        clientJobData,
        updateClientJobData,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
