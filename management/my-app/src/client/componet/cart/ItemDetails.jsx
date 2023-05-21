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

const ItemDetails = ({ count, id }) => {
  const [itemInfo, setItemInfo] = useState({});
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.user);
  // const itemInfo = useSelector((state) => state.item);

  const { userEmail } = React.useContext(UserInfoContext);
  const { email, setEmail } = userEmail;

  useEffect(() => {
    // const storedItemInfo = localStorage.getItem(`itemInfo_${id}`);
    // if (storedItemInfo) {
    //   let storedInfo = JSON.parse(storedItemInfo);
    //   dispatch({
    //     type: "ItemInfo",
    //     payload: storedInfo,
    //   });
    // } else {
    //   dispatch(itemDetail(id));
    // }
    async function getData(key) {
      const storedItemInfo = localStorage.getItem(`itemInfo_${key}`);
      if (storedItemInfo) {
        setItemInfo(JSON.parse(storedItemInfo));
      } else {
        const item = await itemDetail(key);
        setItemInfo(item);
      }
    }
    getData(id);
  }, []);

  return (
    <div>
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              className="cart_image"
              src={itemInfo.image}
              alt="Generic placeholder"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h6>
                {itemInfo.productName}{" "}
                <Badge bg="secondary">${itemInfo.price}</Badge>
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
                      {userCart.get(id)}{" "}
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
