import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Building, MapPin, Hash, 
  Tag, Bluetooth, Cloud, Settings, Check, Beef 
} from 'lucide-react';

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    language: 'en',
    farmName: '',
    farmLocation: '',
    farmSize: '',
    animalTypes: [] as string[],
    herdSize: '',
    rfidTagType: '',
    readerModel: '',
    connectivity: [] as string[],
    notifications: [] as string[],
    dataSync: 'cloud',
    units: {
      weight: 'kg',
      distance: 'km'
    },
    termsAccepted: false
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'termsAccepted') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...(prev[name as keyof typeof prev] as string[]), value]
          : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-block p-4 rounded-full bg-blue-500/20 mb-4">
                <Beef className="w-12 h-12 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-white/60">Let's get started with your registration</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-4 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="w-full pl-4 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>

              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Farm Information</h2>
            
            <div className="space-y-4">
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                <input
                  type="text"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleInputChange}
                  placeholder="Farm Name"
                  className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                <input
                  type="text"
                  name="farmLocation"
                  value={formData.farmLocation}
                  onChange={handleInputChange}
                  placeholder="Farm Location"
                  className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <select
                name="farmSize"
                value={formData.farmSize}
                onChange={handleInputChange}
                className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select Farm Size</option>
                <option value="small">Small (&lt; 50 acres)</option>
                <option value="medium">Medium (50-500 acres)</option>
                <option value="large">Large (&gt; 500 acres)</option>
              </select>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Animal Types</label>
                <div className="grid grid-cols-2 gap-2">
                  {['cattle', 'sheep', 'goats', 'pigs'].map(type => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="animalTypes"
                        value={type}
                        checked={formData.animalTypes.includes(type)}
                        onChange={handleCheckboxChange}
                        className="rounded glass"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                <input
                  type="number"
                  name="herdSize"
                  value={formData.herdSize}
                  onChange={handleInputChange}
                  placeholder="Average Herd Size"
                  className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">RFID Setup</h2>
            
            <div className="space-y-4">
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
                <select
                  name="rfidTagType"
                  value={formData.rfidTagType}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select RFID Tag Type</option>
                  <option value="ear">Ear Tags</option>
                  <option value="injectable">Injectable Chips</option>
                  <option value="collar">Collar Tags</option>
                </select>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="readerModel"
                  value={formData.readerModel}
                  onChange={handleInputChange}
                  placeholder="RFID Reader Model (Optional)"
                  className="w-full pl-4 pr-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Connectivity</label>
                <div className="grid grid-cols-2 gap-2">
                  {['bluetooth', 'usb'].map(type => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="connectivity"
                        value={type}
                        checked={formData.connectivity.includes(type)}
                        onChange={handleCheckboxChange}
                        className="rounded glass"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Preferences</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Notifications</label>
                <div className="grid grid-cols-2 gap-2">
                  {['email', 'sms', 'app'].map(type => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="notifications"
                        value={type}
                        checked={formData.notifications.includes(type)}
                        onChange={handleCheckboxChange}
                        className="rounded glass"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Data Sync</label>
                <div className="flex items-center space-x-4">
                  <Cloud className="h-5 w-5" />
                  <select
                    name="dataSync"
                    value={formData.dataSync}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="cloud">Cloud Storage</option>
                    <option value="local">Local Storage</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Units</label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="units.weight"
                    value={formData.units.weight}
                    onChange={handleInputChange}
                    className="px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lbs">Pounds (lbs)</option>
                  </select>
                  <select
                    name="units.distance"
                    value={formData.units.distance}
                    onChange={handleInputChange}
                    className="px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="km">Kilometers (km)</option>
                    <option value="miles">Miles</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Terms & Confirmation</h2>
            
            <div className="space-y-4">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  className="mt-1 rounded glass"
                  required
                />
                <span className="text-sm">
                  I agree to the Terms of Service and Privacy Policy. I understand that my data will be processed in accordance with these policies.
                </span>
              </label>

              <div className="glass-card">
                <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                <p className="text-sm text-white/80">
                  After registration, you'll be guided through:
                </p>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Initial setup wizard
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    RFID reader connection
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Quick tutorial of key features
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 text-red-300 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Progress Bar */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full glass">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block glass py-1 px-2 uppercase rounded-full">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            <div className="flex h-2 mb-4 overflow-hidden rounded-full glass">
              <div
                style={{ width: `${progress}%` }}
                className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-500 transition-all duration-500"
              ></div>
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-2 glass rounded-lg hover:bg-white/10"
                disabled={loading}
              >
                Previous
              </button>
            )}
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-6 py-2 glass rounded-lg hover:bg-white/10 ml-auto"
                disabled={loading}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !formData.termsAccepted}
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/60">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}