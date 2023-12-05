"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student_Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student_Attendance.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      Student_Attendance.belongsTo(models.Class, {
        foreignKey: "classId",
      });
    }
  }
  Student_Attendance.init(
    {
      dateLearn: DataTypes.DATE,
      statusId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Student_Attendance",
    }
  );
  return Student_Attendance;
};
