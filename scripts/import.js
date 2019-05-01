/**
 * import mountains and associated data (areas and mountain lists) by country from CSV
 * 
 * This will populate the following collections: 
 * - mountains - a mountain can have multiple areas but only ONE country 
 * - mountain Lists - one per classification code (see allowed classifications below). a mountain list can have ONE country 
 * - areas - (ie Wainwright volumes, Donald Sections, Nuttall chapters, SIB Regions). an area can have multiple countries
 * 
 * node scripts/import.js --filename=absoluteFilePath.csv --country=E
 *
 * mandatory switches:
 * --country country code to import (see list below)
 * --classification classification code to use (see list below)
 * --filename absolute path of filename to import
 *
 * countries: [ 'S', 'ES', 'M', 'W', 'E', 'C', 'I' ]
 * 
 * classifications: ['M', 'C', 'G', 'F', 'Sim', 'Sy', 'Fel', 'B', 'W', 'WO']
 * Munro M - Scottish 3000ft+ (282)
 * Corbett C - Scottish 2500-2900ft (222)
 * Graham G - Scottish 2000-2499ft (219)
 * Furth F - English & Welsh 3000ft+ (21)
 * Simm Sim - All 600m+ (1968.5ft+) (2307)	
 * Synge Sy - Lakes list 300m+ (647)
 * Fellranger Fel - Lakes list (227)
 * Birkett B - Lakes list 304m+ / 1000ft+ (541)
 * Wainwright W - Lakes list 1000ft+ (214)
 * Wainwright Outlying Fell WO - Lakes list (116)
 * (see http://www.hills-database.co.uk/database_notes.html#classification)
 */

const _ = require("lodash");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const args = require("minimist")(process.argv.slice(2));
const csv = require("csvtojson");
const convertGridRefToEastingNorthing = require("./gridref");

require("../models/Mountain");
require("../models/MountainMinimal"); //sub document
require("../models/Challenge");
require("../models/County");
require("../models/Area");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const Mountain = mongoose.model("mountains");
const Challenge = mongoose.model("challenges");
const Area = mongoose.model("areas");
const County = mongoose.model("counties");

const columns = /(Number|Name|Metres|Feet|Area|Grid ref 10|Classification|Parent (Ma)|Map 1:25k|Country|County)/;
const allowedClassifications = "M,C,G,F,Sim,Sy,Fel,B,W,WO";
const allowedClassificationList = allowedClassifications.split(",");
const allowedCountries = "E,W,S";
const allowedCountriesList = allowedCountries.split(",");

const filenameInput = args["filename"] || null;
const countryInput = args["country"] || false;
const classificationInput = args["classification"] || false;

let areaKeys = {},
  countyKeys = {},
  challengeId = 0,
  mountains = [],
  mountainsMinimal = [];

/** Run Import
 */
const doImport = async () => {
  console.log("Starting...");

  if (!validateInputs()) {
    return;
  }

  if (await doesChallengeAlreadyExist().catch(e => {
    console.error(e); 
    return true;
  })) {
    return; 
  }

  await parseFile();
  await saveAreas();
  await saveCounties();
  await saveChallenge();
  await processMountains();

  // console.log(mountainsMinimal);
  console.log("Finished.");
};

/** Validate Inputs
 */
const validateInputs = () => {
  if (!filenameInput) {
    console.error("Error: no --filename parameter passed");
    return false;
  }

  if (!countryInput || !allowedCountriesList.includes(countryInput)) {
    console.error("Error: --country parameter is not passed or contains an invalid value");
    return false;
  }

  if (!classificationInput || !allowedClassificationList.includes(classificationInput)) {
    console.error("Error: --classification parameter is not passed or contains an invalid value");
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
    const mountainClassifications = item["Classification"].split(",");
    if (countryInput == item["Country"] && mountainClassifications.includes(classificationInput)) {
      mountains.push(item);
      if (item["Area"] && !areaKeys.hasOwnProperty(item["Area"])) {
        areaKeys[item["Area"]] = null;
      }
      if (item["County"] && !areaKeys.hasOwnProperty(item["County"])) {
        countyKeys[item["County"]] = null;
      }
    }
  }
};

/** check the challenge doesn't exist
 */
const doesChallengeAlreadyExist = async () => {
  const countDocuments = await Challenge.countDocuments({
    classificationCode: classificationInput,
    countryCode: countryInput
  });
  if (countDocuments !== 0) {
    throw 'Error: Challenge already exists for classification ' + classificationInput;
  }
};

/** Save Challenge
 */
const saveChallenge = async () => {
  document = new Challenge({
    title: classificationInput,
    countryCode: countryInput,
    classificationCode: classificationInput,
    _mountains: mountainsMinimal
  });
  await document.save();
  challengeId = document._id;
};

/** Save Areas
 */
const saveAreas = async () => {
  let created = 0;
  for (const property in areaKeys) {
    let document = await Area.findOne({ name: property });
    if (!document) {
      document = new Area({
        name: property,
        countryCodes: [countryInput]
      });
      await document.save();
      created++;
    } else if (
      !document["countryCodes"] ||
      !document["countryCodes"].includes(countryInput)
    ) {
      document["countryCodes"].push(countryInput);
      await document.save();
    }
    areaKeys[property] = document._id;
  }
  if (created > 0) {
    console.log(created + " Areas created.");
  }
};

/** Save Countries - do we need this ??
 */
const saveCounties = async () => {
  let created = 0;
  for (const property in countyKeys) {
    let document = await County.findOne({
      name: property,
      countryCode: countryInput
    }).select("_id");
    if (!document) {
      document = new County({ name: property, countryCode: countryInput });
      await document.save();
      created++;
    }
    countyKeys[property] = document._id;
  }
  if (created > 0) {
    console.log(created + " Counties created.");
  }
};

/** Process Mountains
 */
const processMountains = async () => {
  existing = created = ignored = 0;
  for (const item of mountains) {
    const document = await Mountain.findOne({
      dobihId: item.Number
    });
    if (document) {
      if (!document["_challenges"] || !document["_challenges"].includes(challengeId)) {
        document["_challenges"].push(challengeId);
        await document.save();
      }
      existing++;
    } else {
      const position = convertGridRefToEastingNorthing(item["Grid ref 10"]);
      if (!position) {
        console.log('No Grid ref for ' + item["Number"] + ' ' + item["Name"]);
        ignored++;
      } else {
        const mountain = hydrateMountain(item, position);
        await mountain.save();
        created++;
      }
    }
  }

  console.log(existing + " mountains already exist in database.");
  console.log(ignored + " mountains ignored.");
  console.log(created + " mountains created.");
};

/** Hydrate Mountain
 */
const hydrateMountain = (item, position) => {
  mountainsMinimal.push({
    name: item["Name"],
    metres: Number(item["Metres"]),
    gridRef: item["Grid ref 10"],
    easting: position[0],
    northing: position[1]
  });

  return new Mountain({
    dobihId: Number(item["Number"]),
    name: item["Name"],
    metres: Number(item["Metres"]),
    gridRef: item["Grid ref 10"],
    easting: position[0],
    northing: position[1],
    //lat: item["Latitude"],
    //lng: item["Longitude"],
    //feet: Number(item["Feet"]),
    countryCode: item["Country"],
    _area: areaKeys[item["Area"]],
    _county: countyKeys[item["County"]],
    _challenges: [challengeId]
  });
};

doImport();
