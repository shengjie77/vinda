import { Application } from 'src/app/Application';

describe('test', () => {
	test('cc', () => {
		const app = Application.create();
		expect(app instanceof Application).toBeTruthy();
	})
})
