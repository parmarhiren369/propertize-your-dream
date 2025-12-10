import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Heart, Home, Plus, Search, 
  User, Settings, LogOut, Bell, MessageSquare, Upload, Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/data/properties';
import { useProperties } from '@/context/PropertyContext';
import { toast } from '@/hooks/use-toast';

export default function UserPortal() {
  const { properties, addProperty } = useProperties();
  const [savedProperties] = useState<Property[]>(properties.slice(0, 3));
  const [myListings, setMyListings] = useState<Property[]>([properties[4] || properties[0]].filter(Boolean));
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'sale',
    category: 'house',
    imageUrl: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewListing({ ...newListing, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateListing = () => {
    if (!newListing.title || !newListing.price || !newListing.location) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const property: Property = {
      id: Date.now().toString(),
      title: newListing.title,
      description: newListing.description,
      price: parseFloat(newListing.price),
      location: newListing.location,
      address: newListing.address,
      bedrooms: parseInt(newListing.bedrooms) || 0,
      bathrooms: parseInt(newListing.bathrooms) || 0,
      area: parseInt(newListing.area) || 0,
      images: [newListing.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'],
      features: [],
      type: newListing.type as 'sale' | 'rent',
      category: newListing.category as Property['category'],
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      featured: false,
    };

    // Add to global properties
    addProperty(property);
    setMyListings([property, ...myListings]);
    setIsListDialogOpen(false);
    setImagePreview('');
    setNewListing({
      title: '',
      description: '',
      price: '',
      location: '',
      address: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      type: 'sale',
      category: 'house',
      imageUrl: '',
    });

    toast({
      title: 'Listing Created',
      description: 'Your property has been added and is now visible to all users.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              PROPERTIZE
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-primary-foreground font-bold">JD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-2">
            {[
              { icon: Home, label: 'Dashboard', active: true },
              { icon: Heart, label: 'Saved Properties', active: false },
              { icon: Building2, label: 'My Listings', active: false },
              { icon: Search, label: 'Search Properties', active: false },
              { icon: User, label: 'Profile', active: false },
              { icon: Settings, label: 'Settings', active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-border">
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                  <LogOut className="w-5 h-5" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Welcome Section */}
              <div className="glass-card rounded-2xl p-8 mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                      Welcome back, John!
                    </h1>
                    <p className="text-muted-foreground">
                      Manage your property listings and discover new opportunities.
                    </p>
                  </div>
                  <Dialog open={isListDialogOpen} onOpenChange={setIsListDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="gold" className="gap-2">
                        <Plus className="w-5 h-5" />
                        List Property
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="font-display text-2xl">List Your Property</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <Input
                          placeholder="Property Title *"
                          value={newListing.title}
                          onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                          className="bg-secondary border-border"
                        />
                        <Input
                          placeholder="Location *"
                          value={newListing.location}
                          onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
                          className="bg-secondary border-border"
                        />
                        <Input
                          placeholder="Address"
                          value={newListing.address}
                          onChange={(e) => setNewListing({ ...newListing, address: e.target.value })}
                          className="bg-secondary border-border"
                        />
                        <Input
                          placeholder="Price *"
                          type="number"
                          value={newListing.price}
                          onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                          className="bg-secondary border-border"
                        />
                        <Select
                          value={newListing.type}
                          onValueChange={(value) => setNewListing({ ...newListing, type: value })}
                        >
                          <SelectTrigger className="bg-secondary border-border">
                            <SelectValue placeholder="Listing Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sale">For Sale</SelectItem>
                            <SelectItem value="rent">For Rent</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={newListing.category}
                          onValueChange={(value) => setNewListing({ ...newListing, category: value })}
                        >
                          <SelectTrigger className="bg-secondary border-border">
                            <SelectValue placeholder="Property Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="penthouse">Penthouse</SelectItem>
                            <SelectItem value="estate">Estate</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Bedrooms"
                          type="number"
                          value={newListing.bedrooms}
                          onChange={(e) => setNewListing({ ...newListing, bedrooms: e.target.value })}
                          className="bg-secondary border-border"
                        />
                        <Input
                          placeholder="Bathrooms"
                          type="number"
                          value={newListing.bathrooms}
                          onChange={(e) => setNewListing({ ...newListing, bathrooms: e.target.value })}
                          className="bg-secondary border-border"
                        />
                        <Input
                          placeholder="Area (sqft)"
                          type="number"
                          value={newListing.area}
                          onChange={(e) => setNewListing({ ...newListing, area: e.target.value })}
                          className="bg-secondary border-border"
                        />
                        {/* Image Upload Section */}
                        <div className="col-span-2 space-y-3">
                          <label className="text-sm text-muted-foreground">Property Image</label>
                          <div className="flex gap-3">
                            <Input
                              placeholder="Image URL"
                              value={newListing.imageUrl}
                              onChange={(e) => {
                                setNewListing({ ...newListing, imageUrl: e.target.value });
                                setImagePreview(e.target.value);
                              }}
                              className="bg-secondary border-border flex-1"
                            />
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageUpload}
                              accept="image/*"
                              className="hidden"
                            />
                            <Button 
                              variant="outline" 
                              onClick={() => fileInputRef.current?.click()}
                              className="gap-2"
                            >
                              <Upload className="w-4 h-4" />
                              Upload
                            </Button>
                          </div>
                          {imagePreview && (
                            <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                  setImagePreview('');
                                  setNewListing({ ...newListing, imageUrl: '' });
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                          {!imagePreview && (
                            <div 
                              className="w-full h-40 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <ImageIcon className="w-10 h-10 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Click to upload or paste URL above</span>
                            </div>
                          )}
                        </div>

                        <Textarea
                          placeholder="Description"
                          value={newListing.description}
                          onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                          className="col-span-2 bg-secondary border-border"
                          rows={4}
                        />
                      </div>
                      <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" onClick={() => setIsListDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="gold" onClick={handleCreateListing}>
                          Submit Listing
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="saved" className="space-y-6">
                <TabsList className="bg-secondary p-1">
                  <TabsTrigger value="saved" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Heart className="w-4 h-4 mr-2" />
                    Saved Properties
                  </TabsTrigger>
                  <TabsTrigger value="listings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Building2 className="w-4 h-4 mr-2" />
                    My Listings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="saved">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedProperties.map((property, index) => (
                      <PropertyCard key={property.id} property={property} index={index} />
                    ))}
                  </div>
                  {savedProperties.length === 0 && (
                    <div className="text-center py-12 glass-card rounded-2xl">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No saved properties</h3>
                      <p className="text-muted-foreground mb-4">
                        Start exploring and save properties you like!
                      </p>
                      <Link to="/properties">
                        <Button variant="gold">Browse Properties</Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="listings">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myListings.map((property, index) => (
                      <PropertyCard key={property.id} property={property} index={index} />
                    ))}
                  </div>
                  {myListings.length === 0 && (
                    <div className="text-center py-12 glass-card rounded-2xl">
                      <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No listings yet</h3>
                      <p className="text-muted-foreground mb-4">
                        List your first property and start selling!
                      </p>
                      <Button variant="gold" onClick={() => setIsListDialogOpen(true)}>
                        List Property
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
