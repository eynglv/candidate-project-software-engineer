const Sequelize = require('sequelize');
const db = require('../db');

const Result = db.define('result', {
  gameId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  winner: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
});
module.exports = Result;
