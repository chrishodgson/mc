const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  _challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
  _activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }]
});

mongoose.model("users", userSchema);
