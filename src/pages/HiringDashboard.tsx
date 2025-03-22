
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
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  Star,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Mock data for jobs
const jobListings = [
  {
    id: 1,
    title: 'Logo Design for Tech Startup',
    status: 'active',
    applicants: 12,
    budget: '200-500 TND',
    category: 'Design',
    timeframe: '2 weeks',
    datePosted: '2023-10-12'
  },
  {
    id: 2,
    title: 'E-commerce Website Development',
    status: 'active',
    applicants: 8,
    budget: '1000+ TND',
    category: 'Web Development',
    timeframe: '1 month',
    datePosted: '2023-10-10'
  },
  {
    id: 3,
    title: 'Content Creation for Social Media',
    status: 'draft',
    applicants: 0,
    budget: '200-500 TND',
    category: 'Marketing',
    timeframe: 'Ongoing',
    datePosted: '2023-10-08'
  }
];

// Mock data for applicants
const applicants = [
  {
    id: 1,
    name: 'Sarra Mansour',
    title: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    proposal: 'I have 5+ years of experience in logo design and branding.',
    jobId: 1,
    status: 'new'
  },
  {
    id: 2,
    name: 'Ahmed Trabelsi',
    title: 'Web Developer',
    avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80',
    rating: 4.9,
    proposal: 'I specialize in e-commerce development with 7 years of experience.',
    jobId: 2,
    status: 'shortlisted'
  },
  {
    id: 3,
    name: 'Karim Ben Ali',
    title: 'Content Creator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    proposal: 'I have created content for various brands in the tech industry.',
    jobId: 1,
    status: 'new'
  }
];

const HiringDashboard = () => {
  const navigate = useNavigate();
  const { clientJobData } = useOnboarding();
  const [activeTab, setActiveTab] = React.useState('jobs');

  // Add user posted job to the top of the list if it exists
  const allJobs = React.useMemo(() => {
    if (clientJobData.title) {
      const userJob = {
        id: 999,
        title: clientJobData.title,
        status: 'active',
        applicants: 0,
        budget: clientJobData.budgetRange === 'custom' 
          ? `${clientJobData.customBudgetMin}-${clientJobData.customBudgetMax} TND`
          : budgetRangeToText(clientJobData.budgetRange),
        category: categoryToText(clientJobData.category),
        timeframe: clientJobData.timeframe || 'Not specified',
        datePosted: new Date().toISOString().split('T')[0]
      };
      return [userJob, ...jobListings];
    }
    return jobListings;
  }, [clientJobData]);

  function budgetRangeToText(range: string) {
    switch (range) {
      case 'low': return '50-200 TND';
      case 'medium': return '200-500 TND';
      case 'high': return '500-1000 TND';
      case 'very-high': return '1000+ TND';
      default: return 'Not specified';
    }
  }

  function categoryToText(category: string) {
    switch (category) {
      case 'design': return 'Design';
      case 'web-dev': return 'Web Development';
      case 'mobile-dev': return 'Mobile Development';
      case 'writing': return 'Writing';
      case 'marketing': return 'Marketing';
      case 'video': return 'Video';
      case 'business': return 'Business';
      default: return 'Other';
    }
  }

  const getApplicantsForJob = (jobId: number) => {
    return applicants.filter(applicant => applicant.jobId === jobId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 mr-6">Client Dashboard</h1>
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
                  My Jobs
                </button>
                <button
                  onClick={() => setActiveTab('applicants')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'applicants' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Applicants
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
                <span className="text-sm font-medium">CM</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/client/post-job')}
                  className="w-full justify-start"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post a New Job
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Find Freelancers
                </Button>
              </div>
            </div>

            {/* Job Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Job Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Active Jobs</p>
                      <p className="font-semibold">{allJobs.filter(job => job.status === 'active').length}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total Applicants</p>
                      <p className="font-semibold">{applicants.length}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Pending Tasks</p>
                      <p className="font-semibold">3</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Tab: Jobs */}
            {activeTab === 'jobs' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">My Jobs</h2>
                  <div className="flex items-center">
                    <Input
                      placeholder="Search jobs..."
                      className="max-w-[200px] mr-2"
                    />
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {allJobs.map((job) => (
                    <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{job.title}</h3>
                        <Badge
                          variant={job.status === 'active' ? 'default' : 'secondary'}
                        >
                          {job.status === 'active' ? 'Active' : 'Draft'}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                        <div>Category: {job.category}</div>
                        <div>Budget: {job.budget}</div>
                        <div>Timeframe: {job.timeframe}</div>
                        <div>Posted: {job.datePosted}</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-primary mr-1" />
                          <span className="text-sm">{job.applicants} applicants</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {allJobs.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground mb-4">You haven't posted any jobs yet.</p>
                      <Button onClick={() => navigate('/client/post-job')}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post Your First Job
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Applicants */}
            {activeTab === 'applicants' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Applicants</h2>
                  <div className="flex items-center">
                    <select className="text-sm border border-gray-300 rounded-md py-1 px-2 mr-2">
                      <option value="all">All Jobs</option>
                      {allJobs.map(job => (
                        <option key={job.id} value={job.id}>{job.title}</option>
                      ))}
                    </select>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {applicants.map((applicant) => (
                    <div key={applicant.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img 
                            src={applicant.avatar} 
                            alt={applicant.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h3 className="font-semibold">{applicant.name}</h3>
                              <p className="text-sm text-muted-foreground">{applicant.title}</p>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{applicant.rating}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm mb-3">
                            Applied to: {allJobs.find(job => job.id === applicant.jobId)?.title}
                          </p>
                          
                          <p className="text-sm bg-gray-50 p-3 rounded-md italic mb-3">
                            "{applicant.proposal}"
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <Badge
                              variant={applicant.status === 'shortlisted' ? 'default' : 'secondary'}
                            >
                              {applicant.status === 'shortlisted' ? 'Shortlisted' : 'New'}
                            </Badge>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                View Profile
                              </Button>
                              <Button size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {applicants.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground mb-4">No applicants yet. Active jobs will attract freelancers soon.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Messages */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Messages Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start a conversation with a freelancer or wait for applicants to reach out.
                </p>
                <Button>
                  Find Freelancers
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HiringDashboard;
