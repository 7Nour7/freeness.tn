
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  CheckCircle2, 
  Code, 
  Globe, 
  Image, 
  Laptop, 
  LineChart, 
  Package, 
  Smartphone, 
  Star, 
  Tv, 
  Users 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for featured freelancers
const featuredFreelancers = [
  {
    id: 1,
    name: "Ahmed Trabelsi",
    title: "Android Developer",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    name: "Sarra Mansour",
    title: "UX Designer",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    name: "Karim Ben Ali",
    title: "SEO Expert/Writer",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 4,
    name: "Yassmine Jebali",
    title: "Content Creator",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80",
  },
];

// Mock data for popular services
const popularServices = [
  {
    id: 1,
    title: "Animation",
    icon: <Tv className="h-10 w-10 text-yellow-500" />,
    color: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    id: 2,
    title: "eCommerce",
    icon: <Globe className="h-10 w-10 text-indigo-500" />,
    color: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    id: 3,
    title: "Création de contenu",
    icon: <Laptop className="h-10 w-10 text-gray-500" />,
    color: "bg-gray-50",
    borderColor: "border-gray-200",
  },
  {
    id: 4,
    title: "Photography",
    icon: <Image className="h-10 w-10 text-blue-500" />,
    color: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: 5,
    title: "Mobile Development",
    icon: <Smartphone className="h-10 w-10 text-green-500" />,
    color: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: 6,
    title: "SEO",
    icon: <LineChart className="h-10 w-10 text-purple-500" />,
    color: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: 7,
    title: "3D",
    icon: <Package className="h-10 w-10 text-red-500" />,
    color: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: 8,
    title: "Packaging",
    icon: <Package className="h-10 w-10 text-orange-500" />,
    color: "bg-orange-50",
    borderColor: "border-orange-200",
  },
];

// Mock data for job listings
const jobListings = [
  {
    id: 1,
    title: "UX/UI Designer",
    description: "We need a talented UX/UI designer to redesign our mobile app interface",
    budget: "500-1000 DT",
    experience: "Intermediate",
    timeframe: "2 weeks",
  },
  {
    id: 2,
    title: "Front-end Developer",
    description: "Looking for a React expert to build a responsive dashboard for our analytics platform",
    budget: "1000-1500 DT",
    experience: "Expert",
    timeframe: "1 month",
  },
  {
    id: 3,
    title: "Social Media Manager",
    description: "Need someone to manage our social media accounts and create engaging content",
    budget: "300-600 DT",
    experience: "Entry-level",
    timeframe: "Ongoing",
  },
];

const Index = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up");
          observer.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      observer.current?.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.current?.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 opacity-0 animate-fade-up" style={{ animationDelay: "100ms" }}>
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                #1 Freelance Marketplace in Tunisia
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Finding Top Freelancers in Tunisia
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Freeness, your #1 destination among top freelancer marketplaces for creative professionals in Tunisia. Our vision brings the marketplace of projects of all talents.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#services" className="btn-primary">
                  See our offers <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="#clients" className="btn-outline">
                  See our clients
                </a>
              </div>
            </div>
            <div className="lg:pl-6 opacity-0 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/30 rounded-full blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80" 
                  alt="Freelancers collaborating" 
                  className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Freelancers */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Featured Freelancers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover top-rated freelance professionals in Tunisia ready to bring your projects to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFreelancers.map((freelancer, index) => (
              <div 
                key={freelancer.id} 
                className={cn(
                  "animate-on-scroll opacity-0 bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1",
                )}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={freelancer.image} 
                    alt={freelancer.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{freelancer.name}</h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="fill-yellow-500 stroke-yellow-500 h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{freelancer.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{freelancer.title}</p>
                  <button className="mt-4 w-full btn-outline text-primary hover:bg-primary hover:text-white">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10 animate-on-scroll opacity-0">
            <a href="#" className="btn-outline inline-flex items-center">
              View All Freelancers
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through the most in-demand services from our talented pool of Tunisian freelancers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((service, index) => (
              <div 
                key={service.id} 
                className={cn(
                  "animate-on-scroll opacity-0 group cursor-pointer",
                  service.color,
                  "rounded-xl p-6 border",
                  service.borderColor,
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                )}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <div className="mt-4 overflow-hidden w-full">
                    <div className="transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <button className="w-full btn-outline bg-white/80 backdrop-blur-sm hover:bg-white">
                        Browse
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Clients */}
      <section id="clients" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-on-scroll opacity-0">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                For Clients
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Access Top Tunisian Talent On-Demand
              </h2>
              <p className="text-lg text-muted-foreground">
                Hire skilled freelancers quickly and efficiently for any project size. Our platform connects you with the best professionals in Tunisia.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="text-primary h-6 w-6 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Quality Talent Pool</h3>
                    <p className="text-muted-foreground">Access verified professionals with proven track records and portfolios.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="text-primary h-6 w-6 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Hiring</h3>
                    <p className="text-muted-foreground">Hire for short tasks, longer projects, or ongoing work as needed.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="text-primary h-6 w-6 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Secure Payments</h3>
                    <p className="text-muted-foreground">Our platform ensures transparent and secure payment processes.</p>
                  </div>
                </div>
              </div>
              
              <a href="#" className="btn-primary inline-flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            
            <div className="animate-on-scroll opacity-0">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80" 
                  alt="Client workspace" 
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join as Freelancer */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-on-scroll opacity-0">
              <div className="relative">
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/30 rounded-full blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80" 
                  alt="Freelancer working" 
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
            
            <div className="space-y-6 order-1 lg:order-2 animate-on-scroll opacity-0">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                For Freelancers
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Showcase Your Skills & Grow Your Business
              </h2>
              <p className="text-lg text-muted-foreground">
                Join our community of talented Tunisian freelancers and connect with clients looking for your expertise.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="text-primary h-6 w-6 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Find Quality Clients</h3>
                    <p className="text-muted-foreground">Connect with serious clients looking for your specific skills.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="text-primary h-6 w-6 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Build Your Reputation</h3>
                    <p className="text-muted-foreground">Earn reviews and showcase your portfolio to stand out.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="text-primary h-6 w-6 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Get Paid Securely</h3>
                    <p className="text-muted-foreground">Receive payments promptly and securely for your work.</p>
                  </div>
                </div>
              </div>
              
              <a href="#" className="btn-primary inline-flex items-center">
                Post Your Best Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Next Project */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Next Project</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through opportunities waiting for Tunisian freelancers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobListings.map((job, index) => (
              <div 
                key={job.id} 
                className="animate-on-scroll opacity-0 bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{job.title}</h3>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Budget</p>
                      <p className="font-medium">{job.budget}</p>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Experience</p>
                      <p className="font-medium">{job.experience}</p>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg col-span-2">
                      <p className="text-xs text-muted-foreground mb-1">Timeframe</p>
                      <p className="font-medium">{job.timeframe}</p>
                    </div>
                  </div>
                  
                  <button className="w-full btn-primary">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10 animate-on-scroll opacity-0">
            <a href="#" className="btn-outline inline-flex items-center">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg opacity-90">
              Join thousands of freelancers and clients in Tunisia's fastest growing marketplace.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <a 
                href="#" 
                className="bg-white text-primary hover:bg-white/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-2"
              >
                Hire a Freelancer
              </a>
              <a 
                href="#" 
                className="bg-primary/10 backdrop-blur-sm border border-white/30 text-white hover:bg-primary/20 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-2"
              >
                Become a Freelancer
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
