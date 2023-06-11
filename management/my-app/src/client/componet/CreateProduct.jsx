import React, { useState, useContext, useEffect } from "react";
import { SigninContext } from "../SigninContext";
import { UserInfoContext } from "../UserInfoContext";
import { useDispatch } from "react-redux";
import { login } from "../actions/index";
import { addProduct } from "../actions/index";
import CloseButton from "react-bootstrap/CloseButton";
import TextArea from "antd/es/input/TextArea";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";

function CreateProduct() {
  const dispatch = useDispatch();
  const { createProduct } = React.useContext(SigninContext);
  const { isCreatedProduct, setIsCreatedProduct } = createProduct;

  const [productName, setproductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("http://placehold.it/350x150");
  const options = [
    { value: "category1", label: "Category1" },
    { value: "category2", label: "Category2" },
    { value: "category3", label: "Category3" },
  ];
  const handleChange = async (e) => {
    e.preventDefault();

    let product = {
      productName: productName,
      description: description,
      category: category,
      price: price,
      quantity: quantity,
      image: image,
    };
    dispatch(addProduct(product));
  };
  return (
    <div>
      <div className="product_box">
        <div className="edit_product_container">
          <CloseButton
            onClick={() => {
              setIsCreatedProduct(false);
            }}
          />

          <Form onSubmit={handleChange}>
            <label className="product_label">Product Name</label>
            <br></br>
            <Form.Control
              className="product_name"
              rows="1"
              cols="58"
              onChange={(e) => setproductName(e.target.value)}
              required
            ></Form.Control>
            <br></br>
            <label className="product_label">Product Description</label>
            <br></br>
            <TextArea
              className="product_name"
              rows="4"
              cols="58"
              onChange={(e) => setDescription(e.target.value)}
              required
            ></TextArea>
            <br></br>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="form_label">Category</Form.Label>
                <Select
                  options={options}
                  defaultValue="Category1"
                  onChange={(e) => setCategory(e.value)}
                  required
                />
                {/* <Form.Select
                  className="option"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option className="option">Category1</option>
                  <option className="option">Category2</option>
                  <option className="option">Category3</option>
                </Form.Select> */}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="form_label">Price</Form.Label>
                <Form.Control
                  type="number"
                  className="quantity"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>

            <br></br>
            <Row className="mb-3">
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label className="form_label">Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label className="form_label">Image url</Form.Label>
                <Form.Control
                  type="url"
                  pattern="https://.*"
                  placeholder="https://example.com"
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>

            <div class="item">
              <img src={image} />
            </div>

            <input type="submit" value="Add Product" className="login-btn" />
          </Form>
        </div>{" "}
      </div>
    </div>
  );
}

export default CreateProduct;
