import "./App.css";
import React, { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "./UserInfoContext";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import { SigninContext } from "./SigninContext";
import Signin from "./componet/Signin";
import { useSelector } from "react-redux";
import Home from "./componet/Home";
import ProductList from "./componet/ProductList";
import { useDispatch } from "react-redux";
import { initProducts } from "./actions";
import BodyHome from "./componet/BodyHome";
import ShoppingCart from "./componet/ShoppingCart";
import CartModal from "./componet/BodyContent";

function Body() {
  const dispatch = useDispatch();

  const { signin, signup, createProduct } = React.useContext(SigninContext);
  const { userEmail, userPassword, userInfo } =
    React.useContext(UserInfoContext);
  const { isShowSignin, setIsShowSignin } = signin;
  const { isShowSignup, setIsShowSignup } = signup;
  const { isCreatedProduct, setIsCreatedProduct } = createProduct;
  const { password, setPassword } = userPassword;
  const { user, setUser } = userInfo;
  const { email, setEmail } = userEmail;
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  let isLoggedin = useSelector((state) => state.login);

  return (
    <div className="body">
      <CartModal>
        <ShoppingCart />
      </CartModal>

      {isShowSignin && !isLoggedin.login && <Signin />}

      {isLoggedin.login && (
        <Badge className="badge" pill bg="light" text="dark">
          {email}{" "}
        </Badge>
      )}
      <BodyHome />
    </div>
  );
}

export default Body;
