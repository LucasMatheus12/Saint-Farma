class VendaAPrazo {
    constructor(quantidade,codigo,valorapagar,datacompra,dataapagar,parcelas,formapagamento,cpfcliente,nomefuncionario) {
    this.quantidade = quantidade;
    this.codigo = codigo;
    this.valorapagar = valorapagar;
    this.datacompra = datacompra;
    this.dataapagar = dataapagar;
    this.parcelas = parcelas;
    this.formapagamento = formapagamento;
    this.cpfcliente = cpfcliente;
    this.nomefuncionario = nomefuncionario;
  }
}

class BD {
    constructor() {
        let idVendaAPrazo = localStorage.getItem('idVendaAPrazo')
            if(idVendaAPrazo === null) {
              localStorage.setItem('idVendaAPrazo',0 +'vendaAPrazo')
            } 
       }
    
       getProximoId() {
        let proximoIdVenda = localStorage.getItem('idVendaAPrazo') 
        return parseInt(proximoIdVenda) + 1 + 'vendaAPrazo'
    }
    
       GravarVendaAPrazo(vendaaprazo) {
        let idVendaAPrazo = this.getProximoId()
        localStorage.setItem(idVendaAPrazo,JSON.stringify(vendaaprazo))
        localStorage.setItem('idVendaAPrazo',idVendaAPrazo)
       }

       GravarVendaAPrazoEditar(id,vendaaprazo) {
        localStorage.setItem('editarVendaAPrazo',JSON.stringify(vendaaprazo))
        localStorage.setItem('idEditarVendaAPrazo',JSON.stringify(id + 'vendaAPrazo'))
       }

       RecuperarVendaAPrazoEditar() {
        let vendasaprazo = Array()
        let vendaaprazo = JSON.parse(localStorage.getItem('editarVendaAPrazo'))
        vendasaprazo.push(vendaaprazo)
        return vendasaprazo
       }
       
       retornarvalorcadastradoEditar(vendaaprazoalterada) {
          let id = JSON.parse(localStorage.getItem('idEditarVendaAPrazo'))
          localStorage.setItem(id,JSON.stringify(vendaaprazoalterada))
       }

       recuperarTodosRegistros() {
        // ARRAY DE vendas
       let vendasaprazo = Array()
       let id = localStorage.getItem('idVendaAPrazo')
       let idreplace = id.replace('vendaAPrazo', '')
       //recuperar todo o estoque cadastrado em LocalStorage
       for(let i=1;i <= idreplace;i++) {
         //recuperar estoque
         let venda = JSON.parse(localStorage.getItem(i+'vendaAPrazo'))
         // existe a possibilidade de haver indices que foram pulados ou removidos
         // nesses casos nós vamos pular esses indices
         if(venda === null) {
           continue
         }
         venda.id = i
         vendasaprazo.push(venda)
       }
       return vendasaprazo
    } 
       pesquisar(vendaaprazo) {
       let VendaAPrazoFiltrada = Array() 
       VendaAPrazoFiltrada = this.recuperarTodosRegistros()
       //codigo
       if(vendaaprazo.quantidade != ''){
        VendaAPrazoFiltrada = VendaAPrazoFiltrada.filter(d => d.quantidade == vendaaprazo.quantidade)
       }
       //nome
       if(vendaaprazo.codigo != ''){
        VendaAPrazoFiltrada = VendaAPrazoFiltrada.filter(d => d.codigo == vendaaprazo.codigo)
       }
       //descricao
       if(vendaaprazo.valorapagar != ''){
        VendaAPrazoFiltrada = VendaAPrazoFiltrada.filter(d => d.valorapagar == vendaaprazo.valorapagar)
       }
       //preçocusto
       if(vendaaprazo.datacompra != ''){
        VendaAPrazoFiltrada = VendaAPrazoFiltrada.filter(d => d.datacompra == vendaaprazo.datacompra)
       }
       //preçovenda
       if(vendaaprazo.dataapagar != ''){
        VendaAPrazoFiltrada = VendaAPrazoFiltrada.filter(d => d.dataapagar == vendaaprazo.dataapagar)
       }
       if(vendaaprazo.parcelas != ''){
        VendaAPrazoFiltrada = VendaAPrazoFiltrada.filter(d => d.parcelas == vendaaprazo.parcelas)
       }
       if(vendaaprazo.formapagamento != ''){
        VendaAPrazoFiltrada = VendaAPrazoFiltrada.filter(d => d.formapagamento == vendaaprazo.formapagamento)
       }
       if(vendaaprazo.cpfcliente != ''){
        VendaAPrazoFiltrada = VendaAPrazoFiltrada.filter(d => d.cpfcliente == vendaaprazo.cpfcliente)
       }
       if(vendaaprazo.nomefuncionario != ''){
        VendaAPrazoFiltrada = VendaAPrazoFiltrada.filter(d => d.nomefuncionario == vendaaprazo.nomefuncionario)
       }
       return VendaAPrazoFiltrada
      }
      recuperarTodosRegistrosEstoque() {
        // ARRAY DE estoques
       let estoques = Array()
       let id = localStorage.getItem('id')
       
       //recuperar todo o estoque cadastrado em LocalStorage
       for(let i=1;i <= id;i++) {
         //recuperar estoque
         let estoque = JSON.parse(localStorage.getItem(i))
         // existe a possibilidade de haver indices que foram pulados ou removidos
         // nesses casos nós vamos pular esses indices
         if(estoque === null) {
           continue
         }
         estoque.id = i
         estoques.push(estoque)
       }
       return estoques
    }

