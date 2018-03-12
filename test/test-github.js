
const {resolve} = require("path");
const extension = resolve(__dirname, "..");

const assert = require('assert');
const puppeteer = require('puppeteer');

let browser;

before(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      `--load-extension=${extension}`,
      `--disable-extensions-except=${extension}`,
    ],
  });
});

describe('Execute Actions', function() {
  this.timeout(10000);
  it('should run the scenario with Puppeteer', async function() {
    const page = await browser.newPage();
    await page.goto('https://github.com/zombie/blind-reviews/pull/1');
    

    const br = await page.$("#br-toggle");
    const bb = await br.boundingBox();

    assert(bb.height > 20, "tall");    
    assert(bb.width > 30, "wide");    

    browser.close();  
    console.log(' 🎉 ');
  });
});
