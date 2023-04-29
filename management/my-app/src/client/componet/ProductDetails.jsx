import React, { useState, useContext, useEffect } from "react";
import { SigninContext } from "../SigninContext";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";
import { UserInfoContext } from "../UserInfoContext";

function ProductDetails() {
  const product = useSelector((state) => state.detail);
  const { productDetail, editProduct } = React.useContext(SigninContext);
  const { userEmail, userPassword } = React.useContext(UserInfoContext);
  const { email, setEmail } = userEmail;
  const { password, setPassword } = userPassword;
  const { isEditProduct, setIsEditProduct } = editProduct;
  const { isProductDetail, setIsProductDetail } = productDetail;
  const [showEditButton, setShowEditButton] = useState(false);

  useEffect(() => {
    if (email == "admin@gmail.com" && password == "123456") {
      setShowEditButton(true);
    } else if (email != "admin@gmail.com") {
      setShowEditButton(false);
    }
  }, [password]);

  return (
    <div class="container" className="product_detail_body">
      <div class="card flex-row flex-wrap">
        <div class="card-header border-0">
          <img src={product.image} className="product_detail_image" alt="..." />
        </div>
        <div class="card-block px-2" className="product_detail_text">
          <Badge bg="info">{product.category} </Badge>{" "}
          <h2>
            {product.productName} <Badge bg="secondary">${product.price}</Badge>
          </h2>
          <p class="card-text">{product.description}</p>
          <Button variant="light">Add to cart</Button>{" "}
          {showEditButton && (
            <Button
              variant="success"
              onClick={() => {
                setIsProductDetail(false);
                setIsEditProduct(true);
              }}
            >
              Edit
            </Button>
          )}
          <Button
            variant="warning"
            onClick={() => {
              setIsProductDetail(false);
            }}
          >
            Back
          </Button>
        </div>
        <div class="w-100"></div>
      </div>
    </div>
  );
}

export default ProductDetails;
