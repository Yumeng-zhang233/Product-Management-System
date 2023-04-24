import React, { useState, useContext } from "react";
import { SigninContext } from "../SigninContext";
import { UserInfoContext } from "../UserInfoContext";
import { useDispatch } from "react-redux";
import { login } from "../actions/index";

function CreateProduct() {
  //   return <div>Create Product</div>;
  //   const dispatch = useDispatch();

  //   const { signin, signup, update } = React.useContext(SigninContext);
  //   const { userEmail, userPassword } = React.useContext(UserInfoContext);
  //   const { email, setEmail } = userEmail;
  //   const { password, setPassword } = userPassword;
  //   const { isShowSignup, setIsShowSignup } = signup;
  //   const { isupdatePassword, setUpdatePassword } = update;
  //   const { isShowSignin, setIsShowSignin } = signin;

  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     console.log(email, password);
  //     dispatch(login({ email, password }));

  //     setPassword("");
  //     setEmail("");
  //     setIsShowSignin(false);
  //   };

  //   const handleSignup = () => {
  //     setIsShowSignup(true);
  //   };
  //   const handleUpdatePassword = () => {
  //     setUpdatePassword(true);
  //     setIsShowSignup(false);
  //   };
  function handleSubmit() {
    console.log("form submit");
  }
  return (
    <div>
      <div className="product_box">
        <div className="-form-box solid">
          <form onSubmit={handleSubmit()}>
            <label className="product_label">Product Name</label>
            <br></br>
            <textarea className="product_name" rows="4" cols="58">
              iwatch
            </textarea>
            <br></br>
            <label className="product_label">Product Description</label>
            <br></br>
            <textarea className="product_name" rows="4" cols="58"></textarea>
            <br></br>
            <label className="product_label">Category</label>
            <span className="product_price">Price</span>
            <br></br>
            <select className="category">
              <option value="Category1">Category1</option>
              <option value="Category2">Category2</option>
              <option value="Category3">Category3</option>
            </select>
            <input type="number" className="quantity" />
            <br></br>
            <label className="product_quantity_label">In Stock Quantity</label>
            <span className="image_link">Add image link</span>
            <br></br>
            <input type="number" className="product_quantity" />
            <input
              type="url"
              className="url"
              placeholder="https://example.com"
              pattern="https://.*"
              size="30"
              required
            />
            <div class="item">
              <img src="http://placehold.it/350x150" />
            </div>
            <input type="submit" value="Add Product" className="login-btn" />
          </form>
        </div>{" "}
      </div>
    </div>
  );
}

export default CreateProduct;
