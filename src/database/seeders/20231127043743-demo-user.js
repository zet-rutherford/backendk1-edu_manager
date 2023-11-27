"use strict";
const hash = require("../../utils/hash");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const pass = hash.make("123456");
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Quang Minh",
          email: "quangminh@root",
          password: pass,
          phone: "0945958656",
          typeId: 1,
          firstLogin: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
