import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'dart:io';

class CameraScreen extends StatefulWidget {
  const CameraScreen({super.key});

  @override
  State<CameraScreen> createState() => _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen> with WidgetsBindingObserver {
  CameraController? _cameraController;
  List<CameraDescription>? _cameras;
  bool _isDetecting = false;
  String _detectedSign = '';
  bool _isCameraInitialized = false;
  bool _isRearCameraSelected = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _initializeCamera();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _cameraController?.dispose();
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.inactive) {
      _cameraController?.dispose();
    } else if (state == AppLifecycleState.resumed) {
      _initializeCamera();
    }
  }

  Future<void> _initializeCamera() async {
    _cameras = await availableCameras();
    if (_cameras != null && _cameras!.isNotEmpty) {
      _cameraController = CameraController(
        _isRearCameraSelected ? _cameras![0] : _cameras!.last,
        ResolutionPreset.high,
        enableAudio: false,
      );

      await _cameraController!.initialize();
      
      if (mounted) {
        setState(() {
          _isCameraInitialized = true;
        });
      }
    }
  }

  void _toggleCameraDirection() {
    setState(() {
      _isRearCameraSelected = !_isRearCameraSelected;
      _isCameraInitialized = false;
    });
    _initializeCamera();
  }

  Future<void> _startDetection() async {
    if (_isDetecting) return;

    setState(() {
      _isDetecting = true;
    });

    // Simulate sign detection (replace with actual TensorFlow Lite implementation)
    await Future.delayed(const Duration(seconds: 1));
    
    setState(() {
      _detectedSign = 'Hello';
      _isDetecting = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_isCameraInitialized || _cameraController == null) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign Language Detection'),
        actions: [
          IconButton(
            icon: Icon(_isRearCameraSelected ? Icons.camera_front : Icons.camera_rear),
            onPressed: _toggleCameraDirection,
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            flex: 3,
            child: Container(
              width: double.infinity,
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(20),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: CameraPreview(_cameraController!),
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: Container(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Detected Sign:',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    _detectedSign.isEmpty ? 'None' : _detectedSign,
                    style: const TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 30),
                  SizedBox(
                    width: double.infinity,
                    height: 60,
                    child: ElevatedButton(
                      onPressed: _isDetecting ? null : _startDetection,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Theme.of(context).colorScheme.primary,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15),
                        ),
                      ),
                      child: _isDetecting
                          ? const CircularProgressIndicator(color: Colors.white)
                          : const Text(
                              'Detect Sign',
                              style: TextStyle(fontSize: 18),
                            ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}