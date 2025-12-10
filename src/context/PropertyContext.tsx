import { createContext, useContext, useState, ReactNode } from 'react';
import { properties as initialProperties, Property } from '@/data/properties';

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const addProperty = (property: Property) => {
    setProperties(prev => [property, ...prev]);
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => 
      prev.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, deleteProperty, updateProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
