import React, { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "../UserInfoContext";
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import { SigninContext } from "../SigninContext";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { initProducts } from "../actions";

import { useSelector } from "react-redux";
import ProductList from "./ProductList";
import "../App.css";
import Home from "./Home";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";

function PaginatedItems({ itemsPerPage }) {
  const products = useSelector((state) => state.product);
  const [itemOffset, setItemOffset] = useState(0);
  let isLoggedin = useSelector((state) => state.login.status);
  const { createProduct } = React.useContext(SigninContext);
  const { userEmail, userPassword } = React.useContext(UserInfoContext);
  const { isCreatedProduct, setIsCreatedProduct } = createProduct;
  let [sortedProduct, setSortedProduct] = useState(products);
  const { email, setEmail } = userEmail;
  const { password, setPassword } = userPassword;

  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email == "admin@gmail.com" && password == "123456") {
      setShowCreateProduct(true);
    } else if (email != "admin@gmail.com") {
      setShowCreateProduct(false);
    }
  }, [password]);

  function ascendingPrice(a, b) {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }

  sortedProduct = products;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = sortedProduct.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedProduct.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ButtonGroup className="button_group">
        <DropdownButton
          as={ButtonGroup}
          title="Sort products"
          id="bg-nested-dropdown"
          variant="secondary"
        >
          <Dropdown.Item
            eventKey="1"
            onClick={() => {
              setSortedProduct(products.sort(ascendingPrice));
            }}
          >
            Price: low to high
          </Dropdown.Item>
        </DropdownButton>
        {isLoggedin && showCreateProduct && (
          <Button
            variant="light"
            onClick={() => {
              setIsCreatedProduct(true);
            }}
          >
            Add Product
          </Button>
        )}
      </ButtonGroup>

      {/* {isLoggedin && isCreatedProduct && <Home />} */}
      <ProductList currentItems={currentItems} />
      <div className="page">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}
export default PaginatedItems;