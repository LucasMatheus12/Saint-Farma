const database = require('../models/index.js');

class ClientesController {
    //Metodo pega toda lista de clientes 
    static async PegaTodosOsClientes(req, res) {
        try {
            const todosOsClientes = await database.Clientes.findAll();
            return res.status(200).json(todosOsClientes)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    // metodo pega um cliente por id 

    static async pegaUmCliente(req, res) {
        const { id } = req.params
        try {
            const umcliente = await database.Clientes.findOne({ 
                where: { id: Number(id) 
                } 
            })
            return res.status(200).json(umcliente)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    // Metodo cria cliente
    static async criaCliente (req, res){
        const novoCliente = req.body
        try {
            const novoClienteCriado = await database.Clientes.create(novoCliente)
            return res.status(200).json
            (novoClienteCriado)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    // Metodo atualiza um cliente

    static async atualizaCliente(req, res){
        const {id} = req.params
        const novasInfos = req.body
        try {
            await database.Clientes.update(novasInfos, { where: { id: Number(id)}} )

            const clienteAtualizado = await database.Clientes.findOne( {where: {id: Number(id)}})
            return res.status(200).json(clienteAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    // Metodo deleta cliente

    static async deletaCliente(req, res){
        const {id} = req.params
        try {
            await database.Clientes.destroy( {where: {id: Number(id)}})
            return res.status(200).json({ mensagem: `id ${id} Deletado com sucesso!`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = ClientesController; 