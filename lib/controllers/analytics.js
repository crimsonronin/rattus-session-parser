/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var analyticsManager = require('../managers/analytics');
var responseUtil = require('../utils/response');

module.exports = function(app) {
    app.use('/analytics', router);
};

router.get('/image-latency/correct/daily', function(req, res) {
    analyticsManager.findCorrectImageLatency().
        then(function(sessions) {
            res.json(responseUtil.ok(sessions));
        });
});

router.get('/image-latency/incorrect/daily', function(req, res) {
    analyticsManager.findIncorrectImageLatency().
        then(function(sessions) {
            res.json(responseUtil.ok(sessions));
        });
});