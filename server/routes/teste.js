const express = require('express')
const bodyParser = require('body-parser');
const app = express();

const cors = require("cors")


app.use(bodyParser.json())
app.use(cors())
const port = 3000; 

//Rota cliente 
app.get("/cliente", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/cliente/editar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/cliente/buscar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/cliente/deletar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/venda/editar-interno", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

// ----------------------------------


//Rota estoque 
app.get("/estoque", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/estoque/editar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/estoque/buscar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/estoque/deletar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/estoque/editar-interno", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))
// ----------------------------------

//Rota venda 
app.get("/venda", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/venda/editar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/venda/buscar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/venda/deletar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/venda/editar-interno", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

// ----------------------------------

//Rota venda-a-prazo 
app.get("/venda-a-prazo", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/venda-a-prazo/editar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/venda-a-prazo/buscar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/venda-a-prazo/deletar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/venda/editar-interno", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))
// ----------------------------------

//Rota funcionarios 
app.get("/funcionarios", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/funcionarios/editar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/funcionarios/buscar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/funcionarios/deletar", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.get("/funcionarios/editar-interno", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))
// ----------------------------------

// rota do home
app.get("/home", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))
// ------------------------------------
app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})

module.exports = app; 