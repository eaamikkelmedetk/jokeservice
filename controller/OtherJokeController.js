var request = require("request");


/**
 * Collecting jokes from services
 * And renders a template index.hbs
 * Fails if the serviceprovider can't provide JSON-service objects
 */
//ROUTE ("/")
module.exports.otherJokes = function (req, res) {
    collectServices().then(function (obj) {
        var allPromises = [];
        //Running trough all JSON-service objects
        //Surrounds them with a extractJokes function
        for (var i in obj) {
            allPromises.push(extractJokes(obj[i].address));
        }

        //Maps all promises from the array <allPromises>
        Promise.all(allPromises).then(function (jokes) {
            var mergeJokes = [];

            //Merging the JSON-joke arrays to a single array
            //And sorts empty jokes out
            for (var i in jokes) {
                mergeJokes = mergeJokes.concat(jokes[i]).filter(function (obj) {
                    if (obj.setup !== '' && obj.punchline !== '') {
                        return obj;
                    }
                });
            }

            //Render index.hbs handlebars template
            res.render("otherJokes", { "jokes": mergeJokes });

        });
    });
};

//HELPER FUNCTIONS ------------------------>

/**
 * Collecting whole JSON-service objects from https://krdo-joke-registry.herokuapp.com/api/services
 */
var collectServices = function () {
    return new Promise(function (resolve, reject) {
        request("https://krdo-joke-registry.herokuapp.com/api/services", function (error, response, body) {
            if (error) {
                reject('BadRequest');
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
};

/**
 * Collecting jokes from a given address with a valid url.
 * e.g. http://domainname.com/api/
 * returns a promise
 */
var extractJokes = function (address) {
    return new Promise(function (resolve, reject) {
        var options = { url: address + 'jokes', timeout: 0 };
        request(options, function (err, response, body) {
            var json = "";
            try {
                json = JSON.parse(body);
            } catch (e) {
                console.log("error");
            } finally {
                resolve(json);
            }
        });
    });
};
//HELPER-FUNCTIONS-END----------------------------------------->