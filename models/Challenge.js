const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainItem = require("./MountainItem");

const challengeSchema = new Schema({
  name: String,
  description: String,
  handle: String,
  countryCode: String,
  classificationCode: String,
  highestInMetres: Number,
  lowestInMetres: Number,
  mountainCount: Number,
  _mountains: [MountainItem]
});

mongoose.model("Challenges", challengeSchema);
