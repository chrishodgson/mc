/**
 * report on mountains from the CSV
 * node scripts/report.js --filename=absoluteFilePath.csv
 *
 * mandatory switches:
 * --filename absolute path of filename to import
 *
 * optional switches:
 * --country country code to import see list below
 * --area area to import OPTIONAL
 * --mountain mountain to import OPTIONAL
 * --report report mountain details OPTIONAL
 *
 * countries: [ 'S', 'ES', 'M', 'W', 'E', 'C', 'I' ]
 * classifications: ['D', 'Sy', 'Fel', 'B', 'W', 'WO', 'M', 'F', 'C', 'G', '5']
 */

const _ = require("lodash");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const args = require("minimist")(process.argv.slice(2));
const csv = require("csvtojson");

require("../models/Mountain");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const Mountain = mongoose.model("mountains");

const columns = /(Number|Name|Metres|Feet|Area|Classification|Country|County)/;
const filenameInput = args["filename"] || null;
const countryInput = args["country"] || false;
const areaInput = args["area"] || false;
const reportInput = args["report"] || false;
const mountainInput = args["mountain"] || false;
const mountainPattern = new RegExp(mountainInput, "i");

let mountains = [];

/** Run Import
 */
const doImport = async () => {
  if (!validateInputs()) {
    return;
  }
  await parseFile();

  for (const item of mountains) {
    console.log(reportInput ? item : item.Name + " / " + item.Metres + "m");
  }
  console.log(mountains.length + " mountains found.");
};

/** Validate Inputs
 */
const validateInputs = () => {
  if (!filenameInput) {
    console.log("Error: no --filename parameter passed");
    return false;
  }
  return true;
};

/** Parse file
 */
const parseFile = async () => {
  const jsonArray = await csv({ includeColumns: columns }).fromFile(
    filenameInput
  );

  for (const item of jsonArray) {
    if (shouldImportRow(item)) {
      item.Metres = Number(item.Metres);
      mountains.push(item);
    }
  }
  mountains = _.orderBy(mountains, "Metres", "desc");
};

/** Should Import Row
 */
const shouldImportRow = item => {
  return (countryInput && countryInput !== item["Country"]) ||
    (areaInput && areaInput !== item["Area"]) ||
    (mountainInput && !doesMountainMatch(item))
    ? false
    : true;
};

/** Check whether mountain is a match
 */
const doesMountainMatch = item => {
  return mountainInput && mountainPattern.test(item["Name"]);
};

doImport();
