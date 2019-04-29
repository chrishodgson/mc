const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainItem = require("./MountainItem");
const UserItem = require("./UserItem");

const challengeSchema = new Schema({
  title: String,
  description: String,
  mountainCount: Number,
  _users: [UserItem],
  _mountains: [MountainItem]
});

mongoose.model("challenges", challengeSchema);
