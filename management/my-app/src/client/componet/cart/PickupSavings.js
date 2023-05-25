import React, { Component } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

var styles = {
  pickupSavings: {
    textDecoration: "underline",
  },
  totalSavings: {
    color: "grey",
    fontWeight: 800,
  },
};

function PickupSavings(props) {
  const charge = useSelector((state) => state.charge);

  const tooltip = (
    <Tooltip id="tooltip-bottom">
      <p>Enter the coupon code, enjoy 15% discount</p>
    </Tooltip>
  );
  return (
    <Row>
      <Col xs={6}>
        <OverlayTrigger key="overlay" placement="bottom" overlay={tooltip}>
          <div style={styles.pickupSavings}>Discount</div>
        </OverlayTrigger>
      </Col>
      <Col xs={6} style={styles.totalSavings}>
        -${props.value.toFixed(2)}
      </Col>
    </Row>
  );
}
export default PickupSavings;
