'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venda = sequelize.define('Venda', {
    quantidade: DataTypes.INTEGER,
    valoAPagar: DataTypes.FLOAT,
    dataCompra: DataTypes.DATE,
    formaPagamento: DataTypes.INTEGER,
    desconto: DataTypes.INTEGER
  }, {});
  Venda.associate = function(models) {
    // associations can be defined here
  };
  return Venda;
};