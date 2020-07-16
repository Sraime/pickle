const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    featureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "features",
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
    },
  },
  { collection: "code-blocks" }
);

module.exports = mongoose.model("scenario", scenarioSchema);
