const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const featureSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxlength: 100
		},
		
		userId: {
      type: Schema.Types.ObjectId, 
      ref: 'users'
		}
  }
);

module.exports = mongoose.model('features', featureSchema);
