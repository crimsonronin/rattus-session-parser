/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

module.exports = function(app) {
    app.use('/', router);
};

router.get('/', function(req, res) {
    res.json({ping: 'alive'});
});
