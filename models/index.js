'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//User - Collection
db.User.hasMany(db.Collection)
db.Collection.belongsTo(db.User)
//User - Comic
db.User.hasMany(db.Comic)
db.Comic.belongsTo(db.User)
//Comic - Artist
db.Artist.belongsToMany(db.Comic, {through: 'comic_artists'})
db.Comic.belongsToMany(db.Artist, {through: 'comic_artists'})
//Comic - Writter
db.Writter.belongsToMany(db.Comic, { through: 'comic_writters'})
db.Comic.belongsToMany(db.Writter, { through: 'comic_writters' })
//Comic - Collection
db.Collection.hasMany(db.Comic)
db.Comic.belongsTo(db.Collection)

module.exports = db;
