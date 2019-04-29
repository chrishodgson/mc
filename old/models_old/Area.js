const mongoose = require("mongoose");
const { Schema } = mongoose;

const areaSchema = new Schema({
  name: String,
  countryCodes: [String]
});

mongoose.model("areas", areaSchema);
