// server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const questions = require('./data/questions.json');
const cors = require('cors')

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.get('/', (req, res) => {
    res.send('funker nå ja din respekterte afroamerikaner');
});

// Endpoint to serve questions.json
app.get('/api/questions', (req, res) => {
  // Read questions.json and send its contents as the response

  res.json(questions);
});

// Define a catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
