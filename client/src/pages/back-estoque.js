class Estoque {
  constructor(codigo, nome, descricao, precocusto, precovenda, quantidade, data, validade) {
    this.codigo = codigo;
    this.nome = nome;
    this.descricao = descricao;
    this.precocusto = precocusto;
    this.precovenda = precovenda;
    this.quantidade = quantidade;
    this.data = data;
    this.validade = validade;
  }
  validarDadosBanco() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == '' || this[i] == null || this[i] < 0) {
        return false
      }
    }
    return true
  }
}

class BD {
  constructor() {
    let id = localStorage.getItem('id')
    if (id === null) {
      localStorage.setItem('id', 0)
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem('id')
    return parseInt(proximoId) + 1
  }

  GravarEstoque(estoque) {
    let id = this.getProximoId()
    localStorage.setItem(id, JSON.stringify(estoque))
    localStorage.setItem('id', id)
  }

  GravarEstoqueEditar(id, estoque) {
    localStorage.setItem('editar', JSON.stringify(estoque))
    localStorage.setItem('idEditar', JSON.stringify(id))
  }

  RecuperarEstoqueEditar() {
    let estoques = Array()
    let estoque = JSON.parse(localStorage.getItem('editar'))
    estoques.push(estoque)
    return estoques
  }

  retornarvalorcadastradoEditar(estoquealterado) {
    let id = JSON.parse(localStorage.getItem('idEditar'))
    localStorage.setItem(id, JSON.stringify(estoquealterado))
  }

  recuperarTodosRegistros() {
    // ARRAY DE estoques
    let estoques = Array()
    let id = localStorage.getItem('id')

    //recuperar todo o estoque cadastrado em LocalStorage
    for (let i = 1; i <= id; i++) {
      //recuperar estoque
      let estoque = JSON.parse(localStorage.getItem(i))
      // existe a possibilidade de haver indices que foram pulados ou removidos
      // nesses casos nós vamos pular esses indices
      if (estoque === null) {
        continue
      }
      estoque.id = i
      estoques.push(estoque)
    }
    return estoques
  }
  pesquisar(estoque) {
    let EstoqueFiltrado = Array()
    EstoqueFiltrado = this.recuperarTodosRegistros()
    //codigo
    if (estoque.codigo != '') {
      EstoqueFiltrado = EstoqueFiltrado.filter(d => d.codigo == estoque.codigo)
    }
    //nome
    if (estoque.nome != '') {
      EstoqueFiltrado = EstoqueFiltrado.filter(d => d.nome == estoque.nome)
    }
    //descricao
    if (estoque.descricao != '') {
      EstoqueFiltrado = EstoqueFiltrado.filter(d => d.descricao == estoque.descricao)
    }
    //preçocusto
    if (estoque.precocusto != '') {
      EstoqueFiltrado = EstoqueFiltrado.filter(d => d.precocusto == estoque.precocusto)
    }
    //preçovenda
    if (estoque.precovenda != '') {
      EstoqueFiltrado = EstoqueFiltrado.filter(d => d.precovenda == estoque.precovenda)
    }
    //quantidade
    if (estoque.quantidade != '') {
      EstoqueFiltrado = EstoqueFiltrado.filter(d => d.quantidade == estoque.quantidade)
    }
    //data-compra
    if (estoque.data != '') {
      EstoqueFiltrado = EstoqueFiltrado.filter(d => d.data == estoque.data)
    }
    //validade
    if (estoque.validade != '') {
      EstoqueFiltrado = EstoqueFiltrado.filter(d => d.validade == estoque.validade)
    }
    return EstoqueFiltrado
  }
  remover(id) {
    localStorage.removeItem(id)
  }
}

let bd = new BD();

/* Modais */

function modificaEstiloSuccesso() {
  document.getElementById('TituloModal').innerHTML = 'Sucesso'
  document.getElementById('TituloModal').className = 'text-success'
  document.getElementById('descricaoModal').innerHTML = 'O produto foi cadastrado com sucesso !'
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



function CadastrarEstoque() {
  let codigo = document.getElementById('Codigoprod')
  let nome = document.getElementById('Nomeprod')
  let descricao = document.getElementById('Descprod')
  let precocusto = document.getElementById('Custoprod')
  let precovenda = document.getElementById('Vendaprod')
  let quantidade = document.getElementById('Quantprod')
  let data = document.getElementById('Dataprod')
  let validade = document.getElementById('Valprod')

  let estoque = new Estoque(codigo.value, nome.value, descricao.value, precocusto.value, precovenda.value, quantidade.value, data.value, validade.value)
  if (estoque.validarDadosBanco()) {
    bd.GravarEstoque(estoque)
    modificaEstiloSuccesso()
    $('#modalEstoque').modal('show')
  } else {
    modificaEstiloError()
    $('#modalEstoque').modal('show')
  }
}

function carregaListaEstoque(estoque = Array(), filtro = false, editar = false, excluir = false) {
  console.log(filtro)
  if (estoque.length == 0 && filtro == false) {
    estoque = bd.recuperarTodosRegistros()
  }

  // selecionando o elemento tbody da tabela
  let listaEstoque = document.getElementById('listaEstoque')
  listaEstoque.innerHTML = ''

  estoque.forEach(function (d) {
    //criando a linha(tr)
    let linha = listaEstoque.insertRow()

    // criar as colunas(td)
    linha.insertCell(0).innerHTML = d.codigo
    linha.insertCell(1).innerHTML = d.nome
    linha.insertCell(2).innerHTML = d.precovenda
    linha.insertCell(3).innerHTML = d.quantidade
    linha.insertCell(4).innerHTML = d.data
    linha.insertCell(5).innerHTML = d.validade
    if (editar == true) {
      let btn = document.createElement('button')
      btn.className = 'btn btn-primary'
      btn.innerHTML = '<i class="fa-solid fa-pen"></i>'
      btn.id = `id_editar_${d.id}`
      btn.onclick = function () {
        let id = this.id.replace('id_editar_', '')
        let estoque = JSON.parse(localStorage.getItem(id))
        bd.GravarEstoqueEditar(id, estoque)
        location.href = 'estoque-interno.html'
      }
      linha.insertCell(6).append(btn)
    } else if (excluir == true) {
      let btn = document.createElement('button')
      btn.className = 'btn btn-danger'
      btn.innerHTML = '<i class="fas fa-times"></i>'
      btn.id = `id_deletar_${d.id}`
      btn.onclick = function () {
        // ModificaEstilo3()
        //  $('#modalConsulta').modal('show')
        let id = this.id.replace('id_deletar_', '')
        bd.remover(id)
        window.location.reload()
      }
      linha.insertCell(6).append(btn)
    }
  })
}

function PesquisarEstoque() {
  let codigo = document.getElementById('Codigoprod').value
  let nome = document.getElementById('Nomeprod').value
  let descricao = document.getElementById('Descprod').value
  let precocusto = document.getElementById('Custoprod').value
  let precovenda = document.getElementById('Vendaprod').value
  let quantidade = document.getElementById('Quantprod').value
  let data = document.getElementById('Dataprod').value
  let validade = document.getElementById('Valprod').value

  let estoque = new Estoque(codigo, nome, descricao, precocusto, precovenda, quantidade, data, validade)
  let EstoqueFiltrado = bd.pesquisar(estoque)
  carregaListaEstoque(EstoqueFiltrado, true)
}

function PesquisarEstoqueExcluir() {
  let codigo = document.getElementById('Codigoprod').value
  let nome = document.getElementById('Nomeprod').value
  let descricao = document.getElementById('Descprod').value
  let precocusto = document.getElementById('Custoprod').value
  let precovenda = document.getElementById('Vendaprod').value
  let quantidade = document.getElementById('Quantprod').value
  let data = document.getElementById('Dataprod').value
  let validade = document.getElementById('Valprod').value

  let estoque = new Estoque(codigo, nome, descricao, precocusto, precovenda, quantidade, data, validade)
  let EstoqueExcluirFiltrado = bd.pesquisar(estoque)
  carregaListaEstoque(EstoqueExcluirFiltrado, true, false, true)
}

function PesquisarEstoqueEditar() {
  let codigo = document.getElementById('Codigoprod').value
  let nome = document.getElementById('Nomeprod').value
  let descricao = document.getElementById('Descprod').value
  let precocusto = document.getElementById('Custoprod').value
  let precovenda = document.getElementById('Vendaprod').value
  let quantidade = document.getElementById('Quantprod').value
  let data = document.getElementById('Dataprod').value
  let validade = document.getElementById('Valprod').value

  let estoque = new Estoque(codigo, nome, descricao, precocusto, precovenda, quantidade, data, validade)
  let EstoqueEditarFiltrado = bd.pesquisar(estoque)
  console.log(EstoqueEditarFiltrado)
  carregaListaEstoque(EstoqueEditarFiltrado, true, true, false)
}


function preencherEditar() {
  let estoque = Array()
  estoque = bd.RecuperarEstoqueEditar()
  estoque.forEach(function (e) {
    document.getElementById('CodigoprodEditarInterno').value = e.codigo
    document.getElementById('NomeprodEditarInterno').value = e.nome
    document.getElementById('DescprodEditarInterno').value = e.descricao
    document.getElementById('CustoprodEditarInterno').value = e.precocusto
    document.getElementById('VendaprodEditarInterno').value = e.precovenda
    document.getElementById('QuantprodEditarInterno').value = e.quantidade
    document.getElementById('DataprodEditarInterno').value = e.data
    document.getElementById('ValprodEditarInterno').value = e.validade
  })

}

function CadastrarEditado() {
  let codigo = document.getElementById('CodigoprodEditarInterno')
  let nome = document.getElementById('NomeprodEditarInterno')
  let descricao = document.getElementById('DescprodEditarInterno')
  let precocusto = document.getElementById('CustoprodEditarInterno')
  let precovenda = document.getElementById('VendaprodEditarInterno')
  let quantidade = document.getElementById('QuantprodEditarInterno')
  let data = document.getElementById('DataprodEditarInterno')
  let validade = document.getElementById('ValprodEditarInterno')

  let estoque = new Estoque(codigo.value, nome.value, descricao.value, precocusto.value, precovenda.value, quantidade.value, data.value, validade.value)
  bd.retornarvalorcadastradoEditar(estoque)
  location.href = 'estoque-editar.html'
}

