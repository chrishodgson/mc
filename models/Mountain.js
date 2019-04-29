const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * do we need county ?
 */
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
  _challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }]
});

mongoose.model("mountains", mountainSchema);
