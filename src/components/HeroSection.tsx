import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowDown, MapPin, Home, Users, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const mumbaiLocations = [
  'All Mumbai',
  'Andheri East',
  'Andheri West',
  'Bandra East',
  'Bandra West',
  'Borivali',
  'Chembur',
  'Dadar',
  'Ghatkopar East',
  'Ghatkopar West',
  'Goregaon',
  'Juhu',
  'Kandivali',
  'Kurla',
  'Malad',
  'Mulund',
  'Navi Mumbai',
  'Powai',
  'Thane',
  'Worli',
];

const propertyTypes = [
  'All Types',
  'Apartment',
  'Villa',
  'Penthouse',
  'Bungalow',
  'Plot',
  'Commercial',
  'Office Space',
];

const budgetRanges = [
  'Any Budget',
  'Under ₹50 Lakhs',
  '₹50 Lakhs - ₹1 Crore',
  '₹1 Crore - ₹2 Crore',
  '₹2 Crore - ₹5 Crore',
  '₹5 Crore - ₹10 Crore',
  'Above ₹10 Crore',
];

export default function HeroSection() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'post'>('buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const handleSearch = () => {
    if (activeTab === 'post') {
      navigate('/user');
    } else {
      navigate('/properties');
    }
  };

  const stats = [
    { icon: Home, value: '2,500+', label: 'Properties Listed' },
    { icon: MapPin, value: '150+', label: 'Prime Locations' },
    { icon: Users, value: '1000+', label: 'Happy Customers' },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 container mx-auto px-6 pt-32"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary border border-primary/20">
              Welcome to Luxury Real Estate
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            Find Your
            <span className="block text-gradient-gold">Dream Property</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Discover exclusive properties in the world's most prestigious locations. 
            From stunning penthouses to sprawling estates, your perfect home awaits.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-card rounded-2xl p-4 md:p-6 max-w-5xl mx-auto"
          >
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              {[
                { key: 'buy', label: 'Buy' },
                { key: 'rent', label: 'Rent' },
                { key: 'post', label: 'Post Property Ad' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'buy' | 'rent' | 'post')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full md:w-[180px] bg-background/80 border-border">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {mumbaiLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-full md:w-[180px] bg-background/80 border-border">
                  <Home className="w-4 h-4 mr-2 text-primary" />
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="w-full md:w-[180px] bg-background/80 border-border">
                  <span className="mr-2 text-primary font-medium">₹</span>
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full md:w-auto"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
          >
            <Link to="/properties">
              <Button variant="hero" size="xl">
                Explore Properties
              </Button>
            </Link>
            <Link to="/user">
              <Button variant="glass" size="xl">
                List Your Property
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 hover-lift"
              >
                <stat.icon className="w-8 h-8 text-primary mb-4 mx-auto" />
                <div className="text-3xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
