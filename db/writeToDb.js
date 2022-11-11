import { addContentsToDb } from "./dbManager.js";
import { removeStringFormating } from "../scripts/stringCleaner.js";

export default async function writeToDb(data) {
  const cleanData = removeStringFormating(data);
  addContentsToDb(cleanData);
}
