const mongoose = require("mongoose");
const { Schema } = mongoose;

const countySchema = new Schema({
  name: String,
  countryCode: String
});

mongoose.model("counties", countySchema);
