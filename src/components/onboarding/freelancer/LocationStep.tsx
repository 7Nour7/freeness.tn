
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const tunisianCities = [
  'Tunis',
  'Sfax',
  'Sousse',
  'Kairouan',
  'Bizerte',
  'Gabès',
  'Ariana',
  'Gafsa',
  'Monastir',
  'Ben Arous',
  'Kasserine',
  'Médenine',
  'Nabeul',
  'Tataouine',
  'Béja',
  'Jendouba',
  'El Kef',
  'Mahdia',
  'Sidi Bouzid',
  'Tozeur',
  'Siliana',
  'Zaghouan',
  'Kébili'
];

interface LocationStepProps {
  data: any;
  updateData: (data: any) => void;
}

const LocationStep: React.FC<LocationStepProps> = ({ data, updateData }) => {
  const [city, setCity] = useState(data.city || '');

  const handleCityChange = (value: string) => {
    setCity(value);
    updateData({ city: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Where are you based?</h3>
        <p className="text-muted-foreground mb-6">
          Clients often prefer to work with freelancers in specific locations. Please select your city in Tunisia.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select value={city} onValueChange={handleCityChange}>
            <SelectTrigger id="city" className="w-full">
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              {tunisianCities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
