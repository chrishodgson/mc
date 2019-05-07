const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainMinimal = require("./MountainMinimal");

const userChallengeSchema = new Schema({
  title: String,
  climbedCount: Number,
  remainingCount: Number,
  _mountainsClimbed: [MountainMinimal],
  _challenge: { type: Schema.Types.ObjectId, ref: "Challenge" },
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("userChallenges", userChallengeSchema);
