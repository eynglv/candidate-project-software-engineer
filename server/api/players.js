const router = require('express').Router();
const {
  models: { Player },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (err) {
    next(err);
  }
});

router.get('/:playerName', async (req, res, next) => {
  try {
    const name = req.params.playerName;
    const player = await Player.findOne({
      where: { name: name },
    });
    res.json(player);
  } catch (err) {
    next(err);
  }
});

router.post('/:playerName', async (req, res, next) => {
  try {
    const name = req.params.playerName;
    const newPlayer = await Player.create({
      name: name,
    });
    res.json(newPlayer);
  } catch (err) {
    next(err);
  }
});

router.put('/:playerName', async (req, res, next) => {
  try {
    const name = req.params.playerName;
    const player = await Player.findOne({
      where: { name: name },
    });
    player.increaseWins() //have to reload to see changes
    await player.reload();
    res.json(player);
  } catch (err) {
    next(err);
  }
});
