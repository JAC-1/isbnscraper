import { getDbData } from "./dbManager.js";

export default async function whichIsbnsNotInDb(excelIsbns) {
  // Returns array of numbers that are not already in local db
  const data = await getDbData();
  const numOfDbEntries = data.map((i) => parseInt(Object.keys(i))).flat();
  const unscrapedIbns = excelIsbns.slice(numOfDbEntries.length);
  return unscrapedIbns;
}
