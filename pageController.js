import pageScraper from "./pageScraper.js";
import excelReader from "./excelReader.js";
export default async function scrapeAll(browserInstance, xlsxData){
	let browser;
  let isbns;
	try{
		browser = await browserInstance;
    isbns = await xlsxData;
		await pageScraper(browser, isbns);	
    // await pageScraper(browser)
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

