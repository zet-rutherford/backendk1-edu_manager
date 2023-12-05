"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student_Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student_Class.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      Student_Class.belongsTo(models.Class, {
        foreignKey: "classId",
      });
      Student_Class.belongsTo(models.Learning_Status, {
        foreignKey: "statusId",
      });
    }
  }
  Student_Class.init(
    {
      studentId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
      completeDate: DataTypes.DATE,
      dropDate: DataTypes.DATE,
      recover: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Student_Class",
    }
  );
  return Student_Class;
};
