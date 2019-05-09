const mongoose = require("mongoose");
const { Schema } = mongoose;

const areaSchema = new Schema({
  name: String
});

mongoose.model("areas", areaSchema);
