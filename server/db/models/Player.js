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
});

Player.prototype.increaseWins = async function () {
  await this.increment('wins')
};


module.exports = Player;
