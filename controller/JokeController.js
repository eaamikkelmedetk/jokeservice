/**
 * JokeController.js
 * @description: Handles the serverlogic of getting Jokes from our own webservice
 */

module.exports({
    index: function(req, res) {
        res.render('index', {"data": "hej"});
    }
});