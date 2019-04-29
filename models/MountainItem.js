const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * a minimal version of the mountain Schema
 */
const mountainItemSchema = new Schema({
  name: String,
  metres: Number,
  gridRef: String,
  easting: Number,
  northing: Number,
  order: Number,
  _mountain: { type: Schema.Types.ObjectId, ref: "Mountain"}
});

module.exports = mountainItemSchema;
