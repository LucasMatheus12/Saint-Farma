class Funcionario {
    constructor(nome, salario, telefone, cpf, cidade, referencia, rua, bairro, numeroCasa) {
        this.nome = nome;
        this.salario = salario;
        this.telefone = telefone;
        this.cpf = cpf;
        this.cidade = cidade;
        this.referencia = referencia;
        this.rua = rua;
        this.bairro = bairro;
        this.numeroCasa = numeroCasa;
    }
    validarDadosBanco() {
        for(let i in this) {
          if(this[i] == undefined || this[i] == '' || this[i] == null || this[i] < 0) {
            return false
          }
        }
        return true
      }
}


class BancoDados {
    constructor() {
        let idFuncionario = localStorage.getItem('idFuncionario')
        if (idFuncionario === null) {
            localStorage.setItem('idFuncionario', 0 + 'funcionario')
        }
    }

    getProxId() {
        let proxFuncionario = localStorage.getItem('idFuncionario')
        return parseInt(proxFuncionario) + 1 + 'funcionario';
    }

    GravarFuncionario(funcionario) {
        let idFuncionario = this.getProxId()
        localStorage.setItem(idFuncionario, JSON.stringify(funcionario));
        localStorage.setItem('idFuncionario', idFuncionario);
    }

    GravarFuncionarioEditar(id, funcionario) {
        localStorage.setItem('editarFuncionario', JSON.stringify(funcionario));
        localStorage.setItem('idEditarFuncionario', JSON.stringify(id + 'funcionario'));
    }

    RecuperarFuncionarioEditar() {
        let funcionarios = Array();
        let funcionario = JSON.parse(localStorage.getItem('editarFuncionario'))
        funcionarios.push(funcionario);
        return funcionarios;
    }

    RetornaRegistro(RegistroAlterado) {
        let id = JSON.parse(localStorage.getItem('idEditarFuncionario'));
        localStorage.setItem(id, JSON.stringify(RegistroAlterado));
    }

    listarRegistrofuncionario() {
        
        let funcionarios = Array();
        let id = localStorage.getItem('idFuncionario');
        let idreplace = id.replace('funcionario', '');
        for (let i = 1; i <= idreplace; i++) {
            let funcionario = JSON.parse(localStorage.getItem(i + 'funcionario'))

            if (funcionario === null) {
                continue
            }
            funcionario.id = i;
            funcionarios.push(funcionario);
        }
        return funcionarios;
    }

    Buscarfuncionario(funcionario) {
        let FuncionarioBuscar = Array();
        FuncionarioBuscar = this.listarRegistrofuncionario();

        if (funcionario.nome != '') {
            FuncionarioBuscar = FuncionarioBuscar.filter(b => b.nome == funcionario.nome)
        }

        if (funcionario.salario != '') {
            FuncionarioBuscar = FuncionarioBuscar.filter(b => b.salario == funcionario.salario)
        }

        if (funcionario.telefone != '') {
            FuncionarioBuscar = FuncionarioBuscar.filter(b => b.telefone == funcionario.telefone)
        }

        if (funcionario.cpf != '') {
            FuncionarioBuscar = FuncionarioBuscar.filter(b => b.cpf == funcionario.cpf)
        }
        return FuncionarioBuscar;
    }
    remover(id) {
        localStorage.removeItem(id)
      }
}

let BD = new BancoDados();

 /* Modais */

 function modificaEstiloSuccesso() {
    document.getElementById('TituloModal').innerHTML = 'Sucesso'
    document.getElementById('TituloModal').className = 'text-success'
    document.getElementById('descricaoModal').innerHTML = 'O funcionário foi cadastrado com sucesso !'
   document.getElementById('botao-modal').innerHTML = 'Confirmar'
   document.getElementById('botao-modal').className = 'btn btn-success'
   }
  
   function modificaEstiloError() {
     document.getElementById('TituloModal').innerHTML = 'Erro no Cadastro'
     document.getElementById('TituloModal').className = 'text-danger'
     document.getElementById('descricaoModal').innerHTML = 'Algum dado não foi preenchido.'
    document.getElementById('botao-modal').innerHTML = 'Voltar e Corrigir'
    document.getElementById('botao-modal').className = 'btn btn-danger'
    }

function CadastrarFuncionario() {
    let nome = document.getElementById('Nomefuncionario')
    let salario = document.getElementById('Salariofuncionario')
    let telefone = document.getElementById('Telefonefuncionario')
    let cpf = document.getElementById('CPFfuncionario')
    let cidade = document.getElementById('Cidadefuncionario')
    let referencia = document.getElementById('Referenciafuncionario')
    let rua = document.getElementById('Ruafuncionario')
    let bairro = document.getElementById('Bairrofuncionario')
    let numeroCasa = document.getElementById('Numerofuncionario')

    let funcionario = new Funcionario(nome.value, salario.value, telefone.value, cpf.value, cidade.value, referencia.value, rua.value, bairro.value, numeroCasa.value);
    if(funcionario.validarDadosBanco()){
        BD.GravarFuncionario(funcionario);
        modificaEstiloSuccesso()
        $('#modalFuncionario').modal('show')
    } else {
       modificaEstiloError()
       $('#modalFuncionario').modal('show')
    }
}

