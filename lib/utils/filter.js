/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');

/**
 * A Filter util.
 *
 * @constructor
 */
function FilterUtil() {

}

FilterUtil.prototype.toQuery = function(filters) {
    var query = {};

    _.forEach(filters, function(value, key) {
        query[key] = value;
    });

    return query;
};

module.exports = new FilterUtil();
