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
          <p class="card_detail-text">{product.description}</p>
          {userCart &&
          userCart.get(product.id) &&
          userCart.get(product.id).count > 0 ? (
            <ButtonGroup className="count_group">
              {" "}
              <Badge
                bg="secondary"
                onClick={() => {
                  const loggedInUser = localStorage.getItem("user");
                  if (loggedInUser) {
                    dispatch(increment({ user: email, itemAdded: product.id }));
                  } else {
                    const res = localStorage.getItem("unkonowUser");
                    if (res) {
                      const guest = JSON.parse(res);
                      let obj = {};
                      guest.forEach((e) => {
                        if (e.itemAdded === product.id) {
                          e.count++;
                          obj.productName = e.productName;
                          obj.price = e.price;
                          obj.image = e.image;
                          obj.count = e.count;
                        }
                      });
                      localStorage.setItem(
                        "unkonowUser",
                        JSON.stringify(guest)
                      );
                      dispatch({
                        type: "Increment",
                        payload: { itemAdded: product.id, obj },
                      });
                    }
                  }
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
                  const loggedInUser = localStorage.getItem("user");
                  if (loggedInUser) {
                    dispatch(decrement({ user: email, itemAdded: product.id }));
                  } else {
                    const res = localStorage.getItem("unkonowUser");
                    if (res) {
                      const guest = JSON.parse(res);
                      let obj = {};
                      guest.forEach((e) => {
                        if (e.itemAdded === product.id) {
                          if (e.count > 1) {
                            e.count--;
                            obj.productName = e.productName;
                            obj.price = e.price;
                            obj.image = e.image;
                            obj.count = e.count;
                          }
                        }
                      });
                      if (Object.keys(obj).length != 0) {
                        localStorage.setItem(
                          "unkonowUser",
                          JSON.stringify(guest)
                        );
                        dispatch({
                          type: "Increment",
                          payload: { itemAdded: product.id, obj },
                        });
                      }
                    }
                  }
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
                  const res = localStorage.getItem("unkonowUser");
                  let itemList = [];
                  if (res) {
                    itemList = JSON.parse(res);
                  }
                  const item = {
                    productName: product.productName,
                    price: product.price,
                    image: product.image,
                    itemAdded: product.id,
                    count: 1,
                  };
                  itemList.push(item);
                  localStorage.setItem("unkonowUser", JSON.stringify(itemList));
                  let map = new Map();
                  itemList.forEach((e) => {
                    if (!map.has(e.itemAdded)) {
                      let obj = {
                        productName: e.productName,
                        price: e.price,
                        image: e.image,
                        count: e.count,
                      };
                      map.set(e.itemAdded, obj);
                    }
                  });
                  dispatch({
                    type: "UserCart",
                    payload: map,
                  });
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
