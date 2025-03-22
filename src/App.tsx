
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import FreelancerPortfolio from "./pages/FreelancerPortfolio";
import ClientPostJob from "./pages/ClientPostJob";
import HiringDashboard from "./pages/HiringDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth/:userType" element={<AuthPage />} />
          <Route path="/freelancer/portfolio" element={<FreelancerPortfolio />} />
          <Route path="/client/post-job" element={<ClientPostJob />} />
          <Route path="/client/dashboard" element={<HiringDashboard />} />
          <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
