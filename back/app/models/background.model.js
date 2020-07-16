const mongoose = require('mongoose');
const stepSchema = require('./step.schema');
var Schema = mongoose.Schema;

const backgroundSchema = new mongoose.Schema(
	{
    featureId: {
      type: Schema.Types.ObjectId, 
      ref: 'features'
    },
    isBackground: {
      type: Boolean, 
      default: true
    },
    givenSteps: {
      type: [stepSchema],
      required: true,
    }
  },
  { collection: 'code-blocks' }
);

module.exports = mongoose.model('background', backgroundSchema);
