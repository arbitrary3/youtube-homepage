import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, errorInfo: null };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      this.setState({
        errorInfo: errorInfo,
      });
      console.error("Error caught in ErrorBoundary: ", error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div>
            <h2>Something went wrong. Please try again later.</h2>
          </div>
        );
      }
  
      return this.props.children; 
    }
}