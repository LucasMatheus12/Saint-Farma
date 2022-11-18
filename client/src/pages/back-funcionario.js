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
        console.log("a");
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
        return this.Buscarfuncionario;
    }
}
let BD = new BancoDados();

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

    BD.GravarFuncionario(funcionario);
}

function visualizarListaFuncionario(funcionario = Array(), filtro = false, editar = false, excluir = false) {
    if (funcionario.length == 0 && filtro == false) {
        funcionario = BD.listarRegistrofuncionario()
    }

    let listaFuncionario = document.getElementById('listaFuncionarios')
    listaFuncionario.innerHTML = ''

    funcionario.forEach(function (d) {
        let linha = listaFuncionario.insertRow()

        linha.insertCell(0).innerHTML = d.nome
        linha.insertCell(1).innerHTML = d.salario
        linha.insertCell(2).innerHTML = d.telefone
        linha.insertCell(3).innerHTML = d.cpf
        linha.insertCell(4).innerHTML = d.cidade
        linha.insertCell(5).innerHTML = d.rua
        linha.insertCell(6).innerHTML = d.bairro
        linha.insertCell(7).innerHTML = d.numerocasa

        if (editar == true) {
            let btn = document.createElement('button')
            btn.className = 'btn btn-primary'
            btn.innerHTML = '<i class="fa-solid fa-pen"></i>'
            btn.id = `id_editar_${d.id}`
            btn.onclick = function () {
                let id = this.id.replace('id_editar_', '')
                let funcionario = JSON.parse(localStorage.getItem(id + 'funcionario'))
                BD.GravarFuncionarioEditar(id, funcionario)
                location.href = 'funcionario-editar-interno.html'
            }
            linha.insertCell(8).append(btn)
        } else if (excluir == true) {
            let btn = document.createElement('button')
            btn.className = 'btn btn-danger'
            btn.innerHTML = '<i class="fas fa-times"></i>'
            btn.id = `id_deletar_${d.id}`
            btn.onclick = function () {
                ModificaEstilo3()
                $('#modalConsulta').modal('show')
                let id = this.id.replace('id_deletar_', '')
            }
            linha.insertCell(8).append(btn)
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






