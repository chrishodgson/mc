const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubMountain = require("./SubMountain"); //sub document

const mountainListSchema = new Schema({
  countryCode: String,
  classificationCode: String,
  highestInMetres: Number,
  lowestInMetres: Number,
  mountainCount: Number,
  _mountains: [ SubMountain ],
  _areaIds: [{ type: Schema.Types.ObjectId, ref: "Area" }]
});

mongoose.model("mountainLists", mountainListSchema);
