import React, { useState } from 'react';
import { Beef, Activity, Calendar, AlertCircle } from 'lucide-react';
import AnimalList from './AnimalList';
import StatsCard from './StatsCard';
import RegisterAnimal from './RegisterAnimal';

export default function Dashboard() {
  const [showRegistration, setShowRegistration] = useState(false);
  
  const stats = [
    { title: 'Total Animals', value: '156', icon: Beef, change: '+12% from last month' },
    { title: 'Healthy', value: '143', icon: Activity, change: '92% of total' },
    { title: 'Pending Checkups', value: '8', icon: Calendar, change: '5 due today' },
    { title: 'Alerts', value: '3', icon: AlertCircle, change: '2 high priority' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="glass-card">
            <AnimalList limit={3} />
          </div>
        </div>

        <div className="glass-card">
          <RegisterAnimal />
        </div>
      </div>
    </div>
  );
}