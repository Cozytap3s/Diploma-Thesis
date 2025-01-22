import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Filter, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { mockAnimals } from '../data/animals';
import type { Animal } from '../types';
import AnimalDetails from './AnimalDetails';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    location: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const filteredAnimals = useMemo(() => {
    return mockAnimals.filter(animal => {
      const matchesSearch = 
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.rfidTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !filters.type || animal.type === filters.type;
      const matchesStatus = !filters.status || animal.status === filters.status;
      const matchesLocation = !filters.location || animal.location === filters.location;

      return matchesSearch && matchesType && matchesStatus && matchesLocation;
    });
  }, [searchTerm, filters]);

  const locations = [...new Set(mockAnimals.map(a => a.location))];
  const types = [...new Set(mockAnimals.map(a => a.type))];
  const statuses = [...new Set(mockAnimals.map(a => a.status))];

  return (
    <div className="container mx-auto px-4 pt-4 pb-24">
      <div className="mb-4">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search animals..."
              className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <button 
            className="px-4 py-2 glass rounded-lg hover:bg-white/10 flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="glass rounded-lg p-4 mb-4 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-2">Type</label>
              <select
                className="w-full glass rounded-lg p-2"
                value={filters.type}
                onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Status</label>
              <select
                className="w-full glass rounded-lg p-2"
                value={filters.status}
                onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Location</label>
              <select
                className="w-full glass rounded-lg p-2"
                value={filters.location}
                onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {filteredAnimals.map((animal) => (
          <div key={animal.id} className="glass-card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{animal.name}</h3>
                <p className="text-sm text-white/60">{animal.rfidTag}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                animal.status === 'active' ? 'bg-green-400/20 text-green-300' :
                animal.status === 'sold' ? 'bg-blue-400/20 text-blue-300' :
                'bg-red-400/20 text-red-300'
              }`}>
                {animal.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/60">Type</p>
                <p className="capitalize">{animal.type}</p>
              </div>
              <div>
                <p className="text-white/60">Breed</p>
                <p>{animal.breed}</p>
              </div>
              <div>
                <p className="text-white/60">Location</p>
                <p>{animal.location}</p>
              </div>
              <div>
                <p className="text-white/60">Weight</p>
                <p>{animal.weight} kg</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedAnimal(animal)}
                className="w-full flex items-center justify-center gap-2 text-sm text-blue-300 hover:text-blue-200"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAnimal && (
        <AnimalDetails
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
        />
      )}
    </div>
  );
}