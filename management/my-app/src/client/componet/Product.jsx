import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { SigninContext } from "../SigninContext";
import React, { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "../UserInfoContext";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSelector } from "react-redux";
import { addCart, increment, decrement } from "../actions";

function Product({
  productName,
  description,
  category,
  price,
  quantity,
  image,
  count,
  id,
}) {
  const { productDetail, editProduct } = React.useContext(SigninContext);
  const { isProductDetail, setIsProductDetail } = productDetail;
  const { isEditProduct, setIsEditProduct } = editProduct;
  const { userEmail, userPassword } = React.useContext(UserInfoContext);
  const { email, setEmail } = userEmail;
  const { password, setPassword } = userPassword;
  const userCart = useSelector((state) => state.user);

  const [showEditButton, setShowEditButton] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email == "admin@gmail.com" && password == "123456") {
      setShowEditButton(true);
    } else if (email != "admin@gmail.com") {
      setShowEditButton(false);
    }
  }, [password]);

  return (
    <Card className="cards" data-testid={id}>
      <Card.Img
        variant="top"
        src={image}
        className="card_image"
        onClick={() => {
          setIsProductDetail(true);
          dispatch({
            type: "Detail",
            payload: {
              productName,
              description,
              category,
              price,
              quantity,
              image,
              count,
              id,
            },
          });
        }}
      />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Text>$ {price}</Card.Text>
        <div className="top">
          {count > 0 ? (
            <ButtonGroup className="count_group">
              {" "}
              <Badge
                bg="secondary"
                onClick={() => {
                  const loggedInUser = localStorage.getItem("user");
                  if (loggedInUser) {
                    dispatch(increment({ user: email, itemAdded: id }));
                  } else {
                    const res = localStorage.getItem("unkonowUser");
                    if (res) {
                      const guest = JSON.parse(res);
                      let obj = {};
                      guest.forEach((e) => {
                        if (e.itemAdded === id) {
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
                        payload: { itemAdded: id, obj },
                      });
                    }
                  }
                }}
              >
                +
              </Badge>
              <label className="product_cart_quantity">{count} </label>{" "}
              <Badge
                bg="secondary"
                onClick={() => {
                  const loggedInUser = localStorage.getItem("user");
                  if (loggedInUser) {
                    dispatch(decrement({ user: email, itemAdded: id }));
                  } else {
                    const res = localStorage.getItem("unkonowUser");
                    if (res) {
                      const guest = JSON.parse(res);
                      let obj = {};
                      guest.forEach((e) => {
                        if (e.itemAdded === id) {
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
                          type: "Decrement",
                          payload: { itemAdded: id, obj },
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
              variant="outline-primary"
              className="product_button"
              onClick={() => {
                const loggedInUser = localStorage.getItem("user");
                if (loggedInUser) {
                  dispatch(
                    addCart({
                      user: email,
                      productName: productName,
                      price: price,
                      image: image,
                      itemAdded: id,
                      count: 1,
                    })
                  );
                } else {
                  const res = localStorage.getItem("unkonowUser");
                  let itemList = [];
                  if (res) {
                    itemList = JSON.parse(res);
                  }
                  const item = {
                    productName: productName,
                    price: price,
                    image: image,
                    itemAdded: id,
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
              Add
            </Button>
          )}

          {showEditButton && (
            <Button
              variant="outline-secondary"
              className="product_button"
              onClick={() => {
                setIsEditProduct(true);
                dispatch({
                  type: "Detail",
                  payload: {
                    productName,
                    description,
                    category,
                    price,
                    quantity,
                    image,
                    id,
                  },
                });
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Product;
