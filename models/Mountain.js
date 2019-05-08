const mongoose = require("mongoose");
const { Schema } = mongoose;

const mountainSchema = new Schema({
  dobihId: Number,
  name: String,
  metres: Number,
  gridRef: String,
  easting: Number,
  northing: Number,
  countryCode: String,
  _area: { type: Schema.Types.ObjectId, ref: "Area" }
  //_county: { type: Schema.Types.ObjectId, ref: "County" }, 
  //_challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }] 
});

mongoose.model("mountains", mountainSchema);
