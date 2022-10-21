import startBrowser from "./browser.js";
import scraperController from "./pageController.js";
import excelReader from "./excelReader.js";
// import { books } from "./db.js";

// Start the browser and create a browser instance
let browserInstance = startBrowser();

// Wait to read the isbn file
const path = "./biggertest.xlsx"
const isbns = excelReader(path);
//insert google books check here
scraperController(browserInstance, isbns)
// scraperController(browserInstance)


