const mongoose = require("mongoose");
const { Schema } = mongoose;
const Mountain = require("./Mountain");

const userActivitySchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  _challengeId: { type: Schema.Types.ObjectId, ref: "Challenge" },
  _userId: { type: Schema.Types.ObjectId, ref: "User" },
  _mountains: [ Mountain ]
});

mongoose.model("userActivities", userActivitySchema);
