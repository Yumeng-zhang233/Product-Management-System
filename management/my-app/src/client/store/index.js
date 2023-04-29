import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { loginReducer } from "../reducer";
import reducer from "../reducer";

export const store = createStore(reducer, applyMiddleware(thunk));
