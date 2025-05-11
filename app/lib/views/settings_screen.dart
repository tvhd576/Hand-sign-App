import 'package:flutter/material.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _darkMode = false;
  bool _notifications = true;
  bool _textToSpeech = true;
  bool _saveHistory = true;
  bool _offlineMode = false;
  String _selectedLanguage = 'English';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: ListView(
        children: [
          _buildSectionHeader('Appearance'),
          SwitchListTile(
            title: const Text('Dark Mode'),
            subtitle: const Text('Enable dark theme'),
            value: _darkMode,
            onChanged: (value) {
              setState(() {
                _darkMode = value;
              });
            },
          ),
          _buildDivider(),
          
          _buildSectionHeader('Notifications'),
          SwitchListTile(
            title: const Text('Push Notifications'),
            subtitle: const Text('Receive app notifications'),
            value: _notifications,
            onChanged: (value) {
              setState(() {
                _notifications = value;
              });
            },
          ),
          _buildDivider(),
          
          _buildSectionHeader('Accessibility'),
          SwitchListTile(
            title: const Text('Text to Speech'),
            subtitle: const Text('Read translations aloud'),
            value: _textToSpeech,
            onChanged: (value) {
              setState(() {
                _textToSpeech = value;
              });
            },
          ),
          ListTile(
            title: const Text('Text Size'),
            subtitle: const Text('Adjust the size of text in the app'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Navigate to text size settings
            },
          ),
          _buildDivider(),
          
          _buildSectionHeader('Data & Storage'),
          SwitchListTile(
            title: const Text('Save Translation History'),
            subtitle: const Text('Store past translations'),
            value: _saveHistory,
            onChanged: (value) {
              setState(() {
                _saveHistory = value;
              });
            },
          ),
          SwitchListTile(
            title: const Text('Offline Mode'),
            subtitle: const Text('Use app without internet connection'),
            value: _offlineMode,
            onChanged: (value) {
              setState(() {
                _offlineMode = value;
              });
            },
          ),
          ListTile(
            title: const Text('Clear History'),
            subtitle: const Text('Delete all saved translations'),
            trailing: const Icon(Icons.delete_outline),
            onTap: () {
              _showClearHistoryDialog();
            },
          ),
          _buildDivider(),
          
          _buildSectionHeader('Language'),
          ListTile(
            title: const Text('App Language'),
            subtitle: Text(_selectedLanguage),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              _showLanguageSelectionDialog();
            },
          ),
          _buildDivider(),
          
          _buildSectionHeader('IoT Devices'),
          ListTile(
            title: const Text('Connected Devices'),
            subtitle: const Text('Manage your IoT devices'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Navigate to IoT devices screen
            },
          ),
          _buildDivider(),
          
          _buildSectionHeader('About'),
          ListTile(
            title: const Text('App Version'),
            subtitle: const Text('1.0.0'),
          ),
          ListTile(
            title: const Text('Terms of Service'),
            onTap: () {
              // Show terms of service
            },
          ),
          ListTile(
            title: const Text('Privacy Policy'),
            onTap: () {
              // Show privacy policy
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
          fontSize: 14,
          fontWeight: FontWeight.bold,
          color: Theme.of(context).colorScheme.primary,
        ),
      ),
    );
  }

  Widget _buildDivider() {
    return const Divider(
      indent: 16,
      endIndent: 16,
    );
  }

  void _showClearHistoryDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Clear History'),
        content: const Text(
          'Are you sure you want to clear all translation history? This action cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              // Clear history logic
              Navigator.pop(context);
            },
            child: const Text('Clear'),
          ),
        ],
      ),
    );
  }

  void _showLanguageSelectionDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Select Language'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: const Text('English'),
              onTap: () {
                setState(() {
                  _selectedLanguage = 'English';
                });
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Spanish'),
              onTap: () {
                setState(() {
                  _selectedLanguage = 'Spanish';
                });
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('French'),
              onTap: () {
                setState(() {
                  _selectedLanguage = 'French';
                });
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}