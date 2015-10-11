/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function Trial() {
    var TrialSchema = new Schema({
        'condition': Number,
        'number-correct': Number,
        'trial-number': Number,
        'distance-gp': Number,
        'pattern-number': Number,
        'sample-side': Number,
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
        'reward-collection-latency': Number,
        'correct-image-response-latency': Number,
        'incorrect-image-latency': Number
    });


    return mongoose.model('Trial', TrialSchema);
}

module.exports = new Trial();
