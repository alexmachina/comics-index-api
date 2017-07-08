'use strict';
module.exports = function(sequelize, DataTypes) {
  var Writter = sequelize.define('Writter', {
    fullname: DataTypes.STRING,
    profilePicUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Writter;
};
