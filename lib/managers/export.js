/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var q = require('q');
var logger = require('../utils/logger');
var sessionManager = require('../managers/session');
var csvWriter = require('../services/csv-writer');
var exportCsvDataMapperService = require('../services/export-csv-data-mapper');

/**
 * A import manager.
 *
 * @constructor
 */
function ImportManager() {

}

/**
 * Imports a file.
 *
 * @param file
 * @returns {Promise}
 */
function exportFile(file) {
    var err;
    var deferred = q.defer();

    sessionManager.findAllTrials().
    then(function(models) {
        return exportCsvDataMapperService.unserialize(models);
    }).
    then(function(data) {
        return csvWriter.write(file, data);
    }).
    then(function() {
        deferred.resolve()
    }).
    fail(function(err) {
        deferred.reject(err);
    });

    return deferred.promise;
}

/**
 * Import from a file or directory.
 *
 * @param file
 * @public
 */
ImportManager.prototype.export = function(file) {
    return exportFile(file);
};

module.exports = new ImportManager();
