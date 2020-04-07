const mongoose = require('mongoose');
const stepSchema = require('../models/step.schema');

const scenarioSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxlength: 100
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
