import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React, { useState, useContext } from "react";
import { SigninContext } from "../SigninContext";
import "../App.css";

function BodyModal(props) {
  return (
    <div>
      <p className="general_body_header">{props.title}</p>
      {props.children}
    </div>
  );
}
export default BodyModal;
