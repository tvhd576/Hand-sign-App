import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import bg from './assets/4143f2c9df7314e9144092dce0b27e35.jpg';

export default function App() {
  const [screen, setScreen] = useState('login'); // 'login', 'signup', 'main'
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title2: {
    fontSize: 28,
    fontWeight: '600',
    color: '#90CAF9',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  title2: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4FC3F7',
    textAlign: 'center',
    marginVertical: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#90CAF9',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  loginBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(33, 33, 33, 0.8)',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  input: {
    width: '100%',
    backgroundColor: '#2c2c2c',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 15,
    fontSize: 14,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#EF5350',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  backText: {
    color: '#aaa',
    textDecorationLine: 'underline',
    fontSize: 12,
    marginTop: 10,
  },
  cameraPlaceholder: {
    backgroundColor: '#1c1c1c',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  cameraText: {
    color: '#fff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    marginBottom: 20,
  },
  outputBox: {
    backgroundColor: '#2c2c2c',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  outputText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  translation: {
    color: '#4FC3F7',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  instructionsTitle: {
    color: '#81D4FA',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
  },
  instruction: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  footer: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
});

