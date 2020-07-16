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
    isBackground: {
      type: Boolean, 
      default: false
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
  },
  { collection: 'code-blocks' }
);

module.exports = mongoose.model('scenario', scenarioSchema);
