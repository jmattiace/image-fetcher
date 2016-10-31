/**
 * Controller used for handling image requests
 */
var request = require('request');
var validator = require('validator');

const ENOTFOUND = "ENOTFOUND";
const IMAGE = "image";

module.exports = function (app) {

    /*
     * Root handler
     */
    app.get('/', function (req, res) {
        res.status(200).send('');
    });

    /*
     * Fetches image from the provided url
     */
    app.get('/image', function(req, res, next) {

        //Validate url
        var url = req.query.url;
        if(!url) {
            console.error("Missing url query parameter");
            return res.status(400).send("Missing url query paramter");
        }
        var validatorOps = {
            protocols: ['http', 'https'],
            require_protocol: true,
            allow_underscores: true
        }
        if(!validator.isURL(url, validatorOps)) {
            console.error("Invalid URL");
            return res.status(400).send("Invalid URL: " + url);
        }

        //Get image from remote url
        var r = request(url);
        r.on('error', function(err) {
            if(err.code && err.code == "ENOTFOUND") {
                return next(createError(404, "Remote address not found: " + url));
            }
            else {
                return next(createError(503, "Unable to reach remote address: " + url));
            }
        });
        r.on('response', function(response) {
            if(response.statusCode !== 200) {
                //If the status code is a client error, return that code
                if(response.statusCode >= 400 && response.statusCode <= 499) {
                    return next(createError(response.statusCode, "Client error occurred when requesting image from remote endpoint: "
                        + response.statusCode + " - " + response.statusMessage))
                }

                return next(createError(502, "Invalid response received from remote endpoint: "
                    + response.statusCode + " - " + response.statusMessage));
            }
            //Ensure url is pointing to an image file by checking the content-type header. Octet streams are not sufficient
            if(response.headers && ~response.headers['content-type'].indexOf(IMAGE)) {
                r.pipe(res);
            } else {
                return next(createError(400, "The remote url is not an image"));
            }
        });
    });

    /*
     * Creates an error object
     */
    function createError(status, msg) {
        var err = {};
        err.status = status;
        err.msg = msg;
        return err;
    }
}
