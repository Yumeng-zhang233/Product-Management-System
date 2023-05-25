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
    <div>
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
                        dispatch(increment({ user: email, itemAdded: id }));
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
                        dispatch(decrement({ user: email, itemAdded: id }));
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
                      dispatch(deleteItem({ user: email, id: id }));
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
