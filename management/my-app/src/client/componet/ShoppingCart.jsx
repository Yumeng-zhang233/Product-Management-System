import React, { useState, useEffect } from "react";
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
  const charge = useSelector((state) => state.charge);

  const [code, setCode] = useState("");
  const [codeApplied, setCodeApplied] = useState(false);
  const [discountFee, setDiscountFee] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === "helloworld") {
      const codeApplied = "helloworld";
      localStorage.setItem("code", JSON.stringify(codeApplied));

      setDiscountFee(charge * 0.15);
      setCodeApplied(true);
    } else {
      setDiscountFee(0);
      setCodeApplied(false);
      localStorage.removeItem("code");
    }
    event.target.reset();
  };
  useEffect(() => {
    const codeApplied = localStorage.getItem("code");
    if (codeApplied) {
      const currentCharge = localStorage.getItem("purchase amount");
      const total = JSON.parse(currentCharge);
      setDiscountFee(total * 0.15);
      setCodeApplied(true);
    } else {
      setCodeApplied(false);
    }
  }, [userCart]);
  useEffect(() => {
    if (discountFee != 0) {
      setDiscountFee(charge * 0.15);
    }
  }, [charge]);

  return (
    <div className="purchase-card">
      <Container>
        {Array.from(userCart, ([key, value]) => {
          return <ItemDetails key={key} count={value} id={key} />;
        })}
        {codeApplied ? (
          <Badge bg="light" text="info">
            Code Applied
          </Badge>
        ) : (
          <Badge bg="light" text="dark">
            Apply discount code
          </Badge>
        )}
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Coupon"
            className="me-2"
            aria-label="Coupon"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <Button variant="outline-secondary" type="submit">
            Apply
          </Button>
        </Form>
        <SubTotal />
        <PickupSavings value={discountFee} />
        <TaxesFees />
        <hr />
        <EstimatedTotal value={discountFee} />
      </Container>
      <Button variant="dark" className="cart_button">
        Checkout{" "}
      </Button>{" "}
    </div>
  );
}

export default ShoppingCart;
