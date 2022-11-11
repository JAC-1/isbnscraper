import startBrowser from "./scraper/browser.js";
import scraperController from "./scraper/pageController.js";
import excelReader from "./excel/excelReader.js";
import isbnsNotInDb from "./scripts/inDB.js";

let browserInstance = startBrowser();
async function getIsbn() {
  const path = "./RawBarcodes.xlsx";
  const rawIsbns = await excelReader(path);
  const isbnsToScrape = await isbnsNotInDb(rawIsbns);
  console.log(`Resuming from ${isbnsToScrape[0]}`);
  scraperController(browserInstance, isbnsToScrape);
}
getIsbn();

// TODO
//  - Add script that adds missed values to another database
//  - Move things into their own files and change imports accordingly
//  - Add numbers to duplicate isbns
