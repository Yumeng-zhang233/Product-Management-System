import "./App.css";
import React, { useContext, useState } from "react";
import { SigninContext } from "./SigninContext";
import { Input } from "antd";
import { useSelector } from "react-redux";
import { logout } from "./actions/index";
import { useDispatch } from "react-redux";

const { Search } = Input;

function Header() {
  const dispatch = useDispatch();

  const { signin, signup } = React.useContext(SigninContext);
  let isLoggedin = useSelector((state) => state.status);
  const { isShowSignin, setIsShowSignin } = signin;

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
      <span
        onClick={() => {
          setIsShowSignin(!isShowSignin);
          if (isLoggedin == true) {
            dispatch(logout());
          }
        }}
        className="signin_icon"
      >
        {isLoggedin ? "Sign out" : "Sign in"}
      </span>
      <i class="fas fa-shopping-cart"></i>{" "}
    </div>
  );
}

export default Header;
