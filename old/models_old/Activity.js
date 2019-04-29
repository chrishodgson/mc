const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainItem = require("./MountainItem");
const UserItem = require("./UserItem");

const activitySchema = new Schema({
  title: String,
  description: String,
  mountainCount: Number,
  minutes: Number,
  hours: Number,
  date: Date,
  _users: [UserItem],
  _mountains: [MountainItem]
});

mongoose.model("activities", activitySchema);
