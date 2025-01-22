import { mockAnimals } from '../data/animals';

const isDev = import.meta.env.DEV;

export async function scanNFC() {
  // Development mode - return a random animal's RFID
  if (isDev) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomAnimal = mockAnimals[Math.floor(Math.random() * mockAnimals.length)];
        resolve(randomAnimal);
      }, 1000);
    });
  }

  // Production mode with real NFC
  if (!('NDEFReader' in window)) {
    throw new Error('NFC is not supported on this device or browser');
  }

  try {
    const permissionStatus = await (navigator as any).permissions.query({ name: 'nfc' });
    
    if (permissionStatus.state === 'denied') {
      throw new Error('NFC permission denied. Please enable NFC permissions in your browser settings.');
    }

    const ndef = new (window as any).NDEFReader();
    await ndef.scan();
    
    return new Promise((resolve, reject) => {
      ndef.onreading = (event: any) => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          if (record.recordType === "text") {
            const text = decoder.decode(record.data);
            resolve(text);
          }
        }
      };
      
      ndef.onerror = (error: any) => {
        reject(new Error(`NFC error: ${error.message}`));
      };
    });
  } catch (error: any) {
    if (error.name === 'NotAllowedError') {
      throw new Error('NFC permission denied. Please enable NFC in your device settings.');
    } else if (error.name === 'NotSupportedError') {
      throw new Error('NFC is not supported or enabled on this device.');
    } else {
      throw new Error(`NFC error: ${error.message}`);
    }
  }
}