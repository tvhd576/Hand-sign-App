import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const CameraModule = ({ onHandSignDetected, isActive }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    let frameProcessor;
    
    if (isActive && cameraRef.current) {
      setIsCapturing(true);
      frameProcessor = setInterval(() => {
        captureFrame();
      }, 500); // Process every 500ms
    }
    
    return () => {
      if (frameProcessor) {
        clearInterval(frameProcessor);
      }
      setIsCapturing(false);
    };
  }, [isActive]);

  const captureFrame = async () => {
    if (cameraRef.current && isCapturing) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
          skipProcessing: true
        });
        
        // Pass the captured frame to parent component for processing
        if (onHandSignDetected) {
          // For now, just pass a placeholder value
          // Later this will be integrated with the AI model
          onHandSignDetected('Sample Sign');
        }
      } catch (error) {
        console.error('Error capturing frame:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text style={styles.text}>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text style={styles.text}>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {isActive ? (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.front}
          onCameraReady={() => console.log('Camera ready')}
        />
      ) : (
        <View style={styles.cameraPlaceholder}>
          <Text style={styles.text}>Camera is off</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 3/4,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#444',
  },
  camera: {
    flex: 1,
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CameraModule;