import "./App.css";
import React, { useContext, useState } from "react";
import { SigninContext } from "./SigninContext";
import { Input } from "antd";
import { useSelector } from "react-redux";
import { logout } from "./actions/index";
import { useDispatch } from "react-redux";
import { UserInfoContext } from "./UserInfoContext";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              className="search_input"
              style={{
                marginTop: 2,
                width: 300,
              }}
            />
          </Nav>
          <Nav>
            <ButtonGroup>
              <Button
                variant="outline-light"
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
                // className="signin_icon"
              >
                {isLoggedin.login ? "SignOut" : "SignIn"}
              </Button>{" "}
              <Button variant="outline-light">
                <AiOutlineShoppingCart
                  // className="cart_icon
                  onClick={() => {
                    setCartOpen(true);
                  }}
                />{" "}
              </Button>
            </ButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
