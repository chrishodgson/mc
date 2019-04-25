const mongoose = require("mongoose");
const { Schema } = mongoose;

const mountainItemSchema = new Schema({
  name: String,
  metres: Number,
  gridRef: String,
  easting: Number,
  northing: Number,
  order: Number,
  _mountain: { type: Schema.Types.ObjectId, ref: "Mountain" }
});

module.exports = mountainItemSchema;
