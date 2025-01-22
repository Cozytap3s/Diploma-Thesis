import { Animal, HealthRecord, ReproductiveRecord, MovementRecord } from '../types';

// Helper function to generate random dates within a range
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

// Helper function to generate random weights within a range
function randomWeight(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Helper function to generate random IDs
function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

const cattleBreeds = ['Holstein', 'Angus', 'Hereford', 'Charolais', 'Simmental', 'Limousin', 'Jersey', 'Brahman'];
const sheepBreeds = ['Merino', 'Suffolk', 'Dorper', 'Romney', 'Texel', 'Hampshire', 'Dorset'];
const goatBreeds = ['Boer', 'Nubian', 'Alpine', 'Saanen', 'LaMancha', 'Toggenburg'];
const pigBreeds = ['Yorkshire', 'Duroc', 'Hampshire', 'Berkshire', 'Landrace', 'Pietrain'];
const locations = ['North Pasture', 'South Pasture', 'Barn A', 'Barn B', 'East Field', 'West Field', 'Holding Pen'];
const colors = ['Black', 'White', 'Brown', 'Spotted', 'Red', 'Grey', 'Mixed'];
const statuses: Array<Animal['status']> = ['active', 'sold', 'deceased'];
const veterinarians = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis'];
const handlers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Tom Davis'];

function generateHealthRecords(animalId: string, birthDate: string): HealthRecord[] {
  const records: HealthRecord[] = [];
  const startDate = new Date(birthDate);
  const today = new Date();
  let currentDate = new Date(startDate);

  while (currentDate < today) {
    const types: HealthRecord['type'][] = ['vaccination', 'treatment', 'checkup', 'surgery'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    records.push({
      id: generateId(),
      date: currentDate.toISOString(),
      type,
      description: `Routine ${type} - ${type === 'vaccination' ? 'Annual vaccines' : type === 'treatment' ? 'Preventive care' : type === 'surgery' ? 'Minor procedure' : 'General checkup'}`,
      performedBy: veterinarians[Math.floor(Math.random() * veterinarians.length)],
      notes: 'All parameters within normal range',
      nextFollowUp: new Date(currentDate.getTime() + 1000 * 60 * 60 * 24 * 30).toISOString() // Next month
    });

    // Add 2-4 months to the current date
    currentDate.setMonth(currentDate.getMonth() + Math.floor(Math.random() * 3) + 2);
  }

  return records;
}

function generateReproductiveHistory(birthDate: string, gender: string): ReproductiveRecord[] {
  if (gender !== 'female' || Math.random() > 0.7) return [];

  const records: ReproductiveRecord[] = [];
  const startDate = new Date(birthDate);
  startDate.setFullYear(startDate.getFullYear() + 2); // Start breeding at 2 years
  const today = new Date();
  let currentDate = new Date(startDate);

  while (currentDate < today) {
    const offspringCount = Math.floor(Math.random() * 2) + 1;
    
    records.push({
      id: generateId(),
      date: currentDate.toISOString(),
      type: 'breeding',
      details: 'Successful breeding',
      notes: 'Normal procedure'
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
    
    records.push({
      id: generateId(),
      date: currentDate.toISOString(),
      type: 'pregnancy',
      details: 'Pregnancy confirmed',
      notes: 'Regular checkups scheduled'
    });

    currentDate.setMonth(currentDate.getMonth() + 8);
    
    records.push({
      id: generateId(),
      date: currentDate.toISOString(),
      type: 'birth',
      details: `Successful birth of ${offspringCount} offspring`,
      offspringCount,
      offspringIds: Array(offspringCount).fill(0).map(() => generateId()),
      notes: 'Normal delivery'
    });

    currentDate.setMonth(currentDate.getMonth() + 6);
  }

  return records;
}

function generateMovementHistory(registrationDate: string): MovementRecord[] {
  const records: MovementRecord[] = [];
  const startDate = new Date(registrationDate);
  const today = new Date();
  let currentDate = new Date(startDate);
  let currentLocation = locations[Math.floor(Math.random() * locations.length)];

  while (currentDate < today) {
    let newLocation;
    do {
      newLocation = locations[Math.floor(Math.random() * locations.length)];
    } while (newLocation === currentLocation);

    records.push({
      id: generateId(),
      date: currentDate.toISOString(),
      fromLocation: currentLocation,
      toLocation: newLocation,
      reason: ['Rotation', 'Medical care', 'Breeding', 'Weather protection'][Math.floor(Math.random() * 4)],
      handledBy: handlers[Math.floor(Math.random() * handlers.length)]
    });

    currentLocation = newLocation;
    currentDate.setMonth(currentDate.getMonth() + Math.floor(Math.random() * 2) + 1);
  }

  return records;
}

function generateAnimals(count: number): Animal[] {
  const animals: Animal[] = [];
  const today = new Date();
  const twoYearsAgo = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());

  for (let i = 0; i < count; i++) {
    const type = ['cattle', 'sheep', 'goat', 'pig', 'other'][Math.floor(Math.random() * 4)] as Animal['type'];
    const breedList = {
      cattle: cattleBreeds,
      sheep: sheepBreeds,
      goat: goatBreeds,
      pig: pigBreeds,
      other: ['Mixed Breed']
    }[type];
    
    const birthDate = randomDate(twoYearsAgo, today);
    const registrationDate = randomDate(new Date(birthDate), today);
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const lastCheckup = randomDate(new Date(today.getFullYear(), today.getMonth() - 2), today);
    const nextCheckupDate = new Date(lastCheckup);
    nextCheckupDate.setMonth(nextCheckupDate.getMonth() + 3);
    
    const initialWeight = randomWeight(
      type === 'cattle' ? 400 : type === 'pig' ? 100 : 30,
      type === 'cattle' ? 600 : type === 'pig' ? 200 : 70
    );
    
    const currentWeight = initialWeight + randomWeight(10, 50);
    const targetWeight = currentWeight + randomWeight(20, 100);
    
    const animal: Animal = {
      id: generateId(),
      rfidTag: `RFID-${type.substring(0, 1).toUpperCase()}${String(i + 1).padStart(6, '0')}`,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} #${i + 1}`,
      type,
      breed: breedList[Math.floor(Math.random() * breedList.length)],
      birthDate,
      gender,
      weight: currentWeight,
      status: statuses[Math.floor(Math.random() * (i > count - 20 ? 3 : 1))],
      location: locations[Math.floor(Math.random() * locations.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      markings: Math.random() > 0.5 ? 'White patch on forehead' : undefined,
      farmId: 'FARM-001',
      ownerId: 'OWNER-001',
      ownerName: 'John Doe',
      registrationDate,
      lastCheckup,
      nextCheckup: nextCheckupDate.toISOString(),
      healthRecords: generateHealthRecords(String(i + 1), birthDate),
      reproductiveHistory: generateReproductiveHistory(birthDate, gender),
      productionMetrics: {
        ...(type === 'cattle' && gender === 'female' ? {
          milkProduction: {
            daily: randomWeight(20, 30),
            monthly: randomWeight(600, 900),
            annual: randomWeight(7200, 10800),
            lastUpdated: new Date().toISOString()
          }
        } : {}),
        ...(type === 'sheep' ? {
          woolYield: {
            amount: randomWeight(3, 8),
            quality: ['Fine', 'Medium', 'Coarse'][Math.floor(Math.random() * 3)],
            shearDate: randomDate(new Date(today.getFullYear(), today.getMonth() - 6), today)
          }
        } : {}),
        weightGain: {
          initial: initialWeight,
          current: currentWeight,
          target: targetWeight,
          rate: Number((currentWeight - initialWeight) / 30).toFixed(2)
        }
      },
      environmentalData: {
        temperature: 38.5 + (Math.random() * 2 - 1),
        lastTemperatureCheck: new Date().toISOString(),
        activity: {
          level: ['low', 'normal', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'normal' | 'high',
          lastUpdated: new Date().toISOString()
        }
      },
      movementHistory: generateMovementHistory(registrationDate),
      notes: Math.random() > 0.7 ? 'Regular monitoring required' : undefined
    };
    animals.push(animal);
  }
  return animals;
}

export const mockAnimals = generateAnimals(200);