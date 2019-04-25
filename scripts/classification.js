/**
 * get information from CSV about mountains in a classification
 * node scripts/classification.js --filename=absoluteFilePath.csv
 */

const _ = require("lodash");
const args = require("minimist")(process.argv.slice(2));
const csv = require("csvtojson");

const columns = /(Name|Metres|Classification|Country)/;
const filenameInput = args["filename"] || null;
const classificationInput = args["classification"] || false;

let results = [];
const allowedClassifications = "D,Sy,Fel,B,W,WO,M,F,C,G,5";

/** Run Import
 */
const doImport = async () => {
  if (!filenameInput) {
    console.log("Error: no --filename parameter passed");
    return;
  }
  await parseFile();
  console.log(convertToCSV(results));
};

convertToCSV = () => {
  let list = [];
  list.push(
    "classification,country,<300,total,smallest,smallest name,tallest,tallest name"
  );
  for (const item of results) {
    list.push(
      [
        item.classification,
        item.country,
        item.totalUnder300,
        item.total,
        item.smallest,
        item.smallestName,
        item.tallest,
        item.tallestName
      ].join()
    );
  }
  return list;
};

/** Parse file
 */
const parseFile = async () => {
  const jsonArray = await csv({ includeColumns: columns }).fromFile(
    filenameInput
  );
  const classificationList = allowedClassifications.split(",");
  for (const item of jsonArray) {
    const mountainClassifications = item["Classification"].split(",");
    for (const classification of mountainClassifications) {
      if (classificationList.includes(classification)) {
        const country = item["Country"];
        processItem(item, getResultsIndex(classification, item["Country"]));
      }
    }
  }
};

/** get Index
 */
const getResultsIndex = (classification, country) => {
  for (i = 0; i < results.length; i++) {
    if (
      results[i].country == country &&
      results[i].classification == classification
    ) {
      return i;
    }
  }
  return addEmptyResult(classification, country);
};

const addEmptyResult = (classification, country) => {
  results.push({
    classification: classification,
    country: country,
    total: 0,
    totalUnder300: 0,
    smallest: 0,
    tallest: 0
  });
  return results.length - 1;
};

const processItem = (item, index) => {
  const metres = Number(item["Metres"]);
  results[index].total++;
  if (metres < 300) {
    results[index].totalUnder300++;
    console.log(item["Name"] + " " +item["Metres"]);
  }
  if (results[index].smallest == 0 || metres < results[index].smallest) {
    results[index].smallestName = item["Name"];
    results[index].smallest = metres;
  }
  if (results[index].tallest == 0 || metres > results[index].tallest) {
    results[index].tallestName = item["Name"];
    results[index].tallest = metres;
  }
};

doImport();
