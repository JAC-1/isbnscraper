import pageScraper from "./pageScraper.js";
import excelReader from "./excelReader.js";
import googleBooks from "./googleSearch.js";
export default async function scrapeAll(browserInstance, xlsxData){
	let browser;
  let isbns;
  let isbnsToScrape;
	try{
		browser = await browserInstance;
    isbns = await xlsxData;
    // isbnsToScrape = await googleBooks(isbns);
    // console.log(isbnsToScrape);
		// await pageScraper(browser, isbnsToScrape);	
    await pageScraper(browser, isbns);
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

