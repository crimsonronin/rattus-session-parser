/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');
var q = require('q');
var dbUtils = require('../utils/db');
var Session = require('../models/session');

/**
 * A Session manager.
 *
 * @constructor
 */
function SessionManager() {

}

/**
 * Finds all sessions.
 *
 * @param options
 * @returns {Promise}
 * @public
 */
function findAll(options) {
    return dbUtils.findAll(Session, options);
}

/**
 * Find a session by the passed options.
 *
 * @param options
 * @returns {Promise}
 * @private
 */
function find(options) {
    return dbUtils.find(Session, options);
}

/**
 *
 * @param filterBy
 * @param limit
 * @param offset
 * @returns {Promise}
 */
SessionManager.prototype.findAll = function(filterBy, limit, offset) {
    var options = {
        lean: true
    };

    if (!!filterBy) {
        options.criteria = filterBy;
    }

    return findAll(options);
};

/**
 * Unwinds data around the trials and returns expanded data.
 *
 * @returns {Promise}
 */
SessionManager.prototype.findAllTrials = function() {
    var pipeline = [
        {
            '$unwind': '$trials'
        }
    ];

    return dbUtils.aggregate(Session, pipeline);
};

/**
 * Finds a session by an id.
 *
 * @param id
 * @returns {Promise}
 * @public
 */
SessionManager.prototype.findById = function(id) {
    var options = {
        criteria: {
            _id: id
        }
    };

    return find(options);
};

/**
 * Creates a session by passing in a {@link Trial} model.
 *
 * @param session
 * @returns {Promise}
 * @public
 */
SessionManager.prototype.create = function(session) {
    if (session instanceof Array) {
        return this.createAll(session);
    } else if (!(session instanceof Session)) {
        session = new Session(session); // eslint-disable-line no-param-reassign
    }
    return dbUtils.create(session);
};

/**
 * Creates sessions by passing an {@link Array} of {@link Trial}s.
 *
 * @param sessions
 * @returns {Promise}
 */
SessionManager.prototype.createAll = function(sessions) {
    var deferreds = [];

    _.forEach(sessions, function(session) {
        deferreds.push(this.create(session));
    }.bind(this));

    return q.all(deferreds);
};

/**
 *
 * @param session
 * @returns {Promise}
 */
SessionManager.prototype.update = function(session) {
    if (!(session instanceof Session)) {
        throw new Error('The session must be an instance of a Session model in order to update it.', session);
    }

    if (!session._id) {
        throw new Error('The session must have an existing id to be able to update it', session);
    }

    return dbUtils.update(session);
};

module.exports = new SessionManager();
