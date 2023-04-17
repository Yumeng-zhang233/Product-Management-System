import "./App.css";
import React, { useState, useContext } from "react";
import { SigninContext } from "./SigninContext";

import Signin from "./componet/Signin";

function Body() {
  const { signin, signup } = React.useContext(SigninContext);
  const { isShowSignin, setIsShowSignin } = signin;
  const { isShowSignup, setIsShowSignup } = signup;

  return <div className="body">{isShowSignin && <Signin />}</div>;
}

export default Body;
