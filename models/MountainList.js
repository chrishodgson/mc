const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainItem = require("./embedded/MountainItem"); // embedded document

const mountainListSchema = new Schema({
  countryCode: String,
  classificationCode: String,
  highestInMetres: Number,
  lowestInMetres: Number,
  mountainCount: Number,
  _mountains: [ MountainItem ],
  _areaIds: [{ type: Schema.Types.ObjectId, ref: "Area" }]
});

mongoose.model("mountainLists", mountainListSchema);
