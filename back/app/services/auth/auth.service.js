const expressJwt = require('express-jwt');
const config = require('../../../config');

const AuthService = {
	isAuthenticated: expressJwt({
		secret: config.auth.secret,
		algorithms: ['HS512'],
	}),
};

module.exports = AuthService;
