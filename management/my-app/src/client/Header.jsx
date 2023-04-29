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

const { Search } = Input;

function Header() {
  const dispatch = useDispatch();

  const { signin, signup } = React.useContext(SigninContext);
  let isLoggedin = useSelector((state) => state.login.status);
  const { isShowSignin, setIsShowSignin } = signin;
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
          if (isLoggedin == true) {
            dispatch(logout());
            setUser({});
            setEmail("");
            setPassword("");
            localStorage.clear();
          }
        }}
        className="signin_icon"
      >
        {isLoggedin ? "SignOut" : "SignIn"}
      </Button>{" "}
      <i class="fas fa-shopping-cart"></i>{" "}
    </div>
  );
}

export default Header;
