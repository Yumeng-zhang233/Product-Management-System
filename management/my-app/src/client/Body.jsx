import "./App.css";
import React, { useState, useContext } from "react";
import { SigninContext } from "./SigninContext";
import { UserInfoContext } from "./UserInfoContext";
import Signin from "./componet/Signin";
import { useSelector } from "react-redux";
import Home from "./componet/Home";

function Body() {
  const { signin, signup, createProduct } = React.useContext(SigninContext);
  const { isShowSignin, setIsShowSignin } = signin;
  const { isShowSignup, setIsShowSignup } = signup;
  const { isCreatedProduct, setIsCreatedProduct } = createProduct;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState();
  let isLoggedin = useSelector((state) => state.status);

  return (
    <div className="body">
      <UserInfoContext.Provider
        value={{
          userEmail: { email, setEmail },
          userPassword: { password, setPassword },
          userInfo: { userInfo, setUserInfo },
        }}
      >
        {isShowSignin && !isLoggedin && <Signin />}
        {isLoggedin && (
          <button
            className="add_product_button"
            onClick={() => {
              setIsCreatedProduct(true);
            }}
          >
            Create Product
          </button>
        )}
        {isLoggedin && isCreatedProduct && <Home />}
      </UserInfoContext.Provider>
    </div>
  );
}

export default Body;
