const Sequelize = require('sequelize');
const db = require('../db');

const Player = db.define('player', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isValidName: function (value) {
        const regex = /^[a-zA-Z]{3}$/;

        if (!regex.test(value)) {
          throw new Error('Name Wrong Format');
        }
        return value;
      },
    },
  },
  wins: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Player;
