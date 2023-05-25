import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function EstimatedTotal(props) {
  const charge = useSelector((state) => state.charge);

  return (
    <Row>
      <Col xs={6}>
        <h3>Est. Total:</h3>
      </Col>
      <Col xs={6}>
        <h3>${(charge - props.value + charge * 0.06).toFixed(2)}</h3>
      </Col>
    </Row>
  );
}
export default EstimatedTotal;
