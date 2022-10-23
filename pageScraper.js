import { urls } from "./siteResources.js";
import writeData from "./writeToDb.js";
// const isbns = ["9784523265436"];
// const isbns = ["4065249716", "9784523265436"];
// const isbns = ['9781599664026']

async function pagePromise(url, fields, page) {
  console.log(`Navigating to ${url}.`);
  await page.goto(url, {
      waitUntil: "networkidle2",
  });
  const result = Object.entries(fields).reduce(
    async (acc, [field, queryString]) => {
      try {
        await page.click(".titleLink");
        await page.waitForSelector(".img_genre1");
      } finally {
        try {
          const value = await page.$eval(queryString, (text) => text.textContent);
          return { ... await acc, [field]: value };
        } catch (err) {
          console.log('Failed pluck for:', field);
          return acc;
        }
      }
    },
    {});

  return result;
}




const iterateThroughURLs = (urls, page) => async (data, isbn) => {
  await data
  for (const { name, url, fields } of urls) {
    console.log(`Trying to find data on ${name}...`);
    try {
      const pageData = await pagePromise(url(isbn), fields, page);
      if (pageData.title) {
        let result = { ...data, [isbn]: pageData };
        return await writeData(result)
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

  console.log('final result', JSON.stringify(isbnData));
  await browser.close();
  return isbnData;
}
