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

function Body() {
  const dispatch = useDispatch();

  const { signin, signup, createProduct } = React.useContext(SigninContext);
  const { userEmail } = React.useContext(UserInfoContext);
  const { isShowSignin, setIsShowSignin } = signin;
  const { isShowSignup, setIsShowSignup } = signup;
  const { isCreatedProduct, setIsCreatedProduct } = createProduct;

  const { email, setEmail } = userEmail;
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  let isLoggedin = useSelector((state) => state.login.status);

  return (
    <div className="body">
      {isShowSignin && !isLoggedin && <Signin />}

      {isLoggedin && (
        <Badge className="badge" pill bg="light" text="dark">
          {email}{" "}
        </Badge>
      )}
      {/* {isLoggedin && showCreateProduct && (
        <button
          className="add_product_button"
          onClick={() => {
            setIsCreatedProduct(true);
          }}
        >
          Add Product
        </button>
      )}
      {isLoggedin && isCreatedProduct && <Home />} */}
      <BodyHome />
    </div>
  );
}

export default Body;
