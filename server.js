import express from 'express';
import Groq from 'groq-sdk';

const app = express();
app.use(express.json());
app.use(express.static('public'));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post('/solve', async (req, res) => {
  try {
    const { question } = req.body;
    console.log('Question:', question);

    if (!question) {
      return res.status(400).json({ error: "No question provided" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a JEE Main/Advanced expert. Solve step by step with clear final answer. Use LaTeX for math: $x^2$"
        },
        { role: "user", content: question }
      ],
      temperature: 0.3
    });

    const answer = completion.choices[0]?.message?.content;
    console.log('Answer:', answer);

    if (!answer) throw new Error('Groq returned empty');

    res.json({ answer: answer });

  } catch (error) {
    console.error('Groq Error:', error.message);
    res.status(500).json({
      error: "Failed to solve",
      details: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.send('JEE AI Solver with Groq is running. POST to /solve');
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
