// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.AIzaSyC7sFV_lBC0kOyN1Nt2Do2as-WBA8lV9Ho;

app.post('/api/chatbot', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/chat/completions',
      {
        model: 'gemini-1.5-flash', // specify the Gemini model you want to use
        messages: [
          { role: 'user', content: userMessage },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${AIzaSyC7sFV_lBC0kOyN1Nt2Do2as-WBA8lV9Ho}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Send the chatbot's response back to the client
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error contacting Gemini API:", error);
    res.status(500).json({ error: 'Chatbot request failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
