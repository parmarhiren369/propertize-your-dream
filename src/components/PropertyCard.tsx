import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property, formatPrice } from '@/data/properties';
import { Button } from './ui/button';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="glass-card rounded-2xl overflow-hidden hover-lift">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              property.type === 'sale' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-accent text-accent-foreground'
            }`}>
              For {property.type === 'sale' ? 'Sale' : 'Rent'}
            </span>
          </div>

          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold text-primary-foreground">
                Featured
              </span>
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-4 left-4">
            <span className="text-2xl font-display font-bold text-foreground">
              {formatPrice(property.price, property.type)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            {property.location}
          </div>

          {/* Features */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4" />
              {property.bedrooms} Beds
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4" />
              {property.bathrooms} Baths
            </div>
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4" />
              {property.area.toLocaleString()} sqft
            </div>
          </div>

          <Link to={`/property/${property.id}`}>
            <Button variant="gold-outline" className="w-full group/btn">
              View Details
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
