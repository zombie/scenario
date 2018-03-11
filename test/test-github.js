
const {resolve} = require("path");
const extension = resolve(__dirname, "../ext/");

const assert = require('assert');
const puppeteer = require('puppeteer');

describe('Execute Actions', function () {
  this.timeout(90000);
  it('should run the scenario with Puppeteer', async function() {
    const browser = await puppeteer.launch({
      args: [
        `--disable-extensions-except=${extension}`,
        `--load-extension=${extension}`,
        '--disable-setuid-sandbox',
        '--no-sandbox',
      ],
      headless: false,
    });
    // console.log("bb", browser);
    
    const page = await browser.newPage();
    await page.goto('https://github.com/zombie/blind-reviews/pull/1');
    const title = await page.title();
    const x = await page.$("#br-toggle");
    const bb = x && await x.boundingBox();

    assert(bb.height > 20, "tall");    
    assert(bb.width > 30, "wide");    

    await new Promise(r => setTimeout(r, 10000));
    browser.close();
  
    console.log(' 🎉 ');
  });
});
