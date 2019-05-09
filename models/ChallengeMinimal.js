const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * IS THIS NEEDED ?
 * a minimal version of the challenge Schema for inclusion as a sub document on activities 
 */
const challengeMinimalSchema = new Schema({
  title: String,
  _challengeId: { type: Schema.Types.ObjectId, ref: "Challenge" }
});

module.exports = challengeMinimalSchema;
