import { Browser } from "puppeteer";

const config = require('../../package.json')['vinda'];
const port = config.testbedPort;

export async function screenshotOf(browser: Browser, fn: () => void) {
	const page = await browser.newPage();
	await page.goto(`http://localhost:${port}`);

	await page.exposeFunction('fn', fn);
	await page.evaluate(fn);
	const image = await page.screenshot();
	await page.close();

	return image;
}
