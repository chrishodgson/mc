const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  _activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
  _challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
  _followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  _following: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

mongoose.model("users", userSchema);
