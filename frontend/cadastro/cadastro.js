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


const form = document.querySelector('#cadastroForm')
let nome = ''
let email = ''
let senha = 0
let estado = ''
let cidade = ''
let isAReceiver = false
form.addEventListener('submit', async e => {
  e.preventDefault()
  nome = e.target.nome.value
  email = e.target.email.value
  senha = e.target.senha.value
  estado = e.target.estado.value
  cidade = e.target.cidade.value
  if(e.target.select.value == "receber") isAReceiver = true 
  await cadastrar()
})

async function cadastrar() {
  const res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, email, senha, estado, cidade, isAReceiver})
  });

  try {
    res
    if (res.ok) {
      alert("Cadastro feito!");
      // window.location.href = "/frontend/login/login.html";
    } else {
      const data = await res.json();
      console.log('ja foi')
    }
  } catch (error) {
    alert(error)
  }
}
