const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  winner: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
  playerOne: {
    type: Sequelize.INTEGER,
  },
  playerTwo: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Game;
