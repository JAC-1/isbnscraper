import startBrowser from "./browser.js";
import scraperController from "./pageController.js";
import excelReader from "./excelReader.js";
import inDb from "./inDB.js";
// import { books } from "./db.js";
import searchGoogle from "./googleSearch.js";

// Start the browser and create a browser instance
let browserInstance = startBrowser();
async function getIsbn() {
  let rawIsbns;
  const path = "./RawBarcodes.xlsx";
  rawIsbns = await excelReader(path);
  let isbns = await inDb(rawIsbns);
  // searchGoogle(isbns);
  scraperController(browserInstance, isbns);
}
getIsbn();
