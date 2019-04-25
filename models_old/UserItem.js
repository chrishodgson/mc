const mongoose = require("mongoose");
const { Schema } = mongoose;

const userItemSchema = new Schema({
  name: String,
  admin: { type: Boolean, default: false },
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = userItemSchema;
