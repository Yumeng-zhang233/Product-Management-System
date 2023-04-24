import React, { useState, useContext } from "react";
import { SigninContext } from "../SigninContext";
import { UserInfoContext } from "../UserInfoContext";
import Modal from "./BodyContent";
import { Button } from "antd";
import PopWindow from "../PopWindow";
import SigninContent from "./SigninContent";
import SignupContent from "./SignupContent";
import UpdatePassword from "./UpdatePassword";
import CreateProduct from "./CreateProduct";

function Home() {
  const { signin, signup, createProduct } = React.useContext(SigninContext);
  const { userEmail, userPassword } = React.useContext(UserInfoContext);
  const { isCreatedProduct, setIsCreatedProduct } = createProduct;

  const { isShowSignin, setIsShowSignin } = signin;
  const { isShowSignup, setIsShowSignup } = signup;

  const { email, setEmail } = userEmail;
  const { password, setPassword } = userPassword;

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   console.log(email, password);
  //   setPassword("");
  //   setEmail("");
  // };
  const createProductHeader = "Create Product";
  const signupHeader = "Sign up an account";
  const updateHeader = "Update your password";
  return (
    <div>
      <Modal titleText={createProductHeader} visible={isCreatedProduct}>
        {" "}
        {<CreateProduct />}
      </Modal>
    </div>
  );
}

export default Home;
