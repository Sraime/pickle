const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100
    }
  }
);

module.exports = stepSchema;