// const fs = require('fs')
// // fs.writeFileSync('./login.json', '{}');
// // const dados = fs.readFileSync('login.json', 'utf-8')
// const listaTexto = fs.readFileSync('../users.json', 'utf-8')
// const lista = JSON.parse(listaTexto)
// // const usuario = JSON.parse(dados)
// const email = document.querySelector()
// const senha = document.querySelector()

// // const currentUser = JSON.stringify({ email, senha })
// const user = {email, senha}


// const usuarioLogado = lista.find(usuario => 
//   Object.keys(user).every(key => usuario[key] === user[key])
// );

// if(usuarioLogado) {
//   localStorage.setItem('current_user', JSON.stringify(usuarioLogado));
// }

async function login() {
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  });

  if (res.ok) {
    const user = await res.json();

    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "/index.html";
  } else {
    alert("Login inválido");
  }
}