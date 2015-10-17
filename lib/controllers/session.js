/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var sessionManager = require('../managers/session');
var responseUtil = require('../utils/response');
var filterUtil = require('../utils/filter');

module.exports = function(app) {
    app.use('/sessions', router);
};

router.get('/', function(req, res) {
    var filter = filterUtil.toQuery(req.query.filter);

    sessionManager.findAll(filter).
        then(function(sessions) {
            res.json(responseUtil.ok(sessions));
        });
});
