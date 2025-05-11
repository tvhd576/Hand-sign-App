import 'package:flutter/material.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  @override
  _SettingsScreenState createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  // Settings state
  bool darkMode = false;
  bool notifications = true;
  bool textToSpeech = true;
  bool saveHistory = true;
  String selectedLanguage = 'English';
  double confidenceThreshold = 0.7;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
        backgroundColor: Colors.indigo,
      ),
      body: ListView(
        children: [
          _buildSectionHeader('Appearance'),
          SwitchListTile(
            title: const Text('Dark Mode'),
            subtitle: const Text('Enable dark theme for the app'),
            value: darkMode,
            onChanged: (value) {
              setState(() {
                darkMode = value;
              });
            },
          ),
          const Divider(),
          
          _buildSectionHeader('Notifications'),
          SwitchListTile(
            title: const Text('Enable Notifications'),
            subtitle: const Text('Receive app notifications'),
            value: notifications,
            onChanged: (value) {
              setState(() {
                notifications = value;
              });
            },
          ),
          const Divider(),
          
          _buildSectionHeader('Translation'),
          ListTile(
            title: const Text('Language'),
            subtitle: Text(selectedLanguage),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              _showLanguageSelector();
            },
          ),
          SwitchListTile(
            title: const Text('Text-to-Speech'),
            subtitle: const Text('Speak translated text automatically'),
            value: textToSpeech,
            onChanged: (value) {
              setState(() {
                textToSpeech = value;
              });
            },
          ),
          ListTile(
            title: const Text('Confidence Threshold'),
            subtitle: Text('${(confidenceThreshold * 100).toInt()}%'),
            trailing: SizedBox(
              width: 150,
              child: Slider(
                value: confidenceThreshold,
                min: 0.5,
                max: 0.9,
                divisions: 4,
                label: '${(confidenceThreshold * 100).toInt()}%',
                onChanged: (value) {
                  setState(() {
                    confidenceThreshold = value;
                  });
                },
              ),
            ),
          ),
          const Divider(),
          
          _buildSectionHeader('Data & Privacy'),
          SwitchListTile(
            title: const Text('Save Translation History'),
            subtitle: const Text('Store past translations on device'),
            value: saveHistory,
            onChanged: (value) {
              setState(() {
                saveHistory = value;
              });
            },
          ),
          ListTile(
            title: const Text('Clear All Data'),
            subtitle: const Text('Delete all app data and reset settings'),
            trailing: const Icon(Icons.delete_forever, color: Colors.red),
            onTap: () {
              _showClearDataConfirmation();
            },
          ),
          const Divider(),
          
          _buildSectionHeader('About'),
          ListTile(
            title: const Text('App Version'),
            subtitle: const Text('1.0.0'),
          ),
          ListTile(
            title: const Text('Terms of Service'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Navigate to Terms of Service
            },
          ),
          ListTile(
            title: const Text('Privacy Policy'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Navigate to Privacy Policy
            },
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Colors.indigo.shade700,
        ),
      ),
    );
  }

  void _showLanguageSelector() {
    final languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];
    
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Select Language'),
        content: SizedBox(
          width: double.maxFinite,
          child: ListView.builder(
            shrinkWrap: true,
            itemCount: languages.length,
            itemBuilder: (context, index) {
              return RadioListTile<String>(
                title: Text(languages[index]),
                value: languages[index],
                groupValue: selectedLanguage,
                onChanged: (value) {
                  setState(() {
                    selectedLanguage = value!;
                  });
                  Navigator.pop(context);
                },
              );
            },
          ),
        ),
      ),
    );
  }

  void _showClearDataConfirmation() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Clear All Data'),
        content: const Text(
          'This will delete all your saved translations and reset all settings. This action cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              // Clear data logic here
              Navigator.pop(context);
            },
            child: const Text('Clear All Data'),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
          ),
        ],
      ),
    );
  }
}