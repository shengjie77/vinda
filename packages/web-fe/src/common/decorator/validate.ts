
export type Validator = (value: any) => boolean;

export type Postprocessor<T> = (value: T) => T;

export function rangeValidator(minVal: number, maxVal: number): Validator {
	return function (value: number) {
		const result = value >= minVal && value <= maxVal;

		if (!result) {
			console.warn(`Value(${value}) must range from ${minVal} to ${maxVal}`);
		}

		return result;
	}
}

export function clampPostprocessor(minVal: number, maxVal: number): Postprocessor<number> {
	return function (value: number) {
		if (value < minVal) {
			return minVal;
		} else if (value > maxVal) {
			return maxVal;
		} else {
			return value;
		}
	}
}

export function validate(validator: Validator, postprocessor?: Postprocessor<any>): PropertyDecorator {
	return function (target: Object, key: string | symbol) {
		let value;
		Object.defineProperty(target, key, {
			set: function (v) {
				if (validator(v)) {
					value = v;
				} else if (postprocessor) {
					value = postprocessor(v);
				}
			}
		})
	}
}
