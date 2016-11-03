var express = require('express');
var router = express.Router();
var apiController = require('../controller/ApiController');

/*
 * GET
 */

router.get('/jokes', apiController.getJokes);
router.post('/jokes', apiController.addJoke);
router.get('/jokes/:id', apiController.getJoke);
module.exports = router;