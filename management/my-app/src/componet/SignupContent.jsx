import React, { useState, useContext } from "react";
import { SigninContext } from "../SigninContext";

function SignupContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, signup, update } = React.useContext(SigninContext);
  const { isShowSignup, setIsShowSignup } = signup;
  const { isupdatePassword, setUpdatePassword } = update;

  const handleChange = (e) => {
    e.preventDefault();
    console.log(email, password);
    setPassword("");
    setEmail("");
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
