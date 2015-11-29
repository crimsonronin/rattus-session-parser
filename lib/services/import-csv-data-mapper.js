/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');
var q = require('q');
var moment = require('moment');
var logger = require('../utils/logger');
var mappingConfig = require('../../config/import-mapping');
var Session = require('../models/session');
var Trial = require('../models/trial');
/**
 * A import manager.
 *
 * @constructor
 */
function ImportCsvDataMapperService() {

}
/**
 * Logs to info depending on verbosity.
 *
 * @param msg
 */
function logInfo(msg) {
    // TODO make configurable
    // logger.info(msg);
}

/**
 * Logs to error depending on verbosity.
 *
 * @param msg
 */
function logError(msg) {
    // TODO make configurable
    // logger.error(msg);
}

/**
 *
 * @param key
 * @param model
 * @returns {String|undefined}
 */
function parseTitle(key, model) {
    var title;

    _.forEach(mappingConfig[model], function(value, configKey) {
        if (new RegExp(configKey, 'ig').test(key)) {
            title = {
                name: key,
                key: value,
                value: new RegExp(configKey, 'ig').exec(key)
            };
            return;
        }
    });

    return title;
}

/**
 *
 * @param key
 * @returns {String}
 */
function parseSessionTitle(key) {
    return parseTitle(key, 'session');
}

function parseTrialTitle(key) {
    return parseTitle(key, 'trial');
}

/**
 * Sets the value on the model based on the passed key path.
 *
 * @param model
 * @param key
 * @param value
 */
function setField(model, key, value) {
    var schema = model.schema || model;
    var fieldVal;
    var fieldType = schema.path(key);

    if (!!fieldType && fieldType.instance) {
        logInfo('Setting the ' + fieldType.instance + ' value for the key: ' + key);
        switch (fieldType.instance) {
            case 'Array':
                fieldVal = model.get(key);
                fieldVal[fieldVal.length] = value;
                model.set(key, fieldVal);
                break;
            case 'Date':
                model.set(key, moment(model.get(key)));
                break;
            default:
                model.set(key, value);
                break;
        }
    } else {
        logError('Could not find the field type for: ' + key);
    }
}

function mapTrial(trials, title, value) {
    var trialNumber;
    var trial;
    // ensure the trial number is set
    if (!!title.value[1]) {
        trialNumber = parseInt(title.value[1], 10) - 1;

        if (!!value) {
            if (!!trials[trialNumber]) {
                trial = trials[trialNumber];
            } else {
                trial = new Trial();
                trials[trialNumber] = trial;
            }

            setField(trial, title.key, value);
        } else {
            logError('The value for the key ' + title.key + ' is undefined');
        }
    }
}

/**
 * Maps the flat csv data to the {@link Trial} model.
 *
 * @param data
 * @returns {Trial}
 */
function mapSession(data) {
    var session = new Session();

    _.forEach(data, function(value, key) {
        var title;
        if (key.indexOf('Trial') === 0) {
            title = parseTrialTitle(key);
            if (!!title) {
                logInfo('Found a trial model key for: ' + key);
                mapTrial(session.trials, title, value);
            } else {
                logError('Could not find a trial model key for: ' + key);
            }
        } else {
            title = parseSessionTitle(key);
            if (!!title) {
                logInfo('Found a session model key for: ' + key);
                setField(session, title.key, value);
            } else {
                logError('Could not find a session model key for: ' + key);
            }
        }
    });

    return session;
}

/**
 *
 * @param parsedData
 * @returns {Promise}
 */
ImportCsvDataMapperService.prototype.unserialize = function(parsedData) {
    var models = [];

    _.forEach(parsedData, function(data) {
        models.push(mapSession(data));
    });

    return q.fcall(function() {
        return models;
    });
};

module.exports = new ImportCsvDataMapperService();
