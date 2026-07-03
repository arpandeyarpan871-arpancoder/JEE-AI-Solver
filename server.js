
import express from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Reads from Render env vars
});

app.post('/solve', async (req, res) => {
  try {
    // 1. Check if we got the question
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "No question provided" });
    }

    // 2. Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "API key not found on server" });
    }

    // 3. Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a JEE expert. Solve step by step. Give final answer clearly."
        },
        { role: "user", content: question }
      ],
      temperature: 0.2
    });

    // 4. This is the correct path - most common bug is here
    const answer = completion.choices[0]?.message?.content;

    if (!answer) {
      return res.status(500).json({ error: "OpenAI returned empty answer" });
    }

    res.json({ answer: answer }); // Send { answer: "..." } not just "..."

  } catch (error) {
    console.error("OpenAI Error:", error); // This will show in Render Logs
    res.status(500).json({
      error: "Failed to get answer",
      details: error.message
    });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
