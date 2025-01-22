import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
}

export default function StatsCard({ title, value, icon: Icon, change }: StatsCardProps) {
  return (
    <div className="glass-card">
      <div className="flex items-center justify-between">
        <h3 className="text-white/80 text-sm font-medium">{title}</h3>
        <Icon className="h-6 w-6 text-blue-300" />
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-white">{value}</p>
        <p className="text-sm text-white/60 mt-1">{change}</p>
      </div>
    </div>
  );
}