"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Learning_Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Learning_Status.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Learning_Status",
    }
  );
  return Learning_Status;
};
