const mongoose = require('mongoose');
const stepSchema = require('./step.schema');
var Schema = mongoose.Schema;

const codeblockSchema = new mongoose.Schema(
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

module.exports = mongoose.model('code-block', codeblockSchema);
