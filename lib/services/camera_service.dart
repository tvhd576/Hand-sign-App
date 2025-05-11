import 'package:camera/camera.dart';
import 'dart:async';

class CameraService {
  CameraController? controller;
  List<CameraDescription>? cameras;
  
  Future<void> initialize() async {
    cameras = await availableCameras();
    controller = CameraController(
      cameras![0],
      ResolutionPreset.medium,
      enableAudio: false,
    );
    await controller!.initialize();
  }

  Future<XFile?> takePicture() async {
    if (controller == null || !controller!.value.isInitialized) {
      return null;
    }
    
    try {
      final XFile file = await controller!.takePicture();
      return file;
    } catch (e) {
      print('Error taking picture: $e');
      return null;
    }
  }

  void dispose() {
    controller?.dispose();
  }
}