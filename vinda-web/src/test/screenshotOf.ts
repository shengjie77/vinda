
const port = 8081;

export async function screenshotOf(fn: () => void) {
	const page = await browser.newPage();
	await page.goto(`http://localhost:${port}`);

	await page.exposeFunction('fn', fn);
	await page.evaluate(fn);
	const image = await page.screenshot();
	await page.close();

	return image;
}
