const Sequelize = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: `${__dirname}/db.sqlite3`,
  logging: false,
});

module.exports = db;
