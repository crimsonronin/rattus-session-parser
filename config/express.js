/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');
var glob = require('glob');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var methodOverride = require('method-override');

module.exports = function(app, config) {
    var env = process.env.NODE_ENV || 'development';
    var controllers = glob.sync(config.root + '/lib/controllers/*.js');

    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env === 'development';

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(cors());
    app.use(compress());
    app.use(methodOverride());

    /**
     * Automatically add all controllers from the directory
     */
    _.forEach(controllers, function(controller) {
        require(controller)(app);
    });

    /**
     * Catch 404 errors
     */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /**
     * In development environments display 500 errors.
     */
    if (app.get('env') === 'development') {
        app.use(function(err, req, res) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    /**
     * In production environments do not display the 500 errors.
     */
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    });
};
