var express = require('express');
var router = express.Router();
var jokeController = require('../controllers/JokeController');

/*
 * GET
 */
router.get('/', jokeController.lndex);

module.exports = router;
