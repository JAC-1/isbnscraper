import startBrowser from "./browser.js";
import scraperController from "./pageController.js";
import excelReader from "./excelReader.js";
import whichIsbnsNotInDb from "./inDB.js";

let browserInstance = startBrowser();
async function getIsbn() {
  const path = "./RawBarcodes.xlsx";
  const rawIsbns = await excelReader(path);
  const isbnsToScrape = await whichIsbnsNotInDb(rawIsbns);
  console.log(`Resuming from ${isbnsToScrape[0]}`);
  scraperController(browserInstance, isbnsToScrape);
}
getIsbn();

// TODO
//  - Add script that adds missed values to another database
//  - Move things into their own files and change imports accordingly
//  - Add numbers to duplicate isbns
