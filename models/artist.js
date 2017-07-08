'use strict';
module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define('Artist', {
    fullname: DataTypes.STRING,
    profilePicUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Artist;
};