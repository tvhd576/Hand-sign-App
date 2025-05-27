import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import bg from './assets/backgroundminecraft.jpg'; // Updated background image


export default function App() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [recognizedLetter, setRecognizedLetter] = useState('');
  const [translation, setTranslation] = useState('');

  const handleSignDetected = (sign) => {
    setTranslation(sign);
    setRecognizedLetter(sign);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={bg}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Hand Sign Detector</Text>
          <Text style={styles.subtitle}>Translate hand gestures into letters in real-time.</Text>

          {/* Placeholder for camera component */}
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraText}>
              {isCameraActive ? 'Camera is active. Showing hand signs...' : 'Camera is off'}
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Start Camera"
              onPress={() => setIsCameraActive(true)}
              disabled={isCameraActive}
              color={isCameraActive ? '#666' : '#2196F3'}
            />
            <Button
              title="Stop Camera"
              onPress={() => setIsCameraActive(false)}
              disabled={!isCameraActive}
              color={!isCameraActive ? '#666' : '#F44336'}
            />
          </View>

          <View style={styles.outputBox}>
            <Text style={styles.outputText}>Recognized Letter: {recognizedLetter || '?'}</Text>
            <Text style={styles.translation}>{translation || ''}</Text>
          </View>

          <View style={styles.instructionsBox}>
            <Text style={styles.instructionsTitle}>How to Use, follow these steps:</Text>
            <Text style={styles.instruction}>- Tap "Start Camera" to activate the camera.</Text>
            <Text style={styles.instruction}>- Make sure your hand is visible to the camera.</Text>
            <Text style={styles.instruction}>- The detected letter will be displayed above.</Text>
          </View>

          <Text style={styles.footer}>Hand Sign Detector © 2025. Enhance your communication with technology.</Text>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

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
  cameraPlaceholder: {
    backgroundColor: '#444',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  cameraText: {
    color: '#fff',
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
});
