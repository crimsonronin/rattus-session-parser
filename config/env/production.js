/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
module.exports = {
    app: {
        name: 'rattus'
    },
    port: 8080,
    db: 'mongodb://localhost/rattus-prod',
    logger: {
        prefix: 'dev -',
        transports: [
            'MongoDb'
        ],
        MongoDb: {}
    }
};
