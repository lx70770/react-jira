import React, { PureComponent } from 'react'

type FallbackRander = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends PureComponent<
  React.PropsWithChildren<{ fallbackRender: FallbackRander }>,
  { error: Error | null }
> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}
