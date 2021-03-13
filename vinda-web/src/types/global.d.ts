import { Page, Browser } from 'puppeteer';
import { Equalable } from 'src/types';

declare global {

	const page: Page;

	const browser: Browser;

}
