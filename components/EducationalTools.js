import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const signs = [
  { id: 1, name: 'Hello', description: 'Wave your open hand side to side' },
  { id: 2, name: 'Thank You', description: 'Touch your chin with your fingertips and move your hand forward' },
  { id: 3, name: 'Yes', description: 'Make a fist and nod it up and down like a head nodding' },
  { id: 4, name: 'No', description: 'Make a fist and shake it side to side like a head shaking' },
  { id: 5, name: 'Please', description: 'Rub your chest in a circular motion with an open palm' },
  { id: 6, name: 'Sorry', description: 'Make a fist and rub it in a circular motion over your chest' },
];

const EducationalTools = () => {
  const [selectedSign, setSelectedSign] = useState(null);

  const handleSignSelect = (sign) => {
    setSelectedSign(sign);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn Sign Language</Text>
      
      {selectedSign ? (
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>{selectedSign.name}</Text>
          <Text style={styles.detailDescription}>{selectedSign.description}</Text>
          {/* Placeholder for sign image/animation */}
          <View style={styles.signImagePlaceholder}>
            <Text style={styles.placeholderText}>Sign demonstration will appear here</Text>
          </View>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedSign(null)}
          >
            <Text style={styles.backButtonText}>Back to List</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          <Text style={styles.subtitle}>Select a sign to learn:</Text>
          <View style={styles.signGrid}>
            {signs.map((sign) => (
              <TouchableOpacity 
                key={sign.id} 
                style={styles.signCard}
                onPress={() => handleSignSelect(sign)}
              >
                <Text style={styles.signName}>{sign.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>Your Progress</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '30%' }]} />
            </View>
            <Text style={styles.progressText}>2/6 Signs Learned</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4FC3F7',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 15,
  },
  signGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  signCard: {
    backgroundColor: '#444',
    width: '48%',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  signName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 1,
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4FC3F7',
    marginBottom: 10,
  },
  detailDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  signImagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#444',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 14,
  },
  backButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  progressSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 18,
    color: '#4FC3F7',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  progressText: {
    color: '#ccc',
    fontSize: 14,
  },
});

export default EducationalTools;