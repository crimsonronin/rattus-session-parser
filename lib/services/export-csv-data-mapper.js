/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');
var q = require('q');
var moment = require('moment');
var logger = require('../utils/logger');
var mappingConfig = require('../../config/export-mapping');
var CSV_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
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
    logger.info(msg);
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
 * Formats the data correctly for CSV.
 *
 * @param value
 * @returns {Mixed}
 */
function formatValue(value) {
    if (value instanceof Date) {
        return moment(value).format(CSV_DATE_FORMAT);
    }
    return value;
}

/**
 * Map the unwound model to a flat csv data to the {@link Trial} model.
 *
 * @param unwoundModel
 */
function mapModel(unwoundModel) {
    var data = {};

    _.forEach(mappingConfig.headings, function(heading) {
        data[heading] = '';

        if (!!mappingConfig.fields[heading]) {
            var value = _.get(unwoundModel, mappingConfig.fields[heading]);
            if (typeof (value) !== 'undefined') {
                data[heading] = formatValue(value);
            }
        }
    });

    return data;
}

/**
 *
 * @param unwoundModels
 * @returns {Promise}
 */
ImportCsvDataMapperService.prototype.unserialize = function(unwoundModels) {
    var data = [];
    logInfo('Unserializing ' + unwoundModels.length + ' models');

    _.forEach(unwoundModels, function(unwoundModel) {
        data.push(mapModel(unwoundModel));
    });

    return q.fcall(function() {
        logInfo('Unserialed ' + data.length + ' models to a flat CSV data structure');
        return data;
    });
};

module.exports = new ImportCsvDataMapperService();
