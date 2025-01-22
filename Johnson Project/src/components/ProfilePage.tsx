import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, Key, Bell, HelpCircle, Power } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { 
      icon: User, 
      label: 'Account Settings', 
      action: () => console.log('Account settings') 
    },
    { 
      icon: Key, 
      label: 'Security', 
      action: () => console.log('Security') 
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      action: () => navigate('/notifications')
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      action: () => window.open('mailto:support@livestock-manager.com')
    },
  ];

  return (
    <div className="container mx-auto px-4 pt-4 pb-24">
      <div className="glass-card mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-white/60">Farm Manager</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.action}
              className="w-full glass-card flex items-center gap-4 hover:bg-white/5"
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full glass-card flex items-center gap-4 hover:bg-red-500/10 text-red-400"
        >
          <Power className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}