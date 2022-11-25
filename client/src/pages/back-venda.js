class Venda {
  constructor(quantidade, codigo, valorapagar, datacompra, formapagamento, desconto, cpfcliente, nomefuncionario) {
    this.quantidade = quantidade;
    this.codigo = codigo;
    this.valorapagar = valorapagar;
    this.datacompra = datacompra;
    this.formapagamento = formapagamento;
    this.desconto = desconto;
    this.cpfcliente = cpfcliente;
    this.nomefuncionario = nomefuncionario;
  }
}

class BD {
  constructor() {
    let idVenda = localStorage.getItem('idVenda')
    if (idVenda === null) {
      localStorage.setItem('idVenda', 0 + 'venda')
    }
  }

  getProximoId() {
    let proximoIdVenda = localStorage.getItem('idVenda')
    return parseInt(proximoIdVenda) + 1 + 'venda'
  }

  GravarVenda(venda) {
    let idVenda = this.getProximoId()
    localStorage.setItem(idVenda, JSON.stringify(venda))
    localStorage.setItem('idVenda', idVenda)
  }

  GravarVendaEditar(id, venda) {
    localStorage.setItem('editarVenda', JSON.stringify(venda))
    localStorage.setItem('idEditarVenda', JSON.stringify(id + 'venda'))
  }

  RecuperarVendaEditar() {
    let vendas = Array()
    let venda = JSON.parse(localStorage.getItem('editarVenda'))
    vendas.push(venda)
    return vendas
  }

  retornarvalorcadastradoEditar(vendaalterada) {
    let id = JSON.parse(localStorage.getItem('idEditarVenda'))
    localStorage.setItem(id, JSON.stringify(vendaalterada))
  }

