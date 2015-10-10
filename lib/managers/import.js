/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
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
 *
 * @param file
 * @public
 */
ImportManager.prototype.import = function(file) {
    // import & parse csv
    return csvParserService.parse(file).
        then(function(data) {
            // map csv to sessions
            return csvDataMapperService.toModels(data);
        }).
        then(function(sessions) {
            // save session
            return sessionManager.create(sessions);
        });
};

module.exports = new ImportManager();
