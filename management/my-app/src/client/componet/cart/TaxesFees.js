import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export default class TaxesFees extends Component {
  render() {
    return (
      <Row>
        <Col xs={6}>Est. taxes and fees (Based on V042)</Col>
        <Col xs={6}>
          <strong>$10.99</strong>
        </Col>
      </Row>
    );
  }
}
