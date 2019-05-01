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
    process.exit(1);
  }

  if (await doesChallengeAlreadyExist().catch(e => {
    console.error(e); 
    process.exit(1);
  }));

  await parseFile();
  await saveAreas();
  await saveCounties();
  await createChallenge();
  await processMountains();
  await updateChallenge();

  // console.log(mountainsMinimal);
  console.log("Finished.");
  process.exit(0);
};

/** Validate Inputs
 */
const validateInputs = () => {
  let valid = true;
  if (!filenameInput) {
    console.error("Error: --filename parameter not passed");
    valid = false;
  }
  if (!countryInput || !allowedCountriesList.includes(countryInput)) {
    console.error("Error: --country parameter is not passed or contains an invalid value");
    valid = false;
  }
  if (!classificationInput || !allowedClassificationList.includes(classificationInput)) {
    console.error("Error: --classification parameter is not passed or contains an invalid value");
    valid = false;
  }
  return valid;
};

/** check the challenge doesn't exist
 */
const doesChallengeAlreadyExist = async () => {
  const countDocuments = await Challenge.countDocuments({
    classificationCode: classificationInput,
    countryCode: countryInput
  });
  if (countDocuments !== 0) {
    throw 'Error: Challenge already exists for classification ' 
      + classificationInput + ' and country ' + countryInput;
  }
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

/** Create Challenge
 */
const createChallenge = async () => {
  document = new Challenge({
    title: classificationInput,
    countryCode: countryInput,
    classificationCode: classificationInput
  });
  await document.save();
  challengeId = document._id;
};

/** Update Challenge (_mountains field)
 */
const updateChallenge = async () => {
  let document = await Challenge.findOne({ _id: challengeId });
  document["_mountains"] = mountainsMinimal;
  await document.save();
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
  existing = created = added = 0;
  for (const item of mountains) {
    const position = convertGridRefToEastingNorthing(item["Grid ref 10"]);

    if (!position) {
      console.log('No Grid ref for ' + item["Number"] + ' ' + item["Name"]);
      continue;
    }

    let document = await Mountain.findOne({
      dobihId: item.Number
    });

    if (!document) {
      document = hydrateMountain(item, position);
      await document.save();
      created++;
    } else if (!document["_challenges"] || !document["_challenges"].includes(challengeId)) {
      document["_challenges"].push(challengeId);
      await document.save();
      existing++;
    }

    added++;
    hydrateMountainMinimal(item, position, document._id);        
  }

  console.log(existing + " mountains already exist.");
  console.log(created + " mountains created.");
  console.log(added + " mountains added to challenge .");
  
};

/** Hydrate Mountain
 */
const hydrateMountain = (item, position) => {
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

/** Hydrate Mountain minimal
 */
const hydrateMountainMinimal = (item, position, mountainId) => {
  mountainsMinimal.push({
    name: item["Name"],
    metres: Number(item["Metres"]),
    gridRef: item["Grid ref 10"],
    easting: position[0],
    northing: position[1],
    _mountain: mountainId 
  });
};

doImport();
