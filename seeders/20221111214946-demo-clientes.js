'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Clientes', 
    [
      {
        nomes: 'Alisson castro',
        cpf: '741852963',
        telefone: '88969587412', 
        rua: 'josefa', 
        bairro: 'ze', 
        numeroCasa: '88',
        cidade:'patu', 
        referencia:'vizinho ao chaves',
				createdAt: new Date(),
				updatedAt: new Date()
    },
    {
      nomes: 'alice',
      cpf: '741852963',
      telefone: '8896658512', 
      rua: 'josefa', 
      bairro: 'ze', 
      numeroCasa: '88',
      cidade:'patu', 
      referencia:'vizinho ao chaves',
      createdAt: new Date(),
      updatedAt: new Date()
  }
  ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clientes', null, {});
  }
};
