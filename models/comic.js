'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comic = sequelize.define('Comic', {
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    collectionOrder: DataTypes.INTEGER,

    collection_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Comic.belongsToMany(models.Artist, {through: 'ComicArtist'})
        Comic.belongsToMany(models.Writter, {through: 'ComicWritter'})
        Comic.belongsTo(models.Collection)

      }
    }
  });
  return Comic;
};
