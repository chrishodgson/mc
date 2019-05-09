const mongoose = require("mongoose");
const { Schema } = mongoose;

const mountainSchema = new Schema({
  dobihId: Number,
  name: String,
  metres: Number,
  gridRef: String,
  easting: Number,
  northing: Number,
  _areaId: { type: Schema.Types.ObjectId, ref: "Area" }
});

module.exports = mountainSchema;