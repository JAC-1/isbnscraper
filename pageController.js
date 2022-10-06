import pageScraper from "./pageScraper.js";
export default async function scrapeAll(browserInstance){
	let browser;
	try{
		browser = await browserInstance;
		await pageScraper(browser);	
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

