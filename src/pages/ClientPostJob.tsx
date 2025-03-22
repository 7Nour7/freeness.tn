
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Clock, 
  DollarSign,
  FileText,
  Users,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

const skillOptions = [
  'UI/UX Design',
  'Graphic Design',
  'Web Development',
  'Mobile Development',
  'Content Writing',
  'SEO',
  'Video Editing',
  'Digital Marketing',
  'Translation',
  '3D Modeling',
  'Animation',
  'Photography',
  'Voice Over',
  'Logo Design',
  'Illustration',
  'Copywriting',
  'Data Entry',
  'Virtual Assistant',
  'Social Media Management'
];

const budgetRanges = [
  { value: 'low', label: '50-200 TND' },
  { value: 'medium', label: '200-500 TND' },
  { value: 'high', label: '500-1000 TND' },
  { value: 'very-high', label: '1000+ TND' },
  { value: 'custom', label: 'Custom Range' }
];

const experienceLevels = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' }
];

const ClientPostJob = () => {
  const navigate = useNavigate();
  const { clientJobData, updateClientJobData } = useOnboarding();

  const [title, setTitle] = useState(clientJobData.title || '');
  const [description, setDescription] = useState(clientJobData.description || '');
  const [category, setCategory] = useState(clientJobData.category || '');
  const [budgetRange, setBudgetRange] = useState(clientJobData.budgetRange || 'medium');
  const [customBudgetMin, setCustomBudgetMin] = useState(clientJobData.customBudgetMin || '');
  const [customBudgetMax, setCustomBudgetMax] = useState(clientJobData.customBudgetMax || '');
  const [experienceLevel, setExperienceLevel] = useState(clientJobData.experienceLevel || 'intermediate');
  const [timeframe, setTimeframe] = useState(clientJobData.timeframe || '');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(clientJobData.skills || []);
  const [skillSearch, setSkillSearch] = useState('');
  const [attachments, setAttachments] = useState<string[]>(clientJobData.attachments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredSkills = skillOptions.filter(skill => 
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const handleAddSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      updateClientJobData({ skills: newSkills });
    }
    setSkillSearch('');
  };

  const handleRemoveSkill = (skill: string) => {
    const newSkills = selectedSkills.filter(s => s !== skill);
    setSelectedSkills(newSkills);
    updateClientJobData({ skills: newSkills });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, this would upload to a server
    // Here we'll just simulate it
    if (e.target.files) {
      const fileNames = Array.from(e.target.files).map(file => file.name);
      const newAttachments = [...attachments, ...fileNames];
      setAttachments(newAttachments);
      updateClientJobData({ attachments: newAttachments });
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
    updateClientJobData({ attachments: newAttachments });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || selectedSkills.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    updateClientJobData({
      title,
      description,
      category,
      budgetRange,
      customBudgetMin: budgetRange === 'custom' ? customBudgetMin : '',
      customBudgetMax: budgetRange === 'custom' ? customBudgetMax : '',
      experienceLevel,
      timeframe,
      skills: selectedSkills,
      attachments
    });

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Job posted successfully!');
      navigate('/client/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/auth/client')}
              className="text-primary hover:text-primary/90 flex items-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Post a Job</h1>
            <div className="w-20"></div> {/* Empty div for spacing */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title<span className="text-red-500">*</span></Label>
                  <Input
                    id="job-title"
                    placeholder="e.g., 'Logo Design for New Tech Startup'"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      updateClientJobData({ title: e.target.value });
                    }}
                    required
                  />
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description<span className="text-red-500">*</span></Label>
                  <Textarea
                    id="job-description"
                    placeholder="Describe the project, requirements, and what you're looking for..."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      updateClientJobData({ description: e.target.value });
                    }}
                    className="min-h-[150px]"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Be specific about your requirements, timeline, and desired outcome.
                  </p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="job-category">Category<span className="text-red-500">*</span></Label>
                  <Select 
                    value={category} 
                    onValueChange={(value) => {
                      setCategory(value);
                      updateClientJobData({ category: value });
                    }}
                    required
                  >
                    <SelectTrigger id="job-category">
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design & Creative</SelectItem>
                      <SelectItem value="web-dev">Web Development</SelectItem>
                      <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                      <SelectItem value="writing">Writing & Translation</SelectItem>
                      <SelectItem value="marketing">Digital Marketing</SelectItem>
                      <SelectItem value="video">Video & Animation</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Range */}
                <div className="space-y-4">
                  <Label>Budget Range</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {budgetRanges.map((range) => (
                      <div key={range.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`budget-${range.value}`}
                          checked={budgetRange === range.value}
                          onCheckedChange={() => {
                            setBudgetRange(range.value);
                            updateClientJobData({ budgetRange: range.value });
                          }}
                        />
                        <Label 
                          htmlFor={`budget-${range.value}`} 
                          className="font-normal cursor-pointer"
                        >
                          {range.label}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {budgetRange === 'custom' && (
                    <div className="flex gap-4 items-center mt-3">
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="number"
                          placeholder="Min"
                          value={customBudgetMin}
                          onChange={(e) => {
                            setCustomBudgetMin(e.target.value);
                            updateClientJobData({ customBudgetMin: e.target.value });
                          }}
                          className="pl-9"
                        />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={customBudgetMax}
                          onChange={(e) => {
                            setCustomBudgetMax(e.target.value);
                            updateClientJobData({ customBudgetMax: e.target.value });
                          }}
                          className="pl-9"
                        />
                      </div>
                      <span className="text-gray-500">TND</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Experience Level */}
                  <div className="space-y-2">
                    <Label htmlFor="experience-level">Required Experience Level</Label>
                    <Select 
                      value={experienceLevel} 
                      onValueChange={(value) => {
                        setExperienceLevel(value);
                        updateClientJobData({ experienceLevel: value });
                      }}
                    >
                      <SelectTrigger id="experience-level">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map(level => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Timeframe */}
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Project Timeframe</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="timeframe"
                        placeholder="e.g., '2 weeks', '1 month', 'Ongoing'"
                        value={timeframe}
                        onChange={(e) => {
                          setTimeframe(e.target.value);
                          updateClientJobData({ timeframe: e.target.value });
                        }}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <Label>Required Skills<span className="text-red-500">*</span></Label>
                  
                  {selectedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedSkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full flex justify-between"
                      >
                        <span>Add required skills</span>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <div className="p-4 bg-secondary/20 border-b border-border">
                        <Input
                          placeholder="Search skills..."
                          value={skillSearch}
                          onChange={(e) => setSkillSearch(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="max-h-[200px] overflow-y-auto p-2">
                        {filteredSkills.length > 0 ? (
                          filteredSkills.map(skill => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => handleAddSkill(skill)}
                              className="w-full text-left px-2 py-1.5 rounded hover:bg-secondary/50 transition-colors"
                            >
                              {skill}
                            </button>
                          ))
                        ) : (
                          <div className="text-center py-3 text-muted-foreground">
                            No skills found
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Attachments */}
                <div className="space-y-3">
                  <Label>Attachments (Optional)</Label>
                  
                  {attachments.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {attachments.map((file, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                        >
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{file}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(index)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="sr-only"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="btn-outline flex items-center cursor-pointer"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Files
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You can upload example files, briefs, or any other relevant documents.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Job'}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    By posting this job, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientPostJob;
