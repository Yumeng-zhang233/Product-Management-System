import React, { useState, useContext, useEffect } from "react";
import { SigninContext } from "../SigninContext";
import { UserInfoContext } from "../UserInfoContext";
import { useDispatch } from "react-redux";
import { login } from "../actions/index";
import { addProduct } from "../actions/index";
import CloseButton from "react-bootstrap/CloseButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

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

          <form onSubmit={handleChange}>
            <label className="product_label">Product Name</label>
            <br></br>
            <textarea
              className="product_name"
              rows="1"
              cols="58"
              onChange={(e) => setproductName(e.target.value)}
              required
            >
              {" "}
            </textarea>
            <br></br>
            <label className="product_label">Product Description</label>
            <br></br>
            <textarea
              className="product_name"
              rows="4"
              cols="58"
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <br></br>
            <span className="product_label">Category</span>
            <span className="product_price">Price</span>
            <br></br>

            <select
              className="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Category0">...</option>

              <option value="Category1">Category1</option>
              <option value="Category2">Category2</option>
              <option value="Category3">Category3</option>
            </select>
            <input
              type="number"
              className="quantity"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <br></br>
            <span className="product_quantity_label">In Stock Quantity</span>
            <span className="image_link">Add image link</span>
            <br></br>
            <input
              type="number"
              className="product_quantity"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <input
              type="url"
              className="url"
              placeholder="https://example.com"
              pattern="https://.*"
              size="30"
              onChange={(e) => setImage(e.target.value)}
              required
            />
            <div class="item">
              <img src={image} />
            </div>

            <input type="submit" value="Add Product" className="login-btn" />
          </form>
        </div>{" "}
      </div>
    </div>
  );
}

export default CreateProduct;
