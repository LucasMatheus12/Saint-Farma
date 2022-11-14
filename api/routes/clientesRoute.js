const { Router } = require('express')

const ClientesController = require('../controllers/ClientesController')

const router = Router()

router.get('/clientes', ClientesController.PegaTodosOsClientes); 
router.get('/clientes/:id', ClientesController.pegaUmCliente)
router.post('/clientes', ClientesController.criaCliente)
router.put('/clientes/:id', ClientesController.atualizaCliente)
router.delete('/clientes/:id', ClientesController.deletaCliente)
module.exports = router;
