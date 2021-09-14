import { useState } from 'react'
import { useMountedRef } from 'utils/common'

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = { stat: 'idle', data: null, error: null }

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({ ...defaultInitialState, ...initialState })
  const mountedRef = useMountedRef()

  const setData = (data: D | null) => setState({ data, stat: 'success', error: null })

  const setError = (error: Error) => setState({ error, stat: 'error', data: null })

  // 触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('Promise is required')
    }
    setState({ ...state, stat: 'loading' })

    return promise
      .then(data => {
        if (mountedRef.current) setData(data)
        return data
      })
      .catch(error => {
        if (mountedRef.current) setError(error)
        return error
      })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state
  }
}
