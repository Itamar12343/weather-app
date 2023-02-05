import { createStore } from "redux";

function reducer(state = "", action) {
    switch (action.type) {
        case "change":
            return action.text;
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;