'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venda = sequelize.define('Venda', {
    quantidade: DataTypes.INTEGER,
    codproduto: DataTypes.INTEGER,
    valorapagar: DataTypes.FLOAT,
    datacompra: DataTypes.DATE,
    formapagamento: DataTypes.INTEGER,
    desconto: DataTypes.INTEGER,
    cpfcliente: DataTypes.STRING,
    nomefuncionario: DataTypes.STRING
  }, {});
  Venda.associate = function(models) {
    // associations can be defined here
  };
  return Venda;
};