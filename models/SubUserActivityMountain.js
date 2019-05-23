const mongoose = require("mongoose");
const { Schema } = mongoose;

// sub document - for use on UserChallenge to list all mountainId and UserActivityId combinations, which will allow 
// us to calculate the UserChallenge counts when a UserActivity is added, edited ordeleted 
const subUserActivityMountainSchema = new Schema({
  _mountainId: { type: Schema.Types.ObjectId, ref: "Mountain" },
  _userActivityId: { type: Schema.Types.ObjectId, ref: "UserActivity" }
});

module.exports = subUserActivityMountainSchema;