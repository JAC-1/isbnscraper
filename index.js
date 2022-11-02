import startBrowser from "./browser.js";
import scraperController from "./pageController.js";
import excelReader from "./excelReader.js";
import inDb from "./inDB.js";
// import { books } from "./db.js";

// Start the browser and create a browser instance
let browserInstance = startBrowser();
async function getIsbn() {
  let rawIsbns;
  const path = "./biggertest.xlsx"
  rawIsbns = await excelReader(path);
  let isbns = await inDb(rawIsbns)
  scraperController(browserInstance, isbns);
}
getIsbn()

