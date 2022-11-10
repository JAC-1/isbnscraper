import { urls } from "./resouce/siteResources.js";
import writeData from "./writeToDb.js";

async function pagePromise(url, fields, page) {
  console.log(`Navigating to ${url}.`);
  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  const result = Object.entries(fields).reduce(async (acc, [field, queryString]) => {
    try {
      // Clean me please
      url[12] == "e" // Check if it's English books url
        ? await page.click(".product_info_wrapper > a")
        : await page.click(".titleLink");
      await page.waitUntil("networkidle");
    } finally {
      try {
        const value = await page.$eval(queryString, (text) => text.textContent);
        return { ...(await acc), [field]: value };
      } catch (err) {
        console.log("Failed pluck for:", field);
        return acc;
      }
    }
  }, {});

  return result;
}

const iterateThroughURLs = (urls, page) => async (data, isbn) => {
  await data;
  for (const { name, url, fields } of urls) {
    // console.log(`${position} : Trying to find data on ${name} for ${isbn}...`);
    console.log(`Trying to find data on ${name} for ${isbn}...`);
    try {
      const pageData = await pagePromise(url(isbn), fields, page);
      if (pageData.title) {
        let result = { ...data, [isbn]: pageData };
        return await writeData(result);
      }
    } catch (err) {
      console.log(`Couldn't find the isbn resource on ${name}`);
    }
  }
  console.log(`Couldn't find any information for isbn: ${isbn} \n`);
};

export default async function scraper(browser, isbns) {
  const newPage = await browser.newPage();
  const isbnData = await isbns.reduce(await iterateThroughURLs(urls, newPage), {});

  console.log("final result", JSON.stringify(isbnData));
  await browser.close();
  return isbnData;
}
