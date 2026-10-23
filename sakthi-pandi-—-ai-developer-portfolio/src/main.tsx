import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled portfolio error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#0a0204] border border-[#ff2a2a]/40 p-8 shadow-2xl space-y-4">
            <div className="w-3 h-3 bg-[#ff2a2a] rounded-full mx-auto animate-pulse" />
            <h1 className="text-xl font-bold font-mono tracking-wider text-[#ff2a2a]">
              PORTFOLIO INITIALIZATION ERROR
            </h1>
            <p className="text-sm text-[#b8b8b8] leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-2.5 bg-[#ff2a2a] hover:bg-[#c4161c] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
            >
              RELOAD APPLICATION
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
