
const {resolve} = require("path");
const extension = resolve(__dirname, "..");

const {expect} = require("chai");
const {launch} = require('puppeteer');

const launched = launch({
  headless: false,
  args: [
    '--no-sandbox',
    `--load-extension=${extension}`,
    `--disable-extensions-except=${extension}`,
  ],
});

async function newPage(url) {
  const browser = await launched;
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

after(async () => {
  (await launched).close();
});

describe('Execute Actions', function() {
  it('should run the scenario with Puppeteer', async function() {
    const page = await newPage("https://github.com/zombie/blind-reviews/pull/1");
    
    const br = await page.$("#br-toggle");
    const bb = await br.boundingBox();

    expect(bb.width).to.be.above(20);
    expect(bb.height).to.be.above(20);
  });
});
