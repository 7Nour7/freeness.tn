
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

const skillCategories = [
  {
    name: 'Design',
    skills: ['UI/UX Design', 'Graphic Design', 'Logo Design', 'Illustration', 'Animation', '3D Modeling']
  },
  {
    name: 'Development',
    skills: ['Web Development', 'Mobile Development', 'Frontend', 'Backend', 'Full Stack', 'Game Development']
  },
  {
    name: 'Marketing',
    skills: ['Social Media', 'SEO', 'Content Marketing', 'Email Marketing', 'PPC', 'Analytics']
  },
  {
    name: 'Writing',
    skills: ['Copywriting', 'Content Writing', 'Technical Writing', 'Translation', 'Editing', 'Proofreading']
  },
  {
    name: 'Video & Audio',
    skills: ['Video Editing', 'Video Production', 'Voice Over', 'Sound Design', 'Music Production', 'Podcasting']
  }
];

const toolsList = [
  'Figma', 'Photoshop', 'Illustrator', 'After Effects', 'Sketch', 'InVision',
  'VS Code', 'React', 'Angular', 'Vue.js', 'Node.js', 'WordPress',
  'Google Analytics', 'Mailchimp', 'HubSpot', 'Ahrefs', 'SEMrush',
  'Final Cut Pro', 'Adobe Premiere', 'Audacity', 'Adobe XD', 'Canva'
];

interface SkillsStepProps {
  data: any;
  updateData: (data: any) => void;
}

const SkillsStep: React.FC<SkillsStepProps> = ({ data, updateData }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(data.skills || []);
  const [selectedTools, setSelectedTools] = useState<string[]>(data.tools || []);
  const [customSkill, setCustomSkill] = useState('');
  const [customTool, setCustomTool] = useState('');

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => {
      const newSkills = prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill];
      
      updateData({ skills: newSkills });
      return newSkills;
    });
  };

  const toggleTool = (tool: string) => {
    setSelectedTools(prev => {
      const newTools = prev.includes(tool)
        ? prev.filter(t => t !== tool)
        : [...prev, tool];
      
      updateData({ tools: newTools });
      return newTools;
    });
  };

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      const newSkills = [...selectedSkills, customSkill];
      setSelectedSkills(newSkills);
      updateData({ skills: newSkills });
      setCustomSkill('');
    }
  };

  const addCustomTool = () => {
    if (customTool && !selectedTools.includes(customTool)) {
      const newTools = [...selectedTools, customTool];
      setSelectedTools(newTools);
      updateData({ tools: newTools });
      setCustomTool('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">What skills do you offer?</h3>
        <p className="text-muted-foreground mb-6">
          Select the skills you want to offer to clients. This helps match you with the right projects.
        </p>
      </div>

      {/* Selected Skills */}
      <div className="mb-6">
        <Label className="mb-2 block">Your selected skills</Label>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedSkills.length > 0 ? (
            selectedSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                {skill}
                <button
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No skills selected yet. Choose from the categories below.</p>
          )}
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-6">
        {skillCategories.map((category) => (
          <div key={category.name} className="border-b border-gray-200 pb-6 last:border-0">
            <h4 className="font-medium mb-3">{category.name}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {category.skills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={() => toggleSkill(skill)}
                  />
                  <Label htmlFor={`skill-${skill}`} className="font-normal cursor-pointer">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Skill */}
      <div className="mt-6 flex gap-2">
        <Input
          placeholder="Add a custom skill"
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          className="flex-1"
        />
        <button
          type="button"
          onClick={addCustomSkill}
          disabled={!customSkill}
          className="btn-primary inline-flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {/* Tools Section */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-2">What tools & software do you use?</h3>
        <p className="text-muted-foreground mb-6">
          Select the tools and software you're proficient with.
        </p>

        {/* Selected Tools */}
        <div className="mb-6">
          <Label className="mb-2 block">Your selected tools</Label>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTools.length > 0 ? (
              selectedTools.map((tool) => (
                <Badge key={tool} variant="secondary" className="px-3 py-1 text-sm">
                  {tool}
                  <button
                    type="button"
                    onClick={() => toggleTool(tool)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No tools selected yet. Choose from the options below.</p>
            )}
          </div>
        </div>

        {/* Tools List */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {toolsList.map((tool) => (
            <div key={tool} className="flex items-center space-x-2">
              <Checkbox
                id={`tool-${tool}`}
                checked={selectedTools.includes(tool)}
                onCheckedChange={() => toggleTool(tool)}
              />
              <Label htmlFor={`tool-${tool}`} className="font-normal cursor-pointer">
                {tool}
              </Label>
            </div>
          ))}
        </div>

        {/* Add Custom Tool */}
        <div className="mt-6 flex gap-2">
          <Input
            placeholder="Add a custom tool"
            value={customTool}
            onChange={(e) => setCustomTool(e.target.value)}
            className="flex-1"
          />
          <button
            type="button"
            onClick={addCustomTool}
            disabled={!customTool}
            className="btn-primary inline-flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsStep;
