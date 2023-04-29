import { combineReducers } from "redux";

export const loginReducer = (state = { status: false }, action) => {
  switch (action.type) {
    case "Login":
      return { status: true };
    case "Logout":
      return { status: false };
    default:
      return state;
  }
};
export const cardReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "Detail":
      return payload;
    default:
      return state;
  }
};
const initialState = [];
export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "Init":
      return [...payload];
    case "AddProduct":
      return [...state, payload];
    case "EditProduct":
      return state.map((item) => {
        //if payload => index is not current index
        if (payload.index !== item.id) {
          return item;
        }
        let name = payload.productName ? payload.productName : item.productName;
        let itemDescription = payload.description
          ? payload.description
          : item.description;
        let itemCategory = payload.category ? payload.category : item.category;
        let itemPrice = payload.price ? payload.price : item.price;
        let itemQuantity = payload.quantity ? payload.quantity : item.quantity;
        let itemImage = payload.image ? payload.image : item.image;

        return {
          ...item,
          productName: name,
          description: itemDescription,
          category: itemCategory,
          price: itemPrice,
          quantity: itemQuantity,
          image: itemImage,
        };
      });
    default:
      return state;
  }
};
const initErrorState = { error: false, errorMessage: "" };

export const errorReducer = (
  state = { ...initErrorState },
  { type, payload }
) => {
  switch (type) {
    case "Error":
      return { ...state, ...payload };
    case "RESET_ERROR":
      return { ...initErrorState };
    default:
      return state;
  }
};

export default combineReducers({
  login: loginReducer,
  detail: cardReducer,
  product: productReducer,
  error: errorReducer,
});
