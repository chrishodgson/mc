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
 * --country country code to import see list below
 * --filename absolute path of filename to import
 *
 * countries: [ 'S', 'ES', 'M', 'W', 'E', 'C', 'I' ]
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

const filenameInput = args["filename"] || null;
const countryInput = args["country"] || false;
const classificationInput = args["classification"] || false;

let areaKeys = {},
  countyKeys = {},
  //classificationKeys = {},
  challengeId = 0,
  mountains = [];

/** Run Import
 */
const doImport = async () => {
  if (!validateInputs()) {
    return;
  }
  await parseFile();
  await saveAreas();
  await saveCounties();
  await saveChallenges();
  await processMountains();

  console.log(mountains);
};

/** Validate Inputs
 */
const validateInputs = () => {

  if (!classificationInput) {
    console.log("Error: no --classification parameter passed");
    return false;
  }

  //TODO allow list of classifications ?
  if (!allowedClassificationList.includes(classificationInput)) {
    console.log("Error: --classification parameter is not allowed");
    return false;
  }

  if (!filenameInput) {
    console.log("Error: no --filename parameter passed");
    return false;
  }

  //TODO validate a valid country
  if (!countryInput) {
    console.log("Error: no --country parameter passed");
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
      // for (const classification of getFilteredClassifications(item)) {
      //   if (!classificationKeys.hasOwnProperty(classification)) {
      //     classificationKeys[classification] = null;
      //   }
      // }
    }
  }
};

/** get filtered classifications
 */
// const getFilteredClassifications = item => {
//   let list = [];
//   const mountainClassifications = item["Classification"].split(",");
//   for (const classification of mountainClassifications) {
//     if (allowedClassificationList.includes(classification)) {
//       list.push(classification);
//     }
//   }
//   return list;
// };

/** Save Challenges
 */
// const saveChallenges = async () => {
//   let created = 0;
//   for (const property in classificationKeys) {
//     let document = await Challenge.findOne({
//       classificationCode: property,
//       countryCode: countryInput
//     }).select("_id");
//     if (!document) {
//       document = new Challenge({
//         title: property + " name",
//         description: property + " description",
//         countryCode: countryInput,
//         classificationCode: property
//       });
//       await document.save();
//       created++;
//     }
//     classificationKeys[property] = document._id;
//   }
//   if (created > 0) {
//     console.log(created + " Challenges created.");
//   }
// };

/** Save Challenge
 */
const saveChallenge = async () => {
    let document = await Challenge.findOne({
      classificationCode: classificationInput,
      countryCode: countryInput
    }).select("_id");
    if (!document) {
      document = new Challenge({
        title: property + " name",
        description: property + " description",
        countryCode: countryInput,
        classificationCode: property
      });
      await document.save();
    }
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
  existing = notExisting = 0;
  for (const item of mountains) {
    const countDocuments = await Mountain.countDocuments({
      dobihId: item.Number
    });
    if (countDocuments == 0) {
      const mountain = hydrateMountain(item);
      await mountain.save();
      notExisting++;
    } else {
      existing++;
    }

    // else if (
      // !mountain["_challenges"] 
      // TODO check how to do this
      //|| !mountain["_challenges"].includes(classificationInput) 
    // ) {
      //TODO: how to populate the ObjectId
      // const challenge = {challengeId};
      // mountain["_challenges"].push(challenge);
      // await mountain.save();
    // }
  
  }



  console.log(notExisting + " mountains created.");
  console.log(existing + " mountains already exist in database.");
};

/** Hydrate Mountain
 */
const hydrateMountain = item => {
  // const challenges = [];
  // for (const classification of getFilteredClassifications(item)) {
  //   challenges.push(classificationKeys[classification]);
  // }

  const position = convertGridRefToEastingNorthing(item["Grid ref 10"]);

  if(!position) {
    console.log('No Grid ref for ' + item["Number"] + ' ' + item["Name"]);
    return;
  }
  return new Mountain({
    dobihId: Number(item["Number"]),
    name: item["Name"],
    metres: Number(item["Metres"]),
    gridRef: item["Grid ref 10"],
    easting: position[0],
    northing: position[1],
    lat: item["Latitude"],
    lng: item["Longitude"],
    //feet: Number(item["Feet"]),
    countryCode: item["Country"],
    _area: areaKeys[item["Area"]],
    _county: countyKeys[item["County"]],
    _challenges: [challengeId]
  });
};

doImport();
