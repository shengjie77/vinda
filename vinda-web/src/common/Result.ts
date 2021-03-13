
export class Result<T> {

	public static create<V>(rd: RDResult<V>): Result<V> {
		return new Result(rd);
	}

	public static success<V>(value: V): Result<V> {
		return Result.create({
			ok: true,
			value,
		})
	}

	public static error<V>(msg?: string): Result<V> {
		return Result.create({
			ok: false,
			message: msg,
		})
	}

	constructor(rd: RDResult<T>) {
		this.ok = rd.ok;
		this.message = rd.message ?? '';
		this.value = rd.value;
	}

	public ok: boolean;

	public message: string;

	public value?: T;

}

interface RDResult<T> {
	ok: boolean;
	message?: string;
	value?: T;
}
