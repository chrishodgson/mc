const mongoose = require("mongoose");
const { Schema } = mongoose;

//sub document - for use on UserActivity and MountainList to list all mountains
const subMountainSchema = new Schema({
  name: String,
  metres: Number,
  gridRef: String,
  easting: Number,
  northing: Number,
  _areaId: { type: Schema.Types.ObjectId, ref: "Area" },
  _mountainId: { type: Schema.Types.ObjectId, ref: "Mountain" }
});

module.exports = subMountainSchema;