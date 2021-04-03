import { Application } from 'src/app/Application';

describe('test', () => {
	test('bb', () => {
		const app = Application.create();
		expect(app instanceof Application).toBeTruthy();
	})
})
