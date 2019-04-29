const mongoose = require("mongoose");
const { Schema } = mongoose;

const mountainSchema = new Schema({
  dobihId: Number,
  name: String,
  metres: Number,
  gridRef: String,
  easting: Number,
  northing: Number,
  lat: Number,
  lng: Number,
  countryCode: String,
  _county: { type: Schema.Types.ObjectId, ref: "County" },
  _area: { type: Schema.Types.ObjectId, ref: "Area" },
  _mountainLists: [{ type: Schema.Types.ObjectId, ref: "MountainList" }]
});

mongoose.model("mountains", mountainSchema);
