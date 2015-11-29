/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');
var csv = require('fast-csv');
var logger = require('../utils/logger');
var fs = require('fs');
var q = require('q');

/**
 * A import manager.
 *
 * @constructor
 */
function CsvWriterService() {

    // number-correct = correction-trial

}

/**
 * Writes the passed data to a CSV
 *
 * @param file
 * @param data
 * @returns {Promise}
 * @public
 */
CsvWriterService.prototype.write = function(file, data) {
    var deferred = q.defer();

    logger.info('Writing data to CSV: ' + file);

    var csvStream = csv.format({headers: true});
    var writableStream = fs.createWriteStream(file);

    writableStream.on('finish', function() {
        logger.info('Successfully completed writing CSV data');
        deferred.resolve();
    });

    csvStream.pipe(writableStream);
    _.forEach(data, function(row) {
        csvStream.write(row);
    });

    csvStream.end();

    return deferred.promise;
};

module.exports = new CsvWriterService();
