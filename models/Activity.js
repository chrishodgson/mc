const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChallengeMinimal = require("./ChallengeMinimal");
const Mountain = require("./Mountain");

const activitySchema = new Schema({
  title: String,
  description: String,
  startDate: Date,
  _challenge: ChallengeMinimal,
  _mountains: [ Mountain ],
  _userId: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("activities", activitySchema);
