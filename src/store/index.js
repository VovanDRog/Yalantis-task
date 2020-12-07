import { createStore } from "redux";
import empoloyeesReducer from "./empoloyees";

const store = createStore(empoloyeesReducer);

export default store;