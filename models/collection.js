'use strict';
module.exports = function(sequelize, DataTypes) {
  var Collection = sequelize.define('Collection', {
    title: DataTypes.STRING,
    bundleSize: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    classMethods: {
      associate: function(models) {
        Collection.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: 'userId'
        })

      }
    }
  });
  return Collection;
};
