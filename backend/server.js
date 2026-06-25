const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// =======================
// CONFIG BÁSICA
// =======================
app.use(express.json());

// serve o frontend inteiro
app.use(express.static(path.join(__dirname, "../frontend")));


// =======================
// FUNÇÃO AUXILIAR (LER JSON)
// =======================
function readJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, file), "utf-8"));
}

function writeJSON(file, data) {
  fs.writeFileSync(
    path.join(__dirname, file),
    JSON.stringify(data, null, 2)
  );
}


// =======================
// CADASTRO
// =======================
app.post("/register", (req, res) => {
  const users = readJSON("users.json");

  const { nome, email, senha } = req.body;

  const userExists = users.find(u => u.email === email);

  if (userExists) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const newUser = {
    id: Date.now(),
    nome,
    email,
    senha
  };

  users.push(newUser);
  writeJSON("users.json", users);

  res.json({ ok: true });
});


// =======================
// LOGIN
// =======================
app.post("/login", (req, res) => {
  const users = readJSON("users.json");

  const { email, senha } = req.body;

  const user = users.find(
    u => u.email === email && u.senha === senha
  );

  if (!user) {
    return res.status(401).json({ error: "Login inválido" });
  }

  res.json(user);
});


// =======================
// PEGAR USUÁRIOS (DEBUG / RANKING)
// =======================
app.get("/users", (req, res) => {
  const users = readJSON("users.json");
  res.json(users);
});


// =======================
// SALVAR PONTOS (MAPA FUTURO)
// =======================
app.post("/points", (req, res) => {
  const points = readJSON("points.json");

  const { lat, lng, userId } = req.body;

  const newPoint = {
    id: Date.now(),
    lat,
    lng,
    userId
  };

  points.push(newPoint);
  writeJSON("points.json", points);

  res.json({ ok: true });
});


// =======================
// START SERVER
// =======================
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});