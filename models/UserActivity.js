const mongoose = require("mongoose");
const { Schema } = mongoose;
const Mountain = require("./Mountain"); //sub document

const userActivitySchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  _userChallengeId: { type: Schema.Types.ObjectId, ref: "UserChallenge" },
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
  _mountains: [ Mountain ]
});

mongoose.model("userActivities", userActivitySchema);
