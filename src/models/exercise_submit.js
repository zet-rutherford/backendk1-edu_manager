"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exercise_Submit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise_Submit.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      Exercise_Submit.belongsTo(models.Exercise, {
        foreignKey: "exerciseId",
      });
    }
  }
  Exercise_Submit.init(
    {
      studentId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      attachment: DataTypes.STRING,
      exerciseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Exercise_Submit",
    }
  );
  return Exercise_Submit;
};
