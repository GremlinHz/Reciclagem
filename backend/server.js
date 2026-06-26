const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());


// 🔗 conecta frontend ao backend
app.use(express.static(path.join(__dirname, "../frontend")));

function readJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, file), "utf-8"));
}

function writeJSON(file, data) {
  fs.writeFileSync(
    path.join(__dirname, file),
    JSON.stringify(data, null, 2)
  );
}

// =====================
// REGISTER
// =====================
app.post("/register", (req, res) => {
  const users = readJSON("users.json");

  const { nome, email, senha, estado, cidade, isAReceiver } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ error: "Usuário já existe" });

  users.push({
    nome,
    email,
    senha,
    estado,
    cidade,
    isAReceiver
  });

  writeJSON("users.json", users);

  res.json({ ok: true });
});

// =====================
// LOGIN
// =====================
app.post("/login", (req, res) => {
  const users = readJSON("users.json");

  const { email, senha } = req.body;

    const user = users.find(
      u => u.email === email && u.senha === senha
    );

  if (!user) return res.status(401).json({ error: "Login inválido" });

  res.json(user);
});

// =====================
app.get("/users", (req, res) => {
  res.json(readJSON("users.json"));
});

app.listen(3000, () => {
  console.log("rodando em http://localhost:3000");
});