     diminuirEstoque(codigo,quantidade) {
      let estoque = Array()
      estoque = this.recuperarTodosRegistrosEstoque()
      estoque.forEach(function(e) {
          if(e.codigo == codigo) {
            let id = localStorage.getItem('id')
            e.quantidade -= quantidade
            localStorage.setItem(id,JSON.stringify(e))
          }
      })
     }
     remover(id) {
      localStorage.removeItem(id)
    }
}

let bd = new BD();

function CadastrarVendaAPrazo() {
    let quantidade = document.getElementById('Quantidadevendaaprazo')
    let codigo = document.getElementById('Codigoprodutovendaaprazo')
    let valorapagar = document.getElementById('Valorvendaaprazo')
    let datacompra = document.getElementById('Datavendaprazocompra')
    let dataapagar = document.getElementById('Datavendaaprazo')
    let parcelas = document.getElementById('Parcelasvendaaprazo')
    let tipopagamento = document.getElementById('tipopagamentoVendaAPrazo')
    let cpfcliente = document.getElementById('CPFvendaaprazo')
    let nomefuncionario = document.getElementById('Funcionariovendaaprazo')

    let vendaaprazo = new VendaAPrazo(quantidade.value,codigo.value,valorapagar.value,datacompra.value,dataapagar.value,parcelas.value,tipopagamento.value,cpfcliente.value,nomefuncionario.value)

    bd.GravarVendaAPrazo(vendaaprazo)
    DiminuirQuantidadeDoEstoque(codigo.value,quantidade.value)
    window.location.reload()
}

function carregaListaVendaAPrazo(vendaaprazo = Array(),filtro = false,editar = false, excluir = false) {

	if(vendaaprazo.length == 0 && filtro == false) {
	vendaaprazo = bd.recuperarTodosRegistros()
    }

    // selecionando o elemento tbody da tabela
	let listaVendaAPrazo = document.getElementById('listaVendaAPrazo')
	listaVendaAPrazo.innerHTML = ''

	vendaaprazo.forEach(function(d) {
        //criando a linha(tr)
         let linha = listaVendaAPrazo.insertRow()

         // criar as colunas(td)
         
         linha.insertCell(0).innerHTML = d.codigo
         linha.insertCell(1).innerHTML = d.quantidade
         linha.insertCell(2).innerHTML = d.datacompra
         linha.insertCell(3).innerHTML = d.dataapagar
         switch(d.formapagamento) {
            case '1': d.formapagamento = 'Cartão'
                break
            case '2': d.formapagamento = 'Pix'
                break
            case '3': d.formapagamento = 'Dinheiro'
                break
        }
         linha.insertCell(4).innerHTML = d.formapagamento
         linha.insertCell(5).innerHTML = d.valorapagar
         linha.insertCell(6).innerHTML = d.parcelas
         if(editar == true) {
          let btn = document.createElement('button')
          btn.className = 'btn btn-primary'
          btn.innerHTML = '<i class="fa-solid fa-pen"></i>'
          btn.id = `id_editar_${d.id}`
          btn.onclick = function() {
            let id = this.id.replace('id_editar_','')
            let vendaaprazo = JSON.parse(localStorage.getItem(id + 'vendaAPrazo'))
            bd.GravarVendaAPrazoEditar(id,vendaaprazo)
            location.href = 'venda-a-prazo-interno.html'
          }
          linha.insertCell(7).append(btn) 
         }else if(excluir == true) {
          let btn = document.createElement('button')
          btn.className = 'btn btn-danger'
          btn.innerHTML = '<i class="fas fa-times"></i>'
          btn.id = `id_deletar_${d.id}vendaAPrazo`
          btn.onclick = function() {
            //ModificaEstilo3()
             //$('#modalConsulta').modal('show')
            let id = this.id.replace('id_deletar_','')
            bd.remover(id)
          }
          linha.insertCell(7).append(btn) 
         }
	})
}

function PesquisarVendaAPrazo() {
    let quantidade = document.getElementById('Quantidadevendaaprazo')
    let codigo = document.getElementById('Codigoprodutovendaaprazo')
    let valorapagar = document.getElementById('Valorvendaaprazo')
    let datacompra = document.getElementById('Datavendaprazocompra')
    let dataapagar = document.getElementById('Datavendaaprazo')
    let parcelas = document.getElementById('Parcelasvendaaprazo')
    let tipopagamento = document.getElementById('tipopagamentoVendaAPrazo')
    let cpfcliente = document.getElementById('CPFvendaaprazo')
    let nomefuncionario = document.getElementById('Funcionariovendaaprazo')

  let vendaaprazo = new VendaAPrazo('','',valorapagar.value,datacompra.value,dataapagar.value,parcelas.value,tipopagamento.value,cpfcliente.value,nomefuncionario.value)
  console.log(vendaaprazo)
  let VendaAPrazoFiltrada = bd.pesquisar(vendaaprazo)
  carregaListaVendaAPrazo(VendaAPrazoFiltrada,true)
}

