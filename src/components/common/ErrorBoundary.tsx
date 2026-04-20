import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center">
              <h2 className="text-heading-5 font-bold text-red-500 mb-2">
                오류가 발생했습니다
              </h2>
              <p className="text-body-2 text-gray-700">
                {this.state.error?.message || '데이터를 불러올 수 없습니다.'}
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
