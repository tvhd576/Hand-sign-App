const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// API endpoint to save translations
app.post('/api/translations', (req, res) => {
  const { sign, translation } = req.body;
  
  // In a real app, you would save this to a database
  console.log(`Received translation: ${sign} -> ${translation}`);
  
  res.status(201).json({ 
    success: true, 
    message: 'Translation saved successfully' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});