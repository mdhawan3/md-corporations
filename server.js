const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 👇 Replace this with YOUR secret key
const OPENAI_API_KEY = "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";

app.use(express.static(__dirname)); // Serves index.html and assets
app.use(express.json());

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices?.[0]?.message?.content });
});

app.listen(PORT, () => console.log(`🧠 Companion AI running at http://localhost:${PORT}`));
