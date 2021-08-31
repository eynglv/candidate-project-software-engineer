//this is the access point for all things database related!

const db = require('./db');

const Player = require('./models/Player');
const Game = require('./models/Game');

Player.belongsToMany(Game, { through: 'playerId' });
Game.belongsToMany(Player, { through: 'playerId' });

module.exports = {
  db,
  models: {
    Player,
    Game,
  },
};
