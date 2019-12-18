const expressJwt = require('express-jwt');
const config = require('../../../config');

const AuthService = {
    isAuthenticated: expressJwt({
        secret: config.auth.secret
    })
}

module.exports = AuthService;