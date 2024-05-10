const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.post('/initialize', (req, res) => {
  res.status(200).send({ message: 'Chat Initialized', sessionId: Date.now() });
});

app.post('/send-message', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: message,
      max_tokens: 150
    });
    res.status(200).send({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/chat-history', (req, res) => {
  res.status(200).send({ history: [] });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});