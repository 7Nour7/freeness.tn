
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Mail, Lock, Github, Facebook } from 'lucide-react';
import { toast } from 'sonner';

const AuthPage = () => {
  const { userType } = useParams<{ userType: string }>();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useOnboarding();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // In a real app, this would be an API call
    // For now, we'll just simulate a successful authentication
    setIsAuthenticated(true);
    toast.success(`${isSignUp ? 'Account created' : 'Logged in'} successfully!`);
    
    // Redirect based on user type
    if (userType === 'freelancer') {
      navigate('/freelancer/portfolio');
    } else if (userType === 'client') {
      navigate('/client/post-job');
    } else {
      navigate('/');
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login not implemented yet`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/onboarding')}
          className="mb-6 flex items-center text-primary hover:text-primary/90 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to user selection
        </button>
        
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-white/90">
              {isSignUp 
                ? `Join as a ${userType} and start your journey with Freeness` 
                : `Sign in to continue to your ${userType} account`}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={isSignUp ? "Create a password" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isSignUp && "Password must be at least 8 characters long"}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
                </div>
                
                {!isSignUp && (
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
            
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full"></div>
              <p className="text-sm text-muted-foreground bg-white px-2 absolute">or continue with</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleSocialLogin('GitHub')}
                className="flex items-center justify-center"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:underline ml-1 font-medium"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
