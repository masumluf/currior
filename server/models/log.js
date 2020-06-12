const { Schema, model } = require("mongoose");

const logSchema = new Schema(
  {
    logid: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Log = model("Log", logSchema);

module.exports = Log;
