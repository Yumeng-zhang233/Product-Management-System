import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import { SigninContext } from "./SigninContext";
function Fallback() {
  const { errorExplode } = React.useContext(SigninContext);
  const { explode, setExplode } = errorExplode;

  //   const handleClick = () => {
  //     window.location.reload(false);
  //   };
  return (
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
        <Button onClick={() => window.location.reload(false)}>Go home</Button>
      </div>
    </div>
  );
}
export default Fallback;
