const bodyParser = require('body-parser')
const clientes = require('./clientesRoute')

module.exports = app =>{
    app.use(bodyParser.json())
    app.use(clientes)
} 