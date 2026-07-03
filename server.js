import express from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json());
app.use(express.static('public')); // Put your HTML in a 'public' folder

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/solve', async (req, res) => {
  try {
    const { question } = req.body;
    console.log('Received question:', question);

    if (!question) {
      return res.status(400).json({ error: "Question is missing" });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      return res.status(500).json({ error: "Server API key not configured" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a JEE Main/Advanced expert. Solve step by step." },
        { role: "user", content: question }
      ],
      temperature: 0.3
    });

    const answer = completion.choices[0]?.message?.content;
    console.log('OpenAI Answer:', answer);

    if (!answer) {
      throw new Error('OpenAI returned no content');
    }

    res.json({ answer: answer });

  } catch (error) {
    console.error('Solve Error:', error.message);
    res.status(500).json({
      error: "Failed to get solution",
      details: error.message
    });
  }
});

// Health check route to test if server works
app.get('/', (req, res) => {
  res.send('JEE AI Solver is running. Use POST /solve');
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
