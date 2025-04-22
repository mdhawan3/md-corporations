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
