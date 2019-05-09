const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  _userChallengeIds: [{ type: Schema.Types.ObjectId, ref: "UserChallenge" }],
  _userActivityIds: [{ type: Schema.Types.ObjectId, ref: "UserActivity" }],
  _followerIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  _followingIds: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

mongoose.model("users", userSchema);
