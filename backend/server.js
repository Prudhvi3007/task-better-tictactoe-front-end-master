const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint for validating name
app.post('/info/validate', (req, res) => {
  const { name } = req.body;

  // Your validation logic here
  // For demonstration purposes, let's assume a simple validation:
  const isValid = name.length >= 5 && name.length <= 50;

  // Respond with validation result
  res.json({ success: isValid });
});

  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
