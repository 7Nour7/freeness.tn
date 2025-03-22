
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  Bell, 
  Search, 
  FileText,
  Settings,
  Star,
  TrendingUp,
  DollarSign,
  Clock,
  MousePointerClick,
  Heart,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for job recommendations
const recommendedJobs = [
  {
    id: 1,
    title: 'Modern Web Application for Fintech Startup',
    budget: '500-1000 TND',
    timeframe: '1 month',
    skills: ['React', 'Node.js', 'MongoDB'],
    postedBy: 'TechVentures Inc.',
    postedDate: '2 days ago',
    proposals: 5
  },
  {
    id: 2,
    title: 'E-commerce Website Redesign',
    budget: '200-500 TND',
    timeframe: '2 weeks',
    skills: ['UI/UX Design', 'Figma', 'HTML/CSS'],
    postedBy: 'FashionStore',
    postedDate: '3 days ago',
    proposals: 8
  },
  {
    id: 3,
    title: 'Mobile App Development for Delivery Service',
    budget: '1000+ TND',
    timeframe: '2 months',
    skills: ['React Native', 'Firebase', 'API Integration'],
    postedBy: 'Express Delivery',
    postedDate: '1 day ago',
    proposals: 3
  }
];

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const { portfolioData } = useOnboarding();
  const [activeTab, setActiveTab] = React.useState('jobs');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 mr-6">Freelancer Dashboard</h1>
              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'jobs' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Find Jobs
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'saved' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Jobs
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'messages' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="text-sm font-medium">FP</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar - Profile Summary */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-semibold">
                    {portfolioData.title ? portfolioData.title.charAt(0) : 'F'}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{portfolioData.title || 'Freelancer'}</h2>
                    <p className="text-muted-foreground">{portfolioData.city || 'Tunisia'}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium ml-1">New</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Profile</p>
                    <p className="font-semibold">85%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Earnings</p>
                    <p className="font-semibold">0 TND</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Jobs</p>
                    <p className="font-semibold">0</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    View Public Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                </div>
              </div>

              {/* Skills Section */}
              {portfolioData.skills && portfolioData.skills.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {portfolioData.skills.slice(0, 6).map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                    {portfolioData.skills.length > 6 && (
                      <Badge variant="outline">+{portfolioData.skills.length - 6} more</Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Availability Status */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Availability</h3>
                  <Badge variant="default" className="bg-green-500">Available</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  You're currently visible to clients
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-medium mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      <MousePointerClick className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Profile Views</p>
                      <p className="font-semibold">0</p>
                    </div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Proposals Sent</p>
                      <p className="font-semibold">0</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            {/* Welcome Banner */}
            <div className="relative bg-gradient-to-r from-primary to-indigo-600 rounded-lg shadow-sm p-6 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/2 blur-xl"></div>
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-2">Welcome to your dashboard!</h2>
                <p className="opacity-90 mb-4">
                  Your profile is set up. Start exploring jobs that match your skills.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Find Jobs
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Complete Profile
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Recommended Jobs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Recommended Jobs</h2>
                <div className="flex items-center">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Advanced Search
                  </Button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      <Badge variant="outline" className="ml-2">
                        {job.budget}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.timeframe}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {job.proposals} proposals
                      </div>
                      <div>Posted by: {job.postedBy}</div>
                      <div>{job.postedDate}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button size="sm">
                        Submit Proposal
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-gray-200 text-center">
                <Button variant="outline">
                  View More Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FreelancerDashboard;
