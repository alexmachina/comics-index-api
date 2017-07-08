'use strict';
module.exports = function(sequelize, DataTypes) {
  var Collection = sequelize.define('Collection', {
    title: DataTypes.STRING,
    bundleSize: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Collection.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: falsj
          }
        })
        
      }
    }
  });
  return Collection;
};
