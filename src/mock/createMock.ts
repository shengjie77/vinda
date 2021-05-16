
export function createMock<T>(): Mock<T> {
	const mock = new Proxy({}, {
		get: (target: any, property) => {
			if (!target[property]) {
				target[property] = jest.fn();
			}

			return target[property];
		}
	})

	return mock as Mock<T>;
}

type Mock<T> = {
	[P in keyof T]: jest.Mock;
} & T;
