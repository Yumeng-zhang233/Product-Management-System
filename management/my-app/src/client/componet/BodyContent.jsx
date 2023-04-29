// import { Modal } from "antd";
// import { CloseCircleOutlined } from "@ant-design/icons";
// import React, { useState, useContext } from "react";
// import { SigninContext } from "../SigninContext";
// import "../App.css";

// // import antd/dist/reset.css;

// function BodyContent(props) {
//   const { signin, signup, createProduct } = React.useContext(SigninContext);
//   const { isCreatedProduct, setIsCreatedProduct } = createProduct;

//   function onClick() {
//     setIsCreatedProduct(false);
//   }
//   return (
//     <>
//       <Modal
//         width={600}
//         closeIcon={<CloseCircleOutlined />}
//         title={<div className="modal-title">{props.titleText}</div>}
//         open={isCreatedProduct}
//         footer={null}
//         onCancel={onClick}
//         // className="modal"
//       >
//         {" "}
//         {props.children}
//       </Modal>
//     </>
//   );
// }

// export default BodyContent;
