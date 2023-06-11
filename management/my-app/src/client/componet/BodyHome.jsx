import { SigninContext } from "../SigninContext";
import React, { useState, useContext } from "react";
import BodyModal from "./BodyModal";
import "../App.css";
import ProductDetails from "./ProductDetails";
import EditProduct from "./EditProduct";
import PaginatedItems from "./PaginatedItems";
import CreateProduct from "./CreateProduct";

function BodyHome() {
  const productListHeader = "Products";
  const productDetailsHeader = "Products Detail";
  const editProductHeader = "Edit Product";
  const createProductHeader = "Create Product";

  const { createProduct, productDetail, editProduct } =
    React.useContext(SigninContext);
  const { isCreatedProduct, setIsCreatedProduct } = createProduct;

  const { isProductDetail, setIsProductDetail } = productDetail;
  const { isEditProduct, setIsEditProduct } = editProduct;

  let header = productListHeader;

  if (isProductDetail) {
    header = productDetailsHeader;
  } else if (isEditProduct) {
    header = editProductHeader;
  } else if (isCreatedProduct) {
    header = createProductHeader;
  }

  if (isProductDetail) {
    return (
      <>
        <BodyModal title={header}>
          <ProductDetails />
        </BodyModal>
      </>
    );
  } else if (isEditProduct) {
    return (
      <>
        <BodyModal title={header}>
          <EditProduct />
        </BodyModal>
      </>
    );
  } else if (isCreatedProduct) {
    return (
      <>
        <BodyModal title={header}>
          <CreateProduct />
        </BodyModal>
      </>
    );
  } else {
    return (
      <>
        <BodyModal title={header}>
          <PaginatedItems itemsPerPage={9} />
        </BodyModal>
      </>
    );
  }
}

export default BodyHome;
