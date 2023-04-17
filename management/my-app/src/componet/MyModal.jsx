import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React, { useState, useContext } from "react";
import { SigninContext } from "../SigninContext";
import "../App.css";

// import antd/dist/reset.css;

function MyModal(props) {
  const { signin, signup, update } = React.useContext(SigninContext);
  console.log(signin);
  const { isShowSignin, setIsShowSignin } = signin;
  const { isShowSignup, setIsShowSignup } = signup;
  const { isupdatePassword, setUpdatePassword } = update;
  function onClick() {
    setIsShowSignin(false);
    setIsShowSignup(false);
    setUpdatePassword(false);
  }
  return (
    <>
      <Modal
        width={490}
        closeIcon={<CloseCircleOutlined />}
        title={<div className="modal-title">{props.titleText}</div>}
        open={isShowSignin}
        footer={null}
        onCancel={onClick}
        className="modal"
      >
        {" "}
        {props.children}
      </Modal>
    </>
  );
}

export default MyModal;
