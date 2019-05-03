const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChallengeMinimal = require("./ChallengeMinimal");
const MountainMinimal = require("./MountainMinimal");

const userChallengeSchema = new Schema({
  title: String,
  description: String,
  mountainsRemainingCount: Number,
  mountainsClimbedCount: Number,
  _challenge: ChallengeMinimal,
  _mountainsRemaining: [MountainMinimal],
  _mountainsClimbed: [MountainMinimal],
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("userChallenges", userChallengeSchema);
