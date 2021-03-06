/**
 * import mountains and associated data by country from CSV
 * 
 * This will create the following collections: 
 * - challenge - creates one 
 * - mountainList - creates one 
 * - area - creates several (one per area, if not already created)
 * - mountainRegister - creates several (one per mountain, if not already created)
 *  
 * node scripts/import.js --filename=absoluteFilePath.csv --country=E --classification=W
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

require("../models/Challenge");
require("../models/MountainList");
require("../models/Mountain");
require("../models/Area");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const Challenge = mongoose.model("challenges");
const MountainList = mongoose.model("mountainLists");
const Mountain = mongoose.model("mountains");
const Area = mongoose.model("areas");

// const columns = /(Number|Name|Metres|Feet|Area|Grid ref 10|Classification|Parent (Ma)|Map 1:25k|Country|County)/;
const columns = /(Number|Name|Metres|Area|Grid ref 10|Classification|Country)/;
const allowedClassifications = "M,C,G,F,Sim,Sy,Fel,B,W,WO";
const allowedClassificationList = allowedClassifications.split(",");
const allowedCountries = "E,W,S";
const allowedCountriesList = allowedCountries.split(",");

//todo import these
//const classificationNames = { "W": "Wainwright Fells", "WO": "Wainwright Oulying Fells" };

const filenameInput = args["filename"] || null;
const countryInput = args["country"] || false;
const classificationInput = args["classification"] || false;

let areaKeys = {},
  areaIds = [],
  mountainListId = '',
  highestInMetres = 0,
  lowestInMetres = 0,
  validItems = [],
  subMountains = [];

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
  await processMountains();
  await createMountainList();
  await createChallenge();
  
  console.log("Challenge created with classification " + classificationInput + ', country ' + countryInput);
  
  console.log(subMountains.length + " mountain sub documents added, "
    + lowestInMetres + " lowestInMetres, " + 
    + highestInMetres + " highestInMetres"
  );

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

/** step 1 Parse file
 */
const parseFile = async () => {
  const jsonArray = await csv({ includeColumns: columns }).fromFile(
    filenameInput
  );

  for (const item of jsonArray) {
    const mountainClassifications = item["Classification"].split(",");
    if (countryInput == item["Country"] && mountainClassifications.includes(classificationInput)) {
      validItems.push(item);  
      if (item["Area"] && !areaKeys.hasOwnProperty(item["Area"])) {
        areaKeys[item["Area"]] = null;
      }
    }  
  }
};

/** step 2 Save Areas
 */
const saveAreas = async () => {
  let created = 0;
  for (const property in areaKeys) {
    let document = await Area.findOne({ name: property });
    if (!document) {
      document = new Area({
        name: property
      });
      await document.save();
      created++;
    }
    areaKeys[property] = document._id;
    areaIds.push(document._id);
  }
  if (created > 0) {
    console.log(created + " Areas created.");
  }
};

/** step 3 process Mountains
 */
const processMountains = async () => {
  for (const item of validItems) {
    const position = convertGridRefToEastingNorthing(item["Grid ref 10"]);

    if (!position) {
      console.log('No Grid ref for ' + item["Number"] + ' ' + item["Name"]);
      continue;
    }

    const dobihId = Number(item["Number"]);
    let document = await Area.findOne({ dobihId });
    if (!document) {
      //todo store more on Mountain Model (ie Map 1:25k) ?
      document = new Mountain({
        dobihId,
        name: item["Name"]
      });
      await document.save();
    }  
    subMountains.push(hydrateSubMountain(item, position, document._id));  
  }  
}

/** step 4 Create MountainList
 */
const createMountainList = async () => {
  document = new MountainList({
    classificationCode: classificationInput,
    countryCode: countryInput,
    mountainCount: subMountains.length,
    highestInMetres,
    lowestInMetres,
    _areaIds: areaIds,
    _mountains: subMountains,
  });
  await document.save();
  mountainListId = document._id;
};

/** step 5 Create Challenge
 */
const createChallenge = async () => {
  document = new Challenge({
    name: 'title for classification ' + classificationInput,
    description: 'description for classification ' + classificationInput,
    mountainCount: subMountains.length,
    highestInMetres,
    lowestInMetres,
    _mountainListId: mountainListId
  });
  await document.save();
};

/** Hydrate Mountain Sub Document
 */
const hydrateSubMountain = (item, position, mountainId) => {
  const metres = Number(item["Metres"]);
  if (metres > highestInMetres) {
    highestInMetres = metres;
  }
  if (!lowestInMetres || metres < lowestInMetres) {
    lowestInMetres = metres;
  }
  return {
    name: item["Name"],
    metres: metres,
    gridRef: item["Grid ref 10"],
    easting: position[0],
    northing: position[1],
    _mountainId: mountainId,
    _areaId: areaKeys[item["Area"]]
  };
};

doImport();
