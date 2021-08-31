const Sequelize = require('sequelize');
const db = require('../db');

const Player = db.define('player', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  wins: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  losses: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Player