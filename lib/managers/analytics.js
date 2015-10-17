/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');
var q = require('q');
var Session = require('../models/session');
var dbUtils = require('../utils/db');
var logger = require('../utils/logger');

/**
 * A Session manager.
 *
 * @constructor
 */
function AnalyticsManager() {

}

/**
 * Finds all sessions.
 *
 * @param options
 * @returns {Promise}
 * @public
 */
function mapReduce(map, reduce, finalize, scope) {
    return dbUtils.mapReduce(Session, map, reduce, finalize, scope);
}

/**
 * Normalize the result so that it is just the primary key and value.
 *
 * @param results
 * @param primaryKey
 * @param valueKey
 * @returns {Array}
 */
function parseResult(results, primaryKey, valueKey) {
    var parsedResults = [];
    logger.info('Parsing results');

    _.forEach(results, function(result) {
        var parsedResult = {};
        parsedResult[primaryKey] = result._id;
        parsedResult[valueKey] = result.value[valueKey];
        parsedResults.push(parsedResult);
    });

    return parsedResults;
}

/**
 * Find the image response latency.
 *
 * @param isCorrect
 * @returns {Promise}
 */
function findImageLatency(isCorrect) {
    var imageLatencyKey = !!isCorrect ? 'correct-image-response-latency' : 'incorrect-image-latency';

    var map = function() {
        var trial;
        var i;
        var length = this.trials.length;
        var value = {};

        for (i = 0; i < length; i++) {
            trial = this.trials[i];
            if (!!trial[imageLatencyKey]) {
                value = {
                    count: 1
                };
                value[imageLatencyKey] = trial[imageLatencyKey];

                emit(trial['distance-gp'], value);
            }
        }
    };

    var reduce = function(key, values) {
        var reduceValue = {
            count: 0
        };
        var i;
        var value = {};

        reduceValue[imageLatencyKey] = 0;

        for (i = 0; i < values.length; i++) {
            value = values[i];

            reduceValue.count += value.count;
            reduceValue[imageLatencyKey] += value[imageLatencyKey];
        }

        return reduceValue;
    };

    var finalize = function(key, values) {
        values[imageLatencyKey] = values[imageLatencyKey] / values.count;

        return values;
    };

    return mapReduce(map, reduce, finalize, {imageLatencyKey: imageLatencyKey}).
        then(function(results) {
            var parsedResults = parseResult(results, 'distance-gp', imageLatencyKey);

            return q.fcall(function() {
                return parsedResults;
            });
        });
}

/**
 * Find the correct image latency.
 *
 * @returns {Promise}
 */
AnalyticsManager.prototype.findCorrectImageLatency = function() {
    return findImageLatency(true);
};

/**
 * Find the correct image latency.
 *
 * @returns {Promise}
 */
AnalyticsManager.prototype.findIncorrectImageLatency = function() {
    return findImageLatency(false);
};

module.exports = new AnalyticsManager();
