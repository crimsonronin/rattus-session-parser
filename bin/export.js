#!/usr/bin/env node
/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var db = require('../lib/utils/db');
var logger = require('../lib/utils/logger');
var csvExporter = require('../lib/managers/export');

if (!!process.argv[2]) {
    // init mongo connection
    db.connect().
    then(function() {
        logger.info('Exporting SPSS CSV');
        return csvExporter.export(process.argv[2]);
    }).
    then(function() {
        logger.info('Exported SPSS CSV');
        process.exit(0);
    }).
    fail(function(err) {
        logger.error('Failed to export to CSV', err);
        process.exit(1);
    });
} else {
    logger.error('Failed: Missing export filename');
    process.exit(1);
}