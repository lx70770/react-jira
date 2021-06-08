import { useEffect, useState } from 'react'

export const useDebounce = <V>(value: V, delay?: number) => {
	const [debounceValue, setDebounceValue] = useState(value)

	useEffect(() => {
		const timer = setTimeout(() => setDebounceValue(value), delay || 0)
		return () => clearTimeout(timer)
	}, [value, delay])

	return debounceValue
}
