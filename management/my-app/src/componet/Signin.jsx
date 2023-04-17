import React, { useState, useContext } from "react";
import { SigninContext } from "../SigninContext";
import Modal from "./MyModal";
import { Button } from "antd";
import PopWindow from "../PopWindow";
import SigninContent from "./SigninContent";
import SignupContent from "./SignupContent";
import UpdatePassword from "./UpdatePassword";

function Signin() {
  //   const [isShowSignin, setIsShowSignin] = React.useContext(SigninContext);
  const { signin, signup, update } = React.useContext(SigninContext);
  const { isShowSignin, setIsShowSignin } = signin;
  const { isShowSignup, setIsShowSignup } = signup;
  const { isupdatePassword, setUpdatePassword } = update;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    console.log(email, password);
    setPassword("");
    setEmail("");
  };
  const signinHeader = "Sign in to your account";
  const signupHeader = "Sign up an account";
  const updateHeader = "Update your password";

  if (isShowSignup) {
    return (
      <div>
        <Modal titleText={signupHeader} visible={isShowSignin}>
          {" "}
          {<SignupContent />}
        </Modal>
      </div>
    );
  } else if (isupdatePassword) {
    return (
      <div>
        <Modal titleText={updateHeader} visible={isShowSignin}>
          {" "}
          {<UpdatePassword />}
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <Modal titleText={signinHeader} visible={isShowSignin}>
          {" "}
          {<SigninContent />}
        </Modal>
      </div>
    );
  }
}

export default Signin;
