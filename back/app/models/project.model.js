const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		maxlength: 100,
	},
	contributors: {
		type: [Schema.Types.ObjectId],
		ref: 'users',
		required: true,
	},
});

module.exports = mongoose.model('projects', projectSchema);
