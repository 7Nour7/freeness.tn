
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { OnboardingProvider } from './contexts/OnboardingContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OnboardingProvider>
      <App />
    </OnboardingProvider>
  </React.StrictMode>,
);
