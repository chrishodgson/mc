const mongoose = require("mongoose");
const { Schema } = mongoose;
const Mountain = require("./Mountain");

/**
 * TODO: make challenges a static JSON file delivered via a reducer and a new Collection MountainList for the mountains ?
 */
const challengeSchema = new Schema({
  title: String,
  description: String,
  countryCode: String,
  classificationCode: String,
  highestInMetres: Number,
  lowestInMetres: Number,
  mountainCount: Number,
  _mountains: [ Mountain ]
});

mongoose.model("challenges", challengeSchema);
