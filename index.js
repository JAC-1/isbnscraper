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
  console.log(isbns)
  scraperController(browserInstance, isbns);
}
getIsbn()

// Wait to read the isbn file
<<<<<<< HEAD
const path = "./biggertest.xlsx"
const isbns = excelReader(path);
//insert google books check here
scraperController(browserInstance, isbns)
// scraperController(browserInstance)
=======

// function findBooks() {
//   console.log("Getting stuck running google Alg");
//   const noIsbnData = googleBooks(isbns);
//   scraperController(browserInstance, noIsbnData);
// }

>>>>>>> dev

// scraperController(browserInstance)

