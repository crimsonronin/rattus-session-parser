/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
module.exports = {
    app: {
        name: 'rattus-session-parser'
    },
    port: 3000,
    db: 'mongodb://localhost/rattus-session-parser-test',
    logger: {
        prefix: 'dev -',
        transports: [
            'Console'
        ],
        Console: {}
    }
};
