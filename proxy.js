const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/proxy", async (req, res) => {
  const target = req.query.target;
  if (!target) return res.status(400).send("No target specified");

  try {
    const response = await fetch(target);
    const text = await response.text();
    res.send(text);
  } catch (e) {
    res.status(500).send("Proxy error");
  }
});

app.listen(3000, () => console.log("Proxy running on http://localhost:3000"));