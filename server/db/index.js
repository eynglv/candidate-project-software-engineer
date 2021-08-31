//this is the access point for all things database related!

const db = require('./db');

const Player = require('./models/Player');
const Game = require('./models/Game');
const Result = require('./models/Result');

Player.belongsToMany(Game, { through: Result, foreignKey: 'winner' });
Game.belongsToMany(Player, { through: Result });

module.exports = {
  db,
  models: {
    Player,
    Game,
    Result,
  },
};
