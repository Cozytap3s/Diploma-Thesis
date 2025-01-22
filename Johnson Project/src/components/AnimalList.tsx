import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { mockAnimals } from '../data/animals';
import type { Animal } from '../types';
import AnimalDetails from './AnimalDetails';

export default function AnimalList({ limit = 2 }: { limit?: number }) {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  // Sort animals by lastCheckup date in descending order (most recent first)
  const sortedAnimals = [...mockAnimals].sort((a, b) => 
    new Date(b.lastCheckup).getTime() - new Date(a.lastCheckup).getTime()
  );

  // Take only the specified number of animals
  const recentAnimals = sortedAnimals.slice(0, limit);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Recently Scanned Animals</h2>
      {recentAnimals.map((animal) => (
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
              <p className="text-white/60">Location</p>
              <p>{animal.location}</p>
            </div>
            <div>
              <p className="text-white/60">Last Scanned</p>
              <p>{new Date(animal.lastCheckup).toLocaleDateString()}</p>
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

      {selectedAnimal && (
        <AnimalDetails
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
        />
      )}
    </div>
  );
}