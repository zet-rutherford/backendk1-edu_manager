"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Excercise_Submit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Excercise_Submit.init(
    {
      studentId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      attachment: DataTypes.STRING,
      exerciseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Excercise_Submit",
    }
  );
  return Excercise_Submit;
};
