/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var csv = require('fast-csv');
var fs = require('fs');
var q = require('q');

/**
 * A import manager.
 *
 * @constructor
 */
function CsvParserService() {

}

CsvParserService.prototype.parse = function(file) {
    var deferred = q.defer();
    var parsedData = [];

    // check if file exists
    q.nfcall(fs.stat, file).
        then(function() {
            csv.fromPath(file, {headers: true}).
                on('data', function(data) {
                    parsedData.push(data);
                }).
                on('end', function() {
                    deferred.resolve(parsedData);
                });
        }).
        fail(function() {
            deferred.reject('File ' + file + ' does not exist');
        });

    return deferred.promise;
};

module.exports = new CsvParserService();
