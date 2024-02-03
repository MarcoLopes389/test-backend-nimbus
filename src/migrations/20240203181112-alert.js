'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('alert', {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      event: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      date: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      damage: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('alert')
  }
};
