import * as Sentry from '@sentry/react'
import { ErrorBoundaryProps } from '@sentry/react/dist/errorboundary'
import React from 'react'

interface Props extends Omit<ErrorBoundaryProps, 'fallback'> {
  children: React.ReactNode
  fallback: React.ReactNode
}

export const SentryErrorBoundary = ({ children, fallback, ...props }: Props) => {
  return (
    <Sentry.ErrorBoundary {...props} fallback={fallback}>
      {children}
    </Sentry.ErrorBoundary>
  )
}
