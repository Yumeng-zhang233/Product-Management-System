import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { initProducts } from "../actions";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./Product";

const ProductList = ({ currentItems }) => {
  const userCart = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initProducts());
  }, [dispatch]);
  return (
    <div>
      <div className="product_list">
        {currentItems &&
          currentItems.map((item) => {
            return (
              <Product
                key={item.id}
                productName={item.productName}
                description={item.description}
                category={item.category}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                count={userCart.has(item.id) ? userCart.get(item.id).count : 0}
                id={item.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProductList;
