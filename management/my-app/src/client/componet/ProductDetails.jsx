import React, { useState, useContext, useEffect } from "react";
import { SigninContext } from "../SigninContext";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";
import { UserInfoContext } from "../UserInfoContext";
import { addCart, increment, decrement } from "../actions";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function ProductDetails() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail);
  const userCart = useSelector((state) => state.user);

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
          {userCart &&
          userCart.get(product.id) &&
          userCart.get(product.id).count > 0 ? (
            <ButtonGroup>
              {" "}
              <Badge
                bg="secondary"
                onClick={() => {
                  dispatch(
                    increment({ user: product.email, itemAdded: product.id })
                  );
                }}
              >
                +
              </Badge>
              <label className="product_cart_quantity">
                {userCart.get(product.id).count}{" "}
              </label>{" "}
              <Badge
                bg="secondary"
                onClick={() => {
                  dispatch(
                    decrement({ user: product.email, itemAdded: product.id })
                  );
                }}
              >
                -
              </Badge>
            </ButtonGroup>
          ) : (
            <Button
              variant="light"
              onClick={() => {
                const loggedInUser = localStorage.getItem("user");
                if (loggedInUser) {
                  dispatch(
                    addCart({
                      user: email,
                      productName: product.productName,
                      price: product.price,
                      image: product.image,
                      itemAdded: product.id,
                      count: 1,
                    })
                  );
                  dispatch({
                    type: "UpdateDetail",
                    payload: 1,
                  });
                } else {
                  console.log("click");
                }
              }}
            >
              Add to cart
            </Button>
          )}
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
