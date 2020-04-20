const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxlength: 100
    },
    featureId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'features'
    },
    givenSteps: {
      type: Array,
      required: true,
    },
    whenSteps: {
      type: Array,
      required: true,
    },
    thenSteps: {
      type: Array,
      required: true,
    }
  }
);

module.exports = mongoose.model('code-block', scenarioSchema);
