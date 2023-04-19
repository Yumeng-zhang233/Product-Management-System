import React, { useState, useContext } from "react";
import { SigninContext } from "../SigninContext";

function UpdatePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    console.log(email, password);
    setPassword("");
    setEmail("");
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
            <input
              type="submit"
              value="Update password"
              className="login-btn"
            />
          </form>
        </div>{" "}
      </div>
    </div>
  );
}

export default UpdatePassword;
