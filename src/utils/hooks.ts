import { useEffect, useState } from 'react'

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay || 0)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounceValue
}
