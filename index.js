import startBrowser from "./browser.js";
import scraperController from "./pageController.js";
// import { books } from "./db.js";

// Start the browser and create a browser instance
let browserInstance = startBrowser();

// Pass the browser instance tot he scraper controller
scraperController(browserInstance)

// books.push("something");

// console.log(books)
