import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { initProducts } from "../actions";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./Product";

const ProductList = ({ currentItems }) => {
  const products = useSelector((state) => state.product);
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
                id={item.id}
              />
            );
          })}
        {/* <Pagination className="pagination">{items}</Pagination> */}
      </div>
    </div>
  );
};

export default ProductList;

// const ProductList = () => {
//   const products = useSelector((state) => state.product);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(initProducts());
//   }, [dispatch]);
//   return (
//     <div>
//       <div className="product_list">
//         {products.map((item) => {
//           return (
//             <Product
//               key={item.id}
//               productName={item.productName}
//               description={item.description}
//               category={item.category}
//               price={item.price}
//               quantity={item.quantity}
//               image={item.image}
//               id={item.id}
//             />
//           );
//         })}
//         <PaginatedItems itemsPerPage={4} />
//         {/* <Pagination className="pagination">{items}</Pagination> */}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
