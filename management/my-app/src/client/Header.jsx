import "./App.css";
import React, { useContext, useState } from "react";
import { SigninContext } from "./SigninContext";
import { Input } from "antd";
import { useSelector } from "react-redux";
import { logout } from "./actions/index";
import { useDispatch } from "react-redux";
import { UserInfoContext } from "./UserInfoContext";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Badge from "react-bootstrap/Badge";

const { Search } = Input;

function Header() {
  const dispatch = useDispatch();

  const { signin, signup, openCart } = React.useContext(SigninContext);
  let isLoggedin = useSelector((state) => state.login);
  const { isShowSignin, setIsShowSignin } = signin;
  const { cartOpen, setCartOpen } = openCart;

  const { userEmail, userPassword, userInfo } =
    React.useContext(UserInfoContext);
  const { email, setEmail } = userEmail;
  const { password, setPassword } = userPassword;
  const { user, setUser } = userInfo;

  function onSearch() {
    console.log("searched");
  }
  return (
    <div className="header">
      <label className="header_label">Management</label>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        className="search_input"
        style={{
          width: 300,
          marginTop: 12,
          marginLeft: 230,
        }}
      />
      <Button
        variant="primary"
        onClick={() => {
          setIsShowSignin(!isShowSignin);
          if (isLoggedin.login == true) {
            dispatch(logout());
            setUser({});
            setEmail("");
            setPassword("");
            let map = new Map();
            dispatch({
              type: "UserCart",
              payload: map,
            });
            localStorage.clear();
          }
        }}
        className="signin_icon"
      >
        {isLoggedin.login ? "SignOut" : "SignIn"}
      </Button>{" "}
      <AiOutlineShoppingCart
        className="cart_icon"
        onClick={() => {
          setCartOpen(true);
        }}
      />{" "}
    </div>
  );
}

export default Header;
