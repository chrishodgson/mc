const mongoose = require("mongoose");
const { Schema } = mongoose;
const Mountain = require("./Mountain");

/**
 * NOTE: mountainCount as a calculated field
 */
const challengeSchema = new Schema({
  title: String,
  description: String,
  handle: String,
  countryCode: String,
  classificationCode: String,
  highestInMetres: Number,
  lowestInMetres: Number,
  mountainCount: Number,
  _mountains: [Mountain]
});

mongoose.model("challenges", challengeSchema);
