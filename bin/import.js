#!/usr/bin/env node
/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var db = require('../lib/utils/db');
var logger = require('../lib/utils/logger');
var csvImporter = require('../lib/managers/import');

// init mongo connection
db.connect().then(function() {
    logger.info('Importing csv');
    return csvImporter.import(process.argv[2]);
}).then(function(data) {
    logger.info('Imported csv');
    process.exit(0);
}).fail(function(err) {
    logger.error('Failed', err);
    process.exit(1);
});