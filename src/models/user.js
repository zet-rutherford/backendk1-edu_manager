"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Type, {
        foreignKey: "typeId",
      });
      User.hasOne(models.Login_Token, {
        foreignKey: "userId",
      });
      User.hasMany(models.User_Social, {
        foreignKey: "userId",
      });
      User.belongsToMany(models.Role, {
        through: "UserRoles",
        foreignKey: "userId",
      });
      User.belongsToMany(models.Permission, {
        through: "UserPermissions",
        foreignKey: "userId",
      });
      User.hasOne(models.User_Otp, {
        foreignKey: "userId",
      });
      User.hasMany(models.Course, {
        foreignKey: "userId",
      });
      User.belongsToMany(models.Class, {
        through: "ClassesTeacher",
        foreignKey: "teacherId",
      });
      User.hasMany(models.Teacher_Calendar, {
        foreignKey: "teacherId",
      });
      User.hasMany(models.Student_Class, {
        foreignKey: "studentId",
      });
      User.hasMany(models.Exercise_Submit, {
        foreignKey: "studentId",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      typeID: DataTypes.INTEGER,
      firstLogin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
