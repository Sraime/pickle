const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxlength: 100
    }
  }
);

module.exports = mongoose.model('features', featureSchema);
