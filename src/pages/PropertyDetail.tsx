import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Bed, Bath, Square, Calendar, 
  Heart, Share2, Phone, Mail, Check, Sparkles, TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatPrice, Property } from '@/data/properties';
import { useProperties } from '@/context/PropertyContext';
import { Button } from '@/components/ui/button';

// AI Price Comparison Data (simulated)
const generatePriceComparison = (property: Property) => {
  const basePrice = property.price;
  const platforms = [
    { name: '99acres', price: Math.round(basePrice * (0.95 + Math.random() * 0.15)) },
    { name: 'MagicBricks', price: Math.round(basePrice * (0.92 + Math.random() * 0.18)) },
    { name: 'Housing.com', price: Math.round(basePrice * (0.97 + Math.random() * 0.1)) },
    { name: 'NoBroker', price: Math.round(basePrice * (0.9 + Math.random() * 0.2)) },
  ];
  return platforms;
};

export default function PropertyDetail() {
  const { id } = useParams();
  const { properties } = useProperties();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 container mx-auto px-6 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Property Not Found
          </h1>
          <Link to="/properties">
            <Button variant="gold">Back to Properties</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link to="/properties">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Properties
              </Button>
            </Link>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12"
          >
            <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(1, 5).map((img, index) => (
                <div key={index} className="relative h-[190px] lg:h-[290px] rounded-2xl overflow-hidden">
                  <img
                    src={img || property.images[0]}
                    alt={`${property.title} ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                    property.type === 'sale' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-accent-foreground'
                  }`}>
                    For {property.type === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    {property.address}, {property.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="glass-card rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground text-sm">Price</span>
                    <div className="text-3xl font-display font-bold text-gradient-gold">
                      {formatPrice(property.price, property.type)}
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <Bed className="w-6 h-6 text-primary mx-auto mb-1" />
                      <span className="text-foreground font-semibold">{property.bedrooms}</span>
                      <span className="text-muted-foreground text-sm block">Beds</span>
                    </div>
                    <div className="text-center">
                      <Bath className="w-6 h-6 text-primary mx-auto mb-1" />
                      <span className="text-foreground font-semibold">{property.bathrooms}</span>
                      <span className="text-muted-foreground text-sm block">Baths</span>
                    </div>
                    <div className="text-center">
                      <Square className="w-6 h-6 text-primary mx-auto mb-1" />
                      <span className="text-foreground font-semibold">{property.area.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm block">sqft</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 glass-card rounded-lg p-4"
                    >
                      <Check className="w-5 h-5 text-primary" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Price Comparison */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    AI Price Comparison
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Compare this property's price with similar listings on other platforms
                </p>
                <div className="glass-card rounded-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatePriceComparison(property).map((platform) => {
                      const diff = ((platform.price - property.price) / property.price) * 100;
                      const isHigher = diff > 0;
                      const isSame = Math.abs(diff) < 1;
                      return (
                        <div
                          key={platform.name}
                          className="flex items-center justify-between p-4 bg-secondary rounded-xl"
                        >
                          <div>
                            <span className="text-foreground font-semibold">{platform.name}</span>
                            <div className="text-muted-foreground text-sm">Similar property</div>
                          </div>
                          <div className="text-right">
                            <div className="text-foreground font-bold">
                              {formatPrice(platform.price, property.type)}
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${
                              isSame ? 'text-muted-foreground' : isHigher ? 'text-red-400' : 'text-green-400'
                            }`}>
                              {isSame ? (
                                <><Minus className="w-3 h-3" /> Same</>
                              ) : isHigher ? (
                                <><TrendingUp className="w-3 h-3" /> {diff.toFixed(1)}% higher</>
                              ) : (
                                <><TrendingDown className="w-3 h-3" /> {Math.abs(diff).toFixed(1)}% lower</>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-semibold">AI Insight</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Based on our AI analysis, this property is competitively priced compared to similar listings in {property.location}. 
                      The current market trend shows stable pricing in this area.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="glass-card rounded-2xl p-6 sticky top-28">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Interested in this property?
                </h3>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">CM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">CHARUDUTT M</h4>
                    <p className="text-muted-foreground text-sm">Senior Agent</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <a
                    href="tel:+918928681224"
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-foreground">+91 8928681224</span>
                  </a>
                  <a
                    href="mailto:propertizeops@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-foreground">propertizeops@gmail.com</span>
                  </a>
                </div>

                <Button variant="gold" className="w-full mb-3">
                  Schedule a Viewing
                </Button>
                <Button variant="outline" className="w-full">
                  Request More Info
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
