export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: object) => {
	if (!object) {
		return {}
	}
	const result = { ...object }
	Object.keys(result).forEach(key => {
		// @ts-ignore
		const value = result[key]
		if (isVoid(value)) {
			// @ts-ignore
			delete result[key]
		}
	})
	return result
}
