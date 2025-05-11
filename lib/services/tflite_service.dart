import 'dart:io';
import 'package:tflite/tflite.dart';
import 'package:flutter/services.dart';

class TFLiteService {
  static Future<void> loadModel() async {
    try {
      await Tflite.loadModel(
        model: 'assets/models/sign_language_model.tflite',
        labels: 'assets/models/sign_language_labels.txt',
      );
    } on PlatformException {
      print('Failed to load model.');
    }
  }

  static Future<List?> runModelOnFrame(File image) async {
    var recognitions = await Tflite.runModelOnImage(
      path: image.path,
      numResults: 5,
      threshold: 0.5,
      imageMean: 127.5,
      imageStd: 127.5,
    );
    return recognitions;
  }

  static Future<void> disposeModel() async {
    await Tflite.close();
  }
}