const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChallengeMinimal = require("./ChallengeMinimal");
const MountainMinimal = require("./MountainMinimal");

const userChallengeSchema = new Schema({
  title: String,
  climbedCount: Number,
  remainingCount: Number,
  _challenge: ChallengeMinimal,
  _mountainsClimbed: [MountainMinimal],
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("userChallenges", userChallengeSchema);
