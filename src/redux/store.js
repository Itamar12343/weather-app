import { createStore, combineReducers } from "redux";
import searchReducer from "./searchReducer";
import weatherReducer from "./weatherReducer";


const reducers = combineReducers({ searchReducer, weatherReducer });

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;