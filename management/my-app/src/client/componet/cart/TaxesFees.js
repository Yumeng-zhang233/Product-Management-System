import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function TaxesFees() {
  const charge = useSelector((state) => state.charge);

  return (
    <Row>
      <Col xs={6}>Est. taxes and fees</Col>
      <Col xs={6}>
        <strong>${(charge * 0.06).toFixed(2)}</strong>
      </Col>
    </Row>
  );
}
export default TaxesFees;
