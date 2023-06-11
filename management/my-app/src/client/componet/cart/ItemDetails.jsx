import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { increment, decrement } from "../../actions";
import { itemDetail, deleteItem } from "../../actions";
import { UserInfoContext } from "../../UserInfoContext";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store/index";

const ItemDetails = ({ count, id }) => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.user);

  const { userEmail } = React.useContext(UserInfoContext);
  const { email, setEmail } = userEmail;

  useEffect(() => {
    async function getData() {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const currentUser = JSON.parse(loggedInUser);
        let map = new Map();
        currentUser.cart.forEach((item) => {
          if (!map.has(item.itemAdded)) {
            let obj = {
              productName: item.productName,
              price: item.price,
              image: item.image,
              count: item.count,
            };
            map.set(item.itemAdded, obj);
          }
        });
        store.dispatch({
          type: "UserCart",
          payload: map,
        });
      }
    }
    getData();
  }, []);

  return (
    <div className="cart_card">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              className="cart_image"
              src={userCart.get(id).image}
              alt="Generic placeholder"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h6>
                {userCart.get(id).productName}{" "}
                <Badge bg="secondary">${userCart.get(id).price}</Badge>
              </h6>{" "}
              <Row>
                <Col xs={6}>
                  <ButtonGroup>
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
                              type: "Decrement",
                              payload: { itemAdded: id, obj },
                            });
                          }
                        }
                      }}
                    >
                      +
                    </Badge>
                    <label className="product_cart_quantity">
                      {userCart.get(id).count}{" "}
                    </label>{" "}
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
                </Col>
                <Col xs={6}>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => {
                      const loggedInUser = localStorage.getItem("user");
                      if (loggedInUser) {
                        dispatch(deleteItem({ user: email, id: id }));
                      } else {
                        const res = localStorage.getItem("unkonowUser");
                        if (res) {
                          const guest = JSON.parse(res);
                          guest.forEach((item) => {
                            if (item.itemAdded === id) {
                              let index = guest.indexOf(item);
                              guest.splice(index, 1);
                            }

                            localStorage.setItem(
                              "unkonowUser",
                              JSON.stringify(guest)
                            );
                          });
                          let map = new Map();
                          guest.forEach((item) => {
                            if (!map.has(item.itemAdded)) {
                              let obj = {};
                              obj.productName = item.productName;
                              obj.price = item.price;
                              obj.image = item.image;
                              obj.count = item.count;
                              map.set(item.itemAdded, obj);
                            }
                          });
                          dispatch({
                            type: "DeleteItem",
                            payload: map,
                          });
                        }
                      }
                    }}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemDetails;
