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

document.querySelector('.form').addEventListener('submit', async e => {
  e.preventDefault()
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;

  await login(email, senha)
})

async function login(email, senha) {
  console.log('oi')

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  });

  try{
    res
    if (res.ok) {
      const user = await res.json();
  
      localStorage.setItem("user", JSON.stringify(user));
  
      window.location.href = "../pontosColeta/pontos_coleta.html";
      console.log('oi')
    } else {
      alert("Login inválido");
    }
  } catch {
    console.log('catched')
  }
}