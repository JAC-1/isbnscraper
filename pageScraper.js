import { urls } from "./siteResources.js";
const isbns = ["0061964360", "0199535566"];
// const isbns = ['9781599664026']

async function pagePromise(url, fields, page) {
  console.log(`Navigating to ${url}.`);
  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  const result = Object.entries(fields).reduce(
    async (acc, [field, queryString]) => {
      try {
        const value = await page.$eval(queryString, (text) => text.textContent);
        return { ...await acc, [field]: value };
      } catch(err) {
        console.log('Failed pluck for:', field);
        return acc;
      }
    },
  {});

  console.warn('Reduced value:', JSON.stringify(result));

  return result;
}

const iterateThroughURLs = (urls, page) => async (data, isbn) => {
  for (const { name, url, fields } of urls) {
    console.log(`Trying to find data on ${name}...`);
    try {
      const pageData = await pagePromise(url(isbn), fields, page);
      if (pageData) return { ...data, [isbn]: pageData };
    } catch (err) {
      console.log(`Couldn't find the isbn resource on ${name}`);
    }
  }
  console.log(`Couldn't find any information for isbn: ${isbn}`);
  return data;
};

export default async function scraper(browser) {
  const newPage = await browser.newPage();
  const isbnData = await isbns.reduce(await iterateThroughURLs(urls, newPage), {});

  console.log('final result', JSON.stringify(isbnData));
  await browser.close();
  return isbnData;
}
