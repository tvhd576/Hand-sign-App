import { BleManager } from 'react-native-ble-plx';

class IoTService {
  constructor() {
    // Don't initialize BleManager in the constructor
    this.bleManager = null;
    this.connectedDevices = [];
    this.isScanning = false;
  }

  // Initialize BleManager when needed
  initializeBleManager() {
    if (!this.bleManager) {
      try {
        this.bleManager = new BleManager();
        return true;
      } catch (error) {
        console.error('Failed to initialize BleManager:', error);
        return false;
      }
    }
    return true;
  }

  startScan() {
    if (this.isScanning) return;
    
    // Initialize BleManager before scanning
    if (!this.initializeBleManager()) {
      console.error('Cannot start scan: BleManager initialization failed');
      return;
    }
    
    this.isScanning = true;
    this.bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('BLE scan error:', error);
        this.isScanning = false;
        return;
      }
      
      // Check if the device is a supported IoT device
      if (this.isSupportedDevice(device)) {
        console.log('Found device:', device.name);
        this.connectToDevice(device);
      }
    });
    
    // Stop scanning after 10 seconds
    setTimeout(() => {
      this.stopScan();
    }, 10000);
  }

  stopScan() {
    if (!this.isScanning || !this.bleManager) return;
    
    this.bleManager.stopDeviceScan();
    this.isScanning = false;
    console.log('BLE scan stopped');
  }

  isSupportedDevice(device) {
    // Check if the device name or ID matches supported devices
    const supportedDevices = ['SmartLight', 'SmartSpeaker', 'SignHelper'];
    return device.name && supportedDevices.some(name => device.name.includes(name));
  }

  async connectToDevice(device) {
    try {
      const connectedDevice = await device.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();
      
      this.connectedDevices.push(connectedDevice);
      console.log('Connected to device:', device.name);
      
      return connectedDevice;
    } catch (error) {
      console.error('Connection error:', error);
      return null;
    }
  }

  async sendTranslationToDevices(translation) {
    if (this.connectedDevices.length === 0) {
      console.log('No connected devices to send translation to');
      return false;
    }
    
    try {
      // Convert translation to a format suitable for transmission
      const data = this.formatDataForTransmission(translation);
      
      // Send to all connected devices
      const sendPromises = this.connectedDevices.map(async (device) => {
        // Find the appropriate service and characteristic for the device
        const services = await device.discoverAllServicesAndCharacteristics();
        const service = services.find(s => s.uuid === this.getServiceUUID(device));
        
        if (service) {
          const characteristics = await service.characteristics();
          const writeCharacteristic = characteristics.find(c => c.isWritable);
          
          if (writeCharacteristic) {
            // Convert string to bytes and write to the characteristic
            const bytes = this.stringToBytes(data);
            await writeCharacteristic.writeWithResponse(bytes);
            return true;
          }
        }
        return false;
      });
      
      const results = await Promise.all(sendPromises);
      return results.some(result => result === true);
    } catch (error) {
      console.error('Error sending translation to devices:', error);
      return false;
    }
  }

  formatDataForTransmission(translation) {
    // Format the translation data for IoT devices
    // This might include adding headers, formatting as JSON, etc.
    return JSON.stringify({
      type: 'translation',
      content: translation,
      timestamp: new Date().toISOString()
    });
  }

  stringToBytes(string) {
    // Convert string to byte array for BLE transmission
    let array = new Uint8Array(string.length);
    for (let i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  getServiceUUID(device) {
    // Return the appropriate service UUID based on device type
    if (device.name.includes('SmartLight')) {
      return '0000180A-0000-1000-8000-00805F9B34FB'; // Example UUID
    } else if (device.name.includes('SmartSpeaker')) {
      return '0000180D-0000-1000-8000-00805F9B34FB'; // Example UUID
    }
    return '0000180F-0000-1000-8000-00805F9B34FB'; // Default UUID
  }
  disconnect() {
    for (const device of this.connectedDevices) {
      device.cancelConnection();
    }
    this.connectedDevices = [];
    console.log('All devices disconnected');
  }
}

export default new IoTService();