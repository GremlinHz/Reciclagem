const user = JSON.parse(localStorage.user)
const userScore = user.score
const tr = Array.from(document.querySelectorAll('tr'))
const cAe = []
for(let i = 0; i < tr.length; i++) {
  if(tr[i].id !== '') {
    cAe.push(tr[i])
  }
}
const statesTr = cAe.slice(0, 4 )
const citysTr = cAe.slice(4, 8)
console.log(statesTr, citysTr)

async function loadUsers () {
  const res = await fetch('/backend/users.json')
  let userPosition = 0
  let statePosition = 0
  let cityPosition = 0
  let cityRank = {}
  let stateRank = {}

  const x = (await res.json())
  let users = await x
  
  
  users = users.sort((a, b) => a.score - b.score)
  for(let i = 0; i < users.length; i++) {
    cityRank[users[i].cidade] += parseInt(users[i].score)
    stateRank[users[i].estado] += parseInt(users[i].score)
  }
  // cityRank = cityRank.sort((a, b) => a.score - b.score)
  // stateRank = stateRank.sort((a, b) => a.score - b.score)
  
  cityRank = Object.fromEntries(Object.entries(cityRank).sort((a, b) => a[1] - b[1]))
  stateRank = Object.fromEntries(Object.entries(stateRank).sort((a, b) => a[1] - b[1]))

  userPosition = (users.findIndex(usuario => usuario.email == user.email)) + 1
  cityPosition = Object.entries(cityRank).findIndex(cidade => cidade[0] == user.cidade) + 1
  statePosition = Object.entries(stateRank).findIndex(estado => estado[0] == user.estado) + 1



  document.querySelector('.user-points').textContent = userScore || 0
  document.querySelector('.city-position').textContent = cityPosition
  document.querySelector('.state-position').textContent = statePosition
  document.querySelector('.national-rank').textContent = userPosition

//usar um for aliado com os objetos de rank de cidade e estado e implementar nas tabelas, para lembrar: linha 3 a 12
}
loadUsers()

