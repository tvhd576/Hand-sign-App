import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import OfflineStorageService from '../services/OfflineStorageService';

const TranslationHistory = ({ onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const translationHistory = await OfflineStorageService.getTranslationHistory();
    setHistory(translationHistory);
    setLoading(false);
  };

  const clearHistory = async () => {
    await OfflineStorageService.clearTranslationHistory();
    setHistory([]);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translation History</Text>
      
      {loading ? (
        <Text style={styles.loadingText}>Loading history...</Text>
      ) : history.length === 0 ? (
        <Text style={styles.emptyText}>No translation history yet</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.translationText}>{item.text}</Text>
              <Text style={styles.timestampText}>{formatDate(item.timestamp)}</Text>
            </View>
          )}
        />
      )}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={clearHistory}
          disabled={history.length === 0}
        >
          <Text style={[styles.buttonText, history.length === 0 && styles.disabledText]}>Clear History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4FC3F7',
    marginBottom: 20,
  },
  loadingText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  historyItem: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  translationText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  timestampText: {
    color: '#aaa',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledText: {
    opacity: 0.5,
  },
});

export default TranslationHistory;