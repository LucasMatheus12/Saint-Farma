class Cliente {
  constructor(nome, telefone, cpf, cidade, referencia, rua, bairro, numerocasa) {
    this.nome = nome;
    this.telefone = telefone;
    this.cpf = cpf;
    this.cidade = cidade;
    this.referencia = referencia;
    this.rua = rua;
    this.bairro = bairro;
    this.numerocasa = numerocasa;
  }
}

class BD {
  constructor() {
    let idCliente = localStorage.getItem('idCliente')
    if (idCliente === null) {
      localStorage.setItem('idCliente', 0 + 'cliente')
    }
  }

  getProximoId() {
    let proximoIdCliente = localStorage.getItem('idCliente')
    return parseInt(proximoIdCliente) + 1 + 'cliente'
  }

  GravarCliente(cliente) {
    let idCliente = this.getProximoId()
    localStorage.setItem(idCliente, JSON.stringify(cliente))
    localStorage.setItem('idCliente', idCliente)
  }

  GravarClienteEditar(id, cliente) {
    localStorage.setItem('editarCliente', JSON.stringify(cliente))
    localStorage.setItem('idEditarCliente', JSON.stringify(id + 'cliente'))
  }

  RecuperarClienteEditar() {
    let clientes = Array()
    let cliente = JSON.parse(localStorage.getItem('editarCliente'))
    clientes.push(cliente)
    return clientes
  }

  retornarvalorcadastradoEditar(clientealterado) {
    let id = JSON.parse(localStorage.getItem('idEditarCliente'))
    localStorage.setItem(id, JSON.stringify(clientealterado))
  }

  recuperarTodosRegistrosCliente() {
    // ARRAY DE clientes
    let clientes = Array()
    let id = localStorage.getItem('idCliente')
    let idreplace = id.replace('cliente', '')
    //recuperar todo o estoque cadastrado em LocalStorage
    for (let i = 1; i <= idreplace; i++) {
      //recuperar clientes
      let cliente = JSON.parse(localStorage.getItem(i + 'cliente'))
      // existe a possibilidade de haver indices que foram pulados ou removidos
      // nesses casos nós vamos pular esses indices
      if (cliente === null) {
        continue
      }
      cliente.id = i
      clientes.push(cliente)
    }
    return clientes
  }
  pesquisar(cliente) {
    let ClienteFiltrado = Array()
    ClienteFiltrado = this.recuperarTodosRegistrosCliente()
    //nome
    if (cliente.nome != '') {
      ClienteFiltrado = ClienteFiltrado.filter(d => d.nome == cliente.nome)
    }
    //telefone
    if (cliente.telefone != '') {
      ClienteFiltrado = ClienteFiltrado.filter(d => d.telefone == cliente.telefone)
    }
    //cpf
    if (cliente.cpf != '') {
      ClienteFiltrado = ClienteFiltrado.filter(d => d.cpf == cliente.cpf)
    }
    return ClienteFiltrado
  }

}

let bd = new BD();

function CadastrarCliente() {
  let nome = document.getElementById('Nomecliente')
  let telefone = document.getElementById('Telefonecliente')
  let cpf = document.getElementById('CPFcliente')
  let cidade = document.getElementById('Cidadecliente')
  let referencia = document.getElementById('Referenciacliente')
  let rua = document.getElementById('Ruacliente')
  let bairro = document.getElementById('Bairrocliente')
  let numerocasa = document.getElementById('Numerocliente')

  let cliente = new Cliente(nome.value, telefone.value, cpf.value, cidade.value, referencia.value, rua.value, bairro.value, numerocasa.value)

  bd.GravarCliente(cliente)
}

