module.exports = auth = {

    /**
     * @name async auth
     * @example {post} auth helper middleware
     * @description check incomming auth token 
     * @returns {Promise}
     */
    async check(req, res, next) {   
            next();
        }
    
    };