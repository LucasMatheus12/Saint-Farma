
class BD {
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

    pesquisa(condicao, data) {
        let vendas = Array()
        let resultado = Array()
        vendas = this.recuperarTodosRegistros()
        if (condicao == 1) {
            vendas.forEach(function (d) {
                let datavenda = d.datacompra
                let replace3 = datavenda.slice(0, 2)
                if (replace3 == data) {
                    resultado.push(d)
                }
            })
        }
        if (condicao == 2) {
            vendas.forEach(function (d) {
                let datavenda = d.datacompra
                let replace3 = datavenda.slice(3, 5)
                if (replace3 == data) {
                    resultado.push(d)
                }
            })
        }
        if (condicao == 3) {
            vendas.forEach(function (d) {
                let datavenda = d.datacompra
                let replace3 = datavenda.slice(6, 10)
                if (replace3 == data) {
                    resultado.push(d)
                }
            })

        }
        return resultado

    }
}

let bd = new BD()

function carregaListaRelatorio(relatorio = Array()) {

    // selecionando o elemento tbody da tabela
    let listaRelatorio = document.getElementById('listaRelatorio')
    listaRelatorio.innerHTML = ''

    relatorio.forEach(function (d) {
        //criando a linha(tr)
        let linha = listaRelatorio.insertRow()

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
        linha.insertCell(6).innerHTML = d.nomefuncionario
    })
}


function PegarRelatorio() {
    let teste = document.getElementsByClassName('Relatorio')
    for (let i = 0; i < teste.length; i++) {
        if (teste[i].checked) {
            if (teste[i].value == 1) {
                let date = new Date()
                let dia = date.getDate()
                console.log(dia)
                let condicao = 1
                let vendasdia = bd.pesquisa(condicao, dia)
                carregaListaRelatorio(vendasdia)
                console.log(vendasdia)
            } else if (teste[i].value == 2) {
                let date = new Date()
                let mes = date.getMonth() + 1
                console.log(mes)
                let condicao = 2
                let vendasmes = bd.pesquisa(condicao, mes)
                carregaListaRelatorio(vendasmes)
                console.log(vendasmes)
            } else if (teste[i].value == 3) {
                let date = new Date()
                let ano = date.getFullYear()
                console.log(ano)
                let condicao = 3
                let vendasano = bd.pesquisa(condicao, ano)
                carregaListaRelatorio(vendasano)
                console.log(vendasano)
            }
        }
    }
}