const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeSchema = new Schema({
  name: String,
  description: String,
  highestInMetres: Number,
  lowestInMetres: Number,
  mountainCount: Number,
  _mountainListId: { type: Schema.Types.ObjectId, ref: "MountainList" }
});

mongoose.model("challenges", challengeSchema);
