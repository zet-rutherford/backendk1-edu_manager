"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.Course, {
        foreignKey: "courseId",
      });
      Class.belongsToMany(models.User, {
        through: "Classes_Teacher",
        foreignKey: "classId",
      });
      Class.hasMany(models.Teacher_Calendar, {
        foreignKey: "classId",
      });
      Class.hasMany(models.Student_Class, {
        foreignKey: "classId",
      });
      Class.hasMany(models.Student_Attendance, {
        foreignKey: "classId",
      });
      Class.hasMany(models.Exercise, {
        foreignKey: "classId",
      });
    }
  }
  Class.init(
    {
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      schedule: DataTypes.INTEGER,
      timeLearn: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
