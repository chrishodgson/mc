const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * do we need this
 */
const countySchema = new Schema({
  name: String,
  countryCode: String
});

mongoose.model("counties", countySchema);