function carregaListaCliente(cliente = Array(), filtro = false, editar = false, excluir = false) {
  if (cliente.length == 0 && filtro == false) {
    cliente = bd.recuperarTodosRegistrosCliente()
  }

  // selecionando o elemento tbody da tabela
  let listaCliente = document.getElementById('listaCliente')
  listaCliente.innerHTML = ''

  cliente.forEach(function (d) {
    //criando a linha(tr)
    let linha = listaCliente.insertRow()

    // criar as colunas(td)
    linha.insertCell(0).innerHTML = d.nome
    linha.insertCell(1).innerHTML = d.telefone
    linha.insertCell(2).innerHTML = d.cpf
    linha.insertCell(3).innerHTML = d.cidade
    linha.insertCell(4).innerHTML = d.rua
    linha.insertCell(5).innerHTML = d.bairro
    linha.insertCell(6).innerHTML = d.numerocasa
    if (editar == true) {
      let btn = document.createElement('button')
      btn.className = 'btn btn-primary'
      btn.innerHTML = '<i class="fa-solid fa-pen"></i>'
      btn.id = `id_editar_${d.id}`
      btn.onclick = function () {
        let id = this.id.replace('id_editar_', '')
        let cliente = JSON.parse(localStorage.getItem(id + 'cliente'))
        bd.GravarClienteEditar(id, cliente)
        location.href = 'cliente-interno.html'
      }
      linha.insertCell(7).append(btn)
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
      linha.insertCell(7).append(btn)
    }
  })
}

function PesquisarCliente() {
  let nome = document.getElementById('NomeCliente')
  let telefone = document.getElementById('TelefoneCliente')
  let cpf = document.getElementById('CPFCliente')

  let cliente = new Cliente(nome.value, telefone.value, cpf.value)

  let ClienteFiltrado = bd.pesquisar(cliente)
  carregaListaCliente(ClienteFiltrado, true)
}

function PesquisarClienteExcluir() {
  let nome = document.getElementById('NomeCliente').value
  let telefone = document.getElementById('TelefoneCliente').value
  let cpf = document.getElementById('CPFCliente').value

  let cliente = new Cliente(nome, telefone, cpf)
  let ClienteExcluirFiltrado = bd.pesquisar(cliente)
  carregaListaCliente(ClienteExcluirFiltrado, true, false, true)
}

function PesquisarClienteEditar() {
  let nome = document.getElementById('NomeCliente')
  let telefone = document.getElementById('TelefoneCliente')
  let cpf = document.getElementById('CPFcliente')
  let cliente = new Cliente(nome.value, telefone.value, cpf.value)
  let ClienteEditarFiltrado = bd.pesquisar(cliente)
  carregaListaCliente(ClienteEditarFiltrado, true, true, false)
}


function preencherEditar() {
  let cliente = Array()
  cliente = bd.RecuperarClienteEditar()
  cliente.forEach(function (e) {
    document.getElementById('NomeclienteEditar').value = e.nome
    document.getElementById('TelefoneclienteEditar').value = e.telefone
    document.getElementById('CPFclienteEditar').value = e.cpf
    document.getElementById('CidadeclienteEditar').value = e.cidade
    document.getElementById('ReferenciaclienteEditar').value = e.referencia
    document.getElementById('RuaclienteEditar').value = e.rua
    document.getElementById('BairroclienteEditar').value = e.bairro
    document.getElementById('NumeroclienteEditar').value = e.numerocasa
  })

}

function CadastrarEditado() {
  let nome = document.getElementById('NomeclienteEditar')
  let telefone = document.getElementById('TelefoneclienteEditar')
  let cpf = document.getElementById('CPFclienteEditar')
  let cidade = document.getElementById('CidadeclienteEditar')
  let referencia = document.getElementById('ReferenciaclienteEditar')
  let rua = document.getElementById('RuaclienteEditar')
  let bairro = document.getElementById('BairroclienteEditar')
  let numerocasa = document.getElementById('NumeroclienteEditar')

  let cliente = new Cliente(nome.value, telefone.value, cpf.value, cidade.value, referencia.value, rua.value, bairro.value, numerocasa.value)
  bd.retornarvalorcadastradoEditar(cliente)
  location.href = 'cliente-editar.html'
} 