const mongoose = require('mongoose');
const stepSchema = require('../models/step.schema');
var Schema = mongoose.Schema;

const scenarioSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxlength: 100
    },
    featureId: {
      type: Schema.Types.ObjectId, 
      ref: 'features'
    },
    givenSteps: {
      type: [stepSchema],
      required: true,
    },
    whenSteps: {
      type: [stepSchema],
      required: true,
    },
    thenSteps: {
      type: [stepSchema],
      required: true,
    }
  }
);

module.exports = mongoose.model('code-block', scenarioSchema);
