"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher_Calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Teacher_Calendar.init(
    {
      teacherId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      scheduleDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Teacher_Calendar",
    }
  );
  return Teacher_Calendar;
};
