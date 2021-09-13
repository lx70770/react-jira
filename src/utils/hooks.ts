import { useEffect, useState, useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

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

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return [
    useMemo(
      () =>
        keys.reduce((prev, key: K) => {
          return { ...prev, [key]: searchParams.get(key) || '' }
        }, {} as { [key in K]: string }),
      [searchParams, keys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
      setSearchParams(o)
    }
  ] as const
}
