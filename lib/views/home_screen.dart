import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign Language Translator'),
        backgroundColor: Colors.indigo,
        elevation: 0,
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.indigo, Colors.indigo.shade800],
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              const SizedBox(height: 30),
              // App Logo
              Container(
                width: 150,
                height: 150,
                decoration: BoxDecoration(
                  color: Colors.white,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.2),
                      blurRadius: 10,
                      offset: const Offset(0, 5),
                    ),
                  ],
                ),
                child: Center(
                  child: Icon(
                    Icons.sign_language,
                    size: 80,
                    color: Colors.indigo,
                  ),
                ),
              ),
              const SizedBox(height: 40),
              // App Title
              const Text(
                'Sign Language Translator',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 15),
              // App Description
              const Text(
                'Translate sign language to text and speech in real-time',
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.white70,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 60),
              // Main Action Buttons
              _buildActionButton(
                context,
                'Start Translation',
                Icons.camera_alt,
                Colors.green,
                () {
                  // Navigate to camera screen
                  // Navigator.push(context, MaterialPageRoute(builder: (context) => CameraScreen()));
                },
              ),
              const SizedBox(height: 20),
              _buildActionButton(
                context,
                'Translation History',
                Icons.history,
                Colors.orange,
                () {
                  // Navigate to history screen
                  // Navigator.push(context, MaterialPageRoute(builder: (context) => HistoryScreen()));
                },
              ),
              const SizedBox(height: 20),
              _buildActionButton(
                context,
                'Learn Sign Language',
                Icons.school,
                Colors.purple,
                () {
                  // Navigate to educational screen
                  // Navigator.push(context, MaterialPageRoute(builder: (context) => LearnScreen()));
                },
              ),
              const Spacer(),
              // Settings Button
              TextButton.icon(
                onPressed: () {
                  // Navigate to settings
                  // Navigator.push(context, MaterialPageRoute(builder: (context) => SettingsScreen()));
                },
                icon: const Icon(Icons.settings, color: Colors.white70),
                label: const Text(
                  'Settings',
                  style: TextStyle(color: Colors.white70),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildActionButton(
    BuildContext context,
    String text,
    IconData icon,
    Color color,
    VoidCallback onPressed,
  ) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton.icon(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: color,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(vertical: 15),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
        ),
        icon: Icon(icon),
        label: Text(
          text,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}