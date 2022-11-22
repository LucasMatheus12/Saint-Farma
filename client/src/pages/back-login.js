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
      alert("Dados incorretos, tente novamente");
    }
  }
 