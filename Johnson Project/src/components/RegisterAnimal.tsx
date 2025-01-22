import React, { useState } from 'react';
import { Tag, Scale, Calendar, MapPin } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { scanNFC } from '../utils/nfc';

interface AnimalRegistrationData {
  rfidTag: string;
  name: string;
  type: string;
  breed: string;
  birthDate: string;
  gender: 'male' | 'female';
  weight: number;
  location: string;
  notes: string;
}

export default function RegisterAnimal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [scanning, setScanning] = useState(false);
  
  const [formData, setFormData] = useState<AnimalRegistrationData>({
    rfidTag: '',
    name: '',
    type: '',
    breed: '',
    birthDate: '',
    gender: 'male',
    weight: 0,
    location: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScanRFID = async () => {
    try {
      setScanning(true);
      setError('');
      const tag = await scanNFC();
      setFormData(prev => ({ ...prev, rfidTag: tag as string }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!formData.rfidTag) {
      setError('RFID tag is required');
      return;
    }

    try {
      setLoading(true);
      const userId = auth.currentUser?.uid;
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const animalData = {
        ...formData,
        userId,
        status: 'active',
        registeredAt: new Date().toISOString(),
        lastCheckup: new Date().toISOString(),
      };

      await addDoc(collection(db, 'animals'), animalData);
      
      setSuccess(true);
      setFormData({
        rfidTag: '',
        name: '',
        type: '',
        breed: '',
        birthDate: '',
        gender: 'male',
        weight: 0,
        location: '',
        notes: ''
      });
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Register New Animal</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-500/20 text-red-300 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-500/20 text-green-300 rounded-lg">
          Animal registered successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
            <input
              type="text"
              name="rfidTag"
              value={formData.rfidTag}
              onChange={handleInputChange}
              placeholder="RFID Tag Number"
              className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              disabled={scanning}
            />
          </div>
          <button
            type="button"
            onClick={handleScanRFID}
            disabled={scanning || loading}
            className="px-4 py-2 glass rounded-lg hover:bg-white/10 disabled:opacity-50"
          >
            {scanning ? 'Scanning...' : 'Scan Tag'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Animal Name"
            className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select Type</option>
            <option value="cattle">Cattle</option>
            <option value="sheep">Sheep</option>
            <option value="goat">Goat</option>
            <option value="pig">Pig</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
            placeholder="Breed"
            className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Weight (kg)"
              className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              min="0"
              step="0.1"
            />
          </div>
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Additional Notes"
          className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none h-24 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Registering...' : 'Register Animal'}
        </button>
      </form>
    </div>
  );
}