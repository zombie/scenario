
const assert = require('assert');
const puppeteer = require('puppeteer');

describe('Execute Actions', function () {
	this.timeout(40000);
	describe('Run Scenario', function() {
		it('should run the scenario with Puppeteer', async function() {
            const browser = await puppeteer.launch({headless: false, args:['--no-sandbox']});
			const page = await browser.newPage();
			await page.goto("http://example.com/");
			assert(await page.title() === "Example Domain");
		});
	});
});
