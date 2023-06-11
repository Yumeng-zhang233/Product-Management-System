import React, { useState, useContext, useEffect } from "react";
import { SigninContext } from "../SigninContext";
import { UserInfoContext } from "../UserInfoContext";
import { addUser } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

function SignupContent() {
  const dispatch = useDispatch();

  const { signin, signup, update } = React.useContext(SigninContext);
  const { userEmail, userPassword, userInfo } =
    React.useContext(UserInfoContext);

  const { email, setEmail } = userEmail;
  const { password, setPassword } = userPassword;
  const { user, setUser } = userInfo;
  const { isShowSignup, setIsShowSignup } = signup;
  const { isShowSignin, setIsShowSignin } = signin;
  const { isupdatePassword, setUpdatePassword } = update;
  const isLoggedin = useSelector((state) => state.login);

  const handleChange = (e) => {
    e.preventDefault();
    const res = localStorage.getItem("unkonowUser");
    let guest = [];
    if (res) {
      guest = JSON.parse(res);
    }
    dispatch(addUser({ email, password, guest }));
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
