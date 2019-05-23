const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserActivityMountain = require("./UserActivityMountain"); //sub document

const userChallengeSchema = new Schema({
  name: String,
  climbedCount: Number,
  remainingCount: Number,
  mountainCount: Number,
  _challengeId: { type: Schema.Types.ObjectId, ref: "Challenge" },
  _mountainListId: { type: Schema.Types.ObjectId, ref: "MountainList" },
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
  _climbed: [ UserActivityMountain ]
});

mongoose.model("userChallenges", userChallengeSchema);
