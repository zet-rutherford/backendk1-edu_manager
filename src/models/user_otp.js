"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Otp.init(
    {
      otp: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      expires: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User_Otp",
    }
  );
  return User_Otp;
};
