import React from 'react';
import { useNavigate } from 'react-router-dom';

// HOC to use hooks inside class components
function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class ErrorBoundaryBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // Optional: log error to a service
  }

  handleGoToLogin = () => {
    this.props.navigate('/login');
  };

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Oops, something went wrong.</h2>
          <p>Please try again or log in again if the session expired.</p>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={this.handleRetry} style={{ marginRight: '1rem' }}>
              🔄 Retry
            </button>
            <button onClick={this.handleGoToLogin}>🔐 Go to Login</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary = withNavigation(ErrorBoundaryBase);
export default ErrorBoundary;
