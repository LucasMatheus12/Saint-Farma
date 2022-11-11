'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Funcionarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      salario: {
        type: Sequelize.FLOAT
      },
      telefone: {
        type: Sequelize.INTEGER
      },
      cpf: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      referencia: {
        type: Sequelize.STRING
      },
      rua: {
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING
      },
      numerocasa: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Funcionarios');
  }
};