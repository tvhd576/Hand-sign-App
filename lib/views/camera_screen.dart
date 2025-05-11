import 'dart:io';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:flutter_tts/flutter_tts.dart';
import '../services/camera_service.dart';
import '../services/tflite_service.dart';
import '../services/mqtt_service.dart';

class CameraScreen extends StatefulWidget {
  const CameraScreen({Key? key}) : super(key: key);

  @override
  _CameraScreenState createState() => _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen> {
  CameraService cameraService = CameraService();
  FlutterTts flutterTts = FlutterTts();
  MQTTService mqttService = MQTTService();
  bool isProcessing = false;
  String detectedSign = '';
  
  @override
  void initState() {
    super.initState();
    initializeServices();
  }

  Future<void> initializeServices() async {
    await cameraService.initialize();
    await TFLiteService.loadModel();
    await mqttService.connect();
    mqttService.subscribeToTopic('sign_language/commands');
    setState(() {});
  }

  Future<void> processImage() async {
    if (isProcessing) return;
    
    setState(() {
      isProcessing = true;
    });
    
    try {
      final XFile? file = await cameraService.takePicture();
      if (file != null) {
        File image = File(file.path);
        var recognitions = await TFLiteService.runModelOnFrame(image);
        
        if (recognitions != null && recognitions.isNotEmpty) {
          String sign = recognitions[0]['label'];
          double confidence = recognitions[0]['confidence'];
          
          if (confidence > 0.7) {
            setState(() {
              detectedSign = sign;
            });
            
            // Speak the detected sign
            await flutterTts.speak(sign);
            
            // Publish to MQTT for IoT devices
            mqttService.publishMessage('sign_language/detected', sign);
          }
        }
      }
    } catch (e) {
      print('Error processing image: $e');
    } finally {
      setState(() {
        isProcessing = false;
      });
    }
  }

  @override
  void dispose() {
    cameraService.dispose();
    TFLiteService.disposeModel();
    mqttService.disconnect();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (cameraService.controller == null || !cameraService.controller!.value.isInitialized) {
      return const Center(child: CircularProgressIndicator());
    }
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign Language Detector'),
      ),
      body: Column(
        children: [
          Expanded(
            child: CameraPreview(cameraService.controller!),
          ),
          Container(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                Text(
                  'Detected Sign: $detectedSign',
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: processImage,
                  child: const Text('Detect Sign'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _CameraScreenState extends State<CameraScreen> {
  String detectedText = '';
  bool isDetecting = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign Detection'),
        backgroundColor: Colors.indigo,
      ),
      body: Column(
        children: [
          // Camera Preview Area
          Expanded(
            flex: 3,
            child: Container(
              margin: const EdgeInsets.all(15),
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(15),
                border: Border.all(color: Colors.indigo, width: 3),
              ),
              // This will be replaced with actual camera preview
              child: const Center(
                child: Text(
                  'Camera Preview',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ),
          
          // Detection Results Area
          Expanded(
            flex: 2,
            child: Container(
              width: double.infinity,
              margin: const EdgeInsets.all(15),
              padding: const EdgeInsets.all(15),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(15),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 10,
                    offset: const Offset(0, 5),
                  ),
                ],
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Detected Sign:',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.indigo,
                    ),
                  ),
                  const SizedBox(height: 15),
                  Text(
                    detectedText.isEmpty ? 'No sign detected yet' : detectedText,
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: detectedText.isEmpty ? Colors.grey : Colors.black,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildActionButton(
                        'Copy',
                        Icons.copy,
                        Colors.blue,
                        () {
                          // Copy text to clipboard
                        },
                      ),
                      _buildActionButton(
                        'Speak',
                        Icons.volume_up,
                        Colors.green,
                        () {
                          // Text-to-speech functionality
                        },
                      ),
                      _buildActionButton(
                        'Save',
                        Icons.save,
                        Colors.orange,
                        () {
                          // Save to history
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          
          // Control Buttons
          Container(
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 15),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildControlButton(
                  isDetecting ? 'Stop' : 'Start',
                  isDetecting ? Icons.stop_circle : Icons.play_circle,
                  isDetecting ? Colors.red : Colors.green,
                  () {
                    setState(() {
                      isDetecting = !isDetecting;
                    });
                  },
                ),
                _buildControlButton(
                  'Capture',
                  Icons.camera,
                  Colors.indigo,
                  () {
                    // Capture single frame
                    setState(() {
                      detectedText = 'Hello'; // This will be replaced with actual detection
                    });
                  },
                ),
                _buildControlButton(
                  'Clear',
                  Icons.clear,
                  Colors.grey,
                  () {
                    setState(() {
                      detectedText = '';
                    });
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionButton(
    String text,
    IconData icon,
    Color color,
    VoidCallback onPressed,
  ) {
    return Column(
      children: [
        IconButton(
          onPressed: onPressed,
          icon: Icon(icon, color: color, size: 30),
        ),
        Text(
          text,
          style: TextStyle(color: color),
        ),
      ],
    );
  }

  Widget _buildControlButton(
    String text,
    IconData icon,
    Color color,
    VoidCallback onPressed,
  ) {
    return ElevatedButton.icon(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: color,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30),
        ),
      ),
      icon: Icon(icon),
      label: Text(text),
    );
  }
}