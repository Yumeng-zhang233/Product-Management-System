import React, { useState, useContext, useEffect } from "react";
import { SigninContext } from "../SigninContext";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

import SubTotal from "./cart/SubTotal";
import PickupSavings from "./cart/PickupSavings";
import TaxesFees from "./cart/TaxesFees";
import EstimatedTotal from "./cart/EstimatedTotal";
import ItemDetails from "./cart/ItemDetails";
import { useDispatch, useSelector } from "react-redux";

import "../App.css";

function ShoppingCart() {
  const userCart = useSelector((state) => state.user);
  // const loggedInUser = localStorage.getItem("user");
  // const foundUser = JSON.parse(loggedInUser);

  return (
    <div className="purchase-card">
      <Container>
        {Array.from(userCart, ([key, value]) => {
          return (
            <ItemDetails
              key={key}
              // productName={itemInfo.productName}
              // price={itemInfo.price}
              // image={itemInfo.image}
              count={value}
              id={key}
            />
          );
        })}
        <Badge bg="light" text="dark">
          Apply discount code
        </Badge>{" "}
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-secondary">Apply</Button>
        </Form>
        <SubTotal />
        <PickupSavings />
        <TaxesFees />
        <hr />
        <EstimatedTotal />
      </Container>
      <Button variant="dark" className="cart_button">
        Checkout{" "}
      </Button>{" "}
    </div>
  );
}

export default ShoppingCart;
