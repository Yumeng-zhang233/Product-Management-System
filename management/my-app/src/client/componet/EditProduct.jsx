import React, { useState, useContext, useEffect } from "react";
import { SigninContext } from "../SigninContext";
import { UserInfoContext } from "../UserInfoContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addProduct, editProductInfo } from "../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import CloseButton from "react-bootstrap/CloseButton";

import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextArea from "antd/es/input/TextArea";

function EditProduct() {
  const dispatch = useDispatch();
  const originalInfo = useSelector((state) => state.detail);

  const [productName, setproductName] = useState(originalInfo.productName);
  const [description, setDescription] = useState(originalInfo.description);
  const [category, setCategory] = useState(originalInfo.category);
  const [price, setPrice] = useState(originalInfo.price);
  const [quantity, setQuantity] = useState(originalInfo.quantityn);
  const [image, setImage] = useState(originalInfo.image);
  const { editProduct } = React.useContext(SigninContext);
  const { userEmail } = React.useContext(UserInfoContext);
  const { email, setEmail } = userEmail;
  const { isEditProduct, setIsEditProduct } = editProduct;

  const handleChange = async (e) => {
    e.preventDefault();

    let product = {
      email: email,
      productName: productName,
      description: description,
      category: category,
      price: price,
      quantity: quantity,
      image: image,
      id: originalInfo.id,
    };
    dispatch(editProductInfo(product));
  };
  return (
    <div className="edit_product_container">
      <div className="-form-box solid">
        <CloseButton
          onClick={() => {
            setIsEditProduct(false);
          }}
        />

        <Form onSubmit={handleChange}>
          <label className="product_label">Product Name</label>
          <br></br>
          <Form.Control
            className="product_name"
            rows="1"
            cols="58"
            placeholder={originalInfo.productName}
            onChange={(e) => setproductName(e.target.value)}
          ></Form.Control>
          <br></br>
          <label className="product_label">Product Description</label>
          <br></br>
          <TextArea
            className="product_name"
            rows="4"
            cols="58"
            placeholder={originalInfo.description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextArea>
          <br></br>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label className="form_label">Category</Form.Label>
              <Form.Select
                defaultValue={originalInfo.category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Category1</option>
                <option>Category2</option>
                <option>Category3</option>
              </Form.Select>
              {/* <DropdownButton
                className="dropdown_category"
                title="Select one category option ......"
                variant="secondary"
                onChange={(e) => setCategory(e.target.value)}
              > */}
              {/* <Dropdown.Item className="category" href="Category1">
                Category1
              </Dropdown.Item>
              <Dropdown.Item className="category" href="Category2">
                Category2
              </Dropdown.Item>
              <Dropdown.Item className="category" href="Category3">
                Category3
              </Dropdown.Item> */}
              {/* </DropdownButton>{" "} */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label className="form_label">Price</Form.Label>
              <Form.Control
                type="number"
                className="quantity"
                placeholder={originalInfo.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            {/* <input
                  type="number"
                  className="quantity"
                  placeholder={originalInfo.price}
                  onChange={(e) => setPrice(e.target.value)}
                /> */}
          </Row>
          <br></br>
          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label className="form_label">Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                // className="product_quantity"
                placeholder={originalInfo.quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            {/* <span className="product_quantity_label">In Stock Quantity</span>
          <span className="image_link">Add image link</span>
          <br></br> */}
            {/* <input
            type="number"
            className="product_quantity"
            placeholder={originalInfo.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          /> */}
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label className="form_label">Image url</Form.Label>
              <Form.Control
                type="url"
                // className="url"
                placeholder={originalInfo.image}
                pattern="https://.*"
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
          </Row>
          {/* <input
              type="url"
              className="url"
              placeholder={originalInfo.image}
              pattern="https://.*"
              size="30"
              onChange={(e) => setImage(e.target.value)}
            /> */}
          <div class="item">
            <img src={image} />
          </div>
          <input type="submit" value="Edit" className="login-btn" />
        </Form>
      </div>{" "}
    </div>
  );
}

export default EditProduct;
