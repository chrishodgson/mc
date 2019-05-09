const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  _challengeIds: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
  _activityIds: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
  _followerIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  _followingIds: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

mongoose.model("users", userSchema);
