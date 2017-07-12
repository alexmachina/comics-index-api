'use strict';
module.exports = function(sequelize, DataTypes) {
  var Writter = sequelize.define('Writter', {
    fullname: DataTypes.STRING,
    profilePicUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Writter.hasMany(models.Comic)
      }
    }
  });
  return Writter;
};
