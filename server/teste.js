const express = require('express')
const bodyParser = require('body-parser');
const app = express();

const cors = require("cors")


app.use(bodyParser.json())
app.use(cors())
const port = 3000; 

app.get("/teste", (req, res) => res
.status(200)
.send({mensagem: "Bem vindo ao teste!"
}))

app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})

module.exports = app; 