/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var db = require('./lib/utils/db');
var app = require('./lib/app');

// init mongo connection
db.connect().then(function() {
    // create express app and config
    app.init();
});
