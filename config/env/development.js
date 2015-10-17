/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
module.exports = {
    app: {
        name: 'rattus'
    },
    port: 8080,
    db: 'mongodb://localhost/rattus-dev',
    logger: {
        prefix: 'dev -',
        transports: [
            'Console'
        ],
        Console: {}
    }
};
