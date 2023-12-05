"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Social extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Social.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  User_Social.init(
    {
      userId: DataTypes.STRING,
      provider: DataTypes.STRING,
      providerId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User_Social",
    }
  );
  return User_Social;
};
