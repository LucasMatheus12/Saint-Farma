'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estoque = sequelize.define('Estoque', {
    CodProduto: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    precocusto: DataTypes.FLOAT,
    precovenda: DataTypes.FLOAT,
    quantidade: DataTypes.INTEGER,
    dataCompra: DataTypes.DATE,
    validade: DataTypes.DATE
  }, {});
  Estoque.associate = function(models) {
    // associations can be defined here
  };
  return Estoque;
};