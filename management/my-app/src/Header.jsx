import "./App.css";
import React, { useContext, useState } from "react";
import { SigninContext } from "./SigninContext";
import { Input } from "antd";
const { Search } = Input;

function Header() {
  // const [isShowSignin, setIsShowSignin] = useContext(SigninContext);
  const { signin, signup } = React.useContext(SigninContext);
  console.log(signin);
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
      <span onClick={() => setIsShowSignin(true)} className="signin_icon">
        Sign In
      </span>
      <i class="fas fa-shopping-cart"></i>{" "}
    </div>
  );
}

export default Header;
