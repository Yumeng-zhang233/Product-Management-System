import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: "", stack: "" },
    info: { componentStack: "" },
  };

  static getDerivedStateFromError = (error) => {
    console.log("ccc");
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    console.log("bbb");
    // this.setState({ hasError: true });

    this.setState({ error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    console.log(error, info);
    const { children } = this.props;

    return hasError ? (
      <div>
        <div className="error_icon">
          {" "}
          <img
            src="https://static.thenounproject.com/png/1073692-200.png"
            alt=""
          />
        </div>
        <div className="error_boundary">
          {" "}
          <h1>Oops, something went wrong</h1>
        </div>
        <div className="error_boundary">
          {" "}
          <Button
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            Go home
          </Button>
        </div>
      </div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
