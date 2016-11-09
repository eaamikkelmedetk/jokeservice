var express = require('express');
var router = express.Router();
var indexController = require("../controller/IndexController");
var otherJokeController = require("../controller/OtherJokeController");

router.get('/', indexController.index);
router.get('/otherJokes', otherJokeController.otherJokes);

module.exports = router;