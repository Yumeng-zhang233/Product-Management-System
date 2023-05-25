import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col } from "react-bootstrap";

function SubTotal() {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.user);
  const charge = useSelector((state) => state.charge);

  useEffect(() => {
    let total = 0;
    userCart.forEach((item) => {
      let fee = item.price * item.count;
      total += fee;
    });
    dispatch({
      type: "SubTotal",
      payload: total,
    });
    localStorage.setItem("purchase amount", JSON.stringify(total));
  }, [userCart]);
  return (
    <Row>
      <Col xs={6}>Subtotal</Col>
      <Col xs={6}>
        <strong>${charge.toFixed(2)}</strong>
      </Col>
    </Row>
  );
}
export default SubTotal;
