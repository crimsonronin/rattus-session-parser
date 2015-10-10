#!/usr/bin/env node
/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var db = require('../lib/utils/db');
var logger = require('../lib/utils/logger');
var Session = require('../lib/models/session');
var data = [
    {
        'schedule-name': 'Rat 5x3 TUNL balanced selection v1',
        'environment-name': 'Chamber3 [3]',
        'schedule-run-date': '',
        'animal-id': '69',
        'application-version': 'ABET II Touch 2.18.5214.16315',
        'max-number-trials': 64,
        'max-schedule-time': 3600,
        'schedule-description': 'test',
        'schedule-starttime': '',
        'group-id': '',
        'user': '',
        'notes': '',
        'summary': {
            'condition': 3600,
            'trials-completed': 49,
            'all-trials-completed': 103,
            'percentage-correct': 51.02,
            'iti-touches': {
                'left': 11,
                'center': 6,
                'right': 15
            },
            'blank-touches': {
                'left': 266,
                'center': 75,
                'right': 176
            },
            'corrects-at-distance': [],
            'total-at-distance': [],
            'percentage-correct-at-distance': []
        },
        'trials': [
            {
                'condition': 33.377,
                'number-correct': 1,
                'trial-number': 1,
                'distance-gp': 2,
                'pattern-number': 19,
                'sample-side': 2,
                'iti-touches': {
                    'left': 2,
                    'center': 0,
                    'right': 0
                },
                'blank-touches': {
                    'left': 0,
                    'center': 0,
                    'right': 1
                },
                'reward-collection-latency': 1.267,
                'correct-image-response-latency': 2.017,
                'incorrect-image-latency': 0
            }
        ]
    }
];

// init mongo connection
db.connect().then(function() {
    logger.info('Importing data');
    return db.import(Session, data);
}).then(function() {
    logger.info('Imported data');
    process.exit(0);
});