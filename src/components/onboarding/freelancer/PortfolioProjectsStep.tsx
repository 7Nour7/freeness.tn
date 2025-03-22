
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Upload, Trash2, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  images: string[];
  links: { url: string; title: string }[];
  technologies: string[];
  testimonial?: { client: string; text: string };
}

interface PortfolioProjectsStepProps {
  data: any;
  updateData: (data: any) => void;
}

const PortfolioProjectsStep: React.FC<PortfolioProjectsStepProps> = ({ data, updateData }) => {
  const [projects, setProjects] = useState<PortfolioProject[]>(data.projects || []);
  const [currentProject, setCurrentProject] = useState<PortfolioProject>({
    id: '',
    title: '',
    description: '',
    images: [],
    links: [],
    technologies: [],
  });
  const [currentLink, setCurrentLink] = useState({ url: '', title: '' });
  const [currentTech, setCurrentTech] = useState('');
  const [testimonial, setTestimonial] = useState({ client: '', text: '' });
  const [showTestimonial, setShowTestimonial] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleProjectChange = (field: keyof PortfolioProject, value: any) => {
    setCurrentProject(prev => ({ ...prev, [field]: value }));
  };

  const addLink = () => {
    if (currentLink.url && currentLink.title) {
      const updatedLinks = [...currentProject.links, currentLink];
      handleProjectChange('links', updatedLinks);
      setCurrentLink({ url: '', title: '' });
    }
  };

  const removeLink = (index: number) => {
    const updatedLinks = currentProject.links.filter((_, i) => i !== index);
    handleProjectChange('links', updatedLinks);
  };

  const addTechnology = () => {
    if (currentTech && !currentProject.technologies.includes(currentTech)) {
      const updatedTechnologies = [...currentProject.technologies, currentTech];
      handleProjectChange('technologies', updatedTechnologies);
      setCurrentTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    const updatedTechnologies = currentProject.technologies.filter(t => t !== tech);
    handleProjectChange('technologies', updatedTechnologies);
  };

  const addTestimonial = () => {
    if (testimonial.client && testimonial.text) {
      handleProjectChange('testimonial', testimonial);
      setShowTestimonial(false);
    }
  };

  const removeTestimonial = () => {
    setTestimonial({ client: '', text: '' });
    handleProjectChange('testimonial', undefined);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, this would upload to a server
    // Here we'll just simulate it
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => 
        URL.createObjectURL(file)
      );
      handleProjectChange('images', [...currentProject.images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = currentProject.images.filter((_, i) => i !== index);
    handleProjectChange('images', updatedImages);
  };

  const saveProject = () => {
    if (!currentProject.title || !currentProject.description) return;

    let updatedProjects;
    
    if (editMode && editIndex !== null) {
      // Update existing project
      updatedProjects = projects.map((project, i) => 
        i === editIndex ? { ...currentProject, id: project.id } : project
      );
    } else {
      // Add new project
      updatedProjects = [
        ...projects, 
        { ...currentProject, id: Date.now().toString() }
      ];
    }
    
    setProjects(updatedProjects);
    updateData({ projects: updatedProjects });
    
    // Reset form
    setCurrentProject({
      id: '',
      title: '',
      description: '',
      images: [],
      links: [],
      technologies: [],
    });
    setTestimonial({ client: '', text: '' });
    setShowTestimonial(false);
    setEditMode(false);
    setEditIndex(null);
  };

  const editProject = (index: number) => {
    setCurrentProject(projects[index]);
    if (projects[index].testimonial) {
      setTestimonial(projects[index].testimonial);
      setShowTestimonial(true);
    }
    setEditMode(true);
    setEditIndex(index);
  };

  const deleteProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    updateData({ projects: updatedProjects });
  };

  const cancelEdit = () => {
    setCurrentProject({
      id: '',
      title: '',
      description: '',
      images: [],
      links: [],
      technologies: [],
    });
    setTestimonial({ client: '', text: '' });
    setShowTestimonial(false);
    setEditMode(false);
    setEditIndex(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Portfolio Projects</h3>
        <p className="text-muted-foreground mb-4">
          Showcase your best work to potential clients. Add projects that highlight your skills and expertise.
        </p>
      </div>

      {/* Projects List */}
      {projects.length > 0 && (
        <div className="space-y-4 mb-8">
          <h4 className="font-medium">Your Projects ({projects.length})</h4>
          <div className="grid gap-4">
            {projects.map((project, index) => (
              <div key={project.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h5 className="font-semibold">{project.title}</h5>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => editProject(index)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => deleteProject(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                {project.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.images.map((img, i) => (
                      <div key={i} className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                        <img src={img} alt={`${project.title} preview ${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Project Form */}
      <div className="border border-border rounded-lg p-6">
        <h4 className="font-medium mb-4">
          {editMode ? 'Edit Project' : 'Add New Project'}
        </h4>

        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="project-title">Project Title</Label>
            <Input
              id="project-title"
              placeholder="e.g., E-commerce Website Redesign"
              value={currentProject.title}
              onChange={(e) => handleProjectChange('title', e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea
              id="project-description"
              placeholder="Describe the project, your role, and the challenges you faced..."
              value={currentProject.description}
              onChange={(e) => handleProjectChange('description', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Project Images */}
          <div className="space-y-3">
            <Label>Project Images</Label>
            
            {currentProject.images.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {currentProject.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="w-24 h-24 rounded-md overflow-hidden border border-border">
                      <img 
                        src={img} 
                        alt={`Project preview ${index}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="sr-only"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="btn-outline flex items-center cursor-pointer"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Images
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload portfolio images (max 5 images)
              </p>
            </div>
          </div>

          {/* Project Links */}
          <div className="space-y-3">
            <Label>Project Links</Label>
            
            {currentProject.links.length > 0 && (
              <div className="space-y-2 mb-3">
                {currentProject.links.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4 text-primary" />
                      <div>
                        <span className="font-medium">{link.title}</span>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary ml-2 hover:underline"
                        >
                          {link.url}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-2 flex-wrap">
              <Input
                placeholder="Link Title (e.g. Live Site)"
                value={currentLink.title}
                onChange={(e) => setCurrentLink(prev => ({ ...prev, title: e.target.value }))}
                className="flex-1 min-w-[200px]"
              />
              <Input
                placeholder="URL (https://...)"
                value={currentLink.url}
                onChange={(e) => setCurrentLink(prev => ({ ...prev, url: e.target.value }))}
                className="flex-1 min-w-[200px]"
              />
              <Button 
                type="button"
                variant="outline"
                onClick={addLink}
                disabled={!currentLink.url || !currentLink.title}
              >
                Add Link
              </Button>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-3">
            <Label>Technologies Used</Label>
            
            {currentProject.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {currentProject.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <Input
                placeholder="Add a technology (e.g. React, Figma)"
                value={currentTech}
                onChange={(e) => setCurrentTech(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button"
                variant="outline"
                onClick={addTechnology}
                disabled={!currentTech}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>

          {/* Client Testimonial */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Label>Client Testimonial (Optional)</Label>
              {!showTestimonial && !currentProject.testimonial && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowTestimonial(true)}
                >
                  Add Testimonial
                </Button>
              )}
            </div>
            
            {(showTestimonial || currentProject.testimonial) && (
              <div className="space-y-3 bg-secondary/30 p-4 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="testimonial-client">Client Name</Label>
                  <Input
                    id="testimonial-client"
                    placeholder="Client Name or Company"
                    value={currentProject.testimonial?.client || testimonial.client}
                    onChange={(e) => setTestimonial(prev => ({ ...prev, client: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="testimonial-text">Testimonial</Label>
                  <Textarea
                    id="testimonial-text"
                    placeholder="What did the client say about your work?"
                    value={currentProject.testimonial?.text || testimonial.text}
                    onChange={(e) => setTestimonial(prev => ({ ...prev, text: e.target.value }))}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (currentProject.testimonial) {
                        removeTestimonial();
                      } else {
                        setShowTestimonial(false);
                      }
                    }}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {currentProject.testimonial ? 'Remove' : 'Cancel'}
                  </Button>
                  
                  {!currentProject.testimonial && (
                    <Button 
                      type="button" 
                      size="sm"
                      onClick={addTestimonial}
                      disabled={!testimonial.client || !testimonial.text}
                    >
                      Add Testimonial
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Save/Cancel Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            {editMode && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            )}
            <Button 
              type="button" 
              onClick={saveProject}
              disabled={!currentProject.title || !currentProject.description}
            >
              {editMode ? 'Update Project' : 'Add Project'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioProjectsStep;
