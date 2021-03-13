
export type ConstructorOf<T, Static = {}> = {
	new (...args: any[]): T;
} & Static
