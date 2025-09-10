const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let messages = [];

function findIndex(id) {
    return messages.findIndex(m => m.id === id);
}

// Health / hint route
app.get("/", (req, res) => res.json({ ok: true, routes: ["/messages"] }));

// List
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Read one
app.get("/messages/:id", (req, res) => {
  const m = messages.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: "Not found" });
  res.json(m);
});

// Create
app.post("/messages", (req, res) => {
  const { text, author = "Anonymous" } = req.body || {};
  if (typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({ error: "text is required" });
  }
  const now = new Date().toISOString();
  const msg = {
    id: nanoid(),
    text: text.trim(),
    author,
    createdAt: now,
    updatedAt: now
  };
  messages.push(msg);
  res.status(201).json(msg);
});

// Replace (full update)
app.put("/messages/:id", (req, res) => {
  const idx = findIndex(req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  const { text, author } = req.body || {};
  if (typeof text !== "string" || text.trim().length === 0) {
    return res.status(400).json({ error: "text is required" });
  }
  const now = new Date().toISOString();
  messages[idx] = {
    ...messages[idx],
    text: text.trim(),
    author: author ?? messages[idx].author,
    updatedAt: now
  };
  res.json(messages[idx]);
});

// Partial update
app.patch("/messages/:id", (req, res) => {
  const idx = findIndex(req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  const { text, author } = req.body || {};
  if (text !== undefined && (typeof text !== "string" || text.trim().length === 0)) {
    return res.status(400).json({ error: "text, if provided, must be non-empty string" });
  }
  const now = new Date().toISOString();
  messages[idx] = {
    ...messages[idx],
    ...(text !== undefined ? { text: text.trim() } : {}),
    ...(author !== undefined ? { author } : {}),
    updatedAt: now
  };
  res.json(messages[idx]);
});

// Delete
app.delete("/messages/:id", (req, res) => {
  const idx = findIndex(req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const [deleted] = messages.splice(idx, 1);
  res.json({ deleted });
});

// (Optional) Serve a static frontend from /public
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});