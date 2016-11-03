'use strict';
var JokeModel = require('../models/JokeModel');

/**
 * JokeController.js
 * @description: Handles the serverlogic of getting Jokes from our own webservice
 */

module.exports.getJokes = function(req, res) {
    JokeModel.find().exec()
        .then(function(jokes) {
            return res.json({"jokes": jokes});
        })
};

module.exports.addJoke = function(req, res) {
    var jokeModel = new JokeModel({
        setup: req.body.setup,
        punchline: req.body.punchline
    });

    jokeModel.save(function(err) {
        if (err) {
            res.json({message: "An error has occured, try again later..."});
        } else {
            res.json({message: "The joke has been added to the registry"});
        }
    })
};

module.exports.getJoke = function(req, res) {
    console.log(req.params.id);
    var jokeId = req.params.id;
    JokeModel.find({"_id": jokeId}).exec()
    .then(function(joke) {
        return res.json({"joke": joke})
    
})
};