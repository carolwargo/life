import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
    // Set state to indicate that an error occurred
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return <h1>Something went wrong.</h1>;
    }
    // Render children normally if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
