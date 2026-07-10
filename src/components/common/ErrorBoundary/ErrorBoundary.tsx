import React from "react";
import ErrorFallBack from "./ErrorFallback";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error Boundary:", error);
    console.error(info);
  }
  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <ErrorFallBack error={this.state.error} resetError={this.resetError} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
