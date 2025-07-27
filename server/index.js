const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // ✅ CommonJS-compatible fetch
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // or 'llama3-70b-8192'
        messages,
        temperature: 0.7
      })
    });

    const data = await groqResponse.json();

    if (data.choices && data.choices.length > 0) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'Invalid response from Groq', raw: data });
    }
  } catch (error) {
    console.error('Groq error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
