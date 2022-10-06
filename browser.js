import puppeteer from "puppeteer";

export default async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser ...");
    browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      'ignoreHTTPSErrors': true
    });
  } catch (err) {
    console.log("Coud not create the browser instance");
  }
  return browser;
}

