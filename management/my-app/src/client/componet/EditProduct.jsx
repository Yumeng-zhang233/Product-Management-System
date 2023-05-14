import React, { useState, useContext, useEffect } from "react";
import { SigninContext } from "../SigninContext";
import { UserInfoContext } from "../UserInfoContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addProduct, editProductInfo } from "../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import CloseButton from "react-bootstrap/CloseButton";

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

  const { isEditProduct, setIsEditProduct } = editProduct;

  const handleChange = async (e) => {
    e.preventDefault();
    console.log(price);

    let product = {
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

        <form onSubmit={handleChange}>
          <label className="product_label">Product Name</label>
          <br></br>
          <textarea
            className="product_name"
            rows="1"
            cols="58"
            placeholder={originalInfo.productName}
            onChange={(e) => setproductName(e.target.value)}
          ></textarea>
          <br></br>
          <label className="product_label">Product Description</label>
          <br></br>
          <textarea
            className="product_name"
            rows="4"
            cols="58"
            placeholder={originalInfo.description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br></br>
          <span className="product_label">Category</span>
          <span className="product_price">Price</span>
          <br></br>
          <select
            className="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Category1">Category1</option>
            <option value="Category2">Category2</option>
            <option value="Category3">Category3</option>
          </select>
          <input
            type="number"
            className="quantity"
            placeholder={originalInfo.price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br></br>
          <span className="product_quantity_label">In Stock Quantity</span>
          <span className="image_link">Add image link</span>
          <br></br>
          <input
            type="number"
            className="product_quantity"
            placeholder={originalInfo.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            type="url"
            className="url"
            placeholder={originalInfo.image}
            pattern="https://.*"
            size="30"
            onChange={(e) => setImage(e.target.value)}
          />
          <div class="item">
            <img src={image} />
          </div>

          <input type="submit" value="Edit" className="login-btn" />
        </form>
      </div>{" "}
    </div>
  );
}

export default EditProduct;
