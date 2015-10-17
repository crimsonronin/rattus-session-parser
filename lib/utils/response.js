/**
 * A Response util.
 *
 * @constructor
 */
function ResponseUtil() {

}

ResponseUtil.prototype.ok = function(data) {
    return {
        meta: {
            page: {
                offset: 0,
                limit: 0,
                total: data.length
            }
        },
        data: data
    };
};

ResponseUtil.prototype.error = function(err) {
    return {
        code: 'CODE_PLACHOLDER',
        message: err.toString(),
        errors: [
            err
        ]
    };
};

module.exports = new ResponseUtil();