function visualizarListaFuncionario(funcionario = Array(), filtro = false, editar = false, excluir = false) {
    if (funcionario.length == 0 && filtro == false) {
        funcionario = BD.listarRegistrofuncionario()
    }

    let listaFuncionario = document.getElementById('listaFuncionarios')
    listaFuncionario.innerHTML = ''

    funcionario.forEach(function (d) {
        //criando a linha(tr)
        let linha = listaFuncionario.insertRow()
        console.log(d)
        // criar as colunas(td)
        linha.insertCell(0).innerHTML = d.nome
        linha.insertCell(1).innerHTML = d.telefone
        linha.insertCell(2).innerHTML = d.cpf
        linha.insertCell(3).innerHTML = d.cidade
        linha.insertCell(4).innerHTML = d.rua
        linha.insertCell(5).innerHTML = d.bairro
        linha.insertCell(6).innerHTML = d.salario
        if (editar == true) {
          let btn = document.createElement('button')
          btn.className = 'btn btn-primary'
          btn.innerHTML = '<i class="fa-solid fa-pen"></i>'
          btn.id = `id_editar_${d.id}`
          btn.onclick = function () {
            let id = this.id.replace('id_editar_', '')
            let funcionario = JSON.parse(localStorage.getItem(id + 'funcionario'))
            BD.GravarFuncionarioEditar(id, funcionario)
            location.href = 'funcionarios-editar-interno.html'
          }
          linha.insertCell(7).append(btn)
        } else if (excluir == true) {
          let btn = document.createElement('button')
          btn.className = 'btn btn-danger'
          btn.innerHTML = '<i class="fas fa-times"></i>'
          btn.id = `id_deletar_${d.id}funcionario`
          btn.onclick = function () {
            //ModificaEstilo3()
            //$('#modalConsulta').modal('show')
            let id = this.id.replace('id_deletar_', '')
            BD.remover(id)
            window.location.reload()
          }
          linha.insertCell(7).append(btn)
        }
      })
}

function Pesquisarfuncionario() {
    let nome = document.getElementById('Nomefuncionario');
    let salario = document.getElementById('Salariofuncionario');
    let telefone = document.getElementById('Telefonefuncionario');
    let cpf = document.getElementById('CPFfuncionario');

    let funcionario = new Funcionario(nome.value, salario.value, telefone.value, cpf.value);

    let FuncionarioPesquisado = BD.Buscarfuncionario(funcionario);
    visualizarListaFuncionario(FuncionarioPesquisado, true);
    
}

function PesquisarfuncionarioExcluir() {
    let nome = document.getElementById('Nomefuncionario');
    let salario = document.getElementById('Salariofuncionario');
    let telefone = document.getElementById('Telefonefuncionario');
    let cpf = document.getElementById('CPFfuncionario');

    let funcionario = new Funcionario(nome.value, salario.value, telefone.value, cpf.value);

    let FuncionarioExluirPesquisado = BD.Buscarfuncionario(funcionario);
    visualizarListaFuncionario(FuncionarioExluirPesquisado, true, false, true);
}


function PesquisarfuncionarioEditar() {
    let nome = document.getElementById('Nomefuncionario');
    let salario = document.getElementById('Salariofuncionario');
    let telefone = document.getElementById('Telefonefuncionario');
    let cpf = document.getElementById('CPFfuncionario');

    let funcionario = new Funcionario(nome.value, salario.value, telefone.value, cpf.value);

    let FuncionarioEditarPesquisado = BD.Buscarfuncionario(funcionario)
    visualizarListaFuncionario(FuncionarioEditarPesquisado, true, true, false);

}

function preencherEditar() {
    let funcionario = Array()
    funcionario = BD.RecuperarFuncionarioEditar()
    funcionario.forEach(function (e) {
      document.getElementById('NomefuncionarioEditar').value = e.nome
      document.getElementById('SalariofuncionarioEditar').value = e.salario
      document.getElementById('TelefonefuncionarioEditar').value = e.telefone
      document.getElementById('CPFfuncionarioEditar').value = e.cpf
      document.getElementById('CidadefuncionarioEditar').value = e.cidade
      document.getElementById('ReferenciafuncionarioEditar').value = e.referencia
      document.getElementById('RuafuncionarioEditar').value = e.rua
      document.getElementById('BairrofuncionarioEditar').value = e.bairro
      document.getElementById('NumeroCasafuncionarioEditar').value = e.numeroCasa
    })
  
  }
  
  function CadastrarEditado() {
    let nome = document.getElementById('NomefuncionarioEditar')
    let salario = document.getElementById('SalariofuncionarioEditar')
    let telefone = document.getElementById('TelefonefuncionarioEditar')
    let cpf = document.getElementById('CPFfuncionarioEditar')
    let cidade = document.getElementById('CidadefuncionarioEditar')
    let referencia = document.getElementById('ReferenciafuncionarioEditar')
    let rua = document.getElementById('RuafuncionarioEditar')
    let bairro = document.getElementById('BairrofuncionarioEditar')
    let numerocasa = document.getElementById('NumeroCasafuncionarioEditar')
  
    let funcionario = new Funcionario(nome.value,salario.value,telefone.value,cpf.value,cidade.value,referencia.value,rua.value,bairro.value,numerocasa.value)
    BD.RetornaRegistro(funcionario)
    location.href = 'funcionarios-editar.html'
  } 





