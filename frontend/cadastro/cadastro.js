// const fs = require('fs')
// const lista = JSON.parse(fs.readFileSync('../users.json', 'utf-8'))

// const email = ''
// const name = ''
// const senha = 20
// const cpf = 123
// const oferecedor = true

// const user = {
//   email,
//   name,
//   senha,
//   cpf,
//   oferecedor,
//   score: 0
// }

// const jaExiste = lista.some(usuario => usuario.email == user.email);

// if(jaExiste) {
//   console.log('já existe, imbecil')
// } else {
//   lista.push(user)
//   fs.writeFileSync('../users.json', JSON.stringify(lista))
// }

async function cadastrar() {
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, email, senha })
  });

  if (res.ok) {
    alert("Cadastro realizado com sucesso!");
    window.location.href = "/login/login.html";
  } else {
    const data = await res.json();
    alert(data.error || "Erro ao cadastrar");
  }
}