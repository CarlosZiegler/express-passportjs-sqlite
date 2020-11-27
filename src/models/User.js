const sequelize = require('../database/configs/db.config');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = User;
