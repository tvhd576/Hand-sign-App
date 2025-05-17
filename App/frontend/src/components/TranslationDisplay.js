import React from 'react';

const TranslationDisplay = ({ translation }) => {
  return (
    <div className="translation-display">
      <h2>Translation</h2>
      <div className="translation-text">
        {translation || 'No sign detected'}
      </div>
    </div>
  );
};

export default TranslationDisplay;