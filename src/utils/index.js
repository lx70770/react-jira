import { useEffect } from 'react'
import apiUrl from './api-url'
import { useDebounce } from './useDebounce'

export { apiUrl, useDebounce }

export const isFalsy = value => (value === 0 ? false : !value)

export const isVoid = value => value === undefined || value === null || value === ''

export const cleanObject = object => {
	if (!object) {
		return {}
	}
	const result = { ...object }
	Object.keys(result).forEach(key => {
		const value = result[key]
		if (isVoid(value)) {
			delete result[key]
		}
	})
	return result
}

export const useMount = callback => {
	useEffect(() => {
		callback()
	}, [])
}
