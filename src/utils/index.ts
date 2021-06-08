import { useEffect } from 'react'
import apiUrl from './api-url'
import { useDebounce } from './useDebounce'

export { apiUrl, useDebounce }

export const isFalsy = (value: any) => (value === 0 ? false : !value)

export const isVoid = (value: any) => value === undefined || value === null || value === ''

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

export const useMount = (callback: () => void) => {
	useEffect(() => {
		callback()
	}, [])
}
