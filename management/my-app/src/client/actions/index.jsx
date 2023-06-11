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
    const response = await fetch(
      "/editProduct",
      ajaxConfigHelper(product, "PUT")
    );
    const result = await response.json();
    if (result.status === 200) {
      const loggedInUser = localStorage.getItem("user");
      const currentUser = JSON.parse(loggedInUser);
      if (currentUser) {
        let obj = {};
        currentUser.cart.forEach((item) => {
          if (item.itemAdded === product.id) {
            item.productName = product.productName
              ? product.productName
              : item.productName;
            item.price = product.price ? product.price : item.price;
            item.image = product.image ? product.image : item.image;

            obj.productName = item.productName;
            obj.price = item.price;
            obj.image = item.image;
            obj.count = item.count;
          }
          localStorage.setItem("user", JSON.stringify(currentUser));
        });

        dispatch({
          type: "EditItem",
          payload: { itemAdded: product.id, obj },
        });
      }
      dispatch({
        type: "EditProduct",
        payload: product,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const addUser =
  ({ email, password, guest }) =>
  (dispatch) => {
    fetch("/addUser", ajaxConfigHelper({ email, password, guest }))
      .then((response) => response.json())
      .then(({ newUser: { email, password, cart, id } }) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            login: true,
            email,
            password,
            cart,
            id,
          })
        );
        dispatch({
          type: "Login",
          payload: {
            login: true,
            email,
            password,
            cart,
            id,
          },
        });
        let map = new Map();
        if (cart.length != 0) {
          cart.forEach((e) => {
            if (!map.has(e.itemAdded)) {
              let obj = {
                productName: e.productName,
                price: e.price,
                image: e.image,
                count: e.count,
              };
              map.set(e.itemAdded, obj);
            }
          });
        }
        dispatch({
          type: "UserCart",
          payload: map,
        });
        localStorage.removeItem("unkonowUser");
      })
      .catch((e) => {
        console.error(e);
      });
  };

export const login =
  ({ email, password, guest }) =>
  (dispatch) => {
    fetch("/login", ajaxConfigHelper({ email, password, guest }))
      .then((response) => response.json())
      .then(({ currentUser: { email, password, cart, id } }) => {
        //update local storage;
        localStorage.setItem(
          "user",
          JSON.stringify({
            login: true,
            email,
            password,
            cart,
            id,
          })
        );
        dispatch({
          type: "Login",
          payload: {
            login: true,
            email,
            password,
            cart,
            id,
          },
        });

        let map = new Map();
        cart.forEach((item) => {
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
        localStorage.removeItem("unkonowUser");
      })
      .catch((e) => {
        console.error(e);
      });
  };

export const logout = () => async (dispatch) => {
  try {
    const response = await fetch("/logout");
    dispatch({
      type: "Logout",
      payload: false,
    });
  } catch (error) {
    console.log(error);
  }
};
export const addCart =
  ({ user, productName, price, image, itemAdded, count }) =>
  (dispatch) => {
    fetch(
      "/addCart",
      ajaxConfigHelper({ user, productName, price, image, itemAdded, count })
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.status == 201) {
          //get th epbject from local storage and update
          const loggedInUser = localStorage.getItem("user");
          const currentUser = JSON.parse(loggedInUser);
          if (currentUser) {
            let map = new Map();
            currentUser.cart.push({
              productName,
              price,
              image,
              itemAdded,
              count,
            });
            currentUser.cart.forEach((item) => {
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
            localStorage.setItem("user", JSON.stringify(currentUser));
          }
          dispatch({
            type: "AddCart",
            payload: { user, itemAdded, count },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
export const increment = (product) => (dispatch) => {
  fetch("/increment", ajaxConfigHelper(product, "PUT"))
    .then((response) => response.json())
    .then((response) => {
      if (response.status == 201) {
        const loggedInUser = localStorage.getItem("user");
        const currentUser = JSON.parse(loggedInUser);
        let obj = {};
        if (currentUser) {
          currentUser.cart.forEach((item) => {
            if (item.itemAdded === product.itemAdded) {
              item.count = response.cartUpdated.count;
              obj.productName = item.productName;
              obj.price = item.price;
              obj.image = item.image;
              obj.count = response.cartUpdated.count;
            }
            localStorage.setItem("user", JSON.stringify(currentUser));
          });
        }

        dispatch({
          type: "Increment",
          payload: {
            itemAdded: product.itemAdded,
            obj,
          },
        });
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

export const decrement = (product) => (dispatch) => {
  fetch("/decrement", ajaxConfigHelper(product, "PUT"))
    .then((response) => response.json())
    .then((response) => {
      if (response.status == 201) {
        let obj = {};
        const loggedInUser = localStorage.getItem("user");
        const currentUser = JSON.parse(loggedInUser);
        if (currentUser) {
          currentUser.cart.forEach((item) => {
            if (item.itemAdded === product.itemAdded) {
              item.count = response.cartUpdated.count;
              obj.productName = item.productName;
              obj.price = item.price;
              obj.image = item.image;
              obj.count = response.cartUpdated.count;
            }
            localStorage.setItem("user", JSON.stringify(currentUser));
          });
        }

        dispatch({
          type: "Increment",
          payload: {
            itemAdded: product.itemAdded,
            obj,
          },
        });
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
export async function itemDetail(id) {
  try {
    const response = await fetch(
      "/itemDetail",
      ajaxConfigHelper({ id }, "PUT")
    );
    const result = await response.json();
    if (result.status == 200) {
      const storedItemInfo = localStorage.getItem(`itemInfo_${id}`);
      if (!storedItemInfo) {
        localStorage.setItem(`itemInfo_${id}`, JSON.stringify(result.itemInfo));
      }

      return result.itemInfo;
    }
  } catch (error) {
    console.log(error);
  }
}

export const deleteItem = (product) => (dispatch) => {
  fetch("/deleteItem", ajaxConfigHelper(product, "PUT"))
    .then((response) => response.json())
    .then((response) => {
      if (response.status == 200) {
        const loggedInUser = localStorage.getItem("user");
        const currentUser = JSON.parse(loggedInUser);
        let map = new Map();

        if (currentUser) {
          currentUser.cart.forEach((item) => {
            if (item.itemAdded === product.id) {
              let index = currentUser.cart.indexOf(item);
              currentUser.cart.splice(index, 1);
            }

            localStorage.setItem("user", JSON.stringify(currentUser));
          });

          currentUser.cart.forEach((item) => {
            if (!map.has(item.itemAdded)) {
              let obj = {};
              obj.productName = item.productName;
              obj.price = item.price;
              obj.image = item.image;
              obj.count = item.count;
              map.set(item.itemAdded, obj);
            }
          });
        }
        dispatch({
          type: "DeleteItem",
          payload: map,
        });
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
