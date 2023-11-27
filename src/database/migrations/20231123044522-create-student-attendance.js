"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("student_attendances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dateLearn: {
        type: Sequelize.DATE,
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: "learning_statuses" }, key: "id" },
      },
      classId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: "classes" }, key: "id" },
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: "users" }, key: "id" },
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("student_attendances");
  },
};
