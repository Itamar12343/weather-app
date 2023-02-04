import { createStore } from "redux";

function reducer(state = 0, action) {
    switch (action.type) {
        case "change":
            return action.text;
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;