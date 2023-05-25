import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Body from "./Body";
import { useDispatch } from "react-redux";
import { initProducts } from "./actions";
import { SigninContext } from "./SigninContext.js";
import { UserInfoContext } from "./UserInfoContext";
import { store } from "./store/index";

import React, { useState, useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const [isShowSignin, setIsShowSignin] = useState(false);
  const [isShowSignup, setIsShowSignup] = useState(false);
  const [isupdatePassword, setUpdatePassword] = useState(false);
  const [isCreatedProduct, setIsCreatedProduct] = useState(false);
  const [isProductDetail, setIsProductDetail] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setEmail(foundUser.email);
      setPassword(foundUser.password);

      store.dispatch({
        type: "Login",
        payload: {
          login: true,
          email: foundUser.email,
          password: foundUser.password,
          cart: foundUser.cart,
        },
      });

      let map = new Map();

      foundUser.cart.forEach((item) => {
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
      dispatch({
        type: "UserCart",
        payload: map,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(initProducts());
  }, [dispatch]);

  return (
    <div className="App">
      <SigninContext.Provider
        value={{
          signin: { isShowSignin, setIsShowSignin },
          signup: { isShowSignup, setIsShowSignup },
          update: { isupdatePassword, setUpdatePassword },
          createProduct: { isCreatedProduct, setIsCreatedProduct },
          productDetail: { isProductDetail, setIsProductDetail },
          editProduct: { isEditProduct, setIsEditProduct },
          openCart: { cartOpen, setCartOpen },
        }}
      >
        <UserInfoContext.Provider
          value={{
            userEmail: { email, setEmail },
            userPassword: { password, setPassword },
            userInfo: { user, setUser },
          }}
        >
          <Header />
          <Body />
          <Footer />
        </UserInfoContext.Provider>
      </SigninContext.Provider>
    </div>
  );
}

export default App;
