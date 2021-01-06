const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const featureSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		maxlength: 100,
	},
	projectId: {
		type: Schema.Types.ObjectId,
		ref: 'projects',
		required: true,
	},
});

module.exports = mongoose.model('features', featureSchema);
