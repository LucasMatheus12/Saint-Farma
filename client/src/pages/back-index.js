function ModalValidadePerto(mespassado) {
    let produtos = Array()
    mespassado.forEach(function (d) {
        produtos.push(d.codigo)
        document.getElementById('TituloModal').innerHTML = 'Validade está próxima'
        document.getElementById('TituloModal').className = 'text-danger'
        document.getElementById('descricaoModal').innerHTML = `Os produtos de código ${produtos} precisam ser verificado suas validades`
        document.getElementById('botao-modal').innerHTML = 'Ok, vou verificar'
        document.getElementById('botao-modal').className = 'btn btn-danger'
    })
}


class BD {
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
}

let bd = new BD()

function pegarDataEstoque(dia, mes, ano) {
    let Estoque = Array()
    let resultado = Array()
    Estoque = bd.recuperarTodosRegistros()
    Estoque.forEach(function (d) {
        data = d.validade
        let datadiaajustada = data.slice(0, 2)
        let datamesajustada = data.slice(3, 5)
        let dataanoajustada = data.slice(6, 12)
        if (datadiaajustada == dia && datamesajustada == mes && dataanoajustada == ano) {
            resultado.push(d)
        }
    })
    return resultado
}


function EmitirAvisoDeValidade() {
    let date = new Date()
    let dia = date.getDate()
    let mes = date.getMonth() + 1
    let ano = date.getFullYear()
    let mespassado = Array()
    mespassado = pegarDataEstoque(dia, mes, ano)
    console.log(mespassado)
    if (mespassado != '') {
        ModalValidadePerto(mespassado)
        $('#modalValidade').modal('show')
    }
}