  recuperarTodosRegistros() {
    // ARRAY DE vendas
    let vendas = Array()
    let id = localStorage.getItem('idVenda')
    let idreplace = id.replace('venda', '')
    //recuperar todo o estoque cadastrado em LocalStorage
    for (let i = 1; i <= idreplace; i++) {
      //recuperar estoque
      let venda = JSON.parse(localStorage.getItem(i + 'venda'))
      // existe a possibilidade de haver indices que foram pulados ou removidos
      // nesses casos nós vamos pular esses indices
      if (venda === null) {
        continue
      }
      venda.id = i
      vendas.push(venda)
    }
    return vendas
  }
  pesquisar(venda) {
    let VendaFiltrada = Array()
    VendaFiltrada = this.recuperarTodosRegistros()
    //codigo
    if (venda.valorapagar != '') {
      VendaFiltrada = VendaFiltrada.filter(d => d.valorapagar == venda.valorapagar)
    }
    //nome
    if (venda.datacompra != '') {
      VendaFiltrada = VendaFiltrada.filter(d => d.datacompra == venda.datacompra)
    }
    //descricao
    if (venda.formapagamento != '') {
      VendaFiltrada = VendaFiltrada.filter(d => d.formapagamento == venda.formapagamento)
    }
    //preçocusto
    if (venda.cpfcliente != '') {
      VendaFiltrada = VendaFiltrada.filter(d => d.cpfcliente == venda.cpfcliente)
    }
    //preçovenda
    if (venda.nomefuncionario != '') {
      VendaFiltrada = VendaFiltrada.filter(d => d.nomefuncionario == venda.nomefuncionario)
    }
    console.log(VendaFiltrada)
    return VendaFiltrada
  }
  recuperarTodosRegistrosEstoque() {
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

  diminuirEstoque(codigo, quantidade) {
    let estoque = Array()
    estoque = this.recuperarTodosRegistrosEstoque()
    estoque.forEach(function (e) {
      if (e.codigo == codigo) {
        let id = localStorage.getItem('id')
        e.quantidade -= quantidade
        localStorage.setItem(id, JSON.stringify(e))
      }
    })
  }
  remover(id) {
    localStorage.removeItem(id)
  }
}

let bd = new BD();

function CadastrarVenda() {
  let quantidade = document.getElementById('Quantidadevenda')
  let codigo = document.getElementById('Codigoprodutovenda')
  let valorapagar = document.getElementById('Valorvenda')
  let datacompra = document.getElementById('Datavenda')
  let formapagamento = document.getElementById('tipopagamento')
  let desconto = document.getElementById('Descontovenda')
  let cpfcliente = document.getElementById('CPFvenda')
  let nomefuncionario = document.getElementById('Funcionariovenda')
  let valorDesconto = desconto.value * valorapagar.value / 100
  let venda = new Venda(quantidade.value, codigo.value, valorapagar.value - valorDesconto, datacompra.value, formapagamento.value, desconto.value, cpfcliente.value, nomefuncionario.value)

  bd.GravarVenda(venda)
  DiminuirQuantidadeDoEstoque(codigo.value, quantidade.value)
  window.location.reload()
}

function carregaListaVenda(venda = Array(), filtro = false, editar = false, excluir = false) {

  if (venda.length == 0 && filtro == false) {
    venda = bd.recuperarTodosRegistros()
  }

  // selecionando o elemento tbody da tabela
  let listaVenda = document.getElementById('listaVenda')
  listaVenda.innerHTML = ''

  venda.forEach(function (d) {
    //criando a linha(tr)
    let linha = listaVenda.insertRow()

    // criar as colunas(td)
    linha.insertCell(0).innerHTML = d.codigo
    linha.insertCell(1).innerHTML = d.quantidade
    linha.insertCell(2).innerHTML = d.datacompra
    switch (d.formapagamento) {
      case '1': d.formapagamento = 'Cartão'
        break
      case '2': d.formapagamento = 'Pix'
        break
      case '3': d.formapagamento = 'Dinheiro'
        break
    }
    linha.insertCell(3).innerHTML = d.formapagamento
    linha.insertCell(4).innerHTML = d.valorapagar
    linha.insertCell(5).innerHTML = d.desconto
    if (editar == true) {
      let btn = document.createElement('button')
      btn.className = 'btn btn-primary'
      btn.innerHTML = '<i class="fa-solid fa-pen"></i>'
      btn.id = `id_editar_${d.id}`
      btn.onclick = function () {
        let id = this.id.replace('id_editar_', '')
        let venda = JSON.parse(localStorage.getItem(id + 'venda'))
        bd.GravarVendaEditar(id, venda)
        location.href = 'venda-interno.html'
      }
      linha.insertCell(6).append(btn)
    } else if (excluir == true) {
      let btn = document.createElement('button')
      btn.className = 'btn btn-danger'
      btn.innerHTML = '<i class="fas fa-times"></i>'
      btn.id = `id_deletar_${d.id}venda`
      btn.onclick = function () {
        //ModificaEstilo3()
        // $('#modalConsulta').modal('show')
        let id = this.id.replace('id_deletar_', '')
        bd.remover(id)
        window.location.reload()
      }
      linha.insertCell(6).append(btn)
    }
  })
}

function PesquisarVenda() {
  let valorapagar = document.getElementById('Valorvenda').value
  let datacompra = document.getElementById('Datavenda').value
  let formapagamento = document.getElementById('tipopagamento').value
  let cpfcliente = document.getElementById('CPFvenda').value
  let nomefuncionario = document.getElementById('Funcionariovenda').value

  let venda = new Venda('', '', valorapagar, datacompra, formapagamento, '', cpfcliente, nomefuncionario)
  console.log(venda)
  let VendaFiltrada = bd.pesquisar(venda)
  carregaListaVenda(VendaFiltrada, true)
}

function PesquisarVendaExcluir() {
  let valorapagar = document.getElementById('Valorvenda').value
  let datacompra = document.getElementById('Datavenda').value
  let formapagamento = document.getElementById('tipopagamento').value
  let cpfcliente = document.getElementById('CPFvenda').value
  let nomefuncionario = document.getElementById('Funcionariovenda').value

  let venda = new Venda('', '', valorapagar, datacompra, formapagamento, '', cpfcliente, nomefuncionario)
  let VendaExcluirFiltrada = bd.pesquisar(venda)
  carregaListaVenda(VendaExcluirFiltrada, true, false, true)
}

function PesquisarVendaEditar() {
  let valorapagar = document.getElementById('Valorvenda').value
  let datacompra = document.getElementById('Datavenda').value
  let formapagamento = document.getElementById('tipopagamento').value
  let cpfcliente = document.getElementById('CPFvenda').value
  let nomefuncionario = document.getElementById('Funcionariovenda').value

  let venda = new Venda('', '', valorapagar, datacompra, formapagamento, '', cpfcliente, nomefuncionario)
  let VendaEditarFiltrada = bd.pesquisar(venda)
  carregaListaVenda(VendaEditarFiltrada, true, true, false)
}


function preencherEditar() {
  let venda = Array()
  venda = bd.RecuperarVendaEditar()
  venda.forEach(function (e) {
    document.getElementById('Quantidadevendainterno').value = e.quantidade
    document.getElementById('Codigoprodutovendainterno').value = e.codigo
    document.getElementById('Valorvendainterno').value = e.valorapagar
    document.getElementById('Datavendainterno').value = e.datacompra
    document.getElementById('tipopagamentointerno').value = e.formapagamento
    document.getElementById('Descontovendainterno').value = e.desconto
    document.getElementById('CPFvendainterno').value = e.cpfcliente
    document.getElementById('Funcionariovendainterno').value = e.nomefuncionario
  })

}

function CadastrarEditado() {
  let quantidadevenda = document.getElementById('Quantidadevendainterno')
  let codigoproduto = document.getElementById('Codigoprodutovendainterno')
  let valorvenda = document.getElementById('Valorvendainterno')
  let datavenda = document.getElementById('Datavendainterno')
  let tipopagamento = document.getElementById('tipopagamentointerno')
  let descontovenda = document.getElementById('Descontovendainterno')
  let cpfvenda = document.getElementById('CPFvendainterno')
  let funcionariovenda = document.getElementById('Funcionariovendainterno')

  let venda = new Venda(quantidadevenda.value, codigoproduto.value, valorvenda.value, datavenda.value, tipopagamento.value, descontovenda.value, cpfvenda.value, funcionariovenda.value)
  bd.retornarvalorcadastradoEditar(venda)
  location.href = 'venda-editar.html'
}

function DiminuirQuantidadeDoEstoque(codigo, quantidade) {
  bd.diminuirEstoque(codigo, quantidade)
}