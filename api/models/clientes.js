'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define('Clientes', {
    nomes: DataTypes.STRING,
    cpf: DataTypes.STRING,
    telefone: DataTypes.STRING,
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    numeroCasa: DataTypes.NUMBER,
    cidade: DataTypes.STRING,
    referencia: DataTypes.STRING
  }, {});
  Clientes.associate = function(models) {
    // associations can be defined here
  };
  return Clientes;
};