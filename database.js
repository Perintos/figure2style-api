const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('stylistic_device_db', 'root', 'Itsasecret', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = app;
