import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React, { useState, useContext } from "react";
import { SigninContext } from "../SigninContext";
import "../App.css";

function CartModal(props) {
  const { openCart } = React.useContext(SigninContext);
  const { cartOpen, setCartOpen } = openCart;

  function onClick() {
    setCartOpen(false);
  }
  return (
    <>
      <Modal
        width={480}
        title={<div className="modal-title">Cart</div>}
        closeIcon={<CloseCircleOutlined />}
        open={cartOpen}
        footer={null}
        onCancel={onClick}
      >
        {" "}
        {props.children}
      </Modal>
    </>
  );
}

export default CartModal;
