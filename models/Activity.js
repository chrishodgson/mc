const mongoose = require("mongoose");
const { Schema } = mongoose;
const Mountain = require("./Mountain");
const ChallengeMinimal = require("./ChallengeMinimal");

const activitySchema = new Schema({
  title: String,
  description: String,
  startDate: Date,
  _challenge: ChallengeMinimal,
  _mountains: [Mountain]
});

mongoose.model("activities", activitySchema);
