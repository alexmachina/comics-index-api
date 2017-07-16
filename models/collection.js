'use strict';
module.exports = function(sequelize, DataTypes) {
  var Collection = sequelize.define('Collection', {
    title: DataTypes.STRING,
    bundleSize: DataTypes.INTEGER,
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Collection.belongsTo(models.User)

      }
    }
  });
  return Collection;
};
