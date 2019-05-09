const mongoose = require("mongoose");
const { Schema } = mongoose;
const Mountain = require("./Mountain");

const challengeSchema = new Schema({
  name: String,
  description: String,
  countryCode: String,
  classificationCode: String,
  highestInMetres: Number,
  lowestInMetres: Number,
  mountainCount: Number,
  _mountains: [ Mountain ]
});

mongoose.model("challenges", challengeSchema);
