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
    <Card style={{ width: "18rem" }} className="card" data-testid={id}>
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
              id,
            },
          });
        }}
      />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Text>$ {price}</Card.Text>
        {count > 0 ? (
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
            <label className="product_cart_quantity">{count} </label>{" "}
            <Badge
              bg="secondary"
              onClick={() => {
                dispatch(decrement({ user: email, itemAdded: id }));
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
              dispatch(addCart({ user: email, itemAdded: id, count: 1 }));
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
      </Card.Body>
    </Card>
  );
}

export default Product;
