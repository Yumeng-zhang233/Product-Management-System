import "./App.css";
import React, { useState, useContext } from "react";
import { SigninContext } from "./SigninContext";
import { UserInfoContext } from "./UserInfoContext";
import Signin from "./componet/Signin";
import { useSelector } from "react-redux";

function Body() {
  const { signin, signup } = React.useContext(SigninContext);
  const { isShowSignin, setIsShowSignin } = signin;
  const { isShowSignup, setIsShowSignup } = signup;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let isLoggedin = useSelector((state) => state.status);

  return (
    <div className="body">
      <UserInfoContext.Provider
        value={{
          userEmail: { email, setEmail },
          userPassword: { password, setPassword },
        }}
      >
        {isShowSignin && !isLoggedin && <Signin />}
      </UserInfoContext.Provider>
    </div>
  );
}

export default Body;
