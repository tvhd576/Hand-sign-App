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
    const [activeTab, setActiveTab] = useState('camera');

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

const handleForgotPassword = async () => {
  if (!email || !password) {
    alert('Please enter your email and new password.');
    return;
  }

  const lowerEmail = email.toLowerCase();
  const user = users[lowerEmail];

  if (!user) {
    alert('No user found with that email.');
    return;
  }

  const updatedUsers = {
    ...users,
    [lowerEmail]: { password },
  };

  setUsers(updatedUsers);
  await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
  alert('Password updated! You can now log in.');
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
        <TouchableOpacity onPress={() => setScreen('forgot')}>
          <Text style={styles.backText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
  );

  const renderForgotPasswordForm = () => (
  <ImageBackground source={bg} style={styles.background} resizeMode="cover">
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title2}>Hand Sign App</Text>
        <Image source={require('./assets/signs.png')} style={styles.logo} />
        <Text style={styles.title}>Reset Password</Text>

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
          placeholder="New Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen('login')}>
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
);

  if (screen === 'login') return renderAuthForm(false);
  if (screen === 'signup') return renderAuthForm(true);
  if (screen === 'forgot') return renderForgotPasswordForm();

const renderCameraScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={styles.title}>Camera Mode</Text>
    <View style={styles.cameraPlaceholder}>
      <Text style={styles.cameraText}>Camera feed will be shown here.</Text>
    </View>
    <View style={styles.outputBox}>
      <Text style={styles.outputText}>
        Recognized Word: {recognizedLetter || '?'}
      </Text>
      <Text style={styles.translation}>{translation || ''}</Text>
    </View>
  </View>
);

const renderUserScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
    <Text style={styles.title}>User Information</Text>
    <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
    <Text style={styles.subtitle}>Hello, {userInfo.name}</Text>

    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>

    <Text style={styles.instructionsTitle}>How to Use:</Text>
    <Text style={styles.instruction}>• Align your head in the circle</Text>
    <Text style={styles.instruction}>• Sign in front of the camera</Text>
    <Text style={styles.instruction}>• The app will detect your sign</Text>
  </View>
);

return (
  <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground source={bg} style={styles.background} resizeMode="cover">
      {activeTab === 'camera' ? renderCameraScreen() : renderUserScreen()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setActiveTab('camera')} style={styles.navButton}>
          <Image source={require('./assets/photo-camera-interface-symbol-for-button.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Recognition</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('user')} style={styles.navButton}>
          <Image source={require('./assets/user.png')} style={styles.navIcon} />
          <Text style={styles.navText}>User</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
    fontSize: 14,
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
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4FC3F7',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  bottomNav: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: '#000',
  paddingVertical: 10,
  borderTopWidth: 1,
  borderColor: '#333',
},
navButton: {
  alignItems: 'center',
},
navIcon: {
  width: 24,
  height: 24,
  marginBottom: 4,
  tintColor: '#4FC3F7',
},
navText: {
  color: '#ccc',
  fontSize: 12,
},

});

