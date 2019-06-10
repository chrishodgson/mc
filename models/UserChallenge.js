const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubUserActivityMountain = require("./SubUserActivityMountain"); //sub document

/**
 * indexes on _userId and _challengeId {_userId: 1, _challengeId: 1}
 */
const userChallengeSchema = new Schema({
  title: String,
  climbedCount: Number,
  remainingCount: Number,
  mountainCount: Number,
  _mountainListId: { type: Schema.Types.ObjectId, ref: "MountainList" },
  _challengeId: { type: Schema.Types.ObjectId, ref: "Challenge" },
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
  _climbed: [ SubUserActivityMountain ]
});

mongoose.model("userChallenges", userChallengeSchema);
