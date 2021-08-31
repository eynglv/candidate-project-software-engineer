const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  concluded: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Game;
