import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SearchPage from './components/SearchPage';
import NotificationsPage from './components/NotificationsPage';
import ProfilePage from './components/ProfilePage';
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';
import AnimalDetails from './components/AnimalDetails';
import { Home, Search, Bell, UserCircle, Scan } from 'lucide-react';
import { scanNFC } from './utils/nfc';
import type { Animal } from './types';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scanStatus, setScanStatus] = useState<{ message: string; type: 'error' | 'success' | null }>({
    message: '',
    type: null
  });
  const [scannedAnimal, setScannedAnimal] = useState<Animal | null>(null);

  // For login and registration pages, render without the app shell
  if (['/login', '/register'].includes(location.pathname)) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-800">
      <nav className="glass sticky top-0 z-50 px-4 py-3">
        <h1 className="text-xl font-bold text-white text-center">RFID Livestock Manager</h1>
      </nav>

      {scanStatus.message && (
        <div className={`fixed top-14 left-4 right-4 z-50 p-4 rounded-lg glass text-center ${
          scanStatus.type === 'error' ? 'text-red-300' : 
          scanStatus.type === 'success' ? 'text-green-300' : 
          'text-white'
        }`}>
          {scanStatus.message}
        </div>
      )}

      {scannedAnimal && (
        <AnimalDetails 
          animal={scannedAnimal} 
          onClose={() => setScannedAnimal(null)} 
        />
      )}

      <main className="container mx-auto px-4 pt-8 pb-24">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Redirect root path to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Catch all other paths and redirect to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>

      <>
        <button 
          onClick={async () => {
            try {
              setScanStatus({
                message: 'Scanning...',
                type: null
              });
              const animal = await scanNFC() as Animal;
              setScannedAnimal(animal);
              setScanStatus({
                message: 'Animal found!',
                type: 'success'
              });
              setTimeout(() => {
                setScanStatus({ message: '', type: null });
              }, 3000);
            } catch (error: any) {
              setScanStatus({
                message: error.message,
                type: 'error'
              });
              setTimeout(() => {
                setScanStatus({ message: '', type: null });
              }, 3000);
            }
          }}
          className="scan-button flex flex-col items-center gap-1"
          aria-label="Scan RFID"
        >
          <Scan className="w-6 h-6" />
          <span className="text-xs">Scan RFID</span>
        </button>

        <nav className="bottom-nav">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`p-2 rounded-lg ${location.pathname === '/dashboard' ? 'bg-white/10' : ''}`}
          >
            <Home className="w-6 h-6" />
          </button>
          <button 
            onClick={() => navigate('/search')}
            className={`p-2 rounded-lg ${location.pathname === '/search' ? 'bg-white/10' : ''}`}
          >
            <Search className="w-6 h-6" />
          </button>
          <button 
            onClick={() => navigate('/notifications')}
            className={`p-2 rounded-lg ${location.pathname === '/notifications' ? 'bg-white/10' : ''}`}
          >
            <Bell className="w-6 h-6" />
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className={`p-2 rounded-lg ${location.pathname === '/profile' ? 'bg-white/10' : ''}`}
          >
            <UserCircle className="w-6 h-6" />
          </button>
        </nav>
      </>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}