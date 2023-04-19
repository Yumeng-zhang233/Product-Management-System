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
  error: errorReducer,
});
