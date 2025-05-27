import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = ({ onClose }) => {
  const [name, setName] = useState('');
  const [preferredSigns, setPreferredSigns] = useState([]);
  const [learningProgress, setLearningProgress] = useState({});
  
  useEffect(() => {
    loadUserProfile();
  }, []);
  
  const loadUserProfile = async () => {
    try {
      const profileJson = await AsyncStorage.getItem('userProfile');
      if (profileJson) {
        const profile = JSON.parse(profileJson);
        setName(profile.name || '');
        setPreferredSigns(profile.preferredSigns || []);
        setLearningProgress(profile.learningProgress || {});
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };
  
  const saveUserProfile = async () => {
    try {
      const profile = {
        name,
        preferredSigns,
        learningProgress
      };
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving user profile:', error);
      alert('Failed to save profile');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Learning Progress</Text>
        <Text style={styles.statText}>Signs Learned: {Object.keys(learningProgress).length}</Text>
        <Text style={styles.statText}>Practice Sessions: {Object.values(learningProgress).reduce((sum, item) => sum + item.practiceCount, 0)}</Text>
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={saveUserProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  statsContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statText: {
    fontSize: 16,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default UserProfile;