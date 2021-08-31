const router = require('express').Router();
const {
  models: { Game },
} = require('../db');
module.exports = router;

// router.get('/:gameId', async (req, res, next) => {
//   try {
//     const id = req.params.gameId;
//     const game = await Game.findByPk(id);
//     res.json(game);
//   } catch (err) {
//     next(err);
//   }
// });

router.post('/', async (req, res, next) => {
  try {
    const newGame = await Game.create({ concluded: false });
    res.json(newGame);
  } catch (err) {
    next(err);
  }
});

router.put('/:gameId', async (req, res, next) => {
  try {
    const id = req.params.gameId;
    const game = await Game.findByPk(id);
    await game.update({concluded: true})
    res.json(game);
  } catch (err) {
    next(err);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const games = await Game.findAll({ where: { concluded: false } });
    games.forEach(async (game) => {
      await game.destroy();
    });
    res.json(games);
  } catch (err) {
    next(err);
  }
});
