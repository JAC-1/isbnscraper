import startBrowser from "./browser.js";
import scraperController from "./pageController.js";
import excelReader from "./excelReader.js";
// import { books } from "./db.js";

// Start the browser and create a browser instance
let browserInstance = startBrowser();

// Wait to read the isbn file
const path = "./test.xlsx"
const isbns = excelReader(path);

scraperController(browserInstance, isbns);

// function findBooks() {
//   console.log("Getting stuck running google Alg");
//   const noIsbnData = googleBooks(isbns);
//   scraperController(browserInstance, noIsbnData);
// }


// scraperController(browserInstance)

