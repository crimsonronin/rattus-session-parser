/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var mongoose = require('mongoose');
var Trial = require('./trial');
var Schema = mongoose.Schema;

function Session() {
    var SessionSchema = new Schema({
        'schedule-name': String,
        'environment-name': String,
        'schedule-run-date': Date,
        'animal-id': Number,
        'application-version': String,
        'max-number-trials': Number,
        'max-schedule-time': Number,
        'schedule-description': String,
        'schedule-starttime': String,
        'group-id': String,
        'user': String,
        'notes': String,
        'summary': {
            'condition': Number,
            'trials-completed': Number,
            'all-trials-completed': Number,
            'percentage-correct': Number,
            'iti-touches': {
                'left': Number,
                'center': Number,
                'right': Number
            },
            'blank-touches': {
                'left': Number,
                'center': Number,
                'right': Number
            },
            'corrects-at-distance': Array,
            'total-at-distance': Array,
            'percentage-correct-at-distance': Array
        },
        'trials': [Trial]
    });

    return mongoose.model('Session', SessionSchema);
}

module.exports = new Session();
