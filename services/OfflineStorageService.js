import AsyncStorage from '@react-native-async-storage/async-storage';

class OfflineStorageService {
  // Save a translation to history
  async saveTranslation(translation) {
    try {
      // Get existing history
      const historyJson = await AsyncStorage.getItem('translationHistory');
      const history = historyJson ? JSON.parse(historyJson) : [];
      
      // Add new translation with timestamp
      const newEntry = {
        id: Date.now().toString(),
        text: translation,
        timestamp: new Date().toISOString(),
      };
      
      // Add to beginning of array (most recent first)
      history.unshift(newEntry);
      
      // Keep only the last 100 entries
      const trimmedHistory = history.slice(0, 100);
      
      // Save back to storage
      await AsyncStorage.setItem('translationHistory', JSON.stringify(trimmedHistory));
      
      return true;
    } catch (error) {
      console.error('Error saving translation:', error);
      return false;
    }
  }

  // Get translation history
  async getTranslationHistory() {
    try {
      const historyJson = await AsyncStorage.getItem('translationHistory');
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.error('Error getting translation history:', error);
      return [];
    }
  }

  // Clear translation history
  async clearTranslationHistory() {
    try {
      await AsyncStorage.removeItem('translationHistory');
      return true;
    } catch (error) {
      console.error('Error clearing translation history:', error);
      return false;
    }
  }

  // Save user preferences
  async savePreferences(preferences) {
    try {
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error saving preferences:', error);
      return false;
    }
  }

  // Get user preferences
  async getPreferences() {
    try {
      const preferencesJson = await AsyncStorage.getItem('userPreferences');
      return preferencesJson ? JSON.parse(preferencesJson) : {
        highContrastMode: false,
        textToSpeechEnabled: true,
        offlineMode: false,
        showEducationalTools: false,
      };
    } catch (error) {
      console.error('Error getting preferences:', error);
      return {
        highContrastMode: false,
        textToSpeechEnabled: true,
        offlineMode: false,
        showEducationalTools: false,
      };
    }
  }

  // Cache educational content for offline use
  async cacheEducationalContent(content) {
    try {
      await AsyncStorage.setItem('educationalContent', JSON.stringify(content));
      return true;
    } catch (error) {
      console.error('Error caching educational content:', error);
      return false;
    }
  }
  
  // Get cached educational content
  async getEducationalContent() {
    try {
      const contentJson = await AsyncStorage.getItem('educationalContent');
      return contentJson ? JSON.parse(contentJson) : null;
    } catch (error) {
      console.error('Error getting educational content:', error);
      return null;
    }
  }
  
  // Cache frequently used translations
  async cacheFrequentTranslations(translations) {
    try {
      await AsyncStorage.setItem('frequentTranslations', JSON.stringify(translations));
      return true;
    } catch (error) {
      console.error('Error caching frequent translations:', error);
      return false;
    }
  }
  
  // Get cached frequent translations
  async getFrequentTranslations() {
    try {
      const translationsJson = await AsyncStorage.getItem('frequentTranslations');
      return translationsJson ? JSON.parse(translationsJson) : [];
    } catch (error) {
      console.error('Error getting frequent translations:', error);
      return [];
    }
  }
}

export default new OfflineStorageService();