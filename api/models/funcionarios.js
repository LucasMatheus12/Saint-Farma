'use strict';
module.exports = (sequelize, DataTypes) => {
  const Funcionarios = sequelize.define('Funcionarios', {
    nome: DataTypes.STRING,
    salario: DataTypes.FLOAT,
    telefone: DataTypes.INTEGER,
    cpf: DataTypes.STRING,
    cidade: DataTypes.STRING,
    referencia: DataTypes.STRING,
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    numerocasa: DataTypes.INTEGER
  }, {});
  Funcionarios.associate = function(models) {
    // associations can be defined here
  };
  return Funcionarios;
};