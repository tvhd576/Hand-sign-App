import 'package:flutter/material.dart';
import 'views/home_screen.dart';
import 'views/camera_screen.dart';
import 'views/history_screen.dart';
import 'views/learn_screen.dart';
import 'views/settings_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sign Language Translator',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
        visualDensity: VisualDensity.adaptivePlatformDensity,
        fontFamily: 'Roboto',
      ),
      home: const HomeScreen(),
      routes: {
        '/camera': (context) => const CameraScreen(),
        '/history': (context) => const HistoryScreen(),
        '/learn': (context) => const LearnScreen(),
        '/settings': (context) => const SettingsScreen(),
      },
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign Language Translator'),
      ),
      body: Center(
        child: const Text('Welcome to Sign Language Translator App'),
      ),
    );
  }
}