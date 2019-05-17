const mongoose = require("mongoose");
const { Schema } = mongoose;

//sub document
const userActivityMountainSchema = new Schema({
  _mountainId: { type: Schema.Types.ObjectId, ref: "Mountain" },
  _userChallengeId: { type: Schema.Types.ObjectId, ref: "UserChallenge" }
});

module.exports = userActivityMountainSchema;