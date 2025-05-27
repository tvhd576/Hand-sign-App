import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';

const SettingsScreen = ({ 
  isIoTConnected, 
  toggleIoTConnection,
  offlineMode,
  toggleOfflineMode,
  showEducationalTools,
  toggleEducationalTools,
  highContrastMode,
  toggleHighContrastMode,
  textToSpeechEnabled,
  toggleTextToSpeech,
  onClose
}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>IoT Connection</Text>
        <Switch
          value={isIoTConnected}
          onValueChange={toggleIoTConnection}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isIoTConnected ? '#2196F3' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Offline Mode</Text>
        <Switch
          value={offlineMode}
          onValueChange={toggleOfflineMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={offlineMode ? '#2196F3' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Educational Tools</Text>
        <Switch
          value={showEducationalTools}
          onValueChange={toggleEducationalTools}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={showEducationalTools ? '#2196F3' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>High Contrast Mode</Text>
        <Switch
          value={highContrastMode}
          onValueChange={toggleHighContrastMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={highContrastMode ? '#2196F3' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Text-to-Speech</Text>
        <Switch
          value={textToSpeechEnabled}
          onValueChange={toggleTextToSpeech}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={textToSpeechEnabled ? '#2196F3' : '#f4f3f4'}
        />
      </View>
      
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      
      <View style={styles.privacySection}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        <Text style={styles.privacyText}>
          Your data is processed locally on your device. No sign language data is sent to external servers unless explicitly enabled for cloud features.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4FC3F7',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  settingLabel: {
    fontSize: 18,
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  privacySection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#4FC3F7',
    marginBottom: 10,
  },
  privacyText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
});

export default SettingsScreen;