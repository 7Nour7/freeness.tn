import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Briefcase, Clock, DollarSign, Languages, CheckCircle2, X } from 'lucide-react';

interface ReviewStepProps {
  data: any;
  updateData?: (data: any) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ data }) => {
  const { city, skills, tools, title, bio, experience, hourlyRate, languages, projects, services } = data;
  
  const experienceLabel = {
    'entry': 'Entry Level (0-2 years)',
    'intermediate': 'Intermediate (2-5 years)',
    'expert': 'Expert (5-10 years)',
    'master': 'Master (10+ years)'
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Review Your Profile</h3>
        <p className="text-muted-foreground mb-6">
          Review all the information before publishing your profile. You can go back to any section to make changes.
        </p>
      </div>

      {/* Profile Overview */}
      <div className="bg-secondary/20 rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xl font-semibold">{title || 'Your Professional Title'}</h4>
            {city && (
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{city}, Tunisia</span>
              </div>
            )}
          </div>
          
          {hourlyRate && (
            <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
              {hourlyRate} TND/hr
            </div>
          )}
        </div>
        
        <div>
          <h5 className="font-medium mb-2">About Me</h5>
          <p className="text-muted-foreground">{bio || 'No bio provided yet.'}</p>
        </div>
        
        {experience && (
          <div>
            <h5 className="font-medium mb-2">Experience Level</h5>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 text-primary mr-2" />
              <span>{experienceLabel[experience as keyof typeof experienceLabel]}</span>
            </div>
          </div>
        )}
        
        {languages && languages.length > 0 && (
          <div>
            <h5 className="font-medium mb-2">Languages</h5>
            <div className="flex items-center flex-wrap gap-2">
              <Languages className="h-4 w-4 text-primary mr-1" />
              {languages.map((lang: any, index: number) => (
                <Badge key={index} variant="secondary" className="capitalize">
                  {lang.language} ({lang.proficiency})
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {skills && skills.length > 0 && (
          <div>
            <h5 className="font-medium mb-2">Skills</h5>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill: string, index: number) => (
                <Badge key={index} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
        )}
        
        {tools && tools.length > 0 && (
          <div>
            <h5 className="font-medium mb-2">Tools & Software</h5>
            <div className="flex flex-wrap gap-1.5">
              {tools.map((tool: string, index: number) => (
                <Badge key={index} variant="secondary">{tool}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Portfolio Projects */}
      {projects && projects.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Portfolio Projects ({projects.length})</h4>
          <div className="grid gap-4">
            {projects.map((project: any, index: number) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h5 className="font-semibold mb-2">{project.title}</h5>
                <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                
                {project.images && project.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.images.map((img: string, i: number) => (
                      <div key={i} className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                        <img src={img} alt={`${project.title} preview ${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                )}
                
                {project.testimonial && (
                  <div className="mt-3 bg-secondary/20 rounded-md p-3 text-sm">
                    <p className="italic">"{project.testimonial.text}"</p>
                    <p className="font-medium mt-1">- {project.testimonial.client}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services */}
      {services && services.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Service Offerings ({services.length})</h4>
          <div className="grid gap-4">
            {services.map((service: any, index: number) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {service.thumbnail && (
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img 
                        src={service.thumbnail} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1">
                    <h5 className="font-semibold">{service.title}</h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      {service.category} {service.subcategory ? `› ${service.subcategory}` : ''}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <div className="text-center p-2 bg-secondary/30 rounded-md">
                        <p className="font-medium">{service.tiers.basic.name}</p>
                        <p className="text-primary text-lg font-semibold mt-1">{service.tiers.basic.price} TND</p>
                        <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {service.tiers.basic.deliveryTime} days
                        </div>
                      </div>
                      
                      <div className="text-center p-2 bg-secondary/30 rounded-md">
                        <p className="font-medium">{service.tiers.standard.name}</p>
                        <p className="text-primary text-lg font-semibold mt-1">{service.tiers.standard.price} TND</p>
                        <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {service.tiers.standard.deliveryTime} days
                        </div>
                      </div>
                      
                      <div className="text-center p-2 bg-secondary/30 rounded-md">
                        <p className="font-medium">{service.tiers.premium.name}</p>
                        <p className="text-primary text-lg font-semibold mt-1">{service.tiers.premium.price} TND</p>
                        <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {service.tiers.premium.deliveryTime} days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Status */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h4 className="font-medium">Profile Completion Status</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {city ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <X className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span>Location</span>
            </div>
            {!city && (
              <span className="text-sm text-red-500">Required</span>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {skills && skills.length > 0 ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <X className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span>Skills</span>
            </div>
            {(!skills || skills.length === 0) && (
              <span className="text-sm text-red-500">Required</span>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {title && bio ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <X className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span>Profile Information</span>
            </div>
            {(!title || !bio) && (
              <span className="text-sm text-red-500">Required</span>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {projects && projects.length > 0 ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <X className="h-5 w-5 text-yellow-500 mr-2" />
              )}
              <span>Portfolio Projects</span>
            </div>
            {(!projects || projects.length === 0) && (
              <span className="text-sm text-yellow-500">Recommended</span>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {services && services.length > 0 ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <X className="h-5 w-5 text-yellow-500 mr-2" />
              )}
              <span>Service Offerings</span>
            </div>
            {(!services || services.length === 0) && (
              <span className="text-sm text-yellow-500">Recommended</span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <p className="text-muted-foreground text-sm">
          By publishing your profile, you agree to our Terms of Service and confirm that all the information provided is accurate.
        </p>
      </div>
    </div>
  );
};

export default ReviewStep;
