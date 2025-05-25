import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import bg from './assets/backgroundminecraft.jpg';
import CameraModule from './components/CameraModule';
import HandSignRecognitionService from './services/HandSignRecognitionService';
import IoTService from './services/IoTService';
import OfflineStorageService from './services/OfflineStorageService';
import SettingsScreen from './components/SettingsScreen';
import EducationalTools from './components/EducationalTools';
import TranslationHistory from './components/TranslationHistory';
import * as Speech from 'expo-speech';
import UserProfile from './components/UserProfile';

export default function App() {
  // State variables
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [recognizedLetter, setRecognizedLetter] = useState('');
  const [translation, setTranslation] = useState('');
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isIoTConnected, setIsIoTConnected] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [showEducationalTools, setShowEducationalTools] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(true);
  
  // Modal states
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [educationalToolsModalVisible, setEducationalToolsModalVisible] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  
  // Add new state variables
  const [userProfileModalVisible, setUserProfileModalVisible] = useState(false);
  
  // Load user preferences on startup
  useEffect(() => {
    const loadPreferences = async () => {
      const prefs = await OfflineStorageService.getPreferences();
      setHighContrastMode(prefs.highContrastMode);
      setTextToSpeechEnabled(prefs.textToSpeechEnabled);
      setOfflineMode(prefs.offlineMode);
      setShowEducationalTools(prefs.showEducationalTools);
    };
    
    loadPreferences();
    
    // Initialize the hand sign recognition service (will be implemented later)
    const initializeAI = async () => {
      const success = await HandSignRecognitionService.initialize();
      setIsModelLoaded(success);
    };

    initializeAI();
  }, []);

  // Save preferences when they change
  useEffect(() => {
    const savePrefs = async () => {
      await OfflineStorageService.savePreferences({
        highContrastMode,
        textToSpeechEnabled,
        offlineMode,
        showEducationalTools,
      });
    };
    
    savePrefs();
  }, [highContrastMode, textToSpeechEnabled, offlineMode, showEducationalTools]);

  const handleSignDetected = (sign) => {
    setTranslation(sign);
    setRecognizedLetter(sign);
    
    // Save to history
    OfflineStorageService.saveTranslation(sign);
    
    // Speak the detected sign if text-to-speech is enabled
    if (textToSpeechEnabled) {
      Speech.speak(sign, { language: 'en' });
    }
    
    // Send to IoT devices if connected
    if (isIoTConnected) {
      IoTService.sendTranslationToDevices(sign);
    }
  };

  const toggleIoTConnection = () => {
    if (isIoTConnected) {
      try {
        IoTService.disconnect();
        setIsIoTConnected(false);
      } catch (error) {
        console.error('Error disconnecting IoT:', error);
      }
    } else {
      try {
        IoTService.startScan();
        setIsIoTConnected(true);
      } catch (error) {
        console.error('Error connecting IoT:', error);
      }
    }
  };

  const toggleOfflineMode = () => {
    setOfflineMode(!offlineMode);
  };

  const toggleEducationalTools = () => {
    setShowEducationalTools(!showEducationalTools);
  };

  const toggleHighContrastMode = () => {
    setHighContrastMode(!highContrastMode);
  };

  const toggleTextToSpeech = () => {
    setTextToSpeechEnabled(!textToSpeechEnabled);
  };

  // Get theme based on high contrast mode
  const getTheme = () => {
    return highContrastMode ? highContrastTheme : defaultTheme;
  };

  const theme = getTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={bg}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.title, { color: theme.primaryText }]}>Hand Sign Translator</Text>
          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Translate hand gestures into text in real-time</Text>

          {/* Camera component */}
          <CameraModule 
            isActive={isCameraActive} 
            onHandSignDetected={handleSignDetected} 
          />

          <View style={styles.buttonGroup}>
            <Button
              title="Start Camera"
              onPress={() => setIsCameraActive(true)}
              disabled={isCameraActive}
              color={isCameraActive ? theme.disabledButton : theme.primaryButton}
            />
            <Button
              title="Stop Camera"
              onPress={() => setIsCameraActive(false)}
              disabled={!isCameraActive}
              color={!isCameraActive ? theme.disabledButton : theme.dangerButton}
            />
          </View>

          <View style={[styles.outputBox, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.outputText, { color: theme.primaryText }]}>Recognized Sign: {recognizedLetter || '?'}</Text>
            <Text style={[styles.translation, { color: theme.accentText }]}>{translation || ''}</Text>
          </View>

          {/* Feature buttons */}
          <View style={styles.featureButtonsContainer}>
            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => setSettingsModalVisible(true)}
            >
              <Text style={styles.featureButtonText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => setEducationalToolsModalVisible(true)}
            >
              <Text style={styles.featureButtonText}>Learn Signs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => setHistoryModalVisible(true)}
            >
              <Text style={styles.featureButtonText}>History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureButton}
              onPress={() => setUserProfileModalVisible(true)}
            >
              <Text style={styles.featureButtonText}>Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Status indicators */}
          <View style={styles.statusContainer}>
            {isIoTConnected && (
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>IoT Connected</Text>
              </View>
            )}
            {offlineMode && (
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Offline Mode</Text>
              </View>
            )}
          </View>

          <Text style={styles.footer}>Hand Sign Translator © 2025. Enhancing communication with technology.</Text>
        </ScrollView>

        {/* Settings Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={settingsModalVisible}
          onRequestClose={() => setSettingsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <SettingsScreen 
              isIoTConnected={isIoTConnected}
              toggleIoTConnection={toggleIoTConnection}
              offlineMode={offlineMode}
              toggleOfflineMode={toggleOfflineMode}
              showEducationalTools={showEducationalTools}
              toggleEducationalTools={toggleEducationalTools}
              highContrastMode={highContrastMode}
              toggleHighContrastMode={toggleHighContrastMode}
              textToSpeechEnabled={textToSpeechEnabled}
              toggleTextToSpeech={toggleTextToSpeech}
              onClose={() => setSettingsModalVisible(false)}
            />
          </View>
        </Modal>

        {/* Educational Tools Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={educationalToolsModalVisible}
          onRequestClose={() => setEducationalToolsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <EducationalTools onClose={() => setEducationalToolsModalVisible(false)} />
          </View>
        </Modal>

        {/* History Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={historyModalVisible}
          onRequestClose={() => setHistoryModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TranslationHistory onClose={() => setHistoryModalVisible(false)} />
          </View>
        </Modal>
      {/* User Profile Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={userProfileModalVisible}
          onRequestClose={() => setUserProfileModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <UserProfile onClose={() => setUserProfileModalVisible(false)} />
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}

// Theme definitions
const defaultTheme = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  cardBackground: '#333',
  primaryText: '#4FC3F7',
  secondaryText: '#ccc',
  accentText: '#4FC3F7',
  primaryButton: '#2196F3',
  dangerButton: '#F44336',
  disabledButton: '#666',
};

const highContrastTheme = {
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  cardBackground: '#000',
  primaryText: '#FFFFFF',
  secondaryText: '#FFFFFF',
  accentText: '#FFFF00',
  primaryButton: '#FFFFFF',
  dangerButton: '#FFFFFF',
  disabledButton: '#666',
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4FC3F7',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  outputBox: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  outputText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  translation: {
    color: '#4FC3F7',
    fontSize: 24,
    textAlign: 'center',
  },
  featureButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  featureButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  featureButtonActive: {
    backgroundColor: '#2196F3',
  },
  featureButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  educationalToolsContainer: {
    backgroundColor: '#444',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  educationalToolsTitle: {
    color: '#81D4FA',
    fontSize: 20,
    marginBottom: 10,
  },
  educationalToolsText: {
    color: '#eee',
    fontSize: 16,
    marginBottom: 15,
  },
  signExampleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  signExample: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  signExampleText: {
    color: '#fff',
    fontSize: 16,
  },
  instructionsBox: {
    backgroundColor: '#444',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
  },
  instructionsTitle: {
    color: '#81D4FA',
    fontSize: 20,
    marginBottom: 10,
  },
  instruction: {
    color: '#eee',
    fontSize: 16,
    marginBottom: 5,
  },
  footer: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statusBadge: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    margin: 5,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
});


