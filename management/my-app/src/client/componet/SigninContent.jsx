import React, { useState, useContext } from "react";
import { SigninContext } from "../SigninContext";
import { UserInfoContext } from "../UserInfoContext";
import { useDispatch } from "react-redux";
import { login } from "../actions/index";

function SigninContent() {
  const dispatch = useDispatch();

  const { signin, signup, update } = React.useContext(SigninContext);
  const { userEmail, userPassword } = React.useContext(UserInfoContext);
  const { email, setEmail } = userEmail;
  const { password, setPassword } = userPassword;
  const { isShowSignup, setIsShowSignup } = signup;
  const { isupdatePassword, setUpdatePassword } = update;
  const { isShowSignin, setIsShowSignin } = signin;

  const handleChange = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(login({ email, password }));

    setPassword("");
    setEmail("");
    setIsShowSignin(false);
  };

  const handleSignup = () => {
    setIsShowSignup(true);
  };
  const handleUpdatePassword = () => {
    setUpdatePassword(true);
    setIsShowSignup(false);
  };

  return (
    <div>
      <div className="box">
        <div className="form-box solid">
          <form onSubmit={handleChange}>
            <label>Email</label>
            <br></br>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-box"
            />
            <br></br>
            <label>Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              className="login-box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <input type="submit" value="Sign in" className="login-btn" />
            <span className="account_note">Don't have an account?</span>
            <span className="signup_button" onClick={handleSignup}>
              Sign up{" "}
            </span>
            <span className="signup_note" onClick={handleUpdatePassword}>
              Forgot password?
            </span>
          </form>
        </div>{" "}
      </div>
    </div>
  );
}

export default SigninContent;
