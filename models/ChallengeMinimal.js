const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * a minimal version of the challenge Schema for inclusion on actitivies as a sub document
 */
const challengeItemSchema = new Schema({
  name: String,
  _challenge: { type: Schema.Types.ObjectId, ref: "Challenge"}
});

module.exports = challengeItemSchema;
