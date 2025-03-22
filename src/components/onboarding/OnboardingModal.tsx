
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserRound, Briefcase, X } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface OnboardingModalProps {
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { setUserType } = useOnboarding();

  const handleUserTypeSelection = (type: 'freelancer' | 'client') => {
    setUserType(type);
    navigate(`/auth/${type}`);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white p-0 max-w-md rounded-xl overflow-hidden">
        <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold mb-2">Welcome to Freeness</h2>
          <p className="opacity-90">Please select how you want to use our platform</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 p-6">
          <button
            onClick={() => handleUserTypeSelection('freelancer')}
            className="flex items-center gap-4 p-6 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors group"
          >
            <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <UserRound className="h-7 w-7" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">I'm a Freelancer</h3>
              <p className="text-muted-foreground text-sm">I want to offer my services and find work</p>
            </div>
          </button>
          
          <button
            onClick={() => handleUserTypeSelection('client')}
            className="flex items-center gap-4 p-6 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors group"
          >
            <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <Briefcase className="h-7 w-7" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold">I'm Hiring</h3>
              <p className="text-muted-foreground text-sm">I want to hire talented freelancers</p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
