import puppeteer from "puppeteer";

export default async function startBrowser() {
  let browser;
  try {
    console.log("Opening the browser ...");
    browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
      slowMo: 200,
    });
  } catch (err) {
    console.log("Could not create the browser instance");
  }
  return browser;
}
