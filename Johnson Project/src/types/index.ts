export interface Animal {
  id: string;
  rfidTag: string;
  name: string;
  type: 'cattle' | 'sheep' | 'goat' | 'pig' | 'other';
  breed: string;
  birthDate: string;
  gender: 'male' | 'female' | 'neutered' | 'spayed';
  weight: number;
  status: 'active' | 'sold' | 'deceased';
  location: string;
  color: string;
  markings?: string;
  farmId: string;
  ownerId: string;
  ownerName: string;
  registrationDate: string;
  lastCheckup: string;
  nextCheckup: string;
  healthRecords: HealthRecord[];
  reproductiveHistory?: ReproductiveRecord[];
  productionMetrics?: ProductionMetrics;
  environmentalData?: EnvironmentalData;
  movementHistory: MovementRecord[];
  notes?: string;
}

export interface HealthRecord {
  id: string;
  date: string;
  type: 'vaccination' | 'treatment' | 'checkup' | 'surgery';
  description: string;
  performedBy: string;
  notes?: string;
  nextFollowUp?: string;
}

export interface ReproductiveRecord {
  id: string;
  date: string;
  type: 'breeding' | 'pregnancy' | 'birth';
  details: string;
  offspringCount?: number;
  offspringIds?: string[];
  notes?: string;
}

export interface ProductionMetrics {
  milkProduction?: {
    daily: number;
    monthly: number;
    annual: number;
    lastUpdated: string;
  };
  woolYield?: {
    amount: number;
    quality: string;
    shearDate: string;
  };
  weightGain?: {
    initial: number;
    current: number;
    target: number;
    rate: number;
  };
}

export interface EnvironmentalData {
  temperature?: number;
  lastTemperatureCheck?: string;
  activity?: {
    level: 'low' | 'normal' | 'high';
    lastUpdated: string;
  };
}

export interface MovementRecord {
  id: string;
  date: string;
  fromLocation: string;
  toLocation: string;
  reason: string;
  handledBy: string;
}