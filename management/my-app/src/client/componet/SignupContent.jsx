import React, { useState, useContext } from "react";
import { SigninContext } from "../SigninContext";
import { UserInfoContext } from "../UserInfoContext";
import { addUser } from "../actions/index";
import { useDispatch } from "react-redux";

function SignupContent() {
  const dispatch = useDispatch();

  const { signin, signup, update } = React.useContext(SigninContext);
  const { userEmail, userPassword } = React.useContext(UserInfoContext);

  const { email, setEmail } = userEmail;
  const { password, setPassword } = userPassword;
  const { isShowSignup, setIsShowSignup } = signup;
  const { isShowSignin, setIsShowSignin } = signin;
  const { isupdatePassword, setUpdatePassword } = update;

  const handleChange = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(addUser({ email, password }));
    // addUser({ email, password });
    setPassword("");
    setEmail("");
    setIsShowSignin(false);
  };
  const onClick = () => {
    setIsShowSignup(false);
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
            <input type="submit" value="Creat account" className="login-btn" />
            <span className="account_note">Already have an account?</span>
            <span className="signin_button" onClick={onClick}>
              Sign in{" "}
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

export default SignupContent;