function modificaEstiloError() {
   document.getElementById('TituloModal').innerHTML = 'Erro no Login'
   document.getElementById('TituloModal').className = 'text-danger'
   document.getElementById('descricaoModal').innerHTML = 'O e-mail ou senha não foram preenchidos corretamente.'
  document.getElementById('botao-modal').innerHTML = 'Voltar e Corrigir'
  document.getElementById('botao-modal').className = 'btn btn-danger'
 
  }

function Login() {
    var done = 0;
    var usuario = document.getElementsByName('email')[0].value;
    usuario = usuario.toLowerCase();
    var senha = document.getElementsByName('password')[0].value;
    senha = senha.toLowerCase();
  
    if (usuario == "administrador" && senha == "adm123") {
      location.href = 'relatorio.html'
      done = 1;
    }
    if (done == 0) {
      modificaEstiloError()
      $('#modalLogin').modal('show')
    }
  }
 