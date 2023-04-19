import "./App.css";
import React, { useState, useContext } from "react";
import { SigninContext } from "./SigninContext";

function PopWindow() {
  const [isShowSignin, setIsShowSignin] = useContext(SigninContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    console.log(email, password);
    setPassword("");
    setEmail("");
  };
  return (
    <div class="popup">
      <div className="box">
        <div className="form-box solid">
          <button
            className="close-icon"
            onClick={() => {
              setIsShowSignin(false);
            }}
          >
            x
          </button>
          <form onSubmit={handleChange}>
            <h1 className="login-text">Sign in to your account</h1>
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
            <input type="submit" value="LOGIN" className="login-btn" />
            <span className="account_note">Don't have an account? Sign up</span>
            <span className="signup_note">Forgot password?</span>
          </form>
        </div>{" "}
      </div>
    </div>
  );
}

export default PopWindow;
