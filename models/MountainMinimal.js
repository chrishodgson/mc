const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * a minimal version of the mountain Schema for inclusion as a sub document 
 * on challenges and activities 
 */
const mountainMinimalSchema = new Schema({
  name: String,
  metres: Number,
  gridRef: String,
  easting: Number,
  northing: Number,
  _mountain: { type: Schema.Types.ObjectId, ref: "Mountain"}
});

module.exports = mountainMinimalSchema;
