const mongoose = require("mongoose");
const { Schema } = mongoose;
const Mountain = require("./Mountain"); //sub document

const mountainListSchema = new Schema({
  countryCode: String,
  classificationCode: String,
  highestInMetres: Number,
  lowestInMetres: Number,
  mountainCount: Number,
  _mountains: [ Mountain ],
  _areaIds: [{ type: Schema.Types.ObjectId, ref: "Area" }]
});

mongoose.model("mountainLists", mountainListSchema);
