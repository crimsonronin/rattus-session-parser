/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');
var fs = require('fs');
var mime = require('mime');
var q = require('q');
var logger = require('../utils/logger');
var sessionManager = require('../managers/session');
var csvParserService = require('../services/csv-parser');
var csvDataMapperService = require('../services/csv-data-mapper');

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
function importFile(file) {
    var err;
    var deferred = q.defer();
    logger.info('Importing CSV from: ' + file);

    if (mime.lookup(file) === 'text/csv') {
        csvParserService.parse(file).
            then(function(data) {
                // map csv to sessions
                return csvDataMapperService.toModels(data);
            }).
            then(function(sessions) {
                logger.error('Saving ' + sessions.length + ' sessions');
                // save session
                return sessionManager.createAll(sessions);
            }).then(function() {
                logger.error('Saved');
                deferred.resolve();
            });
    } else {
        err = 'Incorrect file type for ' + file;
        logger.error(err);
        deferred.reject(err);
    }

    return deferred.promise;
}

/**
 * Imports all files in a directory.
 *
 * @param directory
 * @returns {Promise}
 */
function importDirectory(directory) {
    var deferred = q.defer();
    logger.info('Importing CSV\'s from the directory: ' + directory);

    q.nfcall(fs.readdir, directory).
        then(function(files) {
            var deferreds = [];

            _.forEach(files, function(file) {
                deferreds.push(importFile(directory + '/' + file));
            });

            return q.allSettled(deferreds);
        }).
        then(function() {
            deferred.resolve();
        });

    return deferred.promise;
}

/**
 * Import from a file or directory.
 *
 * @param file
 * @public
 */
ImportManager.prototype.import = function(file) {
    if (fs.lstatSync(file).isDirectory()) {
        return importDirectory(file);
    }

    return importFile(file);
};

module.exports = new ImportManager();
