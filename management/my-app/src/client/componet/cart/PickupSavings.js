import React, { Component } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

var styles = {
  pickupSavings: {
    textDecoration: "underline",
  },
  totalSavings: {
    color: "red",
    fontWeight: 800,
  },
};

export default class PickupSavings extends Component {
  render() {
    const tooltip = (
      <Tooltip id="tooltip-bottom">
        <p>
          Picking up your order in the store helps cut costs, and we pass the
          savings on to you.
        </p>
      </Tooltip>
    );
    return (
      <Row>
        <Col xs={6}>
          <OverlayTrigger key="overlay" placement="bottom" overlay={tooltip}>
            <div style={styles.pickupSavings}>Pickup Savings</div>
          </OverlayTrigger>
        </Col>
        <Col xs={6} style={styles.totalSavings}>
          $-7.99
        </Col>
      </Row>
    );
  }
}
