'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Estoques', {
      codProduto: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      precocusto: {
        type: Sequelize.FLOAT
      },
      precovenda: {
        type: Sequelize.FLOAT
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      dataCompra: {
        type: Sequelize.DATE
      },
      validade: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Estoques');
  }
};