function PesquisarVendaAPrazoExcluir() {
  let quantidade = document.getElementById('Quantidadevendaaprazo')
  let codigo = document.getElementById('Codigoprodutovendaaprazo')
  let valorapagar = document.getElementById('Valorvendaaprazo')
  let datacompra = document.getElementById('Datavendaprazocompra')
  let dataapagar = document.getElementById('Datavendaaprazo')
  let parcelas = document.getElementById('Parcelasvendaaprazo')
  let tipopagamento = document.getElementById('tipopagamentoVendaAPrazo')
  let cpfcliente = document.getElementById('CPFvendaaprazo')
  let nomefuncionario = document.getElementById('Funcionariovendaaprazo')

let vendaaprazo = new VendaAPrazo('','',valorapagar.value,datacompra.value,dataapagar.value,parcelas.value,tipopagamento.value,cpfcliente.value,nomefuncionario.value)

  let VendaAPrazoExcluirFiltrada = bd.pesquisar(vendaaprazo)
  carregaListaVendaAPrazo(VendaAPrazoExcluirFiltrada,true,false,true)
}

function PesquisarVendaAPrazoEditar() {
  let quantidade = document.getElementById('Quantidadevendaaprazo')
  let codigo = document.getElementById('Codigoprodutovendaaprazo')
  let valorapagar = document.getElementById('Valorvendaaprazo')
  let datacompra = document.getElementById('Datavendaprazocompra')
  let dataapagar = document.getElementById('Datavendaaprazo')
  let parcelas = document.getElementById('Parcelasvendaaprazo')
  let tipopagamento = document.getElementById('tipopagamentoVendaAPrazo')
  let cpfcliente = document.getElementById('CPFvendaaprazo')
  let nomefuncionario = document.getElementById('Funcionariovendaaprazo')

let vendaaprazo = new VendaAPrazo('','',valorapagar.value,datacompra.value,dataapagar.value,parcelas.value,tipopagamento.value,cpfcliente.value,nomefuncionario.value)

  let VendaAPrazoEditarFiltrada = bd.pesquisar(vendaaprazo)
  carregaListaVendaAPrazo(VendaAPrazoEditarFiltrada,true,true,false)
}


function preencherEditar() {
  let vendaaprazo = Array()
  vendaaprazo = bd.RecuperarVendaAPrazoEditar()
  console.log(vendaaprazo)
  vendaaprazo.forEach(function (e) {
    document.getElementById('QuantidadevendaaprazoInterno').value = e.quantidade
    document.getElementById('CodigoprodutovendaaprazoInterno').value = e.codigo
    document.getElementById('ValorvendaaprazoInterno').value = e.valorapagar
    document.getElementById('DatavendaprazocompraInterno').value = e.datacompra
    document.getElementById('DatavendaaprazoInterno').value = e.dataapagar
    document.getElementById('ParcelasvendaaprazoInterno').value = e.parcelas
    document.getElementById('tipopagamentoInterno').value = e.formapagamento
    document.getElementById('CPFvendaaprazoInterno').value = e.cpfcliente
    document.getElementById('FuncionariovendaaprazoInterno').value = e.nomefuncionario
  })
 
}

function CadastrarEditado() {
  let quantidadevendaaprazointerna =  document.getElementById('QuantidadevendaaprazoInterno')
  let codigovendaaprazointerna =   document.getElementById('CodigoprodutovendaaprazoInterno')
  let valorvendavendaaprazointerna =   document.getElementById('ValorvendaaprazoInterno')
  let datavendaaprazocomprainterna =   document.getElementById('DatavendaprazocompraInterno')
  let  datavendaaprazointerno =   document.getElementById('DatavendaaprazoInterno')
  let parcelasvendaaprazointerna =   document.getElementById('ParcelasvendaaprazoInterno')
  let tipopagamentovendaaprazointerna =   document.getElementById('tipopagamentoInterno')
  let cpfvendaaprazointerna =   document.getElementById('CPFvendaaprazoInterno')
  let funcionariovendaaprazointerna =   document.getElementById('FuncionariovendaaprazoInterno')

    let vendaaprazo = new VendaAPrazo(quantidadevendaaprazointerna.value,codigovendaaprazointerna.value,valorvendavendaaprazointerna.value,datavendaaprazocomprainterna.value,datavendaaprazointerno.value,parcelasvendaaprazointerna.value,tipopagamentovendaaprazointerna.value,cpfvendaaprazointerna.value,funcionariovendaaprazointerna.value)
    bd.retornarvalorcadastradoEditar(vendaaprazo)
    location.href = 'venda-a-prazo-editar.html'
  }

  function DiminuirQuantidadeDoEstoque(codigo,quantidade) {
    bd.diminuirEstoque(codigo,quantidade)
 }