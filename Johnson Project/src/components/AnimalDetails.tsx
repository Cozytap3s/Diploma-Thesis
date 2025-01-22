import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Calendar, MapPin, Weight, Tag, Info, 
  Heart, Baby, LineChart, ThermometerSun, History,
  Bell
} from 'lucide-react';
import type { Animal } from '../types';

interface AnimalDetailsProps {
  animal: Animal;
  onClose: () => void;
}

export default function AnimalDetails({ animal, onClose }: AnimalDetailsProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'reproduction' | 'production' | 'movement' | 'alerts'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'reproduction', label: 'Reproduction', icon: Baby },
    { id: 'production', label: 'Production', icon: LineChart },
    { id: 'movement', label: 'Movement', icon: History },
    { id: 'alerts', label: 'Alerts', icon: Bell }
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === 'alerts') {
      onClose(); // Close the details modal first
      navigate('/notifications'); // Navigate to notifications page
    } else {
      setActiveTab(tabId as any);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-2xl mx-auto glass-card">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{animal.name}</h2>
              <p className="text-white/60">{animal.rfidTag}</p>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              animal.status === 'active' ? 'bg-green-400/20 text-green-300' :
              animal.status === 'sold' ? 'bg-blue-400/20 text-blue-300' :
              'bg-red-400/20 text-red-300'
            }`}>
              {animal.status}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Type & Breed</p>
                    <p className="capitalize">{animal.type} - {animal.breed}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Gender</p>
                    <p className="capitalize">{animal.gender}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Birth Date</p>
                    <p>{new Date(animal.birthDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Registration Date</p>
                    <p>{new Date(animal.registrationDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Physical Attributes</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Weight</p>
                      <p>{animal.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Color</p>
                      <p>{animal.color}</p>
                    </div>
                    {animal.markings && (
                      <div className="col-span-2">
                        <p className="text-white/60 text-sm">Markings</p>
                        <p>{animal.markings}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Location & Ownership</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Current Location</p>
                      <p>{animal.location}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Owner</p>
                      <p>{animal.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Farm ID</p>
                      <p>{animal.farmId}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'health' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Health Records</h3>
                  <p className="text-sm">
                    Next Checkup: {new Date(animal.nextCheckup).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {animal.healthRecords.map(record => (
                    <div key={record.id} className="glass p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium capitalize">{record.type}</h4>
                        <span className="text-sm text-white/60">
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{record.description}</p>
                      <p className="text-sm text-white/60">By: {record.performedBy}</p>
                      {record.nextFollowUp && (
                        <p className="text-sm text-blue-300 mt-2">
                          Follow-up: {new Date(record.nextFollowUp).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reproduction' && animal.reproductiveHistory && (
              <div className="space-y-4">
                {animal.reproductiveHistory.map(record => (
                  <div key={record.id} className="glass p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium capitalize">{record.type}</h4>
                      <span className="text-sm text-white/60">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{record.details}</p>
                    {record.offspringCount && (
                      <p className="text-sm text-white/60">
                        Offspring: {record.offspringCount}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'production' && animal.productionMetrics && (
              <div className="space-y-6">
                {animal.productionMetrics.milkProduction && (
                  <div>
                    <h3 className="font-semibold mb-2">Milk Production</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-white/60 text-sm">Daily</p>
                        <p>{animal.productionMetrics.milkProduction.daily} L</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Monthly</p>
                        <p>{animal.productionMetrics.milkProduction.monthly} L</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Annual</p>
                        <p>{animal.productionMetrics.milkProduction.annual} L</p>
                      </div>
                    </div>
                  </div>
                )}

                {animal.productionMetrics.woolYield && (
                  <div>
                    <h3 className="font-semibold mb-2">Wool Production</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/60 text-sm">Amount</p>
                        <p>{animal.productionMetrics.woolYield.amount} kg</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Quality</p>
                        <p>{animal.productionMetrics.woolYield.quality}</p>
                      </div>
                    </div>
                  </div>
                )}

                {animal.productionMetrics.weightGain && (
                  <div>
                    <h3 className="font-semibold mb-2">Weight Gain</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/60 text-sm">Initial Weight</p>
                        <p>{animal.productionMetrics.weightGain.initial} kg</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Current Weight</p>
                        <p>{animal.productionMetrics.weightGain.current} kg</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Target Weight</p>
                        <p>{animal.productionMetrics.weightGain.target} kg</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Growth Rate</p>
                        <p>{animal.productionMetrics.weightGain.rate} kg/month</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'movement' && (
              <div className="space-y-4">
                {animal.movementHistory.map(record => (
                  <div key={record.id} className="glass p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-white/60">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm mb-1">
                      From: {record.fromLocation}
                    </p>
                    <p className="text-sm mb-2">
                      To: {record.toLocation}
                    </p>
                    <p className="text-sm text-white/60">
                      Reason: {record.reason}
                    </p>
                    <p className="text-sm text-white/60">
                      Handled by: {record.handledBy}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 glass rounded-lg hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}