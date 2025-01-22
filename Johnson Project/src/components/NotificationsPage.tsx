import React from 'react';
import { Bell, AlertTriangle, Calendar, Activity } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'checkup',
    title: 'Scheduled Checkup',
    message: 'Animal RFID-C000145 is due for vaccination tomorrow',
    time: '2 hours ago',
    icon: Calendar,
    priority: 'medium'
  },
  {
    id: 2,
    type: 'alert',
    title: 'Weight Alert',
    message: 'Animal RFID-C000089 has shown significant weight loss',
    time: '5 hours ago',
    icon: AlertTriangle,
    priority: 'high'
  },
  {
    id: 3,
    type: 'health',
    title: 'Health Update',
    message: 'Animal RFID-C000023 has completed treatment',
    time: '1 day ago',
    icon: Activity,
    priority: 'low'
  },
  // Add more notifications here...
];

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 pt-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <button className="glass px-3 py-1 rounded-lg text-sm">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div key={notification.id} className="glass-card">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  notification.priority === 'high' ? 'bg-red-400/20' :
                  notification.priority === 'medium' ? 'bg-yellow-400/20' :
                  'bg-blue-400/20'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <span className="text-xs text-white/60">{notification.time}</span>
                  </div>
                  <p className="text-sm text-white/80 mt-1">{notification.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}