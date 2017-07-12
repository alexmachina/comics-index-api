'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Collections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
      },
      bundleSize: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'

      }

    })
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.dropTable('Collections')

  }
};
