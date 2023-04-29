import { ajaxConfigHelper } from "../helper/index";

export const initProducts = () => async (dispatch) => {
  try {
    //const todos = await todoApi.getAllTodos();
    const productsResponse = await fetch("/allProducts");
    const products = await productsResponse.json();
    dispatch({
      type: "Init",
      payload: products,
    });
  } catch (error) {
    //will add error handling code later
    console.log(error);
  }
};
export const addProduct = (content) => (dispatch) => {
  fetch("/addProduct", ajaxConfigHelper(content))
    .then((response) => response.json())
    .then(
      ({
        newProduct: {
          productName,
          description,
          category,
          price,
          quantity,
          image,
          id,
        },
      }) => {
        dispatch({
          type: "AddProduct",
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
      }
    )
    .catch((e) => {
      console.log(e);
    });
};
export const editProductInfo = (product) => async (dispatch) => {
  try {
    //const data = await todoApi.modTodo(index);
    const response = await fetch(
      "/editProduct",
      ajaxConfigHelper(product, "PUT")
    );
    const result = await response.json();
    console.log(result);

    dispatch({
      type: "EditProduct",
      payload: product,
    });
  } catch (e) {
    console.log(e);
  }
};

// export const editProduct = (product) => async (dispatch) => {
//   try {
//     //const data = await todoApi.modTodo(index);
//     const response = await fetch(
//       "/editProduct",
//       ajaxConfigHelper({ product }, "PUT")
//     );
//     const result = await response.json();
//     console.log(result);

//     dispatch({
//       type: "EditProduct",
//       payload: product,
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

export const addUser =
  ({ email, password }) =>
  (dispatch) => {
    fetch("/addUser", ajaxConfigHelper({ email, password }))
      .then((response) => response.json())
      .then((response) => {
        console.log(response.status);
        if (response.status == 201) {
          dispatch({
            type: "Login",
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
export const login =
  ({ email, password }) =>
  (dispatch) => {
    fetch("/login", ajaxConfigHelper({ email, password }))
      .then((response) => response.json())
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          dispatch({
            type: "Login",
          });
        } else {
          alert("email and password do not match");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
export const logout = () => async (dispatch) => {
  try {
    const response = await fetch("/logout");
    console.log(await response.json());
    dispatch({
      type: "Logout",
    });
  } catch (error) {
    console.log(error);
  }
};
