
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const experienceLevels = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'intermediate', label: 'Intermediate (2-5 years)' },
  { value: 'expert', label: 'Expert (5-10 years)' },
  { value: 'master', label: 'Master (10+ years)' }
];

interface ProfileStepProps {
  data: any;
  updateData: (data: any) => void;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ data, updateData }) => {
  const [title, setTitle] = useState(data.title || '');
  const [bio, setBio] = useState(data.bio || '');
  const [experience, setExperience] = useState(data.experience || 'entry');
  const [hourlyRate, setHourlyRate] = useState(data.hourlyRate || 50);
  const [languages, setLanguages] = useState(data.languages || []);
  const [newLanguage, setNewLanguage] = useState('');
  const [languageProficiency, setLanguageProficiency] = useState('fluent');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateData({ title: e.target.value });
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
    updateData({ bio: e.target.value });
  };

  const handleExperienceChange = (value: string) => {
    setExperience(value);
    updateData({ experience: value });
  };

  const handleHourlyRateChange = (value: number[]) => {
    setHourlyRate(value[0]);
    updateData({ hourlyRate: value[0] });
  };

  const addLanguage = () => {
    if (newLanguage) {
      const updatedLanguages = [
        ...languages,
        { language: newLanguage, proficiency: languageProficiency }
      ];
      setLanguages(updatedLanguages);
      updateData({ languages: updatedLanguages });
      setNewLanguage('');
      setLanguageProficiency('fluent');
    }
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
    updateData({ languages: updatedLanguages });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Tell us about yourself</h3>
        <p className="text-muted-foreground mb-6">
          This information will help clients understand your background and expertise.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            placeholder="e.g., UI/UX Designer, Frontend Developer, Content Writer"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea
            id="bio"
            placeholder="Describe your experience, skills, and what makes you unique..."
            value={bio}
            onChange={handleBioChange}
            className="min-h-[150px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {bio.length}/500 characters (minimum 100)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience Level</Label>
          <Select value={experience} onValueChange={handleExperienceChange}>
            <SelectTrigger id="experience">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 pt-4">
          <Label htmlFor="hourlyRate">Hourly Rate (TND)</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="hourlyRate"
              min={10}
              max={500}
              step={5}
              value={[hourlyRate]}
              onValueChange={handleHourlyRateChange}
              className="flex-1"
            />
            <span className="font-medium text-lg w-16 text-right">{hourlyRate} TND</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Set a rate that reflects your experience and skills.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-200">
          <Label>Languages</Label>
          
          {/* Languages List */}
          {languages.length > 0 && (
            <div className="space-y-2">
              {languages.map((lang: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({lang.proficiency})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Add Language Form */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Add a language"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
              />
            </div>
            <Select value={languageProficiency} onValueChange={setLanguageProficiency}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Proficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="conversational">Conversational</SelectItem>
                <SelectItem value="fluent">Fluent</SelectItem>
                <SelectItem value="native">Native</SelectItem>
              </SelectContent>
            </Select>
            <button
              type="button"
              onClick={addLanguage}
              disabled={!newLanguage}
              className="btn-outline"
            >
              Add Language
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
