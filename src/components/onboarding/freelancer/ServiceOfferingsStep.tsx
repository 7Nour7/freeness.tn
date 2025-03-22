
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ImageIcon, Trash2, Upload, Plus, Check, X } from 'lucide-react';

interface ServiceTier {
  name: string;
  price: number;
  description: string;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  thumbnail: string;
  tiers: {
    basic: ServiceTier;
    standard: ServiceTier;
    premium: ServiceTier;
  };
}

const serviceCategories = {
  'design': ['Graphic Design', 'UI/UX Design', 'Logo Design', 'Web Design', 'Illustration'],
  'web-development': ['Frontend', 'Backend', 'Full Stack', 'WordPress', 'E-commerce'],
  'writing': ['Content Writing', 'Copywriting', 'Translation', 'Proofreading', 'Technical Writing'],
  'video': ['Video Editing', 'Animation', 'Motion Graphics', 'Video Production'],
  'marketing': ['Social Media', 'SEO', 'Email Marketing', 'Content Marketing', 'PPC'],
  'business': ['Consulting', 'Virtual Assistant', 'Data Entry', 'Customer Service']
};

interface ServiceOfferingsStepProps {
  data: any;
  updateData: (data: any) => void;
}

const ServiceOfferingsStep: React.FC<ServiceOfferingsStepProps> = ({ data, updateData }) => {
  const [services, setServices] = useState<Service[]>(data.services || []);
  const [currentService, setCurrentService] = useState<Service>({
    id: '',
    title: '',
    description: '',
    category: '',
    subcategory: '',
    thumbnail: '',
    tiers: {
      basic: {
        name: 'Basic',
        price: 100,
        description: '',
        deliveryTime: 3,
        revisions: 1,
        features: ['feature 1'],
      },
      standard: {
        name: 'Standard',
        price: 200,
        description: '',
        deliveryTime: 5,
        revisions: 2,
        features: ['feature 1', 'feature 2'],
      },
      premium: {
        name: 'Premium',
        price: 300,
        description: '',
        deliveryTime: 7,
        revisions: 5,
        features: ['feature 1', 'feature 2', 'feature 3'],
      },
    },
  });
  const [activeTab, setActiveTab] = useState<'basic' | 'standard' | 'premium'>('basic');
  const [newFeature, setNewFeature] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleServiceChange = (field: keyof Service, value: any) => {
    setCurrentService(prev => ({ ...prev, [field]: value }));
  };

  const handleTierChange = (tier: 'basic' | 'standard' | 'premium', field: keyof ServiceTier, value: any) => {
    setCurrentService(prev => ({
      ...prev,
      tiers: {
        ...prev.tiers,
        [tier]: {
          ...prev.tiers[tier],
          [field]: value
        }
      }
    }));
  };

  const updateFeatures = (tier: 'basic' | 'standard' | 'premium', features: string[]) => {
    handleTierChange(tier, 'features', features);
  };

  const addFeature = () => {
    if (newFeature) {
      const updatedFeatures = [...currentService.tiers[activeTab].features, newFeature];
      updateFeatures(activeTab, updatedFeatures);
      setNewFeature('');
    }
  };

  const removeFeature = (tier: 'basic' | 'standard' | 'premium', index: number) => {
    const updatedFeatures = currentService.tiers[tier].features.filter((_, i) => i !== index);
    updateFeatures(tier, updatedFeatures);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentService(prev => ({
      ...prev,
      category,
      subcategory: ''
    }));
    setSubcategories(serviceCategories[category as keyof typeof serviceCategories] || []);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, this would upload to a server
    // Here we'll just simulate it
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      handleServiceChange('thumbnail', fileUrl);
    }
  };

  const saveService = () => {
    if (!currentService.title || !currentService.description || !currentService.category) return;

    let updatedServices;
    
    if (editMode && editIndex !== null) {
      // Update existing service
      updatedServices = services.map((service, i) => 
        i === editIndex ? { ...currentService, id: service.id } : service
      );
    } else {
      // Add new service
      updatedServices = [
        ...services, 
        { ...currentService, id: Date.now().toString() }
      ];
    }
    
    setServices(updatedServices);
    updateData({ services: updatedServices });
    
    // Reset form
    setCurrentService({
      id: '',
      title: '',
      description: '',
      category: '',
      subcategory: '',
      thumbnail: '',
      tiers: {
        basic: {
          name: 'Basic',
          price: 100,
          description: '',
          deliveryTime: 3,
          revisions: 1,
          features: ['feature 1'],
        },
        standard: {
          name: 'Standard',
          price: 200,
          description: '',
          deliveryTime: 5,
          revisions: 2,
          features: ['feature 1', 'feature 2'],
        },
        premium: {
          name: 'Premium',
          price: 300,
          description: '',
          deliveryTime: 7,
          revisions: 5,
          features: ['feature 1', 'feature 2', 'feature 3'],
        },
      },
    });
    setActiveTab('basic');
    setSubcategories([]);
    setEditMode(false);
    setEditIndex(null);
  };

  const editService = (index: number) => {
    setCurrentService(services[index]);
    if (services[index].category) {
      setSubcategories(serviceCategories[services[index].category as keyof typeof serviceCategories] || []);
    }
    setEditMode(true);
    setEditIndex(index);
    setActiveTab('basic');
  };

  const deleteService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    updateData({ services: updatedServices });
  };

  const cancelEdit = () => {
    setCurrentService({
      id: '',
      title: '',
      description: '',
      category: '',
      subcategory: '',
      thumbnail: '',
      tiers: {
        basic: {
          name: 'Basic',
          price: 100,
          description: '',
          deliveryTime: 3,
          revisions: 1,
          features: ['feature 1'],
        },
        standard: {
          name: 'Standard',
          price: 200,
          description: '',
          deliveryTime: 5,
          revisions: 2,
          features: ['feature 1', 'feature 2'],
        },
        premium: {
          name: 'Premium',
          price: 300,
          description: '',
          deliveryTime: 7,
          revisions: 5,
          features: ['feature 1', 'feature 2', 'feature 3'],
        },
      },
    });
    setActiveTab('basic');
    setSubcategories([]);
    setEditMode(false);
    setEditIndex(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Service Offerings</h3>
        <p className="text-muted-foreground mb-4">
          Create service packages that you can offer to clients. Define different tiers with varying features and prices.
        </p>
      </div>

      {/* Services List */}
      {services.length > 0 && (
        <div className="space-y-4 mb-8">
          <h4 className="font-medium">Your Services ({services.length})</h4>
          <div className="grid gap-4">
            {services.map((service, index) => (
              <div key={service.id} className="border border-border rounded-lg overflow-hidden">
                <div className="flex items-start">
                  {service.thumbnail && (
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={service.thumbnail} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold">{service.title}</h5>
                        <p className="text-sm text-muted-foreground mb-1">
                          {service.category} {service.subcategory ? `› ${service.subcategory}` : ''}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => editService(index)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => deleteService(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <div className="text-sm">
                        <span className="font-medium">Basic:</span> {service.tiers.basic.price} TND
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Standard:</span> {service.tiers.standard.price} TND
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Premium:</span> {service.tiers.premium.price} TND
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Service Form */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-secondary/30 p-4">
          <h4 className="font-medium">
            {editMode ? 'Edit Service' : 'Add New Service'}
          </h4>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Service Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service-title">Service Title</Label>
              <Input
                id="service-title"
                placeholder="e.g., Professional Logo Design"
                value={currentService.title}
                onChange={(e) => handleServiceChange('title', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-description">Service Description</Label>
              <Textarea
                id="service-description"
                placeholder="Describe what you offer in this service..."
                value={currentService.description}
                onChange={(e) => handleServiceChange('description', e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-category">Category</Label>
                <Select 
                  value={currentService.category} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="service-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="writing">Writing & Translation</SelectItem>
                    <SelectItem value="video">Video & Animation</SelectItem>
                    <SelectItem value="marketing">Digital Marketing</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-subcategory">Subcategory</Label>
                <Select 
                  value={currentService.subcategory} 
                  onValueChange={(value) => handleServiceChange('subcategory', value)}
                  disabled={!currentService.category}
                >
                  <SelectTrigger id="service-subcategory">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map(sub => (
                      <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Service Thumbnail</Label>
              <div className="flex items-center gap-4">
                {currentService.thumbnail ? (
                  <div className="relative w-32 h-32 rounded-md overflow-hidden border border-border">
                    <img 
                      src={currentService.thumbnail} 
                      alt="Service thumbnail" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleServiceChange('thumbnail', '')}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-md bg-secondary/30 flex items-center justify-center border border-border">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="sr-only"
                      id="thumbnail-upload"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="btn-outline flex items-center cursor-pointer"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {currentService.thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail'}
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Recommended size: 600x400px. Max file size: 2MB.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Tiers */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h4 className="font-medium">Service Packages</h4>
            
            {/* Tier Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                type="button"
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'basic' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveTab('basic')}
              >
                Basic
              </button>
              <button
                type="button"
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'standard' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveTab('standard')}
              >
                Standard
              </button>
              <button
                type="button"
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'premium' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveTab('premium')}
              >
                Premium
              </button>
            </div>
            
            {/* Current Tab Content */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${activeTab}-price`}>Price (TND)</Label>
                  <Input
                    id={`${activeTab}-price`}
                    type="number"
                    value={currentService.tiers[activeTab].price}
                    onChange={(e) => handleTierChange(activeTab, 'price', Number(e.target.value))}
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${activeTab}-name`}>Package Name</Label>
                  <Input
                    id={`${activeTab}-name`}
                    value={currentService.tiers[activeTab].name}
                    onChange={(e) => handleTierChange(activeTab, 'name', e.target.value)}
                    placeholder="e.g., Basic, Standard, Premium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${activeTab}-description`}>Package Description</Label>
                <Textarea
                  id={`${activeTab}-description`}
                  value={currentService.tiers[activeTab].description}
                  onChange={(e) => handleTierChange(activeTab, 'description', e.target.value)}
                  placeholder="Brief description of what's included in this package"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${activeTab}-delivery`}>Delivery Time (days)</Label>
                  <Input
                    id={`${activeTab}-delivery`}
                    type="number"
                    value={currentService.tiers[activeTab].deliveryTime}
                    onChange={(e) => handleTierChange(activeTab, 'deliveryTime', Number(e.target.value))}
                    min={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${activeTab}-revisions`}>Number of Revisions</Label>
                  <Input
                    id={`${activeTab}-revisions`}
                    type="number"
                    value={currentService.tiers[activeTab].revisions}
                    onChange={(e) => handleTierChange(activeTab, 'revisions', Number(e.target.value))}
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Features Included</Label>
                {currentService.tiers[activeTab].features.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {currentService.tiers[activeTab].features.map((feature, index) => (
                      <div key={index} className="flex items-center group">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <Input
                          value={feature}
                          onChange={(e) => {
                            const updatedFeatures = [...currentService.tiers[activeTab].features];
                            updatedFeatures[index] = e.target.value;
                            updateFeatures(activeTab, updatedFeatures);
                          }}
                          className="flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(activeTab, index)}
                          className="ml-2 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={addFeature}
                    disabled={!newFeature}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Save/Cancel Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
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
              onClick={saveService}
              disabled={!currentService.title || !currentService.description || !currentService.category}
            >
              {editMode ? 'Update Service' : 'Add Service'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceOfferingsStep;
