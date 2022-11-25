function modificaEstiloError() {
  document.getElementById('TituloModal').innerHTML = 'Erro no Login'
  document.getElementById('TituloModal').className = 'text-danger'
  document.getElementById('descricaoModal').innerHTML = 'O e-mail ou senha não foram preenchidos corretamente.'
  document.getElementById('botao-modal').innerHTML = 'Voltar e Corrigir'
  document.getElementById('botao-modal').className = 'btn btn-danger'
}

function modificaEstiloErrorSenha() {
  document.getElementById('TituloModal').innerHTML = 'Erro nas Senhas'
  document.getElementById('TituloModal').className = 'text-danger'
  document.getElementById('descricaoModal').innerHTML = 'As senha não são iguais.'
  document.getElementById('botao-modal').innerHTML = 'Voltar e Corrigir'
  document.getElementById('botao-modal').className = 'btn btn-danger'
}

function modificaEstiloErrorCodigoErrado() {
  document.getElementById('TituloModal').innerHTML = 'Código Incorreto'
  document.getElementById('TituloModal').className = 'text-danger'
  document.getElementById('descricaoModal').innerHTML = 'Verifique seu email e digite o código de recuperação.'
  document.getElementById('botao-modal').innerHTML = 'Voltar e Corrigir'
  document.getElementById('botao-modal').className = 'btn btn-danger'
}

function Login() {
  var done = 0;
  var usuario = document.getElementsByName('email')[0].value;
  usuario = usuario.toLowerCase();
  var senha = document.getElementsByName('password')[0].value;
  senha = senha.toLowerCase();
  let senhapega = JSON.parse(localStorage.getItem('senhaadm'))
  if (usuario == "administrador@gmail.com" && senha == senhapega) {
    location.href = 'relatorio.html'
    done = 1;
  }
  if (done == 0) {
    modificaEstiloError()
    $('#modalLogin').modal('show')
  }
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function recuperarSenha() {
  let codigo = getRandomInt(1, 1000)
  localStorage.setItem('codigoverificar', JSON.stringify(codigo))
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "sublimepremium@gmail.com",
    Password: "584E02FAEA1AC15846C067C3CB8D95013D72",
    To: document.getElementById('email').value,
    From: "sublimepremium@gmail.com",
    Subject: "Código de recuperação do sistema Saint-Farm",
    Body: `Seu código de recuperação de senha do sistema da Saint-Farm é: ${codigo}`
  }).then(
    setTimeout(function () {
      location.href = 'administrador-enviar-codigo.html'
    }, 1000)
  );
}

function verificarcodigo() {
  let codigo = document.getElementById('email').value
  let codigorecuperado = localStorage.getItem('codigoverificar')
  if (codigo == codigorecuperado) {
    location.href = 'administrador-confirmar-senha.html'
  } else {
    modificaEstiloErrorCodigoErrado()
    $('#modalLogin').modal('show')
  }
}

function registrarNovaSenha() {
  let senhaum = document.getElementById('email').value
  let senhadois = document.getElementById('password').value
  if (senhaum == senhadois) {
    localStorage.setItem('senhaadm', JSON.stringify(senhadois))
    location.href = 'administrador-login.html'
  } else {
    modificaEstiloErrorSenha()
    $('#modalLogin').modal('show')
  }
}