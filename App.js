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
  const [users, setUsers] = useState({});

 const handleLogin = async () => {
  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  const user = users[email.toLowerCase()];
  if (user && user.password === password) {
    const userData = {
      name: email.split('@')[0],
      picture: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    };
    setUserInfo(userData);
    await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
    setScreen('main');
  } else {
    alert('Invalid email or password. Please sign up if you don’t have an account.');
  }
};


const handleSignUp = async () => {
  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  const lowerEmail = email.toLowerCase();
  const existingUser = users[lowerEmail];

  if (existingUser) {
    alert('User already exists. Please log in.');
    return;
  }

  const newUsers = {
    ...users,
    [lowerEmail]: { password },
  };
  setUsers(newUsers);

  await AsyncStorage.setItem('users', JSON.stringify(newUsers));
  alert('Account created! You can now log in.');
  setEmail('');
  setPassword('');
  setScreen('login');
};



  const handleLogout = async () => {
  setUserInfo(null);
  setEmail('');
  setPassword('');
  setScreen('login');
  await AsyncStorage.removeItem('currentUser');
};

useEffect(() => {
  const loadData = async () => {
    const savedUsers = await AsyncStorage.getItem('users');
    const savedUser = await AsyncStorage.getItem('currentUser');

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
      setScreen('main');
    }
  };
  loadData();
}, []);


  const renderAuthForm = (isSignup = false) => (
  <ImageBackground source={bg} style={styles.background} resizeMode="cover">
    <View style={styles.container}>
      <View style={styles.loginBox}>
         <Text style={styles.title2}>{isSignup ? 'Hand Sign App' : 'Hand Sign App'}</Text>
         <Image
            source={require('./assets/signs.png')}
            style={styles.logo}
          />
        <Text style={styles.title}>{isSignup ? 'Sign Up' : 'Login'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={isSignup ? handleSignUp : handleLogin}>
         <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
       </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen(isSignup ? 'login' : 'signup')}>
          <Text style={styles.backText}>
            {isSignup ? '← Already have an account? Login' : '← Create an account'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
  );

  if (screen === 'login') return renderAuthForm(false);
  if (screen === 'signup') return renderAuthForm(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={bg} style={styles.background} resizeMode="cover">
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Hand Sign Detector</Text>
          <Text style={styles.subtitle}>Hello, {userInfo.name}</Text>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>
            Translate hand gestures into letters in real-time.
          </Text>

          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraText}>
              {isCameraActive
                ? 'Camera is active. Showing hand signs...'
                : 'Camera is off'}
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
            <Text style={styles.outputText}>
              Recognized Letter: {recognizedLetter || '?'}
            </Text>
            <Text style={styles.translation}>{translation || ''}</Text>
          </View>

          <View style={styles.instructionsBox}>
            <Text style={styles.instructionsTitle}>How to Use:</Text>
            <Text style={styles.instruction}>- Tap "Start Camera" to activate it.</Text>
            <Text style={styles.instruction}>- Ensure your hand is visible.</Text>
            <Text style={styles.instruction}>- The detected letter will be shown above.</Text>
          </View>

          <Text style={styles.footer}>
            Hand Sign Detector © 2025. Enhance your communication with technology.
          </Text>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  cameraText: { color: '#fff' },
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
  loginBox: {
    alignItems: 'center',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#e53935',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 15,
  },
  backText: {
    color: '#aaa',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
});
