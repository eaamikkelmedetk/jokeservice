var express = require('express');
var router = express.Router();
var indexController = require("../controller/IndexController");

router.get('/', indexController.show);

module.exports = router;