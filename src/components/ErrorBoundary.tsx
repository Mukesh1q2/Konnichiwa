'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  level?: 'page' | 'component' | 'section';
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error info
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry, LogRocket, etc.
      // reportError(error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI based on level
      switch (this.props.level) {
        case 'page':
          return <PageError error={this.state.error} onReload={this.handleReload} />;
        case 'section':
          return <SectionError error={this.state.error} onReset={this.handleReset} />;
        default:
          return <ComponentError error={this.state.error} onReset={this.handleReset} />;
      }
    }

    return this.props.children;
  }
}

// Page-level error component
function PageError({ error, onReload }: { error?: Error; onReload: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-16 w-16 text-red-500">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          {process.env.NODE_ENV === 'development' && error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-left">
              <p className="text-xs text-red-800 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={onReload}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

// Section-level error component
function SectionError({ error, onReset }: { error?: Error; onReset: () => void }) {
  return (
    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <div className="h-5 w-5 text-red-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Content temporarily unavailable
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>This section couldn't be loaded. Please try again.</p>
          </div>
          <div className="mt-4">
            <div className="flex space-x-2">
              <button
                onClick={onReset}
                className="text-sm bg-red-100 border border-red-300 rounded-md px-3 py-1 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Try again
              </button>
            </div>
          </div>
          {process.env.NODE_ENV === 'development' && error && (
            <div className="mt-2 p-2 bg-red-100 rounded text-xs font-mono text-red-800">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Component-level error component
function ComponentError({ error, onReset }: { error?: Error; onReset: () => void }) {
  return (
    <div className="p-2 text-center">
      <div className="text-red-500 text-sm">
        ⚠️ Component error
      </div>
      <button
        onClick={onReset}
        className="mt-1 text-xs text-blue-600 hover:text-blue-800 underline"
      >
        Reset
      </button>
      {process.env.NODE_ENV === 'development' && error && (
        <div className="mt-1 p-1 bg-red-50 rounded text-xs font-mono text-red-800">
          {error.message}
        </div>
      )}
    </div>
  );
}

// HOC for wrapping components with error boundaries
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Hook for manual error handling
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const handleError = React.useCallback((error: Error) => {
    console.error('Manual error handler:', error);
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { handleError, resetError };
}

// Server-side error boundary for Next.js
export function createServerErrorBoundary() {
  return function ErrorBoundaryWrapper({ children }: { children: ReactNode }) {
    return (
      <ErrorBoundary level="page">
        {children}
      </ErrorBoundary>
    );
  };
}