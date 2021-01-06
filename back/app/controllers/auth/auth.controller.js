const jwt = require('jsonwebtoken');
const userService = require('../../services/users/user.service');
const config = require('../../../config');
const errorParser = require('../../tools/ValidationErrorParser/validation-error-parser');

const AuthController = {
	singin: async (req, res) => {
		const user = await userService.getUserByEmail(req.body.email);
		if (user === null) {
			return res.status(400).send();
		}
		const isValid = await userService.isCorrectPassword(req.body.password, user.password);
		if (!isValid) {
			return res.status(400).send();
		}
		const token = jwt.sign({ id: user.id, pseudo: user.pseudo }, config.auth.secret, {
			algorithm: 'HS512',
			expiresIn: config.auth.expiresIn,
			subject: user.id.toString(),
		});
		return res.json({
			_id: user._id,
			pseudo: user.pseudo,
			token,
			tokenExpiration: Date.now() + config.auth.expiresIn * 1000,
		});
	},

	signup: async (req, res) => {
		try {
			const result = await userService.insertUser(req.body);
			return res.json({ id: result.id, pseudo: result.pseudo, email: result.email });
		} catch (err) {
			return res.status(400).send(errorParser.parseError(err));
		}
	},
};

module.exports = AuthController;
