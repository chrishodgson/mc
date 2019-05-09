const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainMinimal = require("./MountainMinimal");

const userChallengeSchema = new Schema({
  title: String,
  climbedCount: Number,
  remainingCount: Number,
  _challengeId: { type: Schema.Types.ObjectId, ref: "Challenge" },
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
  _climbedIds: [ MountainMinimal ]
});

mongoose.model("userChallenges", userChallengeSchema);
