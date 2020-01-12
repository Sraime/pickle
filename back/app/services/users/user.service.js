const bcrypt = require('bcryptjs');
const UserModel = require('../../models/user.model');

const UserService = {
	getUserByEmail: async (email) => UserModel.findOne({ email }),

	isCorrectPassword: async (password, encodedPassword) => bcrypt.compare(password, encodedPassword),

	insertUser: async (user) => {
		const nu = new UserModel(user);
		return nu.save();
	}
};

module.exports = UserService;
