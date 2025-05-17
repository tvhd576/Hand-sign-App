import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';

const HandSignDetector = ({ onSignDetected }) => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

  // Load the handpose model
  useEffect(() => {
    const loadModel = async () => {
      setIsModelLoading(true);
      try {
        // Initialize TensorFlow.js
        await tf.ready();
        
        // Load the handpose model
        const handposeModel = await handpose.load();
        setModel(handposeModel);
        console.log('Handpose model loaded');
      } catch (error) {
        console.error('Error loading handpose model:', error);
      } finally {
        setIsModelLoading(false);
      }
    };
    
    loadModel();
  }, []);

  // Detect hands in the video stream
  const detectHands = async () => {
    if (model && webcamRef.current && webcamRef.current.video.readyState === 4) {
      // Get video properties
      const video = webcamRef.current.video;
      
      // Make detections
      const hand = await model.estimateHands(video);
      
      if (hand.length > 0) {
        // Process hand landmarks to recognize signs
        const sign = interpretSign(hand[0].landmarks);
        onSignDetected(sign);
      }
    }
  };

  // Simple function to interpret hand landmarks as signs
  // This is a placeholder - you would need a more sophisticated algorithm
  const interpretSign = (landmarks) => {
    // Very basic example - in reality, you would use a trained model
    // or more complex algorithm to interpret the landmarks
    
    // Calculate the average position of all landmarks
    const avgX = landmarks.reduce((sum, point) => sum + point[0], 0) / landmarks.length;
    const avgY = landmarks.reduce((sum, point) => sum + point[1], 0) / landmarks.length;
    
    // Very simple example interpretation
    if (avgY < 200) return "Hello";
    if (avgY > 300) return "Thank you";
    if (avgX < 200) return "Yes";
    if (avgX > 300) return "No";
    
    return "Unknown sign";
  };

  // Run hand detection at regular intervals
  useEffect(() => {
    let interval;
    if (!isModelLoading) {
      interval = setInterval(() => {
        detectHands();
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isModelLoading, model]);

  return (
    <div className="hand-sign-detector">
      {isModelLoading ? (
        <div className="loading">Loading hand detection model...</div>
      ) : (
        <div className="webcam-container">
          <Webcam
            ref={webcamRef}
            style={{
              width: '100%',
              maxWidth: '640px',
              height: 'auto'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HandSignDetector;