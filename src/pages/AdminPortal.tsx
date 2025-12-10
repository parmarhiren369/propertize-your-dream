import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Plus, Edit, Trash2, Eye, Users, 
  DollarSign, TrendingUp, Home, LayoutDashboard, Upload, Image as ImageIcon
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
import { Property } from '@/data/properties';
import { useProperties } from '@/context/PropertyContext';
import { toast } from '@/hooks/use-toast';

type TabType = 'dashboard' | 'properties' | 'users' | 'transactions';

export default function AdminPortal() {
  const { properties: propertyList, addProperty, deleteProperty } = useProperties();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newProperty, setNewProperty] = useState({
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

  const stats = [
    { label: 'Total Properties', value: propertyList.length, icon: Home, color: 'text-primary' },
    { label: 'Active Listings', value: propertyList.filter(p => p.status === 'available').length, icon: TrendingUp, color: 'text-green-500' },
    { label: 'Total Value', value: '$45.2M', icon: DollarSign, color: 'text-gold' },
    { label: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-500' },
  ];

  const mockUsers = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Buyer', joined: '2024-01-15', status: 'active' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'Seller', joined: '2024-02-20', status: 'active' },
    { id: 3, name: 'Amit Kumar', email: 'amit@example.com', role: 'Buyer', joined: '2024-03-10', status: 'inactive' },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', role: 'Agent', joined: '2024-01-25', status: 'active' },
  ];

  const mockTransactions = [
    { id: 1, property: 'Luxury Villa', buyer: 'Rahul Sharma', amount: 25000000, date: '2024-03-15', status: 'completed' },
    { id: 2, property: 'Sea View Apartment', buyer: 'Priya Patel', amount: 15000000, date: '2024-03-12', status: 'pending' },
    { id: 3, property: 'Modern Penthouse', buyer: 'Amit Kumar', amount: 35000000, date: '2024-03-10', status: 'completed' },
    { id: 4, property: 'Garden Villa', buyer: 'Sneha Gupta', amount: 20000000, date: '2024-03-08', status: 'cancelled' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewProperty({ ...newProperty, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProperty = () => {
    if (!newProperty.title || !newProperty.price || !newProperty.location) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const property: Property = {
      id: Date.now().toString(),
      title: newProperty.title,
      description: newProperty.description,
      price: parseFloat(newProperty.price),
      location: newProperty.location,
      address: newProperty.address,
      bedrooms: parseInt(newProperty.bedrooms) || 0,
      bathrooms: parseInt(newProperty.bathrooms) || 0,
      area: parseInt(newProperty.area) || 0,
      images: [newProperty.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'],
      features: [],
      type: newProperty.type as 'sale' | 'rent',
      category: newProperty.category as Property['category'],
      status: 'available',
      createdAt: new Date().toISOString().split('T')[0],
      featured: false,
    };

    addProperty(property);
    setIsAddDialogOpen(false);
    setImagePreview('');
    setNewProperty({
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
      title: 'Property Added',
      description: 'The property has been successfully listed.',
    });
  };

  const handleDeleteProperty = (id: string) => {
    deleteProperty(id);
    toast({
      title: 'Property Deleted',
      description: 'The property has been removed from listings.',
    });
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', tab: 'dashboard' as TabType },
    { icon: Home, label: 'Properties', tab: 'properties' as TabType },
    { icon: Users, label: 'Users', tab: 'users' as TabType },
    { icon: DollarSign, label: 'Transactions', tab: 'transactions' as TabType },
  ];

  const renderDashboard = () => (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="text-2xl font-display font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Properties */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Recent Properties
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4 text-muted-foreground font-medium">Property</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Location</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Price</th>
                <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {propertyList.slice(0, 5).map((property) => (
                <tr key={property.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="text-foreground font-medium">{property.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{property.location}</td>
                  <td className="p-4 text-foreground font-semibold">
                    ${property.price.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      property.status === 'available' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderProperties = () => (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">
          All Properties
        </h2>
        <Button variant="gold" className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-5 h-5" />
          Add Property
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-4 text-muted-foreground font-medium">Property</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Location</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Type</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Price</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {propertyList.map((property) => (
              <tr key={property.id} className="border-b border-border hover:bg-secondary/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="text-foreground font-medium">{property.title}</span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{property.location}</td>
                <td className="p-4">
                  <span className="capitalize text-foreground">{property.category}</span>
                </td>
                <td className="p-4 text-foreground font-semibold">
                  ${property.price.toLocaleString()}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    property.status === 'available' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {property.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link to={`/property/${property.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="font-display text-xl font-semibold text-foreground">
          User Management
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-4 text-muted-foreground font-medium">Name</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Email</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Role</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Joined</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-secondary/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-foreground font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{user.email}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">{user.joined}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Transaction History
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-4 text-muted-foreground font-medium">Property</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Buyer</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Amount</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
              <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="border-b border-border hover:bg-secondary/50">
                <td className="p-4 text-foreground font-medium">{tx.property}</td>
                <td className="p-4 text-muted-foreground">{tx.buyer}</td>
                <td className="p-4 text-foreground font-semibold">
                  ₹{tx.amount.toLocaleString()}
                </td>
                <td className="p-4 text-muted-foreground">{tx.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tx.status === 'completed' 
                      ? 'bg-green-500/20 text-green-500' 
                      : tx.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'properties':
        return renderProperties();
      case 'users':
        return renderUsers();
      case 'transactions':
        return renderTransactions();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 glass-card border-r border-border p-6 z-50">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            PROPERTIZE
          </span>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.tab 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={activeTab}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground capitalize">
                {activeTab === 'dashboard' ? 'Admin Dashboard' : activeTab}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === 'dashboard' && 'Manage your property listings and users'}
                {activeTab === 'properties' && 'View and manage all property listings'}
                {activeTab === 'users' && 'Manage registered users and their roles'}
                {activeTab === 'transactions' && 'View all property transactions'}
              </p>
            </div>
            {activeTab === 'dashboard' && (
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="gold" className="gap-2">
                    <Plus className="w-5 h-5" />
                    Add Property
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl">Add New Property</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input
                      placeholder="Property Title *"
                      value={newProperty.title}
                      onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                      className="bg-secondary border-border"
                    />
                    <Input
                      placeholder="Location *"
                      value={newProperty.location}
                      onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                      className="bg-secondary border-border"
                    />
                    <Input
                      placeholder="Address"
                      value={newProperty.address}
                      onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                      className="bg-secondary border-border"
                    />
                    <Input
                      placeholder="Price *"
                      type="number"
                      value={newProperty.price}
                      onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                      className="bg-secondary border-border"
                    />
                    <Select
                      value={newProperty.type}
                      onValueChange={(value) => setNewProperty({ ...newProperty, type: value })}
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
                      value={newProperty.category}
                      onValueChange={(value) => setNewProperty({ ...newProperty, category: value })}
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
                      value={newProperty.bedrooms}
                      onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })}
                      className="bg-secondary border-border"
                    />
                    <Input
                      placeholder="Bathrooms"
                      type="number"
                      value={newProperty.bathrooms}
                      onChange={(e) => setNewProperty({ ...newProperty, bathrooms: e.target.value })}
                      className="bg-secondary border-border"
                    />
                    <Input
                      placeholder="Area (sqft)"
                      type="number"
                      value={newProperty.area}
                      onChange={(e) => setNewProperty({ ...newProperty, area: e.target.value })}
                      className="bg-secondary border-border"
                    />
                    
                    {/* Image Upload Section */}
                    <div className="col-span-2 space-y-3">
                      <label className="text-sm text-muted-foreground">Property Image</label>
                      <div className="flex gap-3">
                        <Input
                          placeholder="Image URL"
                          value={newProperty.imageUrl}
                          onChange={(e) => {
                            setNewProperty({ ...newProperty, imageUrl: e.target.value });
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
                              setNewProperty({ ...newProperty, imageUrl: '' });
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
                      value={newProperty.description}
                      onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                      className="col-span-2 bg-secondary border-border"
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="gold" onClick={handleAddProperty}>
                      Add Property
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
}
