// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Enable cross-origin requests from the frontend

const app = express();
app.use(cors());  // Allow requests from your frontend
app.use(express.json()); // To parse JSON requests

const apiKey = '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';

// Endpoint to handle chat requests
app.post('/chat', async (req, res) => {
  const { message } = req.body;  // User's message from frontend

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful chatbot.' },
          { role: 'user', content: message },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`, // Securely use API key
        },
      }
    );

    // Send response back to the frontend
    const content = response.data.choices[0].message.content;
    res.json({ content });
  } catch (error) {
    console.error("Error communicating with chatbot:", error);
    res.status(500).json({ error: 'Sorry, there was an error with the chatbot service.' });
  }
});

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
