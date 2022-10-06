// const isbns = ["4065294266", '4022650591', '9781599664026']
const isbns = ['9781599664026']
const urls = {
  "Booklog": ["https://booklog.jp/item/1/", ".item-info-author"],
  "Bookfinder": [
    "https://www.bookfinder.com/search/?isbn=",
    "&mode=isbn&st=sr&ac=qr",
    ".attributes"
  ],
}
// todo: 
//  - make "urls" an object to make it more managable
//  - use args to customize puppeteer queries (page.$eval()) -> customization depending on the sites
async function bookfinderQuery(isbn, browser) {
  let url1 = urls["Bookfinder"][0];
  let url2 = urls["Bookfinder"][1];
  let waitSelector = urls["Bookfinder"][2];
  return await pagePromise(url1, url2, waitSelector, isbn, browser)
}

async function booklogQuery(isbn, browser) {
  let url1 = urls["Booklog"][0];
  let url2 = null;
  let waitSelector = urls["Booklog"][1];
  return await pagePromise(url1, url2, waitSelector, isbn, browser)
}


async function pagePromise(url1, url2, waitSelector, isbn, browser) {
  const url = url2 ? (url1 + isbn + url2) : (url1 + isbn);
  const page = await browser.newPage();
  console.log(`Navigating to ${url}.`);
  await page.goto(url);
  // Wait for the required DOM elements to be loaded
  // await page.waitForSelector('#coverImageContainer');
  try {
    // See if item can be found on Booklog
    await page.waitForSelector(waitSelector, {timeout: 2500} );
  } 
  catch (e) {
    console.log("Book not found at booklog.jp.\n Trying bookfinder.com...");
    return false
   }


  // Get the links to all the required books
  let dataObj = {};

  dataObj["Title"] = await page.$eval('[itemprop=name]', text => text.textContent) 
  dataObj["Author"] = await page.$eval('[itemprop=author]' , text => text.textContent) 
  dataObj["Publisher"] = await page.$eval('[itemprop=publisher]', text => text.textContent)
  let about = await page.$eval('[itemprop=description]', text => text.textContent)
  let pageCount = await page.$eval('.info-area > ul > li', text => text.textContent)

  dataObj["Page Count"] = pageCount.split("(")[1].slice(0,3);
  dataObj["About"] = about;

  return dataObj
}

const timeGenerator = () => {
  let num = Math.round((Math.random(3) * 4) * 1000) 
  return (num > 1000) ? num : 1231
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function scraper(browser) {
  for (let i = 0; i < isbns.length; i++) {
    const time = timeGenerator()
    let currentPageData = await booklogQuery(isbns[i], browser);
    if (currentPageData) {
      console.log(currentPageData) // will be replaced with data push
      await timeout(time)
      console.log("Time waited before execution", time)
    } else {
      currentPageData = await bookfinderQuery(isbns[i], browser);
      console.log(currentPageData) // will be replaced with data push
    }
    console.log("Time waited before execution", time)
  }
}
