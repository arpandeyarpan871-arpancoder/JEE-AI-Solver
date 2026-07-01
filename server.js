const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: "YOUR_API_KEY"
});

app.post("/solve", async (req, res) => {

  const question = req.body.question;

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: "Solve this JEE problem step by step: " + question
  });

  res.json({
    answer: response.output_text
  });

});

app.listen(3000, () => {
  console.log("Server running");
});
