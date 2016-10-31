/*
 * Error handler
 */
module.exports = function (app) {

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.error('Error caught:');
        if(err.stack) {
            console.error(err.stack);
        }
        else if(err.msg) {
            console.error(err.msg);
        }
        else {
            console.error(err);
        }
        return res.send(err.msg);
    });
}