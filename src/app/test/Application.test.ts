import { Application } from 'src/app/Application';

describe('test', () => {
	test('aa', () => {
		const app = Application.create();
		expect(app instanceof Application).toBeTruthy();
	})
})
