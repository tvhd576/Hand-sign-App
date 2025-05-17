import React, { useState } from 'react';
import './App.css';
import HandSignDetector from './components/HandSignDetector';
import TranslationDisplay from './components/TranslationDisplay';

function App() {
  const [translation, setTranslation] = useState('');

  const handleSignDetected = (sign) => {
    setTranslation(sign);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hand Sign Translator</h1>
      </header>
      <main>
        <HandSignDetector onSignDetected={handleSignDetected} />
        <TranslationDisplay translation={translation} />
      </main>
    </div>
  );
}

export default App;
