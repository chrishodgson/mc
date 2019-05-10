const mongoose = require("mongoose");
const { Schema } = mongoose;

const userChallengeSchema = new Schema({
  name: String,
  climbedCount: Number,
  remainingCount: Number,
  _challengeId: { type: Schema.Types.ObjectId, ref: "Challenge" },
  _mountainListId: { type: Schema.Types.ObjectId, ref: "MountainList" },
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
  _climbedMountainIds: [{ type: Schema.Types.ObjectId, ref: "Mountain" }]
});

mongoose.model("userChallenges", userChallengeSchema);
