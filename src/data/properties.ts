export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  features: string[];
  type: 'sale' | 'rent';
  category: 'house' | 'apartment' | 'villa' | 'penthouse' | 'estate';
  status: 'available' | 'pending' | 'sold';
  createdAt: string;
  featured: boolean;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    description: 'Experience unparalleled luxury in this stunning modern villa featuring floor-to-ceiling windows, a private infinity pool, and breathtaking sea views. The open-concept living space seamlessly blends indoor and outdoor living.',
    price: 45000000,
    location: 'Juhu, Mumbai',
    address: '1234 Juhu Tara Road',
    bedrooms: 6,
    bathrooms: 7,
    area: 8500,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    ],
    features: ['Infinity Pool', 'Smart Home', 'Wine Cellar', 'Home Theater', 'Gym'],
    type: 'sale',
    category: 'villa',
    status: 'available',
    createdAt: '2024-01-15',
    featured: true,
  },
  {
    id: '2',
    title: 'Skyline Penthouse',
    description: 'Soaring above the city skyline, this penthouse offers 360-degree views through panoramic windows. Features include a private rooftop terrace, chef\'s kitchen with premium appliances, and a master suite with spa-like bathroom.',
    price: 89000000,
    location: 'Worli, Mumbai',
    address: 'World Towers, Floor 85',
    bedrooms: 4,
    bathrooms: 5,
    area: 6200,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop',
    ],
    features: ['Rooftop Terrace', 'Private Elevator', 'Concierge', 'Wine Storage', 'Smart Home'],
    type: 'sale',
    category: 'penthouse',
    status: 'available',
    createdAt: '2024-02-01',
    featured: true,
  },
  {
    id: '3',
    title: 'Mediterranean Estate',
    description: 'A magnificent Mediterranean-style estate set on 2 acres of manicured grounds. Features include a guest house, tennis court, equestrian facilities, and a stunning courtyard with a fountain centerpiece.',
    price: 125000000,
    location: 'Malabar Hill, Mumbai',
    address: '789 Ridge Road',
    bedrooms: 8,
    bathrooms: 10,
    area: 15000,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop',
    ],
    features: ['Guest House', 'Tennis Court', 'Equestrian', 'Pool House', 'Gardens'],
    type: 'sale',
    category: 'estate',
    status: 'available',
    createdAt: '2024-01-20',
    featured: true,
  },
  {
    id: '4',
    title: 'Waterfront Modern Home',
    description: 'Contemporary waterfront residence with private dock and stunning sea views. The open floor plan maximizes natural light while the expansive outdoor spaces are perfect for entertaining.',
    price: 32000000,
    location: 'Bandra West, Mumbai',
    address: '567 Bandstand Promenade',
    bedrooms: 5,
    bathrooms: 6,
    area: 5800,
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074&auto=format&fit=crop',
    ],
    features: ['Sea View', 'Pool', 'Summer Kitchen', 'Smart Home', 'Elevator'],
    type: 'sale',
    category: 'house',
    status: 'available',
    createdAt: '2024-02-10',
    featured: false,
  },
  {
    id: '5',
    title: 'Urban Loft Apartment',
    description: 'Industrial-chic loft in a converted warehouse featuring exposed brick, soaring ceilings, and oversized windows. Located in the heart of the arts district with walkable access to galleries and restaurants.',
    price: 150000,
    location: 'Lower Parel, Mumbai',
    address: '123 Mill Road',
    bedrooms: 2,
    bathrooms: 2,
    area: 2200,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    ],
    features: ['High Ceilings', 'Exposed Brick', 'Rooftop Access', 'Parking', 'Storage'],
    type: 'rent',
    category: 'apartment',
    status: 'available',
    createdAt: '2024-02-15',
    featured: false,
  },
  {
    id: '6',
    title: 'Hillside Retreat',
    description: 'Escape to this stunning hillside retreat with panoramic views of the city. Features include a great room with floor-to-ceiling stone fireplace, chef\'s kitchen, and multiple outdoor living spaces.',
    price: 58000000,
    location: 'Powai, Mumbai',
    address: '890 Hiranandani Gardens',
    bedrooms: 7,
    bathrooms: 8,
    area: 9200,
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
    ],
    features: ['Lake View', 'Hot Tub', 'Game Room', 'Private Garden', 'Fire Pit'],
    type: 'sale',
    category: 'house',
    status: 'available',
    createdAt: '2024-01-25',
    featured: true,
  },
];

export const formatPrice = (price: number, type: 'sale' | 'rent') => {
  if (type === 'rent') {
    return `₹${price.toLocaleString('en-IN')}/mo`